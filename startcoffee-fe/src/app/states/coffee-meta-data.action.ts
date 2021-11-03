import { State, Action, StateContext } from '@ngxs/store';

// coffee meta info
export class SetMetaData {
  static readonly type = '[across Application] SetCoffeeOriginId';
  constructor(public originId: string | null, public brewId: string | null, public settings: any) {}
}

export interface CoffeeMetaDataModel {
  originId: string | null;
  brewId: string | null;
  settings: any;
}

@State<CoffeeMetaDataModel>({
  name: 'coffeemetadata',
  defaults: {
    originId: null,
    brewId: null,
    settings: { originModalConfirmed: false, gdprConfirmed: false }
  }
})
export class CoffeeMetaDataState {
  @Action(SetMetaData)
  setMetaData(ctx: StateContext<CoffeeMetaDataModel>, action: SetMetaData) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      originId: action.originId,
      brewId: action.brewId,
      settings: action.settings
    });
  }
}
