import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { MatDialog } from '@angular/material/dialog';
import { PopupService } from 'src/app/services/popup.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  sidebarVisible1: boolean = false;
  sidebarVisible2: boolean = false;
  sidebarVisible3: boolean = false;

  

  cursorStyle: string = 'default';
constructor(private router:Router,
  public popupService:PopupService){
   
}
cambiarCursor(puntero: boolean) {
  this.cursorStyle = puntero ? 'pointer' : 'default';
}

salir(){
  this.router.navigate(['/login']);
}
irAMatch(){
  this.router.navigate(['/match'])
}
abrirPopup(){

  this.sidebarVisible2 = true
}

cerrarSesion(){
  this.router.navigateByUrl('/login')
}
abrirPopupDesdeDashboard(): void {
  // Llama al método del servicio para abrir el popup
  const fechaActual = new Date();
  this.popupService.abrirPopup('', fechaActual, '');
}
}
