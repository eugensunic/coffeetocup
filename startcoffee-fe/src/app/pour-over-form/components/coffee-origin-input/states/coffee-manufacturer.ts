import { State, Action, StateContext } from '@ngxs/store';

export class SetManufacturerName {
  static readonly type = '[Coffee Origin] SetManufacturer';
  constructor(public manufacturerName: string | null, public originSubmitDate: string | null) {}
}

export interface CoffeeManufacturerModel {
  manufacturer: string | null;
  originSubmitDate: string | null;
}

@State<CoffeeManufacturerModel>({
  name: 'coffeemanufacturer',
  defaults: {
    manufacturer: null,
    originSubmitDate: null
  }
})
export class CoffeeManufacturerState {
  @Action(SetManufacturerName)
  setManufacturerName(ctx: StateContext<CoffeeManufacturerModel>, action: SetManufacturerName) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      manufacturer: action.manufacturerName,
      originSubmitDate: action.originSubmitDate
    });
  }
}
