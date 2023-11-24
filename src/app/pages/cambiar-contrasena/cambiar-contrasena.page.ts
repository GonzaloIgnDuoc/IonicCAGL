import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';

  mdl_actual: string ='';
  mdl_nueva: string='';
  mdl_confirmacion: string='';

  constructor(private router:Router, private db:BaseDatosService) { }

  ngOnInit() {
    let extras= this.router.getCurrentNavigation();
    
    if(extras?.extras.state){
      this.usuario = extras?.extras.state['usuario'];
      this.contrasena = extras?.extras.state['contrasena'];
    }
  }

  cambiarContrasena(){
    this.db.cambiarContrasena(this.usuario,this.contrasena,this.mdl_nueva);
    let extras: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'],extras);
  }

}
