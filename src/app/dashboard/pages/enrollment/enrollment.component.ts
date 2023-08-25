import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enrollment, EnrollmentWithStudentAndCourse } from './models';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { EnrollmentActions } from './store/enrollment.actions';
import { selectEnrollments } from './store/enrollment.selectors';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
})
export class EnrollmentComponent implements OnInit {
  displayedColumns = ['id', 'student', 'course', 'courseDescription','actions'];
  enrollments$: Observable<EnrollmentWithStudentAndCourse[]>;

  constructor(private store: Store, private matDialog: MatDialog, private notifier: NotifierService) {
    this.enrollments$ = this.store.select(selectEnrollments)
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  onAdd(): void {
    this.matDialog.open(EnrollmentDialogComponent);
  }

  onDeleteEnrollment(enrollment: Enrollment):void{
    if(confirm(`Se eliminara la inscricion con ID: ${enrollment.id}`)){
      this.store.dispatch(EnrollmentActions.deleteEnrollment({payload : enrollment.id}));  
    this.notifier.showSuccess('Inscripcion eliminada');
    }
    
  }
}
