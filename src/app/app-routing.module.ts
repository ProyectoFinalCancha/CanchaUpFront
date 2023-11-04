import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistoComponent } from './components/registo/registo.component';

import { PartidosComponent } from './components/partidos/partidos.component';
import { EncargadoComponent } from './components/encargado/encargado.component';
// import { PopupComponent } from './components/popup/popup.component';
import { DashboardMatchMakingComponent } from './components/dashboard/dashboard-match-making/dashboard-match-making.component';
import { PopupDialogComponent } from './components/popup/popup-dialog/popup-dialog.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';

import { LoginEncargadoComponent } from './components/login-encargado/login-encargado.component';
import { AuthGuard } from './guard/Auth.guard'; // Cambiar a 'Auth.guard' a 'Auth.guard' en la importación
import { SolicitudEquipoComponent } from './components/solicitudes/solicitud-equipo/solicitud-equipo.component';
import { SolicitudComponent } from './components/solicitudes/solicitud/solicitud.component';
import { EquipoComponent } from './components/equipo/equipo.component';

import { VerEncargadoComponent } from './components/encargado/ver-encargado/ver-encargado.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { VerJugadoresComponent } from './components/jugadores/ver-jugadores/ver-jugadores.component';


const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'loginEncargado',
    component:LoginEncargadoComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent 
  },
  {
    path:'solicitudes',
    component:SolicitudComponent
  },
  {
    path:'solicitudes-equipo',
    component:SolicitudEquipoComponent
  },
  {
    path: 'registro',
    component: RegistoComponent
  },

  {
    path: 'jugadores',
    component: JugadoresComponent
  },
  {
    //////////////////////////POPUP DE JUGADORES
    path:'verJugadores',
    component:VerJugadoresComponent
  },
  {
    path: 'partidos',
    component: PartidosComponent
  },
  {
    path:'match',
    component:DashboardMatchMakingComponent
  },
  {
    path: 'encargados',
    component: EncargadoComponent
  },
  {
    ////////////////POPUP DE ENCARGADO 
    path:'verEncargados',
    component:VerEncargadoComponent
  },
  {
    //////POPUP DEL DASHBOARD DE USUARIO 
    path:'popup',
    component:PopupDialogComponent
  },
  {
    path:'adminDash',
    component:DashboardAdminComponent,
    // canActivate: [AuthGuard]
  },
  {
    path:'equipos',
    component:EquipoComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
