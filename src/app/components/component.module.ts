import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistoComponent } from './registo/registo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { ReactiveFormsModule } from '@angular/forms';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { PartidosComponent } from './partidos/partidos.component';


@NgModule({
  declarations: [
    RegistoComponent,
    DashboardComponent,
    LoginComponent,
    SidenavComponent,
    VerJugadoresComponent,
    PartidosComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule

  ],
  exports: [
    VerJugadoresComponent
  ]
})
export class ComponentModule { }
