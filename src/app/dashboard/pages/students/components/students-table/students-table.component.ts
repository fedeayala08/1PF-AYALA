import { Component, EventEmitter, Input ,Output} from '@angular/core';
import { Student } from '../../models';
import { outputAst } from '@angular/compiler';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {
  displayedColumns: string[] = ['id','name','email', 'gender', 'country', 'actions'];
 
  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent= new EventEmitter<Student>();

  @Output()
  editStudent= new EventEmitter<Student>();
}
