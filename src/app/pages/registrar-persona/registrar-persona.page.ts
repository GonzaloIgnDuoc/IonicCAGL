import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';
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

  constructor(private router: Router, private db: BaseDatosService) { }

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
    this.router.navigate(['login'])
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
