import { Pipe, PipeTransform } from '@angular/core';
import { Bird } from '../services/birds.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(birds: Observable<Bird[]>, text: string): Observable<Bird[]> {

    if (text.length === 0) { return birds; }

    text = text.toLocaleLowerCase();
  }
}
