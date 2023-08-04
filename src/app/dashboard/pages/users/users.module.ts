import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersFormDialogComponent } from './components/users-form-dialog/users-form-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersFormDialogComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    UsersComponent,
    UserRoutingModule
  ]
})
export class UsersModule { }
