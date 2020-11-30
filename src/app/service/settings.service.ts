import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public linkTheme = document.querySelector('#theme');

  constructor() {
    console.log('Seetings Service Works!!!');

    const linkFromLs = localStorage.getItem('theme')||`/assets/css/colors/green-dark.css`;
    this.linkTheme.setAttribute('href',linkFromLs);
   }

   changeTheme(tema:string){
   const url = `/assets/css/colors/${tema}.css`;
   this.linkTheme.setAttribute('href',url);
   localStorage.setItem('theme',url);
   this.checkkCurrentTheme();
   }

   checkkCurrentTheme() {
    const labelsHtml = document.querySelectorAll('.selector');
    labelsHtml.forEach(label =>{
      label.classList.remove('working');
      const temaSeteado = label.getAttribute('data-theme');
      const temaSeteadoUrl = `/assets/css/colors/${temaSeteado}.css`;
      const linkThemehref = this.linkTheme.getAttribute('href');
      if(temaSeteadoUrl ===   linkThemehref){
        label.classList.add('working');
      }
    });
  }
}
