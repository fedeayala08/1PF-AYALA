import { Component } from '@angular/core';
import { StudentsFormDialogComponent } from './components/students-form-dialog/students-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';
import { Store } from '@ngrx/store';
import { selectIfAuthUserRoleIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  public students: Observable<Student[]> ;
  public loading= false;
  public isAdmin$ :  Observable<boolean> ;

  constructor(private matDialog: MatDialog,
              private studentService: StudentService,
              private store: Store) {
    this.studentService.loadStudents();
    this.students= this.studentService.getStudents();
    this.isAdmin$= this.store.select(selectIfAuthUserRoleIsAdmin);
  }

  onCreateStudent(): void {
    this.matDialog
      .open(StudentsFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.studentService.createStudent({
              name: v.name,
              surname:v.surname,
              gender: v.gender,
              email:v.email,
              country:v.country
            });
          }
        },
      });
  }

  OnDeleteStudent(studentToDelete: Student): void{

    if(confirm(`Se eliminara el alumno ${studentToDelete.name} ${studentToDelete.surname }`)){
      this.studentService.deleteStudentById(studentToDelete.id);
    }
  }

  OnEditStudent(studentToEdit: Student): void{
   this.matDialog
   .open(StudentsFormDialogComponent,{
    data: studentToEdit
   })
   .afterClosed()
   .subscribe({
    next: (studentUpdated)=> {
      if(studentUpdated){
        this.studentService.updateStudentById(studentToEdit.id,studentUpdated);
       }
      },
    });
  }

}
