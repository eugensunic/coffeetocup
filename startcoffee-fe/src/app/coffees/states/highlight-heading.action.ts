import { State, Action, StateContext } from '@ngxs/store';

export class SetHeadingColor {
  static readonly type = '[Coffee Heading] SetHeadingColor';
  constructor(
    public isOriginHeading: boolean,
    public isOriginHeadingVisible: boolean,
    public isBrewHeading: boolean,
    public isBrewHeadingVisible: boolean
  ) {}
}

export interface HeadingHighlight {
  isOriginHeading: boolean;
  isOriginHeadingVisible: boolean;
  isBrewHeading: boolean;
  isBrewHeadingVisible: boolean;
}
@State<HeadingHighlight>({
  name: 'headinghighlight',
  defaults: {
    isOriginHeading: false,
    isOriginHeadingVisible: true,
    isBrewHeading: false,
    isBrewHeadingVisible: true
  }
})
export class HeadingColorState {
  @Action(SetHeadingColor)
  SetHeadingColor(ctx: StateContext<HeadingHighlight>, action: SetHeadingColor) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isOriginHeading: action.isOriginHeading,
      isOriginHeadingVisible: action.isOriginHeadingVisible,
      isBrewHeading: action.isBrewHeading,
      isBrewHeadingVisible: action.isBrewHeadingVisible
    });
  }
}
