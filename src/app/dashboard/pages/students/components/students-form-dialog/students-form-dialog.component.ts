import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-students-form-dialog',
  templateUrl: './students-form-dialog.component.html',
  styleUrls: ['./students-form-dialog.component.scss']
})
export class StudentsFormDialogComponent {
 
  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(3) ]);
  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required ,Validators.email]);
  genderControl = new FormControl<string | null>(null, [Validators.required]);
  countryControl = new FormControl<string | null>(null);

  studentForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    gender: this.genderControl,
    country: this.countryControl
  });

  constructor(
    private dialogRef: MatDialogRef<StudentsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student,
  ) {
    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
      this.genderControl.setValue(this.data.gender);
      this.countryControl.setValue(this.data.country);
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}

