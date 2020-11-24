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
}
