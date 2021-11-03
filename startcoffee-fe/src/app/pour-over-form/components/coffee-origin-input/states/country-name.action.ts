import { State, Action, StateContext } from '@ngxs/store';

// action1
export class PopulateCountryList {
  static readonly type = '[Coffee OriginCountry] GetCountries';
  constructor(public countryList: any[]) {}
}
// action2
export class SelectCountry {
  static readonly type = '[Coffee OriginCountry] GetCountry';
  constructor(public selectedCountry: string | null) {}
}

export interface CountryNameModel {
  countryList: string[] | null;
  country: string | null;
}

@State<CountryNameModel>({
  name: 'countryname',
  defaults: {
    countryList: [],
    country: null
  }
})
export class CountryNameState {
  // action1
  @Action(PopulateCountryList)
  populateCountryList(ctx: StateContext<CountryNameModel>, action: PopulateCountryList) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      countryList: action.countryList.map((x: any) => x.country).filter((v, i, a) => a.indexOf(v) === i)
    });
  }
  // action2
  @Action(SelectCountry)
  selectCountry(ctx: StateContext<CountryNameModel>, action: SelectCountry) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      country: action.selectedCountry
    });
  }
}
