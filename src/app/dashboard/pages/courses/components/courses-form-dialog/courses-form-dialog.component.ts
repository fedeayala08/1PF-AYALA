import { Component, Inject } from '@angular/core';
import { Course } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from '../../../subjects/models';
import { SUBJECTS_MOCK } from '../../../subjects/mocks';


@Component({
  selector: 'app-courses-form-dialog',
  templateUrl: './courses-form-dialog.component.html',
  styleUrls: ['./courses-form-dialog.component.scss']
})
export class CoursesFormDialogComponent {
  editingCourse?: Course;

  subjectOptions: Subject[];


  titleControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(5) ]);
  descriptionControl = new FormControl<string | null>(null, [Validators.required]);
  subjectIdControl = new FormControl<number | null>(null, Validators.required);
  startDateControl = new FormControl<Date | null>(null, [Validators.required]);
  endDateControl = new FormControl<Date | null>(null, [Validators.required]);

  courseForm = new FormGroup({
    title: this.titleControl,
    description: this.descriptionControl,
    subjectId: this.subjectIdControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl
  
  });

  constructor(
    private dialogRef: MatDialogRef<CoursesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course,
  ) {

    this.subjectOptions = SUBJECTS_MOCK;
    
    if (this.data) {
      this.editingCourse= this.data;
      this.titleControl.setValue(this.data.title);
      this.descriptionControl.setValue(this.data.description);
      this.subjectIdControl.setValue(this.data.subjectId);
      this.startDateControl.setValue(this.data.startDate);
      this.endDateControl.setValue(this.data.endDate);
       
    }

  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
