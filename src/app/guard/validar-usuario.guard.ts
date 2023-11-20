import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarUsuarioGuard implements CanActivate {

 

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.usuarioEstaAutenticado(this.loginService.telefono, this.loginService.password).pipe(
      map(response => {
        if (response && response.result && response.result.value) {
          // El usuario está autenticado, permite el acceso al dashboard
          return true;
        } else {
          // El usuario no está autenticado, redirige al componente de login
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}