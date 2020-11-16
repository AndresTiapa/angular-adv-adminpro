import { Component, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']; /* , 'In-Store Sales', 'Mail-Order Sales' */
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],/*
    [50, 150, 120],
    [250, 130, 70], */
  ];
public doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit(): void {
  }

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public colors: Color[] = [
    {backgroundColor: ['#9e20e', '#ff5800','#ffb404']}
  ]
}
