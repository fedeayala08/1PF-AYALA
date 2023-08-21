import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from '../core/guards/admin.guard';

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
          canActivate: [adminGuard],
          loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
        },
        {
          path: 'subjects',
          loadChildren: () => import('./pages/subjects/subjects.module').then((m) => m.SubjectsModule),
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