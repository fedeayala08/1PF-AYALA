import { Component } from '@angular/core';
import { User } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { UsersFormDialogComponent } from './components/users-form-dialog/users-form-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users:  Observable<User[] >;


  constructor(private matDialog: MatDialog,
    private userService: UserService){

    this.userService.loadUser();
    this.users = this.userService.getUsers();

  }

  onCreateUser(): void {
    this.matDialog
      .open(UsersFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.userService.createUser({
              name: v.name,
              surname :v.surname,
              email: v.email,
              password:v.password,
              token: v.token,
              role: v.role
            });
          }
        },
      });
  }

  OnDeleteUser(userToDelete: User): void{

    if(confirm(`Se eliminara el usuario ${userToDelete.name} ${userToDelete.surname}`)){
      this.userService.deleteUserById(userToDelete.id);
    }
  }

  OnEditUser(userToEdit: User): void{
   this.matDialog
   .open(UsersFormDialogComponent,{
    data: userToEdit
   })
   .afterClosed()
   .subscribe({
    next: (userUpdated)=> {
      if(userUpdated){
        this.userService.updateUserById(userToEdit.id,userUpdated);
       }
      },
    });
  }

}


