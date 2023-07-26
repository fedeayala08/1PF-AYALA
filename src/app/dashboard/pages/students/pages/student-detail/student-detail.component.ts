import { Component } from '@angular/core';
import { Student } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent {
  public student : Student | null = null;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private notification: NotifierService) {
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      this.router.navigate(['dashboard', 'students']);
      this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`);
    }
  }

  loadUser(): void {
    // couserService.getCoursesByUserId(this.activatedRoute.snapshot.paramMap.get('id')).
    // usersService.getUserById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
    //   next: (user) => {
    //     this.user = user;
    //   }
    // })
  }
}
