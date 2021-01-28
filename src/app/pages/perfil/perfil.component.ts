import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { FileUploadService } from '../../service/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  public usuario: Usuario;
  public perfilForm: FormGroup;
  public imagenSubir: File;
  public imgTemp:any = null;


  readOnlyVar: boolean;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
               }


  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });

    console.log('this.usuario.google');
    if(this.usuario.google){
      this.readOnlyVar = true;
    }else{
      this.readOnlyVar = false;
    }
    console.log(typeof(this.usuario.google));
    console.log(this.usuario.google);
    console.log(this.readOnlyVar);
    console.log(typeof(this.readOnlyVar));
  }

  actualizaPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( resp => {
      const {nombre, email} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios guardados de manera exitosa', 'success');
    }, (err) => {
      console.log(err.error.msg);
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  cambiarImagen(file: File){
    console.log(file);
    this.imagenSubir = file;
    if(!file){
      Swal.fire('Imagen descartada', '', 'error');
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
        .actualizarFoto(this.imagenSubir, 'usuario', this.usuario.uid)
        .then(img => {
          this.usuario.img = img
          Swal.fire('Guardado', 'Foto guardada de manera exitosa', 'success');
        });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
