import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  constructor(private sqlite: SQLite) {
    this.crearTablas();
   }
  
    crearTablas(){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('create table if not exists usuario (usuario varchar(30),contrasena varchar(20), correo varchar(80), nombre varchar(25), apellido varchar(25))', [])
            .then(() => console.log('CAGL: EJECUCION TABLA CORRECTAMENTE'))
            .catch(e => console.log('CAGL: Error crear tabla'+ e));
        })
        .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
    }

   almacenarUsuario(usuario:string , correo:string, nombre:string,apellido:string, contrasena:string){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('insert into usuario values(?, ?, ?, ?, ?)', [usuario,contrasena,correo,nombre,apellido])
          .then(() => console.log('CAGL: Persona registrada ok'))
          .catch(e => console.log('CAGL: Error al registrar persona'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   loginUsuario(usuario:string, contrasena:string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql('select count(usuario) as cantidad from usuario where usuario = ? and contrasena= ?', [usuario,contrasena])
          .then((data) =>{
            console.log('CAGL: Usuarios encontrados: ' + data.rows.item(0).cantidad)
            return data.rows.item(0).cantidad;
          })
          .catch(e => console.log('CAGL: Error al logear'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

    //CAPTURAR INFORMACIÓN DEL USUARIO
   infoUsuario(usuario:string, contrasena:string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      return db.executeSql('select  correo, nombre, apellido, contrasena from usuario where usuario = ? and contrasena= ?', [usuario,contrasena])
          .then((data) =>{
            let objeto: any = {};
            objeto.nombre=data.rows.item(0).nombre;
            objeto.correo=data.rows.item(0).correo;
            objeto.apellido=data.rows.item(0).apellido;
            objeto.contrasena=data.rows.item(0).contrasena;
            return objeto;
          })
          .catch(e => console.log('CAGL: Error al mostrar personaa'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

   cambiarContrasena(usuario: string, contrasenaActual:string, contrasenaNueva:string){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('update usuario set contrasena = ? where usuario = ? and contrasena = ?', [contrasenaNueva, usuario, contrasenaActual])
          .then(() => console.log('CAGL: Contraseña Modificada'))
          .catch(e => console.log('CAGL: Contraseña NO SE PUDO ModificaR'+ JSON.stringify(e)));
      })
      .catch(e => console.log('CAGL: Error al crear o abrir DB'+ JSON.stringify(e)));
   }

}
