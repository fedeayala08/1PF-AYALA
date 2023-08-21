import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIfAuthUserRoleIsAdmin } from 'src/app/store/auth/auth.selectors';

export const adminGuard: CanActivateFn = (route, state) => {

  const router= inject(Router);
  
  return inject(Store).select(selectIfAuthUserRoleIsAdmin).pipe(
    map((isAdmin)=> {
      if(!isAdmin) return router.createUrlTree(['/dashboard/home'])
      return true;
    })
  );

};
