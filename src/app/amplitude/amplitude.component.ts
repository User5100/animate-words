import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-amplitude',
  template: `
  <h2>Audio Visualisation</h2>
  <audio
    #audio 
    src="http://k003.kiwi6.com/hotlink/5p87y9ftzg/LOCAL_FEED_JULY_8kHz.wav"></audio>
  <svg></svg>
  `,
  styles: [`
  
  `]
})
export class AmplitudeComponent implements OnInit, OnChanges {

  margin = { top: 20, right: 20, bottom: 20, left: 30 }
  height = 400 - this.margin.top - this.margin.bottom;
  width = 400 - this.margin.right - this.margin.left;
  svg: any;
  xAxis: any;
  yAxis: any;
  yScale: any;
  xScale: any;
  update: any;
  enter: any;
  data: Array<number> = [ 100, 200, 300, 400, 500];
  rectWidth: number = this.width / this.data.length;

  constructor() { }

  ngOnInit() {

    this.svg = d3.selectAll('svg')
                  .attr('height', this.height + this.margin.top + this.margin.bottom)
                  .attr('width', this.width + this.margin.right + this.margin.left)
                  .append('g')
                    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
                    .attr('height', this.height)
                    .attr('width', this.width);

    this.xScale = d3.scaleLinear()
                    .domain([0, this.data.length])
                    .range([0, this.width]);

    this.yScale = d3.scaleLinear()
                    .domain([0, d3.max(this.data, d => d)])
                    .range([this.height, 0]);

    this.yAxis = d3.selectAll('svg').append('g')
                    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
                    .call(d3.axisLeft(this.yScale));

    this.xAxis = d3.selectAll('svg').append('g')
                    .attr('transform', `translate(${this.margin.left}, ${this.height + this.margin.top})`)
                    .call(d3.axisBottom(this.xScale));
                
    this.update = this.svg.selectAll('rect')
                          .data(this.data);

    //Remove
    //this.update.exit().remove();

    //Enter
    this.enter = this.update.enter()
                            .append('rect')
                              .attr('fill', 'lightblue')
                              .attr('stroke', 'black');

    //Enter + Update                          
    this.enter.merge(this.update)
              .attr('height', d => this.height - this.yScale(d))
              .attr('width', this.rectWidth)
              .attr('x', (d, i) => this.xScale(i))
              .attr('y', d => this.yScale(d));

    

  }

  ngOnChanges() {

    this.enter.merge(this.update)
              .attr('height', d => this.height - this.yScale(d))
              .attr('width', this.rectWidth)
              .attr('x', (d, i) => this.xScale(i))
              .attr('y', d => this.yScale(d));

    
    
    
  }

}
