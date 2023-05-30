import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { IComment } from "../../@types/project";
import blacklist from "../moderation";
import axiosInstance from "../../utils/axios";
import createAppAsyncThunk from "../../utils/redux";
import { log } from "console";

interface PostCommentProps {
  project_id: number;
  content: string;
}

interface DeleteCommentProps {
  id: number;
}

interface CommentState {
  commentLists: IComment[];
  blackList: string[];
  successPostComment: string;
  errorPostComment: string;
  errorGetComments: string;
  deleteCommentSuccess: string;
  successDelete: string;
  errorAPIComments: string;
}

export const initialState: CommentState = {
  commentLists: [],
  blackList: blacklist,
  successPostComment: '',
  errorPostComment: '',
  errorGetComments: '',
  deleteCommentSuccess: '',
  errorAPIComments: '',
  successDelete: '',
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
      console.log(data);
      return data;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(errorPostComment(err.response.data.message));
      } else {
        thunkAPI.dispatch(errorPostComment('Une erreur s\'est produite'));
      }
    }
  });

  export const deleteComment = createAppAsyncThunk('comment/DELETE_COMMENT',
  async (idComment : number, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/comment/${idComment}`);
      return data;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setCommentErrorMessage(err.response.data.message));
      } else {
        thunkAPI.dispatch(setCommentErrorMessage('Une erreur s\'est produite'));
      }
    }
  });

// Gestion des messages d'erreur
export const errorPostComment = createAction<string>('comment/ERROR_POST_COMMENT');
export const errorGetComments = createAction<string>('comment/ERROR_GET_COMMENTS');
export const setCommentErrorMessage = createAction<string>('comment/SET_Comment_ERROR_MESSAGE');
export const deleteCommentErrorMessage = createAction('comment/DELETE_Comment_ERROR_MESSAGE');
export const deleteMessage = createAction('comment/DELETE_MESSAGE');
// On vide les messages d'erreur et de succés du post
export const resetsuccessPostComment = createAction('comment/RESET_SUCCESS_POST_COMMENT');
export const reseterrorPostComment = createAction('comment/RESET_ERROR_POST_COMMENT');
const commentReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(postComment.fulfilled, (state, action) => {   
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
  .addCase(deleteComment.fulfilled, (state, action) => {
    state.successDelete = action.payload.message;
  })
  .addCase(deleteCommentErrorMessage, (state) => {
    state.errorAPIComments = '';
  })
    // On vide le message de succès de la suppression d'une techno
    .addCase(deleteMessage, (state) => {
      state.successDelete = '';
    })
});

export default commentReducer;