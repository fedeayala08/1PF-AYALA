import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { selectIfAuthUserRoleIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  public selectIsUserAdmin$: Observable<boolean>;
  
  constructor(
    private router: Router, 
    private authService: AuthService,
    private store: Store) {

      this.selectIsUserAdmin$= this.store.select(selectIfAuthUserRoleIsAdmin);
    }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth', 'login'], {})
  }
}
