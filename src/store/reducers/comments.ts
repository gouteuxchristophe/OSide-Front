import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { IComment } from "../../@types/project";
import blacklist from "../moderation";
import axiosInstance from "../../utils/axios";
import createAppAsyncThunk from "../../utils/redux";

interface PostCommentProps {
  project_id: number;
  content: string;
}

interface CommentState {
  comments: IComment[];
  blackList: string[];
  successPostComment: string;
  errorPostComment: string;
}

export const initialState: CommentState = {
  comments: [],
  blackList: blacklist,
  successPostComment: '',
  errorPostComment: '',
};

// On post un commentaire
export const postComment = createAppAsyncThunk('comment/POST_COMMENT',
  async (comment : PostCommentProps, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/projet/${comment.project_id}/comment`, {
        content: comment.content,
      });
      return data;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(errorPostComment(err.response.data.message));
      } else {
        thunkAPI.dispatch(errorPostComment('Une erreur s\'est produite'));
      }
    }
  });

// Gestion des messages d'erreur et de succés du post
export const errorPostComment = createAction<string>('comment/ERROR_POST_COMMENT');
// On vide les messages d'erreur et de succés du post
export const resetsuccessPostComment = createAction('comment/RESET_SUCCESS_POST_COMMENT');
export const reseterrorPostComment = createAction('comment/RESET_ERROR_POST_COMMENT');
const commentReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(postComment.fulfilled, (state, action) => {
    state.successPostComment = action.payload;
  })
  .addCase(errorPostComment, (state, action) => {
    state.errorPostComment = action.payload;
  })
  .addCase(resetsuccessPostComment, (state) => {
    state.successPostComment = '';
  })
  .addCase(reseterrorPostComment, (state) => {
    state.errorPostComment = '';
  })
});

export default commentReducer;