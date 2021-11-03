import { SharedService } from 'src/app/shared/services/shared.service';
import { Injectable } from '@angular/core';
import { OrderTypeEnum } from 'src/app/shared/models/order-type.enum';
import { convertToDateTimeString } from 'src/app/utils';
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private shared: SharedService) {}

  /** all functions return an array of elements which are incorporated into the main coffeeJson object
   * see coffeeJson object on UserProfileComponent. Embedding is done in ngOnInit()
   */

  getAvgOverallPerOrigin(x): number[] {
    const sumOfOverall = x.map((item) => {
      if (item.coffeeAttributes.length > 0) {
        return item.coffeeAttributes.reduce((acc: number, y: any) => {
          return acc + parseInt(y.overall, 10);
        }, 0);
      }
      return 0;
    });
    return sumOfOverall.map((y, i) => {
      const number = Number((y / x[i].coffeeAttributes.length).toFixed(2));
      return Number.isNaN(number) ? 0 : number;
    });
  }

  getSubmitDate(x): string[] {
    return x.map((item) => item.coffeeAttributes.reduce((acc, y: any) => y.formSubmitDate, ''));
  }

  // functions placed by element within row
  getAllUniqueCountries(coffeeJson: any[]): string[] {
    const countryArray = coffeeJson.map((x) => x.country);
    return countryArray.filter((country, index) => countryArray.indexOf(country) === index);
  }

  getTotalCoffeesPerCountry(coffeeJson): any[] {
    const list = coffeeJson
      .map((x) => x.country)
      .reduce((acc, curr) => {
        acc[curr] = acc[curr] === undefined ? 1 : (acc[curr] += 1);
        return acc;
      }, {});

    return Object.keys(list).map((x) => ({ country: x, amount: list[x] }));
  }

  getTotalBrewsAttributesPerCountry(coffeeJson: any[]): any[] {
    const countries = this.getAllUniqueCountries(coffeeJson);
    const countriesNew = countries.map((item) => ({ nm: item, amount: 0 }));

    const list = coffeeJson
      .map((x, j) => {
        return countries.reduce((prev: any, item: any, i: number) => {
          if (item === x.country) {
            return { count: x.country, amount: (countriesNew[i].amount += coffeeJson[j].coffeeBrew.length) };
          }
          return prev;
        }, {});
      })
      .reduce((acc, c) => ({ ...acc, [c.count]: c.amount }), {});

    return Object.keys(list).map((x) => ({ country: x, amount: list[x] }));
  }

  getBrewRatioPerCountry(coffeeJson: any[], param: string): any[] {
    const countries = this.getAllUniqueCountries(coffeeJson);

    const list = coffeeJson.map((x, j) => {
      return countries.reduce((prev: any, item: any, i: number) => {
        if (item === x.country) {
          return {
            country: x.country,
            amount: coffeeJson[j].coffeeBrew.reduce(
              (acc: any, y: any) => {
                if (y.ratio) {
                  return { [param]: acc[param] + parseFloat(y.ratio[param]), counter: ++acc.counter };
                }
              },
              { [param]: 0, counter: 0 }
            ),
          };
        }
        return prev;
      }, {});
    });

    return this.groupByProperty(list, param).map((x) => ({
      country: x.country,
      avg: (x.amount[param] / x.amount.counter).toFixed(2),
    }));
  }

  getAttributeRatingPerCountry(coffeeJson: any[], param: string): any[] {
    const countries = this.getAllUniqueCountries(coffeeJson);

    const list = coffeeJson.map((x, j) => {
      return countries.reduce((prev: any, item: any) => {
        if (item === x.country) {
          return {
            country: x.country,
            amount: coffeeJson[j].coffeeAttributes.reduce(
              (acc: any, y: any) => {
                if (y[param]) {
                  return { [param]: acc[param] + parseFloat(y[param]), counter: ++acc.counter };
                }
                return acc;
              },
              { [param]: 0, counter: 0 }
            ),
          };
        }
        return prev;
      }, {});
    });

    return this.groupByProperty(list, param).map((x) => ({
      country: x.country,
      avg: (() => {
        const num = parseFloat((x.amount[param] / x.amount.counter).toFixed(2));
        return Number.isNaN(num) ? 0 : num;
      })(),
    }));
  }

  getFlavoursPerCountry(coffeeJson: any[]): any[] {
    const countries = this.getAllUniqueCountries(coffeeJson);
    let list0 = coffeeJson.map((x, j) => {
      return countries.reduce((prev: any, item: any) => {
        if (item === x.country) {
          return {
            country: x.country,
            amount: coffeeJson[j].coffeeAttributes.reduce(
              (acc: any, y: any) => {
                return {
                  choco: y.flavour.choco ? ++acc.choco : acc.choco,
                  fruity: y.flavour.fruity ? ++acc.fruity : acc.fruity,
                  nutty: y.flavour.nutty ? ++acc.nutty : acc.nutty,
                  caramel: y.flavour.caramel ? ++acc.caramel : acc.caramel,
                  floral: y.flavour.floral ? ++acc.floral : acc.floral,
                };
              },
              { choco: 0, fruity: 0, nutty: 0, caramel: 0, floral: 0 }
            ),
            totalCountryBrews: x.coffeeBrew.length,
          };
        }
        return prev;
      }, {});
    });

    let list = list0.reduce((acc, x) => {
      if (acc.some((a) => a.country === x.country)) {
        const index = acc.findIndex((a) => a.country === x.country);
        acc[index] = {
          ...acc[index],
          totalCountryBrews: acc[index].totalCountryBrews + x.totalCountryBrews,
          amount: {
            choco: acc[index].amount.choco + x.amount.choco,
            fruity: acc[index].amount.fruity + x.amount.fruity,
            nutty: acc[index].amount.nutty + x.amount.nutty,
            caramel: acc[index].amount.caramel + x.amount.caramel,
            floral: acc[index].amount.floral + x.amount.floral,
          },
        };
      } else {
        acc.push(x);
      }
      return acc;
    }, []);

    // sum all props
    list = list
      .map((x) => ({
        ...x,
        country: x.country,
        amount: x.amount,
      }))
      .map((x) => ({
        ...x,
        amount: {
          choco: Math.round((x.amount.choco / x.totalCountryBrews) * 100),
          fruity: Math.round((x.amount.fruity / x.totalCountryBrews) * 100),
          nutty: Math.round((x.amount.nutty / x.totalCountryBrews) * 100),
          caramel: Math.round((x.amount.caramel / x.totalCountryBrews) * 100),
          floral: Math.round((x.amount.floral / x.totalCountryBrews) * 100),
        },
      }))
      .map((x) => ({
        ...x,
        amount: {
          choco: isNaN(x.amount['choco']) ? 0 : x.amount['choco'],
          fruity: isNaN(x.amount['fruity']) ? 0 : x.amount['fruity'],
          nutty: isNaN(x.amount['nutty']) ? 0 : x.amount['nutty'],
          caramel: isNaN(x.amount['caramel']) ? 0 : x.amount['caramel'],
          floral: isNaN(x.amount['floral']) ? 0 : x.amount['floral'],
        },
      }));
    return list;
  }
  // when clicked on uniquely sorted countries
  filterCoffeesByCountry(coffeeJson: any[], country: string): string[] {
    return coffeeJson.filter((x) => x.country === country);
  }

  groupByOriginSubmitDate(arr: any[]): any[] {
    return arr
      .reduce((acc, x) => {
        const index = acc.findIndex((a) => a.country === x.country);
        if (index >= 0) {
          acc[index]['originSubmitDate'].push(x.originSubmitDate);
        } else {
          acc.push({ country: x.country, originSubmitDate: [x.originSubmitDate] });
        }
        return acc;
      }, [])
      .map((x) => x.originSubmitDate.sort(this.shared.compareDateSimple(OrderTypeEnum.DESC)))
      .map((x) => x[0]);
  }

  groupByLastBrewSubmitDateTime(arr: any[]): any[] {
    return arr
      .reduce((acc, x) => {
        const index = acc.findIndex((a) => a.country === x.country);
        if (index >= 0) {
          acc[index]['lastBrewSubmitDateTime'].push(x.lastBrewSubmitDateTime);
        } else {
          acc.push({ country: x.country, lastBrewSubmitDateTime: [x.lastBrewSubmitDateTime] });
        }
        return acc;
      }, [])
      .map((x) => x.lastBrewSubmitDateTime.sort(this.shared.compareDateSimple(OrderTypeEnum.DESC)))
      .map((x) => x[0]);
  }

  // general function
  groupByProperty(arr: any[], param: string): any[] {
    return arr.reduce((acc, x) => {
      if (acc.some((a) => a.country === x.country)) {
        const index = acc.findIndex((a) => a.country === x.country);
        acc[index] = {
          ...acc[index],
          amount: {
            [param]: acc[index].amount[param] + x.amount[param],
            counter: acc[index].amount.counter + x.amount.counter,
          },
        };
      } else {
        acc.push(x);
      }
      return acc;
    }, []);
  }

  onCoffeeDeleteCallback(coffeeList: any, i: number, j: number) {
    let coffeeJson = [...coffeeList];

    const coffeeBrew = coffeeJson[i].coffeeBrew.filter((y: any, index: number) => index !== j);
    const coffeeAttributes = coffeeJson[i].coffeeAttributes.filter((y: any, index: number) => index !== j);

    coffeeJson = coffeeJson.map((x, k) => ({
      ...x,
      brewsAmount: x.brewsAmount - 1,
      roastingType: {
        ...x.roastingType,
        type: this.shared.roastingTypeNameMapping(x.roastingType.type),
      },
      coffeeBrew: i === k ? coffeeBrew : x.coffeeBrew,
      coffeeAttributes: i === k ? coffeeAttributes : x.coffeeAttributes,
    }));

    const avgPerOrigin = this.getAvgOverallPerOrigin(coffeeJson);

    coffeeJson = coffeeJson.map((x, i) => ({
      ...x,
      lastBrewSubmitDateTime: convertToDateTimeString(
        new Date(
          Math.max.apply(
            null,
            x.coffeeBrew.map((x) => {
              return new Date(x.brewSubmitDate);
            })
          )
        )
      ),
      avgRating: avgPerOrigin[i],
      coffeeBrew: x.coffeeBrew.map((y) => ({
        ...y,
        ratio: { ...y.ratio },
      })),
    }));
    return coffeeJson;
  }
}
