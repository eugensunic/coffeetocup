import { State, Action, StateContext } from '@ngxs/store';

export class SetRoastingImage {
  static readonly type = '[Coffee OriginCountry] SetRoasting';
  constructor(public roastingType: string | null) {}
}

export interface RoastingImageModel {
  roastingType: string | null;
  imageSelected: boolean;
}
@State<RoastingImageModel>({
  name: 'roastingimage',
  defaults: {
    roastingType: null,
    imageSelected: false,
  },
})
export class RoastingImageState {
  @Action(SetRoastingImage)
  setRoastingImage(ctx: StateContext<RoastingImageModel>, action: SetRoastingImage) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      roastingType: action.roastingType,
      imageSelected: !action.roastingType ? false : true,
    });
  }
}
