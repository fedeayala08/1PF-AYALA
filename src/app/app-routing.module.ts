import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'students',
          component: StudentsComponent
        }
     ] ,    
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: '/auth'
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
