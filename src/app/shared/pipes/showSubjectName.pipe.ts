import { Pipe, PipeTransform } from '@angular/core';
import { SUBJECTS_MOCK } from 'src/app/dashboard/pages/subjects/mocks';

@Pipe({
  name: 'showSubjectName'
})
export class ShowSubjectNamePipe implements PipeTransform {

transform(id: number, ...args: unknown[]): unknown {
  
    let subjectToFind = SUBJECTS_MOCK.find((s)=> s.id===id);
    return subjectToFind?.name;
  }

}


 