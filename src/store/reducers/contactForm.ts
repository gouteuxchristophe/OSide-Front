import { createAction, createReducer } from '@reduxjs/toolkit';

interface ContactFormState {
  name: string
  email: string
  message: string
  sendMail: {
    sendName: string
    sendEmail: string
    sendMessage: string
  },
}

// Gestion du state initial des projets
export const initialState: ContactFormState = {
  name: '',
  email: '',
  message: '',
  sendMail: {
    sendName: '',
    sendEmail: '',
    sendMessage: '',
  },
};

export const changeInputName = createAction<string>('settings/SUBMIT_CONTACT_FORM_NAME');
export const changeInputEmail = createAction<string>('settings/SUBMIT_CONTACT_FORM_EMAIL');
export const changeInputMessage = createAction<string>('settings/SUBMIT_CONTACT_FORM_MESSAGE');
export const sendMail = createAction<{
  sendName: string
  sendEmail: string
  sendMessage: string
}>('settings/SUBMIT_CONTACT_FORM_SEND_MAIL');

const contactFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeInputName, (state, action) => {
      state.name = action.payload;
    })
    .addCase(changeInputEmail, (state, action) => {
      state.email = action.payload;
    })
    .addCase(changeInputMessage, (state, action) => {
      state.message = action.payload;
    })
    .addCase(sendMail, (state, action) => {
      state.sendMail = action.payload;
      console.log(state.sendMail);
    });
});

export default contactFormReducer;
