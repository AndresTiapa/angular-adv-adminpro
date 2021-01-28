import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css'
  ]
})
export class HeaderComponent implements OnInit {

  //public imgUrl = '';
  public userData: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.userData = usuarioService.usuario;
  }

  logOut() {
    this.usuarioService.logOut();
  }

  ngOnInit(): void {
  }

}
