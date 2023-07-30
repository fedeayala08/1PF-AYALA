import { Component } from '@angular/core';
import { Course } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {

  public course : Course | undefined = undefined;
  public courseId?:number;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private notification: NotifierService,
    private courseService: CourseService) {
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'courses']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`);
    }else{
      this.courseId= Number(this.activatedRoute.snapshot.params['id']);
      this.loadUser();
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
}
