import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from './subjects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { SubjectsEffects } from './store/subjects.effects';
import { StoreModule } from '@ngrx/store';
import { subjectsFeature } from './store/subjects.reducer';
import { SubjectDetailComponent } from './pages/subject-detail/subject-detail.component';



@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(subjectsFeature),
    EffectsModule.forFeature([SubjectsEffects])
  ],
  exports: [
    SubjectsComponent,
    SubjectsRoutingModule
  ]
})
export class SubjectsModule { }
