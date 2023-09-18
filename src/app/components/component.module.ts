import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistoComponent } from './registo/registo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';


import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';

@NgModule({
  declarations: [RegistoComponent,
  DashboardComponent, LoginComponent,
SidenavComponent,
VerJugadoresComponent],
  imports: [
    CommonModule,
    SidebarModule,
ButtonModule
    
  ]
})
export class ComponentModule { }
