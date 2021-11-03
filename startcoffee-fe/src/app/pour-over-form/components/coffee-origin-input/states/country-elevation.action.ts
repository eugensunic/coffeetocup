import { State, Action, StateContext } from '@ngxs/store';

export class SelectCountryElevation {
  static readonly type = '[Coffee OriginCountry] GetElevation';
  constructor(
    public elevation: string | null,
    public elevationFrom: string | null,
    public elevationTo: string | null
  ) {}
}

export interface CountryElevationModel {
  elevation: string | null;
  elevationFrom: string | null;
  elevationTo: string | null;
}

@State<CountryElevationModel>({
  name: 'countryelevation',
  defaults: {
    elevation: null,
    elevationFrom: null,
    elevationTo: null
  }
})
export class CountryElevationState {
  @Action(SelectCountryElevation)
  selectCountryElevation(ctx: StateContext<CountryElevationModel>, action: SelectCountryElevation) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      elevation: action.elevation,
      elevationFrom: action.elevationFrom,
      elevationTo: action.elevationTo
    });
  }
}
