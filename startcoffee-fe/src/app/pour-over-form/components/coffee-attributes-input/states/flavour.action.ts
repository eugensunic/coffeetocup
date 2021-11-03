import { State, Action, StateContext } from '@ngxs/store';

export class SetFlavour {
  static readonly type = '[Coffee Attributes] SetFlavour';
  constructor(public flavour: any) {}
}

export interface FlavourModel {
  flavour: { fruity: false; nutty: false; choco: false; caramel: false; floral: false };
}

@State<FlavourModel>({
  name: 'flavour',
  defaults: {
    flavour: { fruity: false, nutty: false, choco: false, caramel: false, floral: false }
  }
})
export class CoffeeFlavourState {
  @Action(SetFlavour)
  setFlavour(ctx: StateContext<FlavourModel>, action: SetFlavour) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      flavour: {
        fruity: action.flavour.fruity,
        nutty: action.flavour.nutty,
        choco: action.flavour.choco,
        caramel: action.flavour.caramel,
        floral: action.flavour.floral
      }
    });
  }
}
