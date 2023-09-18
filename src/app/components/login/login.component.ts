import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  username!: string;
  password!: string;

  constructor(private router: Router, private authService: AuthService) {

  }


  IraRegistro() {
    this.router.navigate(['/registro'])
  }

  IraDash() {
    this.router.navigate(['/dashboard'])
  }

  public loguear() {
    let resp = this.authService.login(this.username, this.password);
    resp.subscribe(data => {
        console.log(data)
    })
  }
}
