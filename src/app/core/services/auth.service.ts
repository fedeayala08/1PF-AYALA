import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { LoginPayload } from "src/app/auth/models";
import { User } from "src/app/dashboard/pages/users/models";
import { NotifierService } from "./notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    constructor(private notifier: NotifierService ,
                private router: Router,
                private httpClient: HttpClient){}

    private _authUser$= new BehaviorSubject<User| null>(null);
    public authUser$= this._authUser$.asObservable();


    isAuthenticated(): Observable<boolean>{
        return this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
            params: {
              token: localStorage.getItem('token') || '',
            }
          }).pipe(
            map((usersResult) => {
              return !!usersResult.length
            })
          )
    }

    login(payLoad: LoginPayload): void{
              
        this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
            params: {
              email: payLoad.email || '',
              password: payLoad.password || ''
            }
          }).subscribe({
            next: (response) => {
                if (response.length) {
                    const authUser = response[0];
                    this._authUser$.next(authUser);
          
                    this.router.navigate(['/dashboard']);

                    localStorage.setItem('token', authUser.token);
                  } else { 
                    this.notifier.showError('Email o contrasena invalida');
                    this._authUser$.next(null);
                  }
            },
            error: (err)=>{
                if(err instanceof HttpErrorResponse){
                    let message= 'Ocurrio un error inesperado';
                    if(err.status===500){
                        message= "Error en servidor";
                    }
                    if(err.status===401){
                        message= "Email o contrasena invalida"
                    }
                    this.notifier.showError(message);
                }
                
            }
          })
        

    }
  }