import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated) {
      return true; // Usuario autenticado, permite el acceso a la ruta
    } else {
      // Usuario no autenticado, redirige a la URL de inicio de sesión
      return this.router.parseUrl('/login');
    }
  }
}

