import { State, Action, StateContext } from '@ngxs/store';

// THIS FILE REPRESENTS THE REFERENCE FILE INDICATING HOW NGSX ACTIONS SHOULD BE SET

/* inside [] indicates where the dispatch action came from (source)
 after it should come a verb indicating what we want to do with the entitiy on which the action is aimed to
 the last word represent the target entity

 general exmaple: [source] action-target
 let the class name be the same as the action-target
*/

/* export class MatchElevation,
   @Action(MatchElevation),
   matchElevation(ctx: StateContext<ElevationModel>)
   should have the same name
*/

/* passing data to action constructor params represent input arguments for the dispatch method
   name the action class without signfniying its real action. Keep it general. Inside the static
   readonly type define what the action is going to do.
*/

/* action should be named according to the action which will happen. Do not generalize names like you did before
   wrong example: (CountryName) good example: (GetCountryName)
*/

export class MatchElevation {
  static readonly type = '[Coffee OriginCountry] MatchElevation';
  constructor(public Countries: any[], public selectedCountry: string | null) {}
}

export interface MatchElevationModel {
  elevationList: string[];
}

/* the name is a required parameter and should be unique for every state,
defaults represent all the properties of the State
*/

@State<MatchElevationModel>({
  name: 'matchelevation',
  defaults: {
    elevationList: []
  }
})
export class MatchElevationState {
  @Action(MatchElevation)
  matchElevation(ctx: StateContext<MatchElevationModel>, action: MatchElevation) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      elevationList: action.Countries.filter(x => x.country === action.selectedCountry).map(x =>
        x.elevation.toString()
      )
    });
  }
}
