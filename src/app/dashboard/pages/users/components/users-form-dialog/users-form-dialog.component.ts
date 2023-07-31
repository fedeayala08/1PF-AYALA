import { Component,Inject } from '@angular/core';
import { User } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-form-dialog',
  templateUrl: './users-form-dialog.component.html',
  styleUrls: ['./users-form-dialog.component.scss']
})
export class UsersFormDialogComponent {

  editingUser?: User;

  nameControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(3) ]);
  surnameControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required ,Validators.email]);
  passwordControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(5)]);
  tokenControl = new FormControl<string | null>(null, [Validators.required]);
  roleControl = new FormControl<string | null>(null, [Validators.required]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    token: this.tokenControl,
    role: this.roleControl
  });

  constructor(
    private dialogRef: MatDialogRef<UsersFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User,
  ) {
    if (this.data) {
      this.editingUser= this.data;
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
      this.passwordControl.setValue(this.data.password);
      this.tokenControl.setValue(this.data.token);
      this.roleControl.setValue(this.data.role);
      
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
