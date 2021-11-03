export interface CoffeeBrewFilterModel {
  brewMethod: string[] | null;
  totalCoffees: number[] | null;
  totalBrews: number[] | null;
  avgCoffeeAmount: number[] | null;
  avgWaterAmount: number[] | null;
  mostUsedGrind: string[] | null;
}
