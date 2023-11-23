import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';
@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.page.html',
  styleUrls: ['./registrar-persona.page.scss'],
})
export class RegistrarPersonaPage implements OnInit {
  nuevoUser: string='';
  nuevoCorreo: string='';
  nuevoNombre: string='';
  nuevoApellido :string='';
  nuevaContrasena :string='';


  showPassword: boolean = false;

  constructor(private router: Router, private db: BaseDatosService) { }

  ngOnInit() {
  }
  almacenarUsuario(){
    this.db.almacenarUsuario(
      this.nuevoUser,
      this.nuevoCorreo,
      this.nuevoNombre,
      this.nuevoApellido,
      this.nuevaContrasena
    );
    this.router.navigate(['login'])
  }


  volver(){
    this.router.navigate(['login'])
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
