import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegistoComponent } from './components/registo/registo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';




import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';



import {MatSidenavModule} from '@angular/material/sidenav'; 


import {HttpClientModule} from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ComponentModule } from './components/component.module';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegistoComponent,
    // DashboardComponent,
    // SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    ButtonModule,
    SidebarModule,

    ComponentModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
