import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../students/models';
import { StudentService } from 'src/app/core/services/student.service';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  public students: number = 0 ;
  public courses: number = 0 ;

  constructor(private studentService: StudentService,
              private courseService: CourseService){

    this.studentService.getStudents().subscribe({
      next: (s)=> {
        this.students= s.length;
      }
    });

    this.courseService.getCourse().subscribe({
      next: (c)=> {
        this.courses= c.length;
      }
    });

  }


}
