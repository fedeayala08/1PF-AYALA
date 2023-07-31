import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, take } from 'rxjs';
import { CreateUserData, UpdateUserData, User } from 'src/app/dashboard/pages/users/models';
import { NotifierService } from './notifier.service';

const USER_DB : Observable<User[]> = of( [
  {
    id:1,
    name: 'Jose',
    surname: 'Domingo',
    email: 'JD@gmail.com',
    password: '123JDMejor',
    token: 'tyyyrueio234',
    role: 'Administrador'
    
  },
  {
    id:2,
    name: 'Julia',
    surname: 'Quimey',
    email: 'JK@gmail.com',
    password: '1234Nurse',
    token: 'djadoiopep0',
    role: 'Tester'
  },

]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$= new BehaviorSubject<User[]>([]);
  private user$= this._user$.asObservable();
  private maxValue$: number=0;

  constructor(private notiService: NotifierService) { }

  loadUser(): void{
    USER_DB.subscribe({
      next:(userFromDB)=> this._user$.next(userFromDB),
    });
  }
  
  getUsers(): Observable<User[]>{
    return this._user$;
  }

  getMaxID(): void {
    this.user$.pipe(
      map(items => items.map(item => item.id)),  
      map(ids => Math.max(...ids)),  
    ).subscribe(value =>{ this.maxValue$ = value});
  }

  getUserById(id: number): Observable<User | undefined> {
    
    return this.user$.pipe(
      map((users)=> users.find((s)=>s.id===id)),
      take(1)
      )
  }

  createUser(user : CreateUserData): void{
    this.getMaxID();
    this.user$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._user$.next([
          ...arrayActual, {...user,id: this.maxValue$ +1 } ,
        ]);
        this.notiService.showSuccess('Usuario creado');
      },
    });
  }

  updateUserById( id: number, userUpdated : UpdateUserData):void{
    this._user$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._user$.next(
          arrayActual.map((s)=>
          s.id===id? {...s, ...userUpdated} :s
          )
        );
        this.notiService.showSuccess('Usuario actualizado');
      },
    });

  } 

  deleteUserById(id:number): void{
    this._user$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._user$.next(arrayActual.filter((s)=> s.id!== id));
        this.notiService.showSuccess('Usuario eliminado');
      },
    });
  }


}
