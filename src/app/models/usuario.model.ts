import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
   ){}

   imprimirUsuario(){
     console.log(this.nombre);
   }

  get infoProfile(){
    return this.nombre;
  }

   get imagenUrl(){
     // /upload/usuarios/no-image
     /* console.log(' imprimo la imagen');
     console.log(this.img);
     console.log(' Termina'); */
     if(this.img.includes('https')){
       return this.img;
     }
     if(this.img){
      //console.log('cumple');
      // console.log(`${base_url}/upload/usuario/${this.img}`);
       return `${base_url}/upload/usuario/${this.img}`;
     }else{
      //console.log('No cumple');
      //console.log(`${base_url}/upload/usuario/no-image`);
       return `${base_url}/upload/usuario/no-image`;
    }
   }
}
