import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    if (!value) {
      return [];
    }

    if (!filterString) {
      return value;
    }

    return value.filter(item => {
      if (!propName) {
        return item.toLowerCase().includes(filterString.toLowerCase());
      } else {
        return item[propName].toLowerCase().includes(filterString.toLowerCase());
      }
    });
  }
}
