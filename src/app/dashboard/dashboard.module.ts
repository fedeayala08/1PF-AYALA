import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HomeModule } from './pages/home/home.module'; 
import { StudentsModule } from './pages/students/students.module';
import {MatListModule} from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';
 

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HomeModule,
    StudentsModule,
    MatListModule,
    AppRoutingModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
