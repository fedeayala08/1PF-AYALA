import { Component } from '@angular/core';
import { Course } from './models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  public courses: Observable<Course[]> ;

  constructor(private matDialog: MatDialog,
    private courseService : CourseService
  ){
    this.courseService.loadCourse();
    this.courses= this.courseService.getCourse();

  }

  
  onCreateCourse(): void {
    // this.matDialog
    //   .open(StudentsFormDialogComponent)
    //   .afterClosed()
    //   .subscribe({
    //     next: (v) => {
    //       if (v) {
    //         this.studentService.createStudent({
    //           name: v.name,
    //           surname:v.surname,
    //           gender: v.gender,
    //           email:v.email,
    //           country:v.country
    //         });
    //       }
    //     },
    //   });
  }

  OnDeleteCourse(courseToDelete: Course): void{

    // if(confirm(`Se eliminara el usuario ${studentToDelete.name} ${studentToDelete.surname }`)){
    //   this.studentService.deleteStudentById(studentToDelete.id);
    // }
  }

  OnEditCourse(courseToEdit: Course): void{
  //  this.matDialog
  //  .open(StudentsFormDialogComponent,{
  //   data: studentToEdit
  //  })
  //  .afterClosed()
  //  .subscribe({
  //   next: (studentUpdated)=> {
  //     if(studentUpdated){
  //       this.studentService.updateStudentById(studentToEdit.id,studentUpdated);
  //      }
  //     },
  //   });
  }
}
