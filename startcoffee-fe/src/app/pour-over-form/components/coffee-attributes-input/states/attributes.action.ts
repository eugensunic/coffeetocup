import { State, Action, StateContext } from '@ngxs/store';

export class SetAttributes {
  static readonly type = '[Coffee Attribute] SetAttributes';
  constructor(
    public attributes: {
      acidity: number | null;
      bitterness:  number | null;
      sweetness:  number | null;
      intensity:  number | null;
      overall:  number | null;
    } | null
  ) {}
}

export interface AttributesModel {
  attributes: {
    acidity: number | null;
    bitterness: number | null;
    sweetness: number | null;
    intensity: number | null;
    overall: number | null;
  } | null;
}

@State<AttributesModel>({
  name: 'attributes',
  defaults: {
    attributes: { acidity: null, bitterness: null, sweetness: null, intensity: null, overall: null }
  }
})
export class CoffeeAttributesState {
  @Action(SetAttributes)
  setAttributes(ctx: StateContext<AttributesModel>, action: SetAttributes) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      attributes: action.attributes
    });
  }
}
