import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
                private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.usuarioService.validarToken()
                .pipe(
                  tap( estaAutenticado => {
                    if(!estaAutenticado) {
                      this.router.navigateByUrl('/login');
                    }
                  })
                );
      /* this.usuarioService.validarToken()
      .subscribe( resp => {
        console.log(resp);
      } );
      console.log('Pasó por el CanActivate del guard...');
    return false; */
  }

}
