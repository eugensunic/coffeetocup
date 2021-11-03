import { State, Action, StateContext } from '@ngxs/store';

export class ChooseCoffeeProcess {
  static readonly type = '[Coffee OriginCountry] SetProcess';
  constructor(public processType: string | null) {}
}

export interface CoffeeProcessModel {
  processType: string | null;
}

@State<CoffeeProcessModel>({
  name: 'coffeeprocess',
  defaults: {
    processType: null
  }
})
export class CoffeeProcessState {
  @Action(ChooseCoffeeProcess)
  chooseCoffeeProcess(ctx: StateContext<CoffeeProcessModel>, action: ChooseCoffeeProcess) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      processType: action.processType
    });
  }
}
