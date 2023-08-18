import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSubjects from './subjects.reducer';

export const selectSubjectsState = createFeatureSelector<fromSubjects.State>(
  fromSubjects.subjectsFeatureKey
);

export const selectSubjectArray= createSelector(selectSubjectsState, (state)=>state.subjects)

export const selectSubjectDetailName= createSelector(selectSubjectsState, (state)=>state.subjectDetail?.name)