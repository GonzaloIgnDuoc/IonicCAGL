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
    console.log('Usuario en login: '+ this.mdl_usuario)
  }
  navegarRegistro(){
    this.router.navigate(['registrar-persona'])
  }

  login(){
    let extras: NavigationExtras = {
      replaceUrl: true,
      state:{
        usuario: this.mdl_usuario,
        contrasena: this.mdl_contrasena
      }
    }

    this.db.loginUsuario(this.mdl_usuario,this.mdl_contrasena)
      .then(data =>{
        if(data == 1){
          console.log('CAGL: credenciales validas')
          this.router.navigate(['principal'],extras);
        }else{
          console.log('CAGL: credenciales invalidas')
        }
      })
    
  }
}
