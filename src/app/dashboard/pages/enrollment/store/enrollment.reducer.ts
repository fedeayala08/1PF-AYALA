import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentWithStudentAndCourse } from '../models';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  data: EnrollmentWithStudentAndCourse[];
  courseOptions: Course[];
  studentOptions: Student[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data:[],
  courseOptions: [],
  studentOptions: [],
  loading: false,
  error:null,
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => {
    return{
      ...state,
      loading:true
    }
  }),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading : false
    }
  }),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => {
    return{
      ...state,
      error: action.error,
      loading:false
    }
  }),
  
  on(EnrollmentActions.loadStudentsOptions, (state) =>state),
  on(EnrollmentActions.loadStudentsOptionsSuccess, (state, action) => {
    return{
      ...state,
      studentOptions: action.data
    }
  }),

  on(EnrollmentActions.loadCoursesOptions, (state)=> state),
  on(EnrollmentActions.loadCoursesOptionsSuccess, (state, action) => {
    return{
      ...state,
      courseOptions: action.data
    }
  }),


);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});

