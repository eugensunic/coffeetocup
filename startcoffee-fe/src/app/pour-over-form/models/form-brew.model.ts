export interface CoffeeBrewInputModel {
  technique: string;
  brewMethod: string;
  grindType: string;
  ratio: { ratio: string; coffeeNumerator: string; waterDenominator: string };
  brewTime: string;
  brewSubmitDate: string;
  coffeeOriginId?: string;
  country?: string;
}
