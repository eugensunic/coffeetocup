import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ChartStatisticService {
  constructor() {}

  // get only numbers in array, refactor to somewhere else, used for 1st chart
  getTotalCoffeesPerCountry(coffeeJson): number[] {
    const list = coffeeJson
      .map((x) => x.country)
      .reduce((acc, curr) => {
        acc[curr] = acc[curr] === undefined ? 1 : (acc[curr] += 1);
        return acc;
      }, {});

    return Object.keys(list)
      .map((x) => ({ country: x, amount: list[x] }))
      .map((x) => x.amount);
  }

  getAvgOfAvgPerOrigin(coffeeJson) {
    const arr = coffeeJson.map((item) => {
      return item.coffeeAttributes.reduce(
        (acc: any, y: any) => {
          return {
            country: item.country,
            amount: {
              overall: parseInt(acc.amount.overall, 10) + parseInt(y.overall, 10),
              count: acc.amount.count + 1,
            },
          };
        },
        { country: '', amount: { overall: 0, count: 0 } }
      );
    });

    return arr
      .reduce((acc, x) => {
        if (acc.some((a) => a.country === x.country)) {
          const index = acc.findIndex((a) => a.country === x.country);
          acc[index] = {
            ...acc[index],
            amount: {
              overall: parseInt(acc[index].amount.overall, 10) + parseInt(x.amount.overall, 10),
              count: acc[index].amount.count + x.amount.count,
            },
          };
        } else {
          acc.push(x);
        }
        return acc;
      }, [])
      .map((x) => x.amount.overall / x.amount.count);
  }

  // for statistical data
  getRoastingPerCountry(coffeeJson: any, country: string): any[] {
    const obj = coffeeJson.reduce(
      (acc, x) => {
        if (x.country === country) {
          if (x.roastingType === 'light') {
            ++acc.light;
          }
          if (x.roastingType === 'medium') {
            ++acc.medium;
          }
          if (x.roastingType === 'dark') {
            ++acc.dark;
          }
        }
        return { light: acc.light, medium: acc.medium, dark: acc.dark };
      },
      { light: 0, dark: 0, medium: 0 }
    );
    return Object.keys(obj).map((x) => obj[x]);
  }

  getProcessingPerCountry(coffeeJson: any, country: string): any[] {
    const obj = coffeeJson.reduce(
      (acc, x) => {
        if (x.country === country) {
          if (x.processingType === 'process-natural') {
            ++acc.natural;
          }
          if (x.processingType === 'process-washed') {
            ++acc.washed;
          }
          if (x.processingType === 'process-hybrid') {
            ++acc.hybrid;
          }
        }
        return { natural: acc.natural, washed: acc.washed, hybrid: acc.hybrid };
      },
      { natural: 0, washed: 0, hybrid: 0 }
    );
    return Object.keys(obj).map((x) => obj[x]);
  }

  getAttributesPerGrind(coffeeJson: any, country?: string): any[] {
    const accu = [] as any;
    coffeeJson.map((item, i) => {
      if (item.country === country) {
        return item.coffeeAttributes.forEach((x, index) => {
          const k = accu.findIndex((y: any) => y.grindType === item.coffeeBrew[index].grindType);
          if (k !== -1) {
            accu[k] = {
              ...accu[k],
              bitterness: accu[k].bitterness + parseInt(x.bitterness, 10),
              sweetness: accu[k].sweetness + parseInt(x.sweetness, 10),
              acidity: accu[k].acidity + parseInt(x.acidity, 10),
              intensity: accu[k].intensity + parseInt(x.intensity, 10),
              counter: ++accu[k].counter,
            };
          } else {
            accu.push({
              grindType: item.coffeeBrew[index].grindType,
              bitterness: parseInt(x.bitterness, 10),
              sweetness: parseInt(x.sweetness, 10),
              acidity: parseInt(x.acidity, 10),
              intensity: parseInt(x.intensity, 10),
              counter: 1,
            });
          }
        });
      }
    });
    const keys = Object.keys({
      grindType: '',
      bitterness: '',
      sweetness: '',
      acidity: '',
      intensity: '',
    });
    // this is not required but just to see the key value association
    accu.forEach((item: any, i: number) => {
      keys.forEach((key: string) => {
        accu[i] = {
          ...accu[i],
          [key]: key !== 'grindType' ? accu[i][key] / accu[i].counter : accu[i].grindType,
        };
      });
    });

    return accu;
  }
}
