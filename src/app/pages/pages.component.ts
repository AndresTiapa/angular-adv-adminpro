import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../service/settings.service';

declare function customInitFunctions();



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: [ './pagen.component.css'
  ]
})
export class PagesComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');

  constructor(settingsService: SettingsService) { }

  ngOnInit(): void {
    customInitFunctions();
    //this.checkChangeTheme();
  }

  checkChangeTheme() {
  }

}
