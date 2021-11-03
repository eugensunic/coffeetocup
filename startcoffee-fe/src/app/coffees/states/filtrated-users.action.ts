import { State, Action, StateContext } from '@ngxs/store';

export class SetFiltratedUsers {
  static readonly type = '[Coffee Coffees] SetFiltratedUsers';
  constructor(public userId, public users: any, public country: string, public brew: string) {}
}

export interface FiltratedUsers {
  userId: null | string;
  users: any;
  country: string | null;
  brew: string | null;
}
@State<FiltratedUsers>({
  name: 'filtratedUsers',
  defaults: {
    userId: null,
    users: null,
    country: null,
    brew: null
  }
})
export class FiltratedUsersState {
  @Action(SetFiltratedUsers)
  SetFiltratedUsers(ctx: StateContext<FiltratedUsers>, action: SetFiltratedUsers) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      userId: action.userId,
      users: action.users,
      country: action.country,
      brew: action.brew
    });
  }
}
