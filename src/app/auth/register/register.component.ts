import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ 'register.component.css'
  ]
})
export class RegisterComponent {

    public formSubmited = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required ],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  },{
    validators: this.passwordsIguales('password', 'password2')
    //validators
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router
              ) { }

  crearUsuario(){
    this.formSubmited = true;
  //console.log(this.registerForm.value);
  console.log(this.registerForm);
  //this.registerForm.valid ? console.log('posteando formulario') :;

  if(this.registerForm.invalid){
    return ;
  }
  //Se envia el formulario
  this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe( resp => {
      this.router.navigateByUrl('/');
        console.log('usuario Creado');
        console.log(resp);
    }, (err) => {
      console.log('Error Creando');
      //Sweet Alert
      Swal.fire('Error', err.error.msg, 'error')
    });
}

validarKey() {
  const key1 = this.registerForm.get('password').value;
  const key2 = this.registerForm.get('password2').value;
  /* console.log(`this key is: ${key1} y ${key2}`);;
  if((key1 !== key2) && this.formSubmited){
    return true;
  }else{
    return false;
  } */
  //key1 == null? console.log('password está vcía') : console.log('password NO está vcía');
  return (key1 !== key2) && this.formSubmited? true : false;
}

validacionCampo( campo: string): boolean{
  return this.registerForm.get(campo).invalid && this.formSubmited ? true: false;
}

aceptarTerminos() {
  return !this.registerForm.get('terminos').value && this.formSubmited;
}

passwordsIguales(key1: string, key2: string) {
  return (formGroup: FormGroup) => {
    const key1Control = formGroup.get(key1);
    const key2Control = formGroup.get(key2);
    console.log('contraseña 1'+key1);
    console.log('contraseña 2'+key2);
  /*   if(key2Control.value === key1Control.value){
      key2Control.setErrors(null)
    }else{
      key2Control.setErrors({noEquals: true})
    } */
    key2Control.value === key1Control.value ? key2Control.setErrors(null) : key2Control.setErrors({noEquals: true})

  }
}

}
