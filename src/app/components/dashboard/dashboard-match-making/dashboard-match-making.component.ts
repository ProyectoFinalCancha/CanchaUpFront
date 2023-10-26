import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-match-making',
  templateUrl: './dashboard-match-making.component.html',
  styleUrls: ['./dashboard-match-making.component.css']
})
export class DashboardMatchMakingComponent {
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

volver(){
  this.router.navigate(['/dashboard'])
}
}
