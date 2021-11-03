import { State, Action, StateContext } from '@ngxs/store';

export class SetBrewTime {
  static readonly type = '[Coffee BrewingProcess] SetBrewTime';
  constructor(public brewTime: any, public brewSubmitDate: string | any) {}
}

export interface BrewTimeModel {
  brewTime: any;
  brewSubmitDate: string | null;
}

@State<BrewTimeModel>({
  name: 'brewtime',
  defaults: {
    brewTime: null,
    brewSubmitDate: null
  }
})
export class CoffeeBrewTimeState {
  @Action(SetBrewTime)
  setBrewTime(ctx: StateContext<BrewTimeModel>, action: SetBrewTime) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      brewTime: action.brewTime,
      brewSubmitDate: action.brewSubmitDate
    });
  }
}
