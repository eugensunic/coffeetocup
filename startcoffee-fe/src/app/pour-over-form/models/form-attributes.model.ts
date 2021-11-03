import { CoffeeFlavourModel } from './flavour.model';

export interface CoffeeAttributeInputModel {
  acidity: Number;
  bitterness: Number;
  intensity: Number;
  sweetness: Number;
  overall: Number;
  flavour: CoffeeFlavourModel;
  commentText: string;
  formSubmitDate: string;
  coffeeOriginId?: string;
  coffeeBrewId?: string;
}
