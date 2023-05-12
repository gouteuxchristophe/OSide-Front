import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/projects';
import contactFormReducer from './reducers/contactForm';
import searchReducer from './reducers/search';
import loginReducer from './reducers/login';
import userReducer from './reducers/user';

// Configuration du store avec le reducer
const store = configureStore({
  reducer: {
    projects: projectsReducer,
    contactForm: contactFormReducer,
    search: searchReducer,
    login: loginReducer,
    user: userReducer,
  },
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
