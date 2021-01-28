import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interface/registerForm.interface';
import { environment } from '../../environments/environment';
import { loginForm } from '../interface/login-form.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private httpClient : HttpClient,
              private router: Router,
              private ngZone: NgZone ) {
      this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid || '';
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
    //const token = localStorage.getItem('token') || '';

    return this.httpClient.get(`${ base_url }/login/renew`, {
      headers: {
      'x-token': this.token
    }
    }).pipe(
      map( (resp: any) => {
        console.log(resp);
        const {
          email,
          google,
          nombre,
          role,
          uid,
          img = ''
         } = resp.usuarioDBr;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
        //this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token);
        return true;
      }),
      //map( resp => true),
      catchError( error => {
        console.log(error);
        return of(false);
      } )
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

  actualizarPerfil(data: { email:string, nombre:string, role:string}){
    data= {
      ...data,
      role: this.usuario.role
    }
    return this.httpClient.put(`${ base_url }/usuarios/${this.uid}`, data,{
      headers: {
        'x-token': this.token
      }
    });
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
