import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistoComponent } from './registo/registo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';

import { SidebarModule } from 'primeng/sidebar';


import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { PartidosComponent } from './partidos/partidos.component';
import { EncargadoComponent } from './encargado/encargado.component';

import {MatSidenavModule} from '@angular/material/sidenav'; 
import { CardModule } from 'primeng/card';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardMatchMakingComponent } from './dashboard/dashboard-match-making/dashboard-match-making.component';

import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select'; 

import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { MatDialogModule } from '@angular/material/dialog';
import { PopupDialogComponent } from './popup/popup-dialog/popup-dialog.component';
import { LoginEncargadoComponent } from './login-encargado/login-encargado.component'; // Importa MatDialogModule
import { EncargadoService } from '../services/encargado.service';
import { VerEncargadoComponent } from './encargado/ver-encargado/ver-encargado.component';

import { MatTableModule } from '@angular/material/table';
import { SolicitudEquipoComponent } from './solicitudes/solicitud-equipo/solicitud-equipo.component';
import { SolicitudComponent } from './solicitudes/solicitud/solicitud.component';
import { EquipoComponent } from './equipo/equipo.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { VerJugadoresComponent } from './jugadores/ver-jugadores/ver-jugadores.component';


@NgModule({
  declarations: [
    RegistoComponent,
    DashboardComponent,
    LoginComponent,
   
    VerJugadoresComponent,
    PartidosComponent,
     EncargadoComponent,
    DashboardAdminComponent,
    DashboardMatchMakingComponent,
    // PopupComponent,
    PopupDialogComponent,
    LoginEncargadoComponent,
    VerEncargadoComponent,
    SolicitudEquipoComponent,
    SolicitudComponent,
    EquipoComponent,
    
    
  

    JugadoresComponent,
    
  
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    CardModule,
    MatDialogModule,
    MatSelectModule,
    TabMenuModule,
    TieredMenuModule,
    MatPaginatorModule,
    MatTableModule,
   
  ],
  exports: [
    VerJugadoresComponent,
    EquipoComponent,
    PartidosComponent,
    DropdownModule
    // PopupComponent
  ],
  providers: [MatPaginator,  PageEvent, EncargadoService],
  bootstrap: [ComponentModule]
})
export class ComponentModule { }
