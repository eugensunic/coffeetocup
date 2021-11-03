import { CoffeeExtractionState } from './extraction.action';
import { CoffeeFlavourState } from './flavour.action';
import { CoffeeAttributesState } from './attributes.action';
import { Selector } from '@ngxs/store';

export class CoffeeAttributesStates {
  @Selector([CoffeeAttributesState, CoffeeFlavourState, CoffeeExtractionState])
  static inputFormAttributes(attributes, flavour, extraction) {
    return {
      ...attributes,
      ...flavour,
      ...extraction
    };
  }
}
