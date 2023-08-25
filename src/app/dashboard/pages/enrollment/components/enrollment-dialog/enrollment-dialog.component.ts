import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from '../../store/enrollment.actions';
import { Student } from '../../../students/models';
import { Observable } from 'rxjs';
import { selectCoursesOptions, selectStudentsOptions } from '../../store/enrollment.selectors';
import { Course } from '../../../courses/models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html'
})
export class EnrollmentDialogComponent implements OnInit {

  courseIdControl= new FormControl(null, Validators.required);
  studentIdControl= new FormControl(null, Validators.required);

  enrollmentForm= new FormGroup({
    courseId: this.courseIdControl,
    studentId: this.studentIdControl
  });

  studentOptions$ : Observable<Student[]>;
  courseOptions$: Observable<Course[]>;

  constructor( private store:Store,
               private notifier : NotifierService,
               private matDialogRef : MatDialogRef<EnrollmentDialogComponent>){
    this.studentOptions$ = this.store.select(selectStudentsOptions);
    this.courseOptions$= this.store.select(selectCoursesOptions);
  }
 
  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadCoursesOptions());
    this.store.dispatch(EnrollmentActions.loadStudentsOptions());
  }

  onSubmit(): void{
    if(this.enrollmentForm.invalid){
      this.enrollmentForm.markAllAsTouched();
    }else{
      this.store.dispatch(EnrollmentActions.createEnrollment({payload : this.enrollmentForm.getRawValue()}));
      this.matDialogRef.close();
      this.notifier.showSuccess('Inscripcion creada');
    }

  }

}
