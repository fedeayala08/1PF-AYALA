import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { AuthService } from "src/app/core/services/auth.service"

describe('LoginComponent', () =>{

    let component: LoginComponent;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[LoginComponent],
            imports: [MatFormFieldModule,MatInputModule, HttpClientTestingModule]
        })
        
        component= TestBed.createComponent(LoginComponent).componentInstance;
    })

    it('If the forms fields are empty, the form should be invalid', ()=>{
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBeTrue();
    })

    it('If the email is not a valid email, the form should be invalid', ()=>{

        component.emailControl.setValue('Test$gmail.com');
        component.passwordControl.setValue('1234');

        expect(component.loginForm.invalid).toBeTrue();
    })

    it('When the login() is called and the form is invalid, the method markAllAsTouched of the property loginForm should be called', ()=>{

        const spyOfMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');

        component.emailControl.setValue('');
        component.passwordControl.setValue('');
        component.login();

        expect(spyOfMarkAllAsTouched).toHaveBeenCalled();
    })

    it('When call login() and the form is VALID, the method login from AuthService should be called', ()=>{
         const authService = TestBed.inject(AuthService);

         component.emailControl.setValue('test@gmail.com');
         component.passwordControl.setValue('1234');

         expect(component.loginForm.valid).toBeTrue();

         const spyOnAuthSericeLogin = spyOn(authService, 'login');
         component.login();
         
         expect(spyOnAuthSericeLogin).toHaveBeenCalled();
    })
})