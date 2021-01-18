import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmited = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required ],
    remember: [localStorage.getItem('remember') || false]
  });

  //constructor
  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone
              ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
   // console.log(this.loginForm.value);
   this.usuarioService.login(this.loginForm.value )
       .subscribe( resp => {
         if(this.loginForm.get('remember').value){
           localStorage.setItem('email', this.loginForm.get('email').value);
           localStorage.setItem('remember', this.loginForm.get('remember').value);
         }else{
           localStorage.removeItem('email');
           localStorage.removeItem('remember');
         }
         console.log(resp);
         this.router.navigateByUrl('/');
         }, (err) => {
          Swal.fire('Error', err.error.msg, 'error')
         });
  }

/*   onSuccess( googleUser ) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);

    this.onFailure('mi error');
  }

  onFailure(error) {
    console.log(error);
  } */

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
     /*  'onsuccess': this.onSuccess,
      'onfailure': this.onFailure */
    });

    this.startApp();
  }

  async startApp() {
   await this.usuarioService.googleInit();
   this.auth2 = this.usuarioService.auth2;
   /*
   Se elimina por optimizacion en el singIn
   gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '460562457154-jd4i5jlqu5mep40supbvop7fve4h8iu9.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      }); */
      this.attachSignin(document.getElementById('my-signin2'));
    //});
  }

  attachSignin( element ) {
    console.log( element.id);
    this.auth2.attachClickHandler( element, {},
        ( googleUser ) => {
          const id_token = googleUser.getAuthResponse().id_token;
          //console.log(id_token);
          this.usuarioService.loginGoogle(id_token)
          .subscribe(resp => {
              this.ngZone.run(() =>{
                this.router.navigateByUrl('/');
              })
          }
            );
          /*document.getElementById( 'name' ).innerText = "Signed in: " +
              googleUser.getBasicProfile().getName(); */

          //Queda pendiente redireccion al dashboard

        }, ( error ) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
