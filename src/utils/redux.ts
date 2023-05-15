import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
// createAppAsyncThunk me permet de typer mon thunk pour avoir accès au dispatch et au state
const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  state: RootState
}>();

export default createAppAsyncThunk;
