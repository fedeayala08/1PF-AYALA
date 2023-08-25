import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { CreateEnrollmentPayload, Enrollment, EnrollmentWithStudentAndCourse } from '../models';
import { environment } from 'src/environments/environment';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';


@Injectable()
export class EnrollmentEffects {

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
     
        this.getEnrollmentFromDB().pipe(
          map(data => EnrollmentActions.loadEnrollmentsSuccess({ data })),
          catchError(error => of(EnrollmentActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.loadCoursesOptions),
      concatMap(() =>
     
        this.getCoursesOptions().pipe(
          map(data => EnrollmentActions.loadCoursesOptionsSuccess({ data })),
          catchError(error => of(EnrollmentActions.loadCoursesOptionsFailure({ error }))))
      )
    );
  });

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.loadStudentsOptions),
      concatMap(() =>
     
        this.getStudentsOptions().pipe(
          map(data => EnrollmentActions.loadStudentsOptionsSuccess({ data })),
          catchError(error => of(EnrollmentActions.loadStudentsOptionsFailure({ error }))))
      )
    );
  });

  createEnrollment$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) =>
     
        this.createEnrollment(action.payload).pipe(
          map(data => EnrollmentActions.createEnrollmentSuccess({ data })),
          catchError(error => of(EnrollmentActions.createEnrollmentFailure({ error }))))
      )
    );
  });

  createEnrollmentSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.createEnrollmentSuccess),
      map(()=> this.store.dispatch(EnrollmentActions.loadEnrollments()))
      
    );
  }, {dispatch: false});

  
  deleteEnrollment$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.deleteEnrollment),
      concatMap((action) =>
     
        this.deleteEnrollment(action.payload).pipe(
          map(data => EnrollmentActions.deleteEnrollmentSuccess({ data })),
          catchError(error => of(EnrollmentActions.deleteEnrollmentFailure({ error }))))
      )
    );
  });

  deleteEnrollmentSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.deleteEnrollmentSuccess),
      map(()=> this.store.dispatch(EnrollmentActions.loadEnrollments()))
      
    );
  }, {dispatch: false});


  constructor(private actions$: Actions, private httpClient: HttpClient, private store : Store) {}

  private getEnrollmentFromDB(): Observable<EnrollmentWithStudentAndCourse[]>{
    return this.httpClient.get<EnrollmentWithStudentAndCourse[]>(environment.baseApiUrl + '/enrollments?_expand=course&_expand=student' );
  } 

  private getStudentsOptions(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students' );
  }

  private getCoursesOptions(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses' );
  }

  private createEnrollment(payload: CreateEnrollmentPayload): Observable<Enrollment>{
    return this.httpClient.post<Enrollment>(environment.baseApiUrl + '/enrollments', payload );
  }

  private deleteEnrollment(payload: number): Observable<Enrollment>{
    return this.httpClient.delete<Enrollment>(environment.baseApiUrl + '/enrollments/'+ payload );
  }

}
