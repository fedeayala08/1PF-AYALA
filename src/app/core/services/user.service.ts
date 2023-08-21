import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, mergeMap, of, take } from 'rxjs';
import { CreateUserData, UpdateUserData, User } from 'src/app/dashboard/pages/users/models';
import { NotifierService } from './notifier.service';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$= new BehaviorSubject<User[]>([]);
  private users$= this._users$.asObservable();

  constructor(private notiService: NotifierService,
            private httpClient : HttpClient) { }

  loadUsers(): void{
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users').subscribe({
      next: (response)=> {
        this._users$.next(response);
      },
      error: () => {
        this.notiService.showError('Error al cargar los usuarios');
      },
      complete:() => {
      }
    })
    
    
  }
  
  getUsers(): Observable<User[]>{
    return this._users$;
  }

  getUserById(id: number): Observable<User | undefined> {
    
    return this.users$.pipe(
      map((users)=> users.find((s)=>s.id===id)),
      take(1)
      )
  }

  createUser(payLoad : CreateUserData): void{
  
    const token = generateRandomString(20);

    this.httpClient.post<User>(environment.baseApiUrl + '/users',{...payLoad, token }).pipe(
      mergeMap((userCreate) => this.users$.pipe(
        take(1),
        map(
          (arrayActual) => [...arrayActual, userCreate])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._users$.next(arrayActualizado);
        this.notiService.showSuccess('Usuario creado');
      }
    }) 
  }

  updateUserById( id: number, userUpdated : UpdateUserData):void{
    this.httpClient.put(environment.baseApiUrl + '/users/' + id, userUpdated).subscribe({
      next: () => {this.loadUsers();
      this.notiService.showSuccess('Usuario actualizado');
      }
    })

  } 

  deleteUserById(id:number): void{
   this.httpClient.delete(environment.baseApiUrl + '/users/'+ id).subscribe({
    next: ()=> {this.loadUsers();
      this.notiService.showSuccess('Usuario eliminado');
    }
    
   })
  }


}
