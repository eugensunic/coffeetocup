import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { OrderTypeEnum } from 'src/app/shared/models/order-type.enum';

@Injectable({
  providedIn: 'root',
})
export class StatisticsCoffeeService {
  private brewMethods = ['Hario V60', 'Chemex', 'Flat bottom dripper', 'Other methods'];

  constructor(private shared: SharedService) {}

  // functions placed by element within row
  getAllUniqueCountries(coffeeJson: any[]): string[] {
    const countryArray = coffeeJson.map((x) => x.country);
    return countryArray.filter((country, index) => countryArray.indexOf(country) === index);
  }

  // for brewUsers and originUsers filter route BEGIN

  getTotalCoffeesPerUser(coffeeJson): any {
    return coffeeJson.reduce((acc, x) => {
      const index = acc.findIndex((a) => a.username === x.username);
      if (index >= 0) {
        acc[index] = {
          ...acc[index],
          amount: acc[index].amount + 1,
        };
      } else {
        acc.push({
          id: x.id,
          username: x.username,
          country: x.country,
          amount: 1,
        });
      }
      return acc;
    }, []);
  }

  getTotalBrewsAttributesPerUser(coffeeJson: any[]): any[] {
    return coffeeJson.reduce((acc: any, x: any) => {
      const index = acc.findIndex((a) => a.username === x.username);
      if (index >= 0) {
        acc[index] = {
          ...acc[index],
          username: x.username,
          country: x.country,
          amount: acc[index].amount + x.coffeeBrew.length,
        };
      } else {
        acc.push({
          username: x.username,
          country: x.country,
          amount: x.coffeeBrew.length,
        });
      }
      return acc;
    }, []);
  }

  getAvgOverallPerUser(coffeeJson: any): any {
    const sumOfOverall = coffeeJson.reduce((acc0, x) => {
      if (x.coffeeAttributes.length > 0) {
        x.coffeeAttributes.forEach((y) => {
          const index = acc0.findIndex((a) => a.username === x.username);
          if (index >= 0) {
            acc0[index] = {
              ...acc0[index],
              username: x.username,
              overall: parseInt(acc0[index].overall, 10) + parseInt(y.overall, 10),
              len: acc0[index].len + 1,
            };
          } else {
            acc0.push({
              username: x.username,
              overall: y.overall,
              len: 1,
            });
          }
        });
      }
      return acc0;
    }, []);

    const a = sumOfOverall.map((x) => {
      const number = Number((x.overall / x.len).toFixed(2));
      return Number.isNaN(number) ? 0 : number;
    });
    return a;
  }

  groupByOriginDatePerUser(arr: any[]): any[] {
    return arr
      .reduce((acc, x) => {
        const index = acc.findIndex((a) => a.username === x.username);
        if (index >= 0) {
          acc[index]['originSubmitDate'].push(x.originSubmitDate);
        } else {
          acc.push({ username: x.username, originSubmitDate: [x.originSubmitDate] });
        }
        return acc;
      }, [])
      .map((x) => x.originSubmitDate.sort(this.shared.compareDateSimple(OrderTypeEnum.DESC)))
      .map((x) => x[0]);
  }

  // for brewUsers and originUsers filter route END

  // for coffees section, brew table area
  // BEGIN

  // input param is country name
  getTotalBrewsAttributesPerBrew1(coffeeJson: any[], country?: string): any[] {
    let list = coffeeJson
      .filter((x) => (country ? x.country === country && x.coffeeBrew.length > 0 : x.coffeeBrew.length > 0))
      .reduce((acc0, x) => {
        let array: any[];
        array = x.coffeeBrew.reduce((acc, y) => {
          const index = acc.findIndex((a) => a.brewMethod === y.brewMethod);
          if (index >= 0) {
            acc[index].brewMethodCounter += 1;
          } else {
            acc.push({
              brewMethod: y.brewMethod,
              brewMethodCounter: 1,
            });
          }
          return acc;
        }, []);

        acc0.push(...array);
        return acc0;
      }, [])
      .filter((x) => {
        return !!x;
      })
      .reduce((acc, x) => {
        const index = acc.findIndex((a) => a.brewMethod === x.brewMethod);
        if (index >= 0) {
          acc[index].brewMethodCounter += x.brewMethodCounter;
        } else {
          acc.push({
            brewMethod: x.brewMethod,
            brewMethodCounter: x.brewMethodCounter,
          });
        }
        return acc;
      }, []);
    return this.adjustToDisplayAllBrews(list, ' brewMethodCounter');
  }

