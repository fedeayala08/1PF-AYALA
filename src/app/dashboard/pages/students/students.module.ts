import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsFormDialogComponent } from './components/students-form-dialog/students-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsFormDialogComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    StudentsComponent,
    StudentsRoutingModule
  ]
})
export class StudentsModule {

 
 }
