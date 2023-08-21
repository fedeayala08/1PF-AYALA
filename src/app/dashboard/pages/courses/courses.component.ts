import { Component } from '@angular/core';
import { Course } from './models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/core/services/course.service';
import { CoursesFormDialogComponent } from './components/courses-form-dialog/courses-form-dialog.component';
import { Store } from '@ngrx/store';
import { selectIfAuthUserRoleIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  public courses: Observable<Course[]> ;
  public isAdmin$ :  Observable<boolean> ;

  constructor(private matDialog: MatDialog,
    private courseService : CourseService,
    private store: Store
  ){
    this.courseService.loadCourses();
    this.courses= this.courseService.getCourse();
    this.isAdmin$= this.store.select(selectIfAuthUserRoleIsAdmin);
  }

  
  onCreateCourse(): void {
    this.matDialog
      .open(CoursesFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (c) => {
          if (c) {
            this.courseService.createCourse({
              title: c.title,
              description: c.description,
              subjectId: c.subjectId,
              startDate: c.startDate,
              endDate: c.endDate
            });
          }
        },
      });
  }

  OnDeleteCourse(courseToDelete: Course): void{

    if(confirm(`Se eliminara el curso ${courseToDelete.title}`)){
      this.courseService.deleteStudentById(courseToDelete.id);
    }
  }

  OnEditCourse(courseToEdit: Course): void{
   this.matDialog
   .open(CoursesFormDialogComponent,{
    data: courseToEdit
   })
   .afterClosed()
   .subscribe({
    next: (courseUpdated)=> {
      if(courseUpdated){
        this.courseService.updateCourseById(courseToEdit.id,courseUpdated);
       }
      },
    });
  }
}
