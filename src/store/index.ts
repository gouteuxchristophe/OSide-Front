import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/projects';
import searchReducer from './reducers/search';

// Configuration du store avec le reducer
const store = configureStore({
  reducer: {
    projects: projectsReducer,
    search: searchReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
