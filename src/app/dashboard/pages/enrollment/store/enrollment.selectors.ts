import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<fromEnrollment.State>(
  fromEnrollment.enrollmentFeatureKey
);

export const selectEnrollments = createSelector(selectEnrollmentState, (state)=> state.data)

export const selectStudentsOptions= createSelector(selectEnrollmentState, (state)=>state.studentOptions)

export const selectCoursesOptions= createSelector(selectEnrollmentState, (state)=> state.courseOptions)