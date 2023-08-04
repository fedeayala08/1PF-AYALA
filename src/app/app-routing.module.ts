import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { StudentDetailComponent } from './dashboard/pages/students/pages/student-detail/student-detail.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { CourseDetailComponent } from './dashboard/pages/courses/pages/course-detail/course-detail.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { UserDetailComponent } from './dashboard/pages/users/pages/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent, 
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
