import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/auth.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  
  telefono: string = "";
  password: string = "";


 

  constructor(private loginService: LoginService,private router: Router) { }

  login(): void {
    this.loginService.login(this.telefono, this.password)
      .subscribe(data => {
        const valorBooleano = data.result.value;
        if (valorBooleano) {
          this.router.navigate(['/dashboard']);
          Swal.fire(
            '⚽ Bienvenido! ⚽',
            'Nombre de Usuario: ' + `${this.telefono}`,
            'success',
          );
        } else {
          // Si el valor booleano es falso, muestra un cartel de error
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        }
        console.log(valorBooleano);
      }, error => {
        // Manejar errores de la solicitud HTTP
        Swal.fire('Error', 'Inicio de sesión fallido', 'error');
        console.log('Error', error);
      });
  }
  



  IraRegistro() {
    this.router.navigate(['/registro'])
  }

  // IraDashSinLoguear() {
  //   this.router.navigate(['/dashboard'])
  //   Swal.fire(
  //     '⚽ Bienvenido! ⚽',
  //     'Nombre de Usuario:  '+ `${this.username}`,
  //     'success',
  //   )
  // }

  IrAloginEncargado(){
    this.router.navigate(['/loginEncargado'])
  }


  irAJugadores(){
    this.router.navigate(['jugadores'])
  }

  irAEquipos(){
    this.router.navigate(['equipos'])
  }

  irAPartidos(){
    this.router.navigate(['partidos'])
  }
  irADashComun(){
    this.router.navigate(['dashboard'])
  }

  irADashMatchmaking(){
    this.router.navigate(['match'])
  }
}






  // public loguear() {
  //   let resp = this.authService.getUser(this.username, this.password);
  //   resp.subscribe(data => {
  //       console.log(data)
  //   })
  // }