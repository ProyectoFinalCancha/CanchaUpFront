import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  sidebarVisible: boolean = false;
constructor(private router:Router){

}


salir(){
  this.router.navigate(['/login']);
}
}
