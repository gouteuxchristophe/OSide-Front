import { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import {
  changeInputName, changeInputEmail, changeInputMessage, sendMail,
} from '../../../store/reducers/contactForm';

function Contact() {
  const contactFormName = useAppSelector((state) => state.contactForm.name);
  const contactFormEmail = useAppSelector((state) => state.contactForm.email);
  const contactFormMessage = useAppSelector((state) => state.contactForm.message);
  
  const dispatch = useAppDispatch();

  const handleChangeInputName = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    dispatch(changeInputName(newValue));
    console.log(e.target.value);
  };
  const handleChangeInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    dispatch(changeInputEmail(newValue));
    console.log(e.target.value);
  };
  const handleChangeInputMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    dispatch(changeInputMessage(newValue));
    console.log(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(sendMail());
  };
  return (
    <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 mx-6 lg:mx-0 border-2 border-solid border-secondary10">
      <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
        <div className="flex flex-col items-center justify-between mb-3">
          <h1 className="text-2xl font-bold lg:pt-0 text-center my-4">Nous contacter</h1>
          <form onSubmit={handleSubmitForm} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="name">
                  Nom
                </label>
                <input onChange={handleChangeInputName} name="name" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white]" id="name" type="text" placeholder="Nom" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  E-mail
                </label>
                <input onChange={handleChangeInputEmail} name="email" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="email" type="email" placeholder="votremail@mail.com" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <input onChange={handleChangeInputMessage} name="message" type="text" className=" no-resize appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500] h-48 resize-none" id="message" placeholder="Ecrivez votre message ici..." />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button className="shadow bg-secondary10 hover:bg-secondary13 focus:shadow-outline focus:outline-none text-[white] font-bold py-2 px-4 rounded" type="submit">
                  Envoyer
                </button>
              </div>
              <div className="md:w-2/3" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
