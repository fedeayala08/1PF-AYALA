import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { User } from "src/app/dashboard/pages/users/models";
import { Router } from "@angular/router";
import { RouterMock } from "../mocks/router.mock";
 

describe('AuthService', ()=>{

    let service : AuthService;
    let httpController : HttpTestingController;

    beforeEach(()=>{
     TestBed.configureTestingModule({
        imports:[HttpClientTestingModule, RouterTestingModule],
        providers: [
            {
            provide: Router,
            useClass: RouterMock,
            }
        ]
     });

     service = TestBed.inject(AuthService);
     httpController= TestBed.inject(HttpTestingController);
    })

    afterEach(()=>{
        httpController.verify();
    })

    it('If login is Valid, the observable authUser$ should emit a value', ()=>{
         const mockTestUser: User={
            id: 1 ,
            name: 'Test1',
            surname: 'SurnameTester',
            email: 'test@test.com',
            password : '1234',
            role: 'Administrator',
            token: 'fahkdjfhaudiyf832iwhe',
         }

         const mockResponse: User[] = [mockTestUser];

         service.login({
            email: mockTestUser.email,
            password: mockTestUser.password
         });

         httpController.expectOne({
            method: 'GET',
            url:  `http://localhost:3000/users?email=${mockTestUser.email}&password=${mockTestUser.password}`
         }).flush(mockResponse)

         service.authUser$.subscribe({
            next:(authUser)=>{
                expect(authUser).toBeTruthy();
                expect(authUser).toEqual(mockTestUser);
                
            }
         })

    })
})

 
