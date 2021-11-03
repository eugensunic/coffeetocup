import { CoffeeBrewMethodState } from './brew-method.action';
import { CoffeeBrewTimeState } from './brewing-time.action';
import { CoffeeWaterRatioState } from './coffee-water-ration.action';
import { CoffeeGrindingTypeState } from './grind-type.action';
import { Selector } from '@ngxs/store';

export class CoffeeBrewStates {
  @Selector([CoffeeBrewMethodState, CoffeeGrindingTypeState, CoffeeWaterRatioState, CoffeeBrewTimeState])
  static inputFormBrew(brewMethodType, grindType, ratio, brewTime) {
    return {
      ...brewMethodType,
      ...grindType,
      ...ratio,
      ...brewTime
    };
  }
}
