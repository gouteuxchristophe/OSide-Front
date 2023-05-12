import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

function Register() {
  const [inputs, setInputs] = useState({});
  const [passwordVerification, setPasswordVerification] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordVerification(false);
    if (inputs.user_password === inputs.user_password_confirmation) {
      axios.post('https://oside.mimouss.fr/api/user', { inputs })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPasswordVerification(true);
    }
  };

  return (
    <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-rg shadow-xl bg-white opacity-75 mx-auto border-2 border-solid border-secondary10">
      <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
        <div className="flex flex-col items-center justify-between mb-3">
          <h1 className="text-2xl font-bold lg:pt-0 text-center my-4">S&apos;inscrire</h1>
          <form onSubmit={handleSubmitForm} className="w-full max-w-lg">
            {/* Pseudo */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="user_name">
                  Pseudo
                </label>
                <input value={inputs.user_name || ''} onChange={handleChange} required name="user_name" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white]" id="user_name" type="text" placeholder="Pseudo" />
              </div>
            </div>
            {/* Last name */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="last_name">
                  Nom
                </label>
                <input value={inputs.last_name || ''} onChange={handleChange} name="last_name" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white]" id="last_name" type="text" placeholder="Nom" />
              </div>
            </div>
            {/* First name */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="first_name">
                  Prénom
                </label>
                <input onChange={handleChange} name="first_name" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white]" id="first_name" type="text" placeholder="Prénom" />
              </div>
            </div>
            {/* Email */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  E-mail
                </label>
                <input onChange={handleChange} required name="user_email" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="email" type="email" placeholder="votremail@mail.com" />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  Password
                </label>
                <input onChange={handleChange} required name="user_password" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password" type="password" placeholder="Mot de passe" minlength="8"/>
              </div>
            </div>
            {/* Confirmation password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  Confirmation password
                </label>
                <input onChange={handleChange} required name="user_password_confirmation" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password_confirmation" type="password" placeholder="Confirmation mot de passe" />
              </div>
            </div>
            {/* Register button */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button className="shadow bg-secondary10 hover:bg-secondary13 focus:shadow-outline focus:outline-none text-[white] font-bold py-2 px-4 rounded" type="submit">
                  S&apos;inscrire
                </button>
              </div>
              {passwordVerification
                && (
                  <p className="text-[red] mx-2">Les passwords ne correspondent pas</p>
                )}
              <div className="md:w-2/3" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
