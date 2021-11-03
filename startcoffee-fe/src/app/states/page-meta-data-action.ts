import { State, Action, StateContext } from '@ngxs/store';

// app page meta page elements
export class SetAppPageId {
  static readonly type = '[across Application] SetAppPageId';
  constructor(
    public isCoffeeUseClicked: boolean,
    public useCoffeeData: any | null,
    public pageName: string | null
  ) {}
}

export interface AppPageIdModel {
  isCoffeeUseClicked: boolean;
  useCoffeeData: any | null;
  pageName: string | null;
}

@State<AppPageIdModel>({
  name: 'pageid',
  defaults: {
    isCoffeeUseClicked: false,
    useCoffeeData: null,
    pageName: null
  }
})

// ----------------------------------------------------
export class AppPageIdState {
  @Action(SetAppPageId)
  setAppPageId(ctx: StateContext<AppPageIdModel>, action: SetAppPageId) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isCoffeeUseClicked: action.isCoffeeUseClicked,
      useCoffeeData: action.useCoffeeData,
      pageName: action.pageName
    });
  }
}
