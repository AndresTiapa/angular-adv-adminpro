import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit {

  @Input('prog') progresoHtml: number = 50;
  @Input() btnClase: string = 'btn-success';
  @Output() newProg : EventEmitter <number> = new EventEmitter();

     cambiaProgreso (valor : number) {
      console.log("cambia progreso: " + valor);
      this.progresoHtml = this.progresoHtml + valor;
      this.progresoHtml < 0 ? this.progresoHtml = 0 : this.progresoHtml;
      this.progresoHtml > 100 ? this.progresoHtml = 100 :this.progresoHtml;
      this.newProg.emit(this.progresoHtml);
    }

  /*   cambiaProgresoM () {
      this.progresoHtml = this.progresoHtml - 5;
      console.log("cambia progreso: + 5 ");
      this.progresoHtml > 100 ? this.progresoHtml = 100 :this.progresoHtml;
    }
    cambiaProgresom () {
      this.progresoHtml = this.progresoHtml + 5;
      console.log("cambia progreso: - 5");
      this.progresoHtml < 0? this.progresoHtml = 0 :this.progresoHtml;
    } */

    get getProgreso () {
      return `${this.progresoHtml}%`;
    }
  constructor() { }

  ngOnInit(): void {
    this.btnClase = `btn ${this.btnClase}`
  }

  changer(valor:number) {
    valor >= 100 ? valor =100:
    valor <= 0 ? valor = 0:
    valor = valor;

    this.newProg.emit(valor);
    console.log(valor);
  }

}
