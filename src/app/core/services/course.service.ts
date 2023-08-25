import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  map,  mergeMap,  take } from 'rxjs';
import { Course, CourseCreation,  CoursetEdition } from 'src/app/dashboard/pages/courses/models';
import { NotifierService } from './notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Enrollment } from 'src/app/dashboard/pages/enrollment/models';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$= new BehaviorSubject<Course[]>([]);
  private courses$= this._courses$.asObservable();

  constructor(private notifier: NotifierService,
    private httpClient: HttpClient) { }

  loadCourses(): void{
    this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses?_expand=subject').subscribe({
      next: (courses) => this._courses$.next(courses)
    })
  }
  
  getCourse(): Observable<Course[]>{
    return this._courses$;
  }

  getCourseById(id: number): Observable<Course | undefined> {
    
     return this.courses$.pipe(
      map((courses)=> courses.find((s)=>s.id===id)),
       take(1)
       )
   }

   getCoursesBySubjectId(subjectId: number): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + `/courses?subjectId=${subjectId}`)
  }

  

  createCourse(payLoad : CourseCreation): void{
    this.httpClient.post<Course>(environment.baseApiUrl + '/courses',payLoad).pipe(
      mergeMap((courseCreated) => this.courses$.pipe(
        take(1),
        map(
          (arrayActual) => [...arrayActual, courseCreated])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._courses$.next(arrayActualizado);
        this.notifier.showSuccess('Curso creado');
      }
    }) 
  }

  updateCourseById( id: number, courseUpdated : CoursetEdition):void{
    this.httpClient.put(environment.baseApiUrl + '/courses/' + id, courseUpdated).subscribe({
      next: () => {this.loadCourses();
      this.notifier.showSuccess('Curso actualizado');
      }
    })
  } 

  deleteStudentById(id:number): void{
    this.httpClient.delete(environment.baseApiUrl + '/courses/' + id).subscribe({
      next: () => {this.loadCourses();
      this.notifier.showSuccess('Curso eliminado');
      }
    })
  }
}
