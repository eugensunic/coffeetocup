import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByObjProp'
})
export class SortObjectPipe implements PipeTransform {
  transform(array: Array<any>, prop: string): Array<string> {
    if (array) {
      array.sort((a: any, b: any) => {
        if (a[prop] < b[prop]) {
          return 1;
        } else if (a[prop] > b[prop]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return array;
  }
}
