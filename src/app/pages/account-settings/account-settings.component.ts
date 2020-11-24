import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  public labelsHtml:NodeListOf<Element>;//<Element>
  constructor() { }

  ngOnInit(): void {
    this.labelsHtml = document.querySelectorAll('.selector');
    this.checkkCurrentTheme();

  }

  changeTheme(tema:string) {
    const url = `/assets/css/colors/${tema}.css`;

    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkkCurrentTheme();
  }

  checkkCurrentTheme() {
    this.labelsHtml.forEach(label =>{
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
