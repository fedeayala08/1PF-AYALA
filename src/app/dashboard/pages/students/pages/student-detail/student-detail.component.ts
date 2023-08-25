import { Component } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentService } from 'src/app/core/services/student.service';
import { Course } from '../../../courses/models';
import { CourseService } from 'src/app/core/services/course.service';
import { Enrollment } from '../../../enrollment/models';
import { EnrollmentsService } from 'src/app/core/services/enrollments.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent {

  public student : Student | undefined = undefined;
  public studentId?:number;

  displayedColumns= ['id','title','description','actions'];
  enrollments: Enrollment[]=[];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private notification: NotifierService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentsService) {
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'students']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`);
    }else{
      this.studentId= Number(this.activatedRoute.snapshot.params['id']);
      this.loadStudent();
      this.loadEnrollments();
    }
  }

  loadStudent(): void {
    if(this.studentId){
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (student)=> {
          this.student= student;
        }
        
      })
    }
  }

  loadEnrollments(): void {
    if(this.studentId){
      this.enrollmentService.getEnrolmentsByStudentId(this.studentId).subscribe({
        next: (enrollments)=> {
          this.enrollments= enrollments;
        }
        
      })
    }
  }

  OnDeleteCourseFormEnrollment(enrollmentToDelete: Enrollment): void{

    if(confirm(`Se eliminara la inscription`)){
      this.enrollmentService.deleteStudentById(enrollmentToDelete);
      this.loadEnrollments();
    }
    
  }
}
