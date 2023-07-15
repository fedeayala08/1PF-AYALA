import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsFormDialogComponent } from './components/students-form-dialog/students-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsFormDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    StudentsComponent
  ]
})
export class StudentsModule {

 
 }
