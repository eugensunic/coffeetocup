import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterCountries',
  pure: false,
})
export class FilterCountriesPipe implements PipeTransform {
  transform(areaList: any, countryName = ''): any[] {
    if (areaList) {
      return areaList.filter((x) =>
        x.country.toLowerCase().startsWith(countryName.toLocaleLowerCase().trim())
      );
    }
  }
}
