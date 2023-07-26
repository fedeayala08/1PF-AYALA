import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, take } from 'rxjs';
import { Student, StudentCreation, StudentEdition } from 'src/app/dashboard/pages/students/models';
import { NotifierService } from './notifier.service';

const STUDENT_DB : Observable<Student[]> = of( [
  {
    id:1,
    name: 'Fede',
    surname: 'Ayala',
    email: 'fedeayala08@hotmail.com',
    gender:'M',
    country: 'Argentina',
  },
  {
    id:2,
    name: 'Maria',
    surname: 'Carrillo',
    email: 'jca@gmail.com',
    gender:'F',
    country: 'Venezuela',
  },

]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _student$= new BehaviorSubject<Student[]>([]);
  private student$= this._student$.asObservable();
  private maxValue$: number=0;

  constructor(private notifier: NotifierService) { }

  loadStudent(): void{
    STUDENT_DB.subscribe({
      next:(studentsFromDB)=> this._student$.next(studentsFromDB),
    });
  }
  
  getStudents(): Observable<Student[]>{
    return this._student$;
  }

  getMaxID(): void {
    this.student$.pipe(
      map(items => items.map(item => item.id)), // Obtener un array con los IDs
      map(ids => Math.max(...ids)), // Encontrar el máximo ID
    ).subscribe(value =>{ this.maxValue$ = value});
  }

  createStudent(student : StudentCreation): void{
    this.getMaxID();
    this.student$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._student$.next([
          ...arrayActual, {...student,id: this.maxValue$ +1 } ,
        ]);
        this.notifier.showSuccess('Alumno creado');
      },
    });
  }

  updateStudentById( id: number, studentUpdated : StudentEdition):void{
    this._student$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._student$.next(
          arrayActual.map((s)=>
          s.id===id? {...s, ...studentUpdated} :s
          )
        );
        this.notifier.showSuccess('Alumno actualizado');
      },
    });

  } 

  deleteStudentById(id:number): void{
    this._student$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._student$.next(arrayActual.filter((s)=> s.id!== id));
        this.notifier.showSuccess('Alumno eliminado');
      },
    });
  }
  }

