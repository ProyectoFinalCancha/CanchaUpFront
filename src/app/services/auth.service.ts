
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated: boolean = false;
  public loginRedirectUrl: string = '/login'; // Puedes establecer la URL de inicio de sesión aquí
  static isAuthenticated: any;
  static loginRedirectUrl: any;


  constructor() {
    // Inicialmente, el usuario no está autenticado.
    // En tu aplicación real, esta lógica debería ser más sofisticada.
  }



  // Método para realizar la autenticación.
  // login(username: string, password: string): boolean {
login(){
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
  }

  // Método para cerrar la sesión.
  logout(): void {
    this.isAuthenticated = false;
  }

}

