import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { LoginPayload } from "src/app/auth/models";
import { User } from "src/app/dashboard/pages/users/models";
import { NotifierService } from "./notifier.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    constructor(private notifier: NotifierService ,
                private router: Router){}

    private _authUser$= new BehaviorSubject<User| null>(null);
    public authUser$= this._authUser$.asObservable();


    isAuthenticated(): Observable<boolean>{
        return this.authUser$.pipe(
            take(1),
            map((user) => !!user),
          );
    }

    login(payLoad: LoginPayload): void{
        
        const MOCK_USER: User={
            id: 50,
            name: 'Fede',
            surname: 'MND',
            email: 'fede@fede.com',
            password: '1234',
            token: 'fff',
            role: 'fff',
        }
        
        if(payLoad.email===MOCK_USER.email && payLoad.password=== MOCK_USER.password)
        {
            this._authUser$.next(MOCK_USER);
            this.router.navigate(['/dashboard']);
        }else{
            this.notifier.showError('Email o contrasena invalida');
            this._authUser$.next(null);
        }
        

    }
  }