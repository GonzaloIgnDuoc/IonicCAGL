import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.page.html',
  styleUrls: ['./registrar-persona.page.scss'],
})
export class RegistrarPersonaPage implements OnInit {
  mdl_usuario: string='';
  mdl_correo: string='';
  mdl_nombre: string='';
  mdl_apellido :string='';
  mdl_contrasena :string='';


  showPassword: boolean = false;

  constructor(private router: Router, private db: BaseDatosService, private api:APIService) { }

  ngOnInit() {
  }
  almacenarUsuario(){
    this.db.almacenarUsuario(
      this.mdl_usuario,
      this.mdl_correo,
      this.mdl_nombre,
      this.mdl_apellido,
      this.mdl_contrasena
    );
    this.registroApi();
    this.router.navigate(['login'])
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  async registroApi(){
    try { let data = this.api.almacenarPersonaApi(
      this.mdl_usuario,
      this.mdl_correo,
      this.mdl_nombre,
      this.mdl_apellido,
      this.mdl_contrasena);
    let respuesta = await lastValueFrom(data);

    let jsonTexto = JSON.stringify(respuesta);
    console.log('CAGL: cositas api' + jsonTexto)
    }catch (error) {
      console.error('CAGL: Error en personaLogin:', error);
    }
  }
}
