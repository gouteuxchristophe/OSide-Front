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
  commentLists: IComment[];
  blackList: string[];
  successPostComment: string;
  errorPostComment: string;
  errorGetComments: string;
}

export const initialState: CommentState = {
  commentLists: [],
  blackList: blacklist,
  successPostComment: '',
  errorPostComment: '',
  errorGetComments: '',
};


// On récupère l'ensemble des commentaires
export const getAllComments = createAppAsyncThunk('comment/GET_ALL_COMMENTS',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/comment');
      return data;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(errorGetComments(err.response.data.message));
      } else {
        thunkAPI.dispatch(errorGetComments('Une erreur s\'est produite'));
      }
    }
  });


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

// Gestion des messages d'erreur
export const errorPostComment = createAction<string>('comment/ERROR_POST_COMMENT');
export const errorGetComments = createAction<string>('comment/ERROR_GET_COMMENTS');
// On vide les messages d'erreur et de succés du post
export const resetsuccessPostComment = createAction('comment/RESET_SUCCESS_POST_COMMENT');
export const reseterrorPostComment = createAction('comment/RESET_ERROR_POST_COMMENT');
const commentReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(postComment.fulfilled, (state, action) => {
    console.log(action.payload);
    
    state.successPostComment = action.payload.message;
    state.commentLists.push(action.payload.data);
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
  .addCase(getAllComments.fulfilled, (state, action) => {
    state.errorGetComments = '';
    state.commentLists = action.payload;
  })
});

export default commentReducer;