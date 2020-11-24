import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../service/settings.service';

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
    this.checkChangeTheme();
  }

  checkChangeTheme() {
    const linkFromLs = localStorage.getItem('theme')||`/assets/css/colors/green-dark.css`;
    this.linkTheme.setAttribute('href',linkFromLs);
  }

}
