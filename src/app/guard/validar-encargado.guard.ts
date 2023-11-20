import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/shared/auth.service';
import { Observable, map } from 'rxjs';
import { LoginEncargadoService } from '../services/login-encargado.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarEncargadoGuard implements CanActivate {

  constructor(private encargadoLoginService: LoginEncargadoService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.encargadoLoginService.usuarioEncargadoEstaAutenticado(this.encargadoLoginService.telefono, this.encargadoLoginService.password).pipe(
      map(response => {
        if (response && response.result && response.result.value) {
          // El encargado está autenticado, permite el acceso al dashboard de encargado
          return true;
        } else {
          // El encargado no está autenticado, redirige al componente de login de encargado
          this.router.navigate(['/login-encargado']);
          return false;
        }
      })
    );
  }
}

