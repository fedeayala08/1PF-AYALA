import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateEnrollmentPayload, Enrollment, EnrollmentWithStudentAndCourse } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: EnrollmentWithStudentAndCourse[] }>(),
    'Load Enrollments Failure': props<{ error: HttpErrorResponse }>(),

    'Load Courses Options' : emptyProps(),
    'Load Courses Options Success' : props<{ data: Course[] }>(),
    'Load Courses Options Failure' : props<{ error: HttpErrorResponse }>(),

    'Load Students Options' : emptyProps(),
    'Load Students Options Success' : props<{ data: Student[] }>(),
    'Load Students Options Failure' : props<{ error: HttpErrorResponse }>(),

    'Create Enrollment' : props<{ payload: CreateEnrollmentPayload }>(),
    'Create Enrollment Success' : props<{ data: Enrollment }>(),
    'Create Enrollment Failure' : props<{ error: HttpErrorResponse }>(),

    'Delete Enrollment' : props<{ payload: number }>(),
    'Delete Enrollment Success' : props<{ data: Enrollment }>(),
    'Delete Enrollment Failure' : props<{ error: HttpErrorResponse }>(),
  }
});
