import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HomeModule } from './pages/home/home.module'; 
import { StudentsModule } from './pages/students/students.module';
import { MatListModule} from '@angular/material/list';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { CoursesModule } from './pages/courses/courses.module';
import { UsersModule } from './pages/users/users.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EnrollmentModule } from './pages/enrollment/enrollment.module';
 

@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HomeModule,
    EnrollmentModule,
    StudentsModule,
    CoursesModule,
    MatListModule,
    UsersModule, 
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
