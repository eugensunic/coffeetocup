import { CountryProductionDateState } from './coffee-production-date.action';
import { RoastingImageState } from './roasting-image.action';
import { CountryElevationState } from './country-elevation.action';
import { MatchElevationState } from './country-match-elevation.action';
import { CountryNameState } from './country-name.action';
import { Selector } from '@ngxs/store';
import { CoffeeProcessState } from './coffee-process.action';
import { CoffeeManufacturerState } from './coffee-manufacturer';

export class CoffeeOriginStates {
  @Selector([
    CountryNameState,
    MatchElevationState,
    CountryElevationState,
    RoastingImageState,
    CoffeeProcessState,
    CoffeeManufacturerState,
    CountryProductionDateState
  ])
  static inputFormOrigin(
    countries,
    matchElevation,
    elevations,
    roastingImages,
    coffeeProcess,
    manufacturer,
    productionDate
  ) {
    return {
      ...countries,
      ...matchElevation,
      ...elevations,
      ...roastingImages,
      ...coffeeProcess,
      ...manufacturer,
      ...productionDate
    };
  }
}
