import { State, Action, StateContext } from '@ngxs/store';

export class SetProfileCoffeesData {
  static readonly type = '[Coffee Profile] SetProfileData ';
  constructor(public profileCoffees: any) {}
}

export interface ProfileCoffeesData {
  profileCoffees: any;
}
@State<ProfileCoffeesData>({
  name: 'profileData',
  defaults: {
    profileCoffees: null
  }
})
export class ProfileCoffeesDataState {
  @Action(SetProfileCoffeesData)
  SetProfileCoffeesData(ctx: StateContext<ProfileCoffeesData>, action: SetProfileCoffeesData) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      profileCoffees: action.profileCoffees
    });
  }
}
