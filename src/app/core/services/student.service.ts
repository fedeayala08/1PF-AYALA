import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, mergeMap, of, take } from 'rxjs';
import { Student, StudentCreation, StudentEdition } from 'src/app/dashboard/pages/students/models';
import { NotifierService } from './notifier.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _student$= new BehaviorSubject<Student[]>([]);
  private student$= this._student$.asObservable();

  constructor(private notifier: NotifierService,
    private httpClient : HttpClient) { }

  loadStudents(): void{
     this.httpClient.get<Student[]>("http://localhost:3000/students").subscribe({
      next: (response)=> this._student$.next(response),
      error: () => {
        this.notifier.showError('Error al cargar los alumnos');
      },
      complete:() => {
      }
     })
  }
  
  getStudents(): Observable<Student[]>{
    return this._student$;
  }

  getStudentById(id: number): Observable<Student | undefined> {
    
    return this.student$.pipe(
      map((students)=> students.find((s)=>s.id===id)),
      take(1)
      )
  }

  createStudent(payLoad : StudentCreation): void{
    
    this.httpClient.post<Student>('http://localhost:3000/students',payLoad).pipe(
      mergeMap((studentCreated) => this.student$.pipe(
        take(1),
        map(
          (arrayActual) => [...arrayActual, studentCreated])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._student$.next(arrayActualizado);
        this.notifier.showSuccess('Alumno creado');
      }
    }) 
   
  }

  updateStudentById( id: number, studentUpdated : StudentEdition):void{
 
    this.httpClient.put('http://localhost:3000/students/' + id, studentUpdated).subscribe({
      next: () => {this.loadStudents();
      this.notifier.showSuccess('Alumno actualizado');
      }
    })

  } 

  deleteStudentById(id:number): void{
    this.httpClient.delete('http://localhost:3000/students/' + id).subscribe({
      next: () => {this.loadStudents();
      this.notifier.showSuccess('Alumno eliminado');
      }
    })
  }

  }

