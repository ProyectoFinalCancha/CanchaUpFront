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
import { EncargadoComponent } from './encargado/encargado.component';

import {MatSidenavModule} from '@angular/material/sidenav'; 
import { CardModule } from 'primeng/card';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardMatchMakingComponent } from './dashboard/dashboard-match-making/dashboard-match-making.component';
import { PopupComponent } from './popup/popup.component';




import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import {NgIf} from '@angular/common';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDialogModule } from '@angular/material/dialog';
import { PopupDialogComponent } from './popup/popup-dialog/popup-dialog.component'; // Importa MatDialogModule

@NgModule({
  declarations: [
    RegistoComponent,
    DashboardComponent,
    LoginComponent,
    SidenavComponent,
    VerJugadoresComponent,
    PartidosComponent,
    EncargadoComponent,
    DashboardAdminComponent,
    DashboardMatchMakingComponent,
    PopupComponent,
    PopupDialogComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    CardModule,
    MatDialogModule
  ],
  exports: [
    VerJugadoresComponent,
    PartidosComponent,
    PopupComponent
  ],
  
})
export class ComponentModule { }
