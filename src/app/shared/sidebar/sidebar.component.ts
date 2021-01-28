import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../service/sidebar.service';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})


export class SidebarComponent implements OnInit {


//public imgUrl = '';
public userData: Usuario;

  menuItems: any[];
  constructor(private sidebarService: SidebarService,
              private usuarioService: UsuarioService) {
                //this.imgUrl = usuarioService.usuario.imagenUrl;
                this.userData = usuarioService.usuario;
    this.menuItems = sidebarService.menu;
   }

  ngOnInit(): void {
  }

}
