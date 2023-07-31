import { Component } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent {

  public student : Student | undefined = undefined;
  public studentId?:number;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private notification: NotifierService,
    private studentService: StudentService) {
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'students']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`);
    }else{
      this.studentId= Number(this.activatedRoute.snapshot.params['id']);
      this.loadStudent();
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
}
