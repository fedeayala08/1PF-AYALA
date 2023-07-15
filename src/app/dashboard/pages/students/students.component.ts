import { Component } from '@angular/core';
import { StudentsFormDialogComponent } from './components/students-form-dialog/students-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models';
import { ShowFullNamePipe } from 'src/app/shared/pipes/show-full-name.pipe';

const ELEMENT_DATA: Student[] = [
  {
    id:1,
    name: 'Fede',
    surname: 'Ayala',
    email: 'fedeayala08@hotmail.com',
    gender:'M',
    country: 'Argentina',
  },
  {
    id:2,
    name: 'Maria',
    surname: 'Carrillo',
    email: 'jca@gmail.com',
    gender:'F',
    country: 'Venezuela',
  },
];


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  public students: Student[] = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {}

  onCreateStudent(): void {
    this.matDialog
      // ABRO EL MODAL
      .open(StudentsFormDialogComponent)
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (v) => {
          if (v) {       
            this.students = [
              ...this.students,
              {
                id: this.students.length + 1,
                name: v.name,
                surname: v.surname,
                email: v.email,
                gender: v.gender,
                country: v.country
              },
            ];
            console.log('RECIBIMOS EL VALOR: ', v);
          } else {
            console.log('SE CANCELO');
          }
        },
      });
  }

  OnDeleteStudent(studentToDelete: Student): void{

    if(confirm(`Se eliminara el usuario ${studentToDelete.name} ${studentToDelete.surname }`)){
      this.students= this.students.filter(s=> s.id !== studentToDelete.id);
    }
  }

  OnEditStudent(studentToEdit: Student): void{
   this.matDialog
   // ABRO EL MODAL
   .open(StudentsFormDialogComponent,{
    data: studentToEdit
   })
   // AL CERRAR , ACTUALIZO EL USUARIO
   .afterClosed()
   .subscribe({
    next: (studentUpdated)=>{
      if(studentUpdated){
        this.students= this.students.map((student)=>{
          return student.id===studentToEdit.id
          ? {...student, ...studentUpdated} //true
          : student //false
        })
      }
    }}
   )
   
  }

}
