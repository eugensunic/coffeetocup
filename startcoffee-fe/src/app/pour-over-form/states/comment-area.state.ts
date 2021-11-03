import { State, Action, StateContext } from '@ngxs/store';

export class SetCommentTextArea {
  static readonly type = '[across UserPageInput] SetCommentTextArea';
  constructor(public commentText: string) {}
}

export interface CommentTextModel {
  commentText: string;
}
@State<CommentTextModel>({
  name: 'comment',
  defaults: {
    commentText: ''
  }
})
export class CommentTextState {
  @Action(SetCommentTextArea)
  SetCommentTextArea(ctx: StateContext<CommentTextModel>, action: SetCommentTextArea) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      commentText: action.commentText
    });
  }
}
