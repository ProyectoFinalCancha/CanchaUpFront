import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent {
  constructor(private router:Router){

  }


  IraDash() {
    this.router.navigate(['/login'])
  }
}
