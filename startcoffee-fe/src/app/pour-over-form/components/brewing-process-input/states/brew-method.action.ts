import { State, Action, StateContext } from '@ngxs/store';

export class SetBrewMethod {
  static readonly type = '[Coffee BrewingProcess] SetBrewMethod';
  constructor(public brewMethodType: string | null) {}
}

export interface BrewMethodModel {
  brewMethodType: string | null;
}

@State<BrewMethodModel>({
  name: 'brewmethod',
  defaults: {
    brewMethodType: null
  }
})
export class CoffeeBrewMethodState {
  @Action(SetBrewMethod)
  setBrewMethod(ctx: StateContext<BrewMethodModel>, action: SetBrewMethod) {
    const state = ctx.getState();
    
    ctx.setState({
      ...state,
      brewMethodType: action.brewMethodType
    });
  }
}
