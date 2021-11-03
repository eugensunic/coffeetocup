import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDisplayService {
  constructor() {}

  addUsernameToFilteredCoffees(users: any, filteredCoffees: any) {
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < filteredCoffees.length; j++) {
        if (users[i]._id === filteredCoffees[j].user_FK) {
          filteredCoffees[j] = {
            ...filteredCoffees[j],
            id: users[i]._id,
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            username: users[i].username,
          };
        }
      }
    }
    return filteredCoffees;
  }

  filterBySelCountryBrewMethod(coffees: any, country: string, brewMethod: string) {
    return coffees
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.brewMethod === brewMethod),
        coffeeAttributes: x.coffeeAttributes
          .map((y, j) => {
            return { ...y, brewMethod: x.coffeeBrew[j] ? x.coffeeBrew[j].brewMethod : '' };
          })
          .filter((y) => y.brewMethod === brewMethod),
      }))
      .filter((x) => x.coffeeBrew.length !== 0 && x.country === country);
  }
}
