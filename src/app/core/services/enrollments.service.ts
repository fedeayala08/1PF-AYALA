import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from 'src/app/dashboard/pages/enrollment/models';
import { environment } from 'src/environments/environment';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(private httpClient: HttpClient,private notifier: NotifierService) { }

  getEnrolmentsByStudentId(studentId: number): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(environment.baseApiUrl + `/enrollments?_expand=course&studentId=${studentId}`)
  }

  getEnrolmentsByCourseId(courseId: number): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(environment.baseApiUrl + `/enrollments?_expand=student&courseId=${courseId}`)
  }

  deleteEnrollmentById(enrollment:Enrollment): void{
    this.httpClient.delete(environment.baseApiUrl + '/enrollments/' + enrollment.id).subscribe({
      next: () => {
      this.notifier.showSuccess('Inscripcion eliminada');
      }
    })
  }

  
}
