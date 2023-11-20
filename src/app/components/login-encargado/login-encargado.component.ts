import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/auth.service';
import { LoginEncargadoService } from 'src/app/services/login-encargado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-encargado',
  templateUrl: './login-encargado.component.html',
  styleUrls: ['./login-encargado.component.css']
})
export class LoginEncargadoComponent {
  telefono: string = '';
  password: string = '';




  constructor(private encargadoLoginService: LoginEncargadoService, private router: Router) { }


  login(): void {
    this.encargadoLoginService.login(this.telefono, this.password)
      .subscribe(data => {
        const valorBooleano = data.result.value;
        if (valorBooleano) {
          this.router.navigate(['/adminDash']);
          Swal.fire(
            '⚽ Bienvenido! ⚽',
            'Nombre de Usuario: ' + `${this.telefono}`,
            'success',
          );
        } else {
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        }
        console.log(valorBooleano);
      }, error => {
        Swal.fire('Error', 'Inicio de sesión fallido', 'error');
        console.log('Error', error);
      });
  }



  IraLoginJugador() {
    this.router.navigateByUrl('/login')
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