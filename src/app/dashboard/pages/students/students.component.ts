import { Component } from '@angular/core';
import { StudentsFormDialogComponent } from './components/students-form-dialog/students-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models';
import { Observable, Subject } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  public students: Observable<Student[]> ;
  public destroyed= new Subject<boolean>();
  public loading= false;

  constructor(private matDialog: MatDialog,
              private studentService: StudentService) {
    this.studentService.loadStudent();
    this.students= this.studentService.getStudents();
  }

  // ngOnDestroy(): void {
  //   this.destroyed.next(true);
  // }

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

    if(confirm(`Se eliminara el usuario ${studentToDelete.name} ${studentToDelete.surname }`)){
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