  getTotalCountriesPerBrew(coffeeJson: any[], country?: string): any[] {
    const list = coffeeJson
      .filter((x) => (country ? x.country === country && x.coffeeBrew.length > 0 : x.coffeeBrew.length > 0))
      .reduce((acc0, x) => {
        let array: any[];
        array = x.coffeeBrew.reduce((acc, y) => {
          const index = acc.findIndex((a) => a.brewMethod === y.brewMethod);
          if (index >= 0) {
            acc[index].brewMethodCounter = 1;
          } else {
            acc.push({
              brewMethod: y.brewMethod,
              brewMethodCounter: 1,
            });
          }
          return acc;
        }, []);

        acc0.push(...array);
        return acc0;
      }, [])
      .filter((x) => {
        return !!x;
      });
    const list2 = list.reduce((acc, x) => {
      const index = acc.findIndex((a) => a.brewMethod === x.brewMethod);
      if (index >= 0) {
        acc[index].brewMethodCounter += 1;
      } else {
        acc.push({
          brewMethod: x.brewMethod,
          brewMethodCounter: x.brewMethodCounter,
        });
      }
      return acc;
    }, []);
    return this.adjustToDisplayAllBrews(list2, ' brewMethodCounter');
  }

  getMostGrindPerBrew(coffeeJson: any[], country?: string): any[] {
    // step1
    let list = coffeeJson
      .filter((x) => (country ? x.country === country && x.coffeeBrew.length > 0 : x.coffeeBrew.length > 0))
      .reduce((acc0, x) => {
        let array: any[];
        array = x.coffeeBrew.reduce((acc, y) => {
          const index = acc.findIndex((a) => a.brewMethod === y.brewMethod);
          if (index >= 0) {
            acc[index][y.grindType] ? (acc[index][y.grindType] += 1) : (acc[index][y.grindType] = 1);
          } else {
            acc.push({
              brewMethod: y.brewMethod,
              [y.grindType]: 1,
            });
          }
          return acc;
        }, []);

        acc0.push(...array);
        return acc0;
      }, [])
      .filter((x) => {
        return !!x;
      });

    // step 2
    let output = list.reduce((acc, x) => {
      const index = acc.findIndex((a) => a.brewMethod === x.brewMethod);
      if (index >= 0) {
        acc[index]['brewMethod'] = x.brewMethod;
        acc[index]['coarse'] += x['coarse'] ? x['coarse'] : 0;
        acc[index]['medium-coarse'] += x['medium-coarse'] ? x['medium-coarse'] : 0;
        acc[index]['medium'] += x['medium'] ? x['medium'] : 0;
        acc[index]['medium-fine'] += x['medium-fine'] ? x['medium-fine'] : 0;
        acc[index]['fine'] += x['fine'] ? x['fine'] : 0;
      } else {
        acc.push({
          brewMethod: x.brewMethod,
          coarse: x['coarse'] ? x['coarse'] : 0,
          'medium-coarse': x['medium-coarse'] ? x['medium-coarse'] : 0,
          medium: x['medium'] ? x['medium'] : 0,
          'medium-fine': x['medium-fine'] ? x['medium-fine'] : 0,
          fine: x['fine'] ? x['fine'] : 0,
        });
      }
      return acc;
    }, []);

    const output2 = this.adjustToDisplayAllBrewsMultiProps(
      output,
      'coarse',
      'medium-coarse',
      'medium',
      'medium-fine',
      'fine'
    );

    const output3 = output2
      .map((x) => ({
        ...x,
        brewMethod: x.brewMethod,
        counter: Object.values(x).reduce((acc: number, curr: number) => {
          if (!isNaN(curr)) {
            return acc + curr;
          }
          return acc;
        }, 0),
      }))
      .map((x) => ({
        ...x,
        coarse: Math.round((x['coarse'] / x.counter) * 100),
        'medium-coarse': Math.round((x['medium-coarse'] / x.counter) * 100),
        medium: Math.round((x['medium'] / x.counter) * 100),
        'medium-fine': Math.round((x['medium-fine'] / x.counter) * 100),
        fine: Math.round((x['fine'] / x.counter) * 100),
      }))
      .map((x) => ({
        ...x,
        coarse: isNaN(x['coarse']) ? 0 : x['coarse'],
        'medium-coarse': isNaN(x['medium-coarse']) ? 0 : x['medium-coarse'],
        medium: isNaN(x['medium']) ? 0 : x['medium'],
        'medium-fine': isNaN(x['medium-fine']) ? 0 : x['medium-fine'],
        fine: isNaN(x['fine']) ? 0 : x['fine'],
      }));

    return output3;
  }

