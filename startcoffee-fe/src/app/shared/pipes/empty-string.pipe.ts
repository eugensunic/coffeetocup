import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyString'
})
// test at the end
export class EmptyStringPipe implements PipeTransform {
  transform(value: any, args?: any): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }
    return value;
  }
}
