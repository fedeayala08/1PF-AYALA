import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from '../../../courses/models';
import { Store } from '@ngrx/store';
import { SubjectsActions } from '../../store/subjects.actions';
import { Observable } from 'rxjs';
import { selectSubjectDetailName } from '../../store/subjects.selectors';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styles: [
  ]
})
export class SubjectDetailComponent implements OnInit {

  displayedColumns= ['id','title','description'];
  courses: Course[]=[];
  subjectName$: Observable<string | undefined>;

  constructor(
    private activatedRoute : ActivatedRoute, 
    private courseService: CourseService,
    private store: Store){

      this.subjectName$= this.store.select(selectSubjectDetailName)  ;
  }

  ngOnInit(): void{
    this.store.dispatch(SubjectsActions.loadSubjectDetail({subjectId: this.activatedRoute.snapshot.params['id'] }))

    this.courseService.getCoursesBySubjectId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (courses)=> (this.courses= courses)
    })

  }

}
