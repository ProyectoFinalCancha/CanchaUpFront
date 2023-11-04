import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.loginJugador(this.username, this.password).subscribe(
      (data: any) => {
        const valorBooleano = data.result.value;

        if (valorBooleano) {
          this.router.navigate(['/dashboard']);
          Swal.fire(
            '⚽ Bienvenido! ⚽',
            'Nombre de Usuario: ' + `${this.username}`,
            'success',
          );
        } else {
          Swal.fire('Error', 'Inicio de sesión fallido', 'error');
        }
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Inicio de sesión fallido', 'error');
      }
    );
  }


  IraRegistro() {
    this.router.navigate(['/registro'])
  }

  IraDashSinLoguear() {
    this.router.navigate(['/dashboard'])
    Swal.fire(
      '⚽ Bienvenido! ⚽',
      'Nombre de Usuario:  '+ `${this.username}`,
      'success',
    )
  }

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
}






  // public loguear() {
  //   let resp = this.authService.getUser(this.username, this.password);
  //   resp.subscribe(data => {
  //       console.log(data)
  //   })
  // }