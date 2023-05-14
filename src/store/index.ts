import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/projects';
import contactFormReducer from './reducers/contactForm';
import searchReducer from './reducers/search';
import loginReducer from './reducers/login';
import userReducer from './reducers/user';
import loginWithGitHubReducer from './reducers/githubAuthReducer';

// ConfigureStore me permet de créer mon store
const store = configureStore({
  reducer: {
    projects: projectsReducer,
    contactForm: contactFormReducer,
    search: searchReducer,
    login: loginReducer,
    user: userReducer,
    gitHubAuth: loginWithGitHubReducer,
  },
});

export default store;

// Je créer mes types pour le store
export type RootState = ReturnType<typeof store.getState>;
// Je créer mon type pour le dispatch
export type AppDispatch = typeof store.dispatch;
