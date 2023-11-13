
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //////////////////////ESTAS VARIABLES SON PARA EL GUARD DE ANGULAR 
  public isAuthenticated: boolean = false;
  public loginRedirectUrl: string = '/login'; // Puedes establecer la URL de inicio de sesión aquí
  static isAuthenticated: any;
  static loginRedirectUrl: any;
  //////////////////////////////////////////////////////////////////////////////////////////////



}

// Método para realizar la autenticación CON EL GUARD 
// login(username: string, password: string): boolean {
// console.log('Username:', username);
// console.log('Password:', password);
// En una aplicación real, deberías verificar las credenciales con un servidor o base de datos.
// Aquí estamos utilizando credenciales fijas para simplificar el ejemplo.
// if (username === 'sven' && password === 'pass') {
//   this.isAuthenticated = true;
//   return true;
// } else {
//   this.isAuthenticated = false;
//   return false;
// }