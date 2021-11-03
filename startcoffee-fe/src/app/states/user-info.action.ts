
import { State, Action, StateContext } from '@ngxs/store';

// user + coffee meta info
export class SetUserInfo {
  static readonly type = '[Global WelcomeStatusArea] SetUserInfo';
  constructor(public userInfo: any) {}
}

export interface UserInfoModel {
  userInfo: { id: string | null; firstName: string | null; lastName: string | null; email: string | null };
}

@State<UserInfoModel>({
  name: 'userinfo',
  defaults: {
    userInfo: { id: null, firstName: null, lastName: null, email: null }
  }
})
export class UserInfoState {
  @Action(SetUserInfo)
  setUserInfo(ctx: StateContext<UserInfoModel>, action: SetUserInfo) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      userInfo: action.userInfo
    });
  }
}
