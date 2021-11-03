import { State, Action, StateContext } from '@ngxs/store';

export class SetProductionDate {
  static readonly type = '[Coffee OriginCountry] GetProductionDate';
  constructor(public productionDate: any) {}
}

export interface CountryProductionDateModel {
  productionDate: { year: number; month: number; day: number };
}

@State<CountryProductionDateModel>({
  name: 'countryproductiondate',
  defaults: {
    productionDate: { year: 0, month: 0, day: 0 }
  }
})
export class CountryProductionDateState {
  @Action(SetProductionDate)
  setProductionDate(ctx: StateContext<CountryProductionDateModel>, action: SetProductionDate) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      productionDate: action.productionDate
    });
  }
}
