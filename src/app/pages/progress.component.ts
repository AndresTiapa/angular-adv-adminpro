import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progresoHtml: number = 50;

  cambiaProgreso (valor : number) {
    console.log("cambia progreso: " + valor);
    this.progresoHtml = this.progresoHtml + valor;
    this.progresoHtml < 0 ? this.progresoHtml = 0 : this.progresoHtml;
    this.progresoHtml > 100 ? this.progresoHtml = 100 :this.progresoHtml;
  }

  get getProgreso () {
    return `${this.progresoHtml}%`;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
