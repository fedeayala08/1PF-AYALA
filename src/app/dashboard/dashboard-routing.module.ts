import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentDetailComponent } from './pages/students/pages/student-detail/student-detail.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseDetailComponent } from './pages/courses/pages/course-detail/course-detail.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailComponent } from './pages/users/pages/user-detail/user-detail.component';


@NgModule({
    imports: [
      RouterModule.forChild([
        {
          path: 'home',
          component: HomeComponent,
        },
       
        {
          path: 'courses',
          loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
        },
        {
          path: 'students',
          loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
        },
        {
          path: 'users',
          loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
        },
        {
          path: '**',
          redirectTo: 'home',
        },
      ]),
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule{}