import { Component, Renderer2 } from '@angular/core';
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
        maxHeight: '580px'
      })),
      state('hide', style({
        maxHeight: '640px'
      })),
      transition('show <=> hide', animate('100ms ease-in'))
    ])
  ],
  template: `
 
  <div class="container">
    <nav>Header</nav>
    
    <section
      [@expandContent]="state">
      Section
      <app-amplitude></app-amplitude>
      <pre>{{ data$ | async | json }}</pre>
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
        60px 8fr 50px;
      grid-gap: 4px;
      height: 100vh;
    }
  }
  `]
})
export class AppComponent {
  state: string = 'show';
  data$: Observable<any>;

  constructor(private renderer: Renderer2,
              private dataService: DataService) {}

  ngOnInit() {
    this.renderer.listen(document, 'mousemove', (mousemove) => {

      if(mousemove.clientY > 600 && this.state === 'hide') {
        this.animateFooter()
      }

      if(mousemove.clientY < 600 && this.state === 'show') {
        this.animateFooter()
      }   
    })

    this.data$ = this.dataService.getData();
  }

  animateFooter() {
    this.state = (this.state === 'show' ? 'hide' : 'show');
  }
}
