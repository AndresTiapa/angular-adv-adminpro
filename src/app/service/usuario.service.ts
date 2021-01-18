import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interface/registerForm.interface';
import { environment } from '../../environments/environment';
import { loginForm } from '../interface/login-form.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;

  constructor(private httpClient : HttpClient,
              private router: Router,
              private ngZone: NgZone ) {
      this.googleInit();
  }

  googleInit() {

    return new Promise<void>( resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '460562457154-jd4i5jlqu5mep40supbvop7fve4h8iu9.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
        //this.attachSignin(document.getElementById('my-signin2'));
      });
    })
  };

  logOut() {
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run(() =>{
      this.router.navigateByUrl('/login')
      })
    });
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.httpClient.get(`${ base_url }/login/renew`, {
      headers: {
      'x-token': token
    }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false) )
    );
  }

  crearUsuario(formData: RegisterForm){
   // console.log('creando usuario');
  return this.httpClient.post(`${ base_url }/usuarios`, formData)
                        .pipe(
                          tap( (resp:any) => {
                          localStorage.setItem('token', resp.token)
                          })
                        );
  }


  login (formData: loginForm){
    // console.log('creando usuario');
   return this.httpClient.post(`${ base_url }/login`, formData)
                         .pipe(
                           tap( (resp:any) => {
                             localStorage.setItem('token', resp.token)
                           })
                         );
   }

   loginGoogle ( token ){
    // console.log('creando usuario');
   return this.httpClient.post(`${ base_url }/login/google`, { token }) //ojo: este token es un objeto
                         .pipe(
                           tap( (resp:any) => {
                             localStorage.setItem('token', resp.token)
                           })
                         );
   }
}
