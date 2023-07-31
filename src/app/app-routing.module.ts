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
    children: [
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'students',
          children: [
            {
              path: '',
              component: StudentsComponent,
              data: {

              }
            },
            {
              path: ':id',
              component: StudentDetailComponent
            }
          ]

        },
        {
          path: 'courses',
          children :[
            {
              path:'' ,
              component: CoursesComponent,
              data:{}
            },
            {
              path: ':id',
              component:CourseDetailComponent
            }
          ]
        },
        {
          path: 'users',
        
          children :[
            {
              path:'' ,
              component: UsersComponent,
              data:{}
            },
            {
              path: ':id',
              component:UserDetailComponent
            }
          ]
        },
        {
          path: '**',
          redirectTo: 'home',
        }
     ] ,    
  },
  {
    path: 'auth',
    component: AuthComponent,
    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
