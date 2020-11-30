import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
 /*  public linkTheme = document.querySelector('#theme');
  public labelsHtml:NodeListOf<Element>;//<Element> */

  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {
    // this.labelsHtml = document.querySelectorAll('.selector');
    this.settingsService.checkkCurrentTheme();

  }

  changeTheme(tema:string) {
    this.settingsService.changeTheme(tema);
    //this.checkkCurrentTheme();
  }



}
