import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentComponent } from './enrollment.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentEffects } from './store/enrollment.effects';
import { StoreModule } from '@ngrx/store';
import { enrollmentFeature } from './store/enrollment.reducer';



@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EnrollmentRoutingModule,
    StoreModule.forFeature(enrollmentFeature),
    EffectsModule.forFeature([EnrollmentEffects])
  ],
  exports:[
    EnrollmentComponent,
  ]
})
export class EnrollmentModule { }
