import { Component, EnvironmentInjector, EventEmitter, Input ,Output} from '@angular/core';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIfAuthUserRoleIsAdmin } from 'src/app/store/auth/auth.selectors';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  displayedColumns: string[] = ['id','name','email', 'gender', 'country', 'actions'];
 
  public isAdmin$ :  Observable<boolean> ;

  constructor(private store: Store ){

    this.isAdmin$= this.store.select(selectIfAuthUserRoleIsAdmin);
  }

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent= new EventEmitter<Student>();

  @Output()
  editStudent= new EventEmitter<Student>();
}
