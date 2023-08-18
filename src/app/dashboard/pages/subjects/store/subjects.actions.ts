import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SubjectsActions = createActionGroup({
  source: 'Subjects',
  events: {
    'Load Subjects': emptyProps(),
    'Load Subject Detail': props<{subjectId:number}>(),
    
  }
});
