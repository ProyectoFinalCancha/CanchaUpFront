
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


  private apiUrl = "http://localhost:8080/restful/services/simple.LoginAdmin/actions/LoginAdmin/invoke";

  // FALTA EL apiUlr para el login de JUGADOR 

  constructor(private http: HttpClient) { }

  loginJugador(telefono: string, password: string): Observable<any> {
    const body = {
      telefono: {
        value: telefono
      },
      password: {
        value: password
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3ZlbjpwYXNz'
    });

    return this.http.post(this.apiUrl, body, { headers });
  }




  loginEncargado(telefono: string, password: string): Observable<any> {
    const body = {
      telefono: {
        value: telefono
      },
      password: {
        value: password
      }
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic c3ZlbjpwYXNz'
    });
    return this.http.post(this.apiUrl,body, {headers})

  }

  // Método para cerrar la sesión.
  logout(): void {
    this.isAuthenticated = false;
  }

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