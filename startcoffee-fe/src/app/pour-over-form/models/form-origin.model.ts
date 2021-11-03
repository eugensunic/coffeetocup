export interface CoffeeOriginInputModel {
  country: string;
  roastingType: string;
  processingType: string;
  manufacturer: string;
  productionDate: string;
  originSubmitDate: string;
  coffeeOriginId?: string;
}

// coffeeOriginId is for updating the coffee it is not a parameter in mongodb origin document
