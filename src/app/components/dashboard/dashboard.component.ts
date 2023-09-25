import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
constructor(private router:Router){

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

irAPopup(){
  this.router.navigate(['/popup'])
}
}
