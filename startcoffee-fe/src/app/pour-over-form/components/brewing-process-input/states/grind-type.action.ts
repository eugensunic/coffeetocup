import { State, Action, StateContext } from '@ngxs/store';

export class SetGrindingType {
  static readonly type = '[Coffee BrewingProcess] SetGrindType';
  constructor(public grindType: string | null) {}
}

export interface GrindTypeModel {
  grindType: string | null;
}

@State<GrindTypeModel>({
  name: 'grind',
  defaults: {
    grindType: null
  }
})
export class CoffeeGrindingTypeState {
  @Action(SetGrindingType)
  setGrindingType(ctx: StateContext<GrindTypeModel>, action: SetGrindingType) {
    const state = ctx.getState();
    
    ctx.setState({
      ...state,
      grindType: action.grindType
    });
  }
}
