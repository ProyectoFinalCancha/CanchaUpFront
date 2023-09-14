import { CanActivateFn } from '@angular/router';

export const validarUsuarioGuard: CanActivateFn = (route, state) => {
  return true;
};
