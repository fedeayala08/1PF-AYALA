import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/dashboard/pages/students/models';

@Pipe({
  name: 'showFullName'
})
export class ShowFullNamePipe implements PipeTransform {

  transform(student: Student, ...args: unknown[]): unknown {
    const fullName = `${student.name} ${student.surname}`;
    return fullName;
  }

}
