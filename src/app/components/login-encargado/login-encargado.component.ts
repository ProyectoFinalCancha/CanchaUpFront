import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-encargado',
  templateUrl: './login-encargado.component.html',
  styleUrls: ['./login-encargado.component.css']
})
export class LoginEncargadoComponent {
  telefono: string = '';
  password: string = '';




  constructor(private authService: AuthService, private router: Router) { }



  login() {
    this.authService.loginEncargado(this.telefono, this.password).subscribe(
      (data: any) => {
        const valorBooleano = data.result.value;

        if (valorBooleano) {
          this.router.navigate(['/dashboard']);
          Swal.fire(
            '⚽ Bienvenido! ⚽',
            'Nombre de Usuario: ' + `${this.telefono}`,
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

  IraLoginJugador() {
    this.router.navigateByUrl('/login')
  }



  IraDashSinLoguearse() {
    this.router.navigate(['/adminDash']);
  }
}





/* IraDashConElGuard() {
  console.log('IraDash() se está ejecutando');

  // if (this.authService.login(this.telefono, this.password)) {
  //   // Autenticación exitosa, redirige a la página 'adminDash'
  //   console.log('Inicio de sesión exitoso');
    this.router.navigate(['/adminDash']);
  // } else {
  //   console.log('Credenciales incorrectas');
  //   // Aquí puedes mostrar un mensaje de error al usuario
  // }
}*/