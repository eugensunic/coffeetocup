import { State, Action, StateContext } from '@ngxs/store';

export class SetExtraction {
  static readonly type = '[Coffee Attributes] SetExtraction';
  constructor(public coffeeExtraction: string | null) {}
}

export interface CoffeeExtractionModel {
  extraction: string;
}

@State<CoffeeExtractionModel>({
  name: 'coffeeextraction',
  defaults: {
    extraction: null
  }
})
export class CoffeeExtractionState {
  @Action(SetExtraction)
  SetExtraction(ctx: StateContext<CoffeeExtractionModel>, action: SetExtraction) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      extraction: action.coffeeExtraction
    });
  }
}
