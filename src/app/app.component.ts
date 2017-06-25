import { Component, Renderer2,
         ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  animations: [
    trigger('hideFooter', [
      state('show', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('hide', style({
        transform: 'translate3d(0, 100%, 0)'
      })),
      transition('show <=> hide', animate('100ms ease-in'))
    ]),
    trigger('expandContent', [
      state('show', style({
        maxHeight: '600px'
      })),
      state('hide', style({
        maxHeight: '660px'
      })),
      transition('show <=> hide', animate('100ms ease-in'))
    ])
  ],
  template: `
  <div class="container">
    <nav>Header</nav>

    <section
      [@expandContent]="state">



      <div
        class="words-container"
        [ngStyle]="{'margin-left': setwordsContainerMarginLeft}"
        #wordsContainer>

            <p
              *ngFor="let wordObj of data$ | async"
              class="word"
              [ngClass]="{ 'highlight-word' : currentTime > wordObj.timestamp && currentTime < (wordObj.timestamp + wordObj.length) }">
              {{wordObj.word}} </p>

      </div>

      <app-amplitude></app-amplitude>

      <audio
        #audio
        controls
        src="http://k003.kiwi6.com/hotlink/5p87y9ftzg/LOCAL_FEED_JULY_8kHz.wav">
      </audio>

    </section>
    <aside
      [@expandContent]="state">
      Aside
    </aside>

    <footer
      class="player"
      [@hideFooter]="state">
      Player
    </footer>
  </div>
  `,
  styles: [`
  .container {
    display: grid;
    grid-template-areas:
      "nav"
      "aside"
      "section"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: 60px 4fr 4fr 2fr;
    position: relative;
    height: 100vh;
    overflow: hidden;

  }

  .container > * {
    background-color: seagreen;
    color: #FFF;
  }

  nav {
    grid-area: nav;
    width: 100%;
  }

  aside {
    grid-area: aside;
    height: 100%;
  }

  section {
    grid-area: section;
    max-height: 600px;
  }

  footer {
    grid-area: footer;
    width: 100%;
  }

  @media(min-width: 700px) {
    .container {
      grid-template-areas:
        "nav nav nav"
        "aside section section"
        "footer footer footer";
      grid-template-columns:
        1fr 2fr 2fr;
      grid-template-rows:
        60px 22fr 60px;
      grid-gap: 1px;
      height: 100vh;
    }
  }

  .words-container {
    white-space: nowrap;
    display: inline;
    padding: 10px;
    height: 10px;
    max-height: 10px;
  }

  .word {
    font-size: 16px;
    transition: font-size .1s;
    display: inline-block;
    margin: 50px;

  }

  .highlight-word {
    font-size: 32px;
  }
  `]
})
export class AppComponent implements AfterViewInit {

  state: string = 'show';
  data$: Observable<any>;
  setwordsContainerMarginLeft: string;
  currentTime: number;
  @ViewChild('wordsContainer') wordsContainer: ElementRef;
  @ViewChild('audio') audio: ElementRef;

  constructor(private renderer: Renderer2,
              private dataService: DataService) {}

  ngOnInit() {

    this.handlePlayerHideOrDisplay();

    this.data$ = this.dataService.getData();

    this.handleScrollingWordsOnPlay();
  }

  ngAfterViewInit() {

  }

  animateFooter() {
    this.state = (this.state === 'show' ? 'hide' : 'show');
  }

  getWordsContainerWidth() {
    let { width } = this.wordsContainer.nativeElement.getBoundingClientRect();
    return width;
  }

  getAudioDuration(): number {
    return this.audio.nativeElement.duration;
  }

  handleScrollingWordsOnPlay() {

    this.renderer.listen(this.audio.nativeElement, 'timeupdate', () => {
      this.currentTime = this.audio.nativeElement.currentTime;
      let width = this.getWordsContainerWidth();
      let duration = this.getAudioDuration();

      //setwordsContainerMarginLeft
      this.setwordsContainerMarginLeft = `${-(this.currentTime /duration * width).toFixed(0)}px`;

    })
  }

  handlePlayerHideOrDisplay() {
    this.renderer.listen(document, 'mousemove', (mousemove) => {

      if(mousemove.clientY > 600 && this.state === 'hide') {
        this.animateFooter()
      }

      if(mousemove.clientY < 600 && this.state === 'show') {
        this.animateFooter()
      }
    });
  }
}
