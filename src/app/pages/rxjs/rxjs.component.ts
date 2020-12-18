import { Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit,  OnDestroy{

  intervalPropSub: Subscription;

  constructor() {


    this.intervalPropSub = this.intervalObs$()
        .subscribe(
          console.log
          );
  }
    /*
    const obs$ = new Observable( obsr => {
      let i = -1;
      const intervalo = setInterval( () => {
        i++;
      /*   if(i % 2 === 0){
          console.log('...tack');
        }else{
          console.log('tick...');
        } */
        //console.log(i);
        /*obsr.next(i);
        if(i === 6){
          console.log('termina');
          clearInterval(intervalo);
          obsr.complete();
        }
        if(i === 4){
          i=0;
          obsr.error('El conteo actual es 4');
        }
      },1000)
    }

    ); */

    /* obs$.pipe(
      retry(4 )
    ).subscribe(
      obs => console.log(obs),
      err => console.log('Ha ocurrido un error: ', err),
      () => console.warn('Se ha completado el obs$')
      ); */


  intervalObs$() : Observable<any> {
    return   interval(500)
            .pipe(
              map(valor => valor + 1),
              //take(5),
              filter(dato => dato % 2 === 0 ? true : false)
            );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalPropSub.unsubscribe();
  }

}
