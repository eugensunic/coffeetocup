import { State, Action, StateContext } from '@ngxs/store';

// ---------------State for originFiltrate---------------
export class SetAllCoffeesUsersOrigin {
  static readonly type = '[Coffee Coffees] SetAllCoffeesUsersOrigin';
  constructor(public coffees: any, public users: any, public selCountry: string, public selBrew: string) {}
}

export interface AllCoffeesUsers {
  coffees: any;
  users: any;
  selCountry: string | null;
  selBrew: string | null;
}

@State<AllCoffeesUsers>({
  name: 'coffeesdata',
  defaults: {
    coffees: null,
    users: null,
    selCountry: null,
    selBrew: null
  }
})
export class AllCoffeesUsersState {
  @Action(SetAllCoffeesUsersOrigin)
  SetAllCoffeesUsersOrigin(ctx: StateContext<AllCoffeesUsers>, action: SetAllCoffeesUsersOrigin) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      coffees: action.coffees,
      users: action.users,
      selCountry: action.selCountry,
      selBrew: action.selBrew
    });
  }
}

// ---------------State for brewFiltrate---------------
export class SetAllCoffeesUsersBrew {
  static readonly type = '[Coffee Coffees] SetAllCoffeesUsersBrew';
  constructor(public coffees: any, public users: any, public selBrew: string, public selCountry: string) {}
}

export interface AllCoffeesUsersBrew {
  coffees: any;
  users: any;
  selBrew: string | null;
  selCountry: string | null;
}

@State<AllCoffeesUsersBrew>({
  name: 'coffeesdatabrew',
  defaults: {
    coffees: null,
    users: null,
    selBrew: null,
    selCountry: null
  }
})
export class AllCoffeesUsersStateBrew {
  @Action(SetAllCoffeesUsersBrew)
  SetAllCoffeesUsersBrew(ctx: StateContext<AllCoffeesUsers>, action: SetAllCoffeesUsersOrigin) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      coffees: action.coffees,
      users: action.users,
      selBrew: action.selBrew,
      selCountry: action.selCountry
    });
  }
}
