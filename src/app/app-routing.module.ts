import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistoComponent } from './components/registo/registo.component';
import { VerJugadoresComponent } from './components/ver-jugadores/ver-jugadores.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { EncargadoComponent } from './components/encargado/encargado.component';
import { PopupComponent } from './components/popup/popup.component';
import { DashboardMatchMakingComponent } from './components/dashboard/dashboard-match-making/dashboard-match-making.component';

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
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'registro',
    component: RegistoComponent
  },

  {
    path: 'verJugadores',
    component: VerJugadoresComponent
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
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
