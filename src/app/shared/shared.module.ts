import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { ControlErrorMessagePipe } from './pipes/control-error-message.pipe';
import { ShowFullNamePipe } from './pipes/show-full-name.pipe';
import { SizeTitleDirective } from './directives/size-title.directive';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ShowSubjectNamePipe } from './pipes/showSubjectName.pipe';


@NgModule({
  declarations: [
    ControlErrorMessagePipe,
    ShowFullNamePipe,
    ShowSubjectNamePipe,
    SizeTitleDirective
  ],
  imports: [
    CommonModule

  ],
  exports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    ShowFullNamePipe,
    ShowSubjectNamePipe,
    ControlErrorMessagePipe,   
    SizeTitleDirective ,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
