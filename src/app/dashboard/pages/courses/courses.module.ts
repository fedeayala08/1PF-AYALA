import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoursesFormDialogComponent } from './components/courses-form-dialog/courses-form-dialog.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { CoursesRoutingModule } from './courses-routing.module';



@NgModule({
  declarations: [
    CoursesComponent, CoursesTableComponent, CoursesFormDialogComponent, CourseDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    CoursesComponent,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
