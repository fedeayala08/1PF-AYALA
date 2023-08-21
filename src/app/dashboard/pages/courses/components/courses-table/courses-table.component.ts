import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIfAuthUserRoleIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {

  displayedColumns: string[] = ['id','title','description', 'subject','startDate', 'endDate', 'actions'];
  
  public isAdmin$ :  Observable<boolean> ;

  constructor(private store: Store
  ){
    this.isAdmin$= this.store.select(selectIfAuthUserRoleIsAdmin);
  }

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse= new EventEmitter<Course>();

  @Output()
  editCourse= new EventEmitter<Course>();

}
