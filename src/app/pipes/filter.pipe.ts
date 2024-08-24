import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: boolean): any[] {
    if (!items) return [];
    return items.filter(it => it[field] === value);
  }

}