  getAvgAmountPropPerBrew(coffeeJson: any[], prop: string, country?: string): any[] {
    let list = coffeeJson
      .filter((x) => (country ? x.country === country && x.coffeeBrew.length > 0 : x.coffeeBrew.length > 0))
      .reduce((acc0, x) => {
        let array: any[];
        array = x.coffeeBrew.reduce((acc, y) => {
          const index = acc.findIndex((a) => a.brewMethod === y.brewMethod);
          if (index >= 0) {
            acc[index][prop] += parseFloat(y.ratio[prop]);
            acc[index].counter++;
          } else {
            acc.push({
              brewMethod: y.brewMethod,
              [prop]: parseFloat(y.ratio[prop]),
              counter: 1,
            });
          }
          return acc;
        }, []);

        acc0.push(...array);
        return acc0;
      }, [])
      .filter((x) => {
        return !!x;
      })
      .reduce((acc, x) => {
        const index = acc.findIndex((a) => a.brewMethod === x.brewMethod);
        if (index >= 0) {
          acc[index][prop] += parseFloat(x[prop]);
          acc[index].counter += x.counter;
        } else {
          acc.push({
            ...x,
          });
        }
        return acc;
      }, []);
      
    list = list.map((x) => ({ brewMethod: x.brewMethod, ['avg' + prop]: (x[prop] / x.counter).toFixed(2) }));
    return this.adjustToDisplayAllBrews(list, 'avg' + prop);
  }

