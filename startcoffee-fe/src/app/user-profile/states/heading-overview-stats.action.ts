import { State, Action, StateContext } from '@ngxs/store';

export class SetHeadingOverviewStats {
  static readonly type = '[Coffee Heading] SetHeadingStats ';
  constructor(
    public originAmount: number | string | null,
    public countryAmount: number | string | null,
    public archiveAmount: number | string | null,
    public brewAttributesAmount: number | string | null
  ) {}
}

export interface HeadingOverviewStats {
  originAmount: number | string | null;
  countryAmount: number | string | null;
  archiveAmount: number | string | null;
  brewAttributesAmount: number | string | null;
}
@State<HeadingOverviewStats>({
  name: 'headingoverviewstats',
  defaults: {
    originAmount: '',
    countryAmount: '',
    archiveAmount: '',
    brewAttributesAmount: ''
  }
})
export class HeadingOverviewStatsState {
  @Action(SetHeadingOverviewStats)
  SetHeadingOverviewStats(ctx: StateContext<HeadingOverviewStats>, action: SetHeadingOverviewStats) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      originAmount: action.originAmount,
      countryAmount: action.countryAmount,
      archiveAmount: action.archiveAmount,
      brewAttributesAmount: action.brewAttributesAmount
    });
  }
}
