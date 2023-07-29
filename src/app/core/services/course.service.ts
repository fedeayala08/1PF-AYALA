import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, take } from 'rxjs';
import { Course } from 'src/app/dashboard/pages/courses/models';
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
      map(items => items.map(item => item.id)), // Obtener un array con los IDs
      map(ids => Math.max(...ids)), // Encontrar el máximo ID
    ).subscribe(value =>{ this.maxValue$ = value});
  }

  getStudentById(id: number): Observable<Course | undefined> {
    
     return this.course$.pipe(
      map((courses)=> courses.find((s)=>s.id===id)),
       take(1)
       )
   }

  // createStudent(student : StudentCreation): void{
  //   this.getMaxID();
  //   this.student$.pipe(take(1)).subscribe({
  //     next: (arrayActual)=>{
  //       this._student$.next([
  //         ...arrayActual, {...student,id: this.maxValue$ +1 } ,
  //       ]);
  //       this.notifier.showSuccess('Alumno creado');
  //     },
  //   });
  // }

  // updateStudentById( id: number, studentUpdated : StudentEdition):void{
  //   this._student$.pipe(take(1)).subscribe({
  //     next: (arrayActual)=>{
  //       this._student$.next(
  //         arrayActual.map((s)=>
  //         s.id===id? {...s, ...studentUpdated} :s
  //         )
  //       );
  //       this.notifier.showSuccess('Alumno actualizado');
  //     },
  //   });

  // } 

  // deleteStudentById(id:number): void{
  //   this._student$.pipe(take(1)).subscribe({
  //     next: (arrayActual)=>{
  //       this._student$.next(arrayActual.filter((s)=> s.id!== id));
  //       this.notifier.showSuccess('Alumno eliminado');
  //     },
  //   });
  // }
}
