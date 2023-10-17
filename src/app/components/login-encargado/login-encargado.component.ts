import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-encargado',
  templateUrl: './login-encargado.component.html',
  styleUrls: ['./login-encargado.component.css']
})
export class LoginEncargadoComponent {
  telefono: string = '';
  password: string = '';

  
  
  constructor(private authService: AuthService, private router: Router) {}

  IraDash() {
    console.log('IraDash() se está ejecutando');

    // if (this.authService.login(this.telefono, this.password)) {
    //   // Autenticación exitosa, redirige a la página 'adminDash'
    //   console.log('Inicio de sesión exitoso');
      this.router.navigate(['/adminDash']);
    // } else {
    //   console.log('Credenciales incorrectas');
    //   // Aquí puedes mostrar un mensaje de error al usuario
    // }
  }

  IraLogin(){
    this.router.navigateByUrl('/login')
  }
}
