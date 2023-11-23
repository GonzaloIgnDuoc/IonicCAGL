import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';

  constructor(private router: Router, private db: BaseDatosService) { }

  ngOnInit() {
    
  }
  ingresar(){
    let extras: NavigationExtras = {
      
      state:{
        usuario: this.mdl_usuario,
        contrasena: this.mdl_contrasena
      },replaceUrl: true
    }
    this.router.navigate(['principal'],extras)
  }

  navegarRegistro(){
    this.router.navigate(['registrar-persona'])
  }
}
