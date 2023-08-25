import { Component } from '@angular/core';
import { Course } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CourseService } from 'src/app/core/services/course.service';
import { Enrollment } from '../../../enrollment/models';
import { EnrollmentsService } from 'src/app/core/services/enrollments.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {

  public course : Course | undefined = undefined;
  public courseId?:number;

  displayedColumns= ['name','surname','actions'];
  enrollments: Enrollment[]=[];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private notification: NotifierService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentsService) {

    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'courses']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`);
    }else{
      this.courseId= Number(this.activatedRoute.snapshot.params['id']);
      this.loadUser();
      this.loadEnrollments();
    }
  }

  loadUser(): void {
    if(this.courseId){
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course)=> {
          this.course= course;
        }
        
      })
    }
  }

  loadEnrollments(): void {
    if(this.courseId){
      this.enrollmentService.getEnrolmentsByCourseId(this.courseId).subscribe({
        next: (enrollments)=> {
          this.enrollments= enrollments;
        }
        
      })
    }
  }

  OnDeleteStudentFromEnrollment(enrollmentToDelete: Enrollment): void{

    if(confirm(`Se eliminara la inscription`)){
      this.enrollmentService.deleteEnrollmentById(enrollmentToDelete);
      this.loadEnrollments();
    }
    
  }
}
