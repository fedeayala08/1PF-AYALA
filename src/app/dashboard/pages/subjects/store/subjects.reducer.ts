import { createFeature, createReducer, on } from '@ngrx/store';
import { SubjectsActions } from './subjects.actions';
import { Subject } from '../models';
import { SUBJECTS_MOCK } from '../mocks';

export const subjectsFeatureKey = 'subjects';

export interface State {
 subjects: Subject[],
 subjectDetail: Subject | null ,

}

export const initialState: State = {
 subjects:[],
 subjectDetail: null,
};

export const reducer = createReducer(
  initialState,
  on(SubjectsActions.loadSubjects, state => {
    return {
      ...state,
      subjects: SUBJECTS_MOCK,
    }
  }),

  on(SubjectsActions.loadSubjectDetail,(state, action) => {
    return {
      ...state,
      subjectDetail: SUBJECTS_MOCK.find((s)=> s.id == action.subjectId) || null,
    }
  })

);

export const subjectsFeature = createFeature({
  name: subjectsFeatureKey,
  reducer,
});

