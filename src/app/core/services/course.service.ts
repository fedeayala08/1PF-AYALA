import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, take } from 'rxjs';
import { Course, CourseCreation, CoursetEdition } from 'src/app/dashboard/pages/courses/models';
import { NotifierService } from './notifier.service';

const COURSE_DB : Observable<Course[]> = of( [
  {
    id:1,
    title: 'Curso Java',
    description: 'Java basico',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id:2,
    title: 'Curso .NET',
    description: 'Net basico',
    startDate: new Date(),
    endDate: new Date(),
  },

]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _course$= new BehaviorSubject<Course[]>([]);
  private course$= this._course$.asObservable();
  private maxValue$: number=0;

  constructor(private notifier: NotifierService) { }

  loadCourse(): void{
    COURSE_DB.subscribe({
      next:(courseFromDB)=> this._course$.next(courseFromDB),
    });
  }
  
  getCourse(): Observable<Course[]>{
    return this._course$;
  }
  
  getMaxID(): void {
    this.course$.pipe(
      map(items => items.map(item => item.id)), 
      map(ids => Math.max(...ids)), 
    ).subscribe(value =>{this.maxValue$ = value});
  }

  getCourseById(id: number): Observable<Course | undefined> {
    
     return this.course$.pipe(
      map((courses)=> courses.find((s)=>s.id===id)),
       take(1)
       )
   }

  createCourse(course : CourseCreation): void{
    this.getMaxID();
    this.course$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._course$.next([
          ...arrayActual, {...course,id: this.maxValue$ +1 } ,
        ]);
        this.notifier.showSuccess('Curso creado');
      },
    });
  }

  updateCourseById( id: number, studentUpdated : CoursetEdition):void{
    this._course$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._course$.next(
          arrayActual.map((c)=>
          c.id===id? {...c, ...studentUpdated} :c
          )
        );
        this.notifier.showSuccess('Curso actualizado');
      },
    });

  } 

  deleteStudentById(id:number): void{
    this._course$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._course$.next(arrayActual.filter((s)=> s.id!== id));
        this.notifier.showSuccess('Curso eliminado');
      },
    });
  }
}
