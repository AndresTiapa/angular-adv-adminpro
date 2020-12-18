import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  titulo: string;
  public obsTitulo$ : Subscription;
  constructor(
    private router : Router
  ) {
    this.obsTitulo$ = this.getTitulo().subscribe( eve => {
                             console.log(eve);
                             this.titulo = eve;
                             document.title = eve;
                          });;
   }
  ngOnDestroy(): void {
    this.obsTitulo$.unsubscribe();
  }

  getTitulo() {

    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((activation: ActivationEnd) => activation.snapshot.firstChild === null),
      map(infoData => infoData.snapshot.data.titulo)
    );
  }

  ngOnInit(): void {
  }

}
