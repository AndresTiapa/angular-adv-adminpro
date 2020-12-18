import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then( usuarios => {
      console.log(usuarios);
    });
 /*    const promesas = new Promise ( (res, rej) => {
      if(false){
        res('hey there!');
      }else{
        rej('Not good');
      }
    });

    promesas.then( (sms) => {
      console.log(sms);
    } )
    .catch( (err) =>{
      console.log('Nada salió bien,  that is ',err);
    });

    console.log('Looks great!');*/
  }

    getUsers() {
     const promesa = new Promise( res => {
       fetch('https://reqres.in/api/users?page=2')
       .then( res => res.json())
       .then( response=> res(response.data))
     });
     return promesa;
  }
}