  // filtrate by brew section
  getAllUniqueCountriesPerCountry(coffeeJson: any[], brewMethod: string): string[] {
    const list = coffeeJson
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.brewMethod === brewMethod),
      }))
      .filter((x) => x.coffeeBrew.length !== 0)
      .map((x) => x.country);

    return list.filter((country, index) => list.indexOf(country) === index);
  }

  getTotalCoffeesPerCountry(coffeeJson, brewMethod: string): any[] {
    let list = coffeeJson
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.brewMethod === brewMethod),
      }))
      .filter((x) => x.coffeeBrew.length !== 0);

    list = list
      .map((x) => x.country)
      .reduce((acc, curr) => {
        acc[curr] = acc[curr] === undefined ? 1 : (acc[curr] += 1);
        return acc;
      }, {});

    return Object.keys(list).map((x) => ({ country: x, amount: list[x] }));
  }
  // input param is brewMethod name
  getTotalBrewsAttributesPerCountry(coffeeJson: any[], brewMethod: string): any {
    return coffeeJson
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.brewMethod === brewMethod),
      }))
      .filter((x) => x.coffeeBrew.length !== 0)
      .reduce((acc: any, item: any) => {
        const index = acc.findIndex((a) => a.country === item.country);
        if (index >= 0) {
          acc[index]['country'] = item.country;
          acc[index]['amount'] += item.coffeeBrew.length;
        } else {
          acc.push({
            country: item.country,
            amount: item.coffeeBrew.length,
          });
        }
        return acc;
      }, []);
  }

  getFlavoursPerCountry(coffeeJson: any[], brewMethod: string): any[] {
    let list0 = coffeeJson
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.brewMethod === brewMethod),
        coffeeAttributes: x.coffeeAttributes
          .map((y, j) => {
            return { ...y, brewMethod: x.coffeeBrew[j] ? x.coffeeBrew[j].brewMethod : '' };
          })
          .filter((y) => y.brewMethod === brewMethod),
      }))
      .filter((x) => x.coffeeBrew.length !== 0);

    list0 = list0.map((x, j) => {
      return {
        country: x.country,
        amount: list0[j].coffeeAttributes.reduce(
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
    });
    // grouping by country
    let list = list0.reduce((acc, x) => {
      if (acc.some((a) => a.country === x.country)) {
        const index = acc.findIndex((a) => a.country === x.country);
        acc[index] = {
          ...acc[index],
          amount: {
            choco: acc[index].amount.choco + x.amount.choco,
            fruity: acc[index].amount.fruity + x.amount.fruity,
            nutty: acc[index].amount.nutty + x.amount.nutty,
            caramel: acc[index].amount.caramel + x.amount.caramel,
            floral: acc[index].amount.floral + x.amount.floral,
          },
          totalCountryBrews: acc[index].totalCountryBrews + x.totalCountryBrews,
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

  // this isn't used
  getMostGrindBrewPerCountry(coffeeJson: any[], brewMethod?: string): any {
    // step1
    let list = coffeeJson
      .filter((x) => x.coffeeBrew.length !== 0)
      .reduce((acc0, x, k) => {
        const arr = x.coffeeBrew.reduce((acc, y) => {
          const index = acc.findIndex((a) => a.country === x.country);
          if (index >= 0) {
            acc[index]['country'] = x.country;
            acc[index]['coarse'] += y.grindType === 'coarse' ? 1 : 0;
            acc[index]['medium-coarse'] += y.grindType === 'medium-coarse' ? 1 : 0;
            acc[index]['medium'] += y.grindType === 'medium' ? 1 : 0;
            acc[index]['medium-fine'] += y.grindType === 'medium-fine' ? 1 : 0;
            acc[index]['fine'] += y.grindType === 'fine' ? 1 : 0;
          } else {
            acc.push({
              country: x.country,
              coarse: y.grindType === 'coarse' ? 1 : 0,
              'medium-coarse': y.grindType === 'medium-coarse' ? 1 : 0,
              medium: y.grindType === 'medium' ? 1 : 0,
              'medium-fine': y.grindType === 'medium-fine' ? 1 : 0,
              fine: y.grindType === 'fine' ? 1 : 0,
            });
          }
          return acc;
        }, []);

        const index = acc0.findIndex((a) => a.country === x.country);
        if (index >= 0) {
          acc0[index]['country'] = x.country;
          acc0[index]['coarse'] += arr[0]['coarse'];
          acc0[index]['medium-coarse'] += arr[0]['medium-coarse'];
          acc0[index]['medium'] += arr[0]['medium'];
          acc0[index]['medium-fine'] += arr[0]['medium-fine'];
          acc0[index]['fine'] += arr[0]['fine'];
        } else {
          acc0.push(arr[0]);
        }
        return acc0;
      }, []);
  }

  groupByOriginSubmitDatePerCountry(arr: any[], brewMethod: string): any {
    return arr
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.brewMethod === brewMethod),
      }))
      .filter((x) => x.coffeeBrew.length !== 0)
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

  adjustToDisplayAllBrews(arr: any[], prop: string) {
    // !find value, add it
    const newArr = [...arr];
    for (let i = 0; i < this.brewMethods.length; i++) {
      if (!newArr.find((x) => x.brewMethod === this.brewMethods[i])) {
        newArr.push({ brewMethod: this.brewMethods[i], [prop]: undefined });
      }
    }
    return newArr;
  }

  adjustToDisplayAllBrewsMultiProps(arr: any[], ...prop: any) {
    // !find value, add it
    const newArr = [...arr];
    for (let i = 0; i < this.brewMethods.length; i++) {
      if (!newArr.find((x) => x.brewMethod === this.brewMethods[i])) {
        newArr.push({
          brewMethod: this.brewMethods[i],
          [prop[0]]: 0,
          [prop[1]]: 0,
          [prop[2]]: 0,
          [prop[3]]: 0,
          [prop[4]]: 0,
        });
      }
    }
    return newArr;
  }

  // general function, should be in angular utils since it's shared
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
}
