import { State, Action, StateContext } from '@ngxs/store';

export class SetCoffeeWaterRatio {
  static readonly type = '[Coffee BrewingProcess] SetRatio';
  constructor(public coffee: string | null, public water: string | null, public ratio: string | null) {}
}

export interface CoffeeWaterRatioModel {
  coffeeNumerator: string | null;
  waterDenominator: string | null;
  ratio: string | null;
}

@State<CoffeeWaterRatioModel>({
  name: 'ratio',
  defaults: {
    coffeeNumerator: null,
    waterDenominator: null,
    ratio: null
  }
})
export class CoffeeWaterRatioState {
  @Action(SetCoffeeWaterRatio)
  setCoffeeWaterRatio(ctx: StateContext<CoffeeWaterRatioModel>, action: SetCoffeeWaterRatio) {
    const state = ctx.getState();
    
    ctx.setState({
      ...state,
      coffeeNumerator: action.coffee,
      waterDenominator: action.water,
      ratio: action.ratio
    });
  }
}
