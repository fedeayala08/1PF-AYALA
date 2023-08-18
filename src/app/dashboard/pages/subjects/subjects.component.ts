import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SubjectsActions } from './store/subjects.actions';
import { Subject } from './models';
import { selectSubjectArray } from './store/subjects.selectors';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html'
})
export class SubjectsComponent {

  subjects$: Observable<Subject[]>;

  constructor(private store: Store) {
    this.subjects$ = this.store.select(selectSubjectArray);
  }

  displayedColumns = ['id', 'name', 'actions']

  ngOnInit(): void {
    this.store.dispatch(SubjectsActions.loadSubjects())
  }
}
