import { ChangeEvent, FormEvent, useState } from 'react';
import axiosInstance from 'axios';
import { Eye, EyeOff } from 'react-feather';
// typage des éléments envoyés en post à l'API
interface InputProps {
  user_name: string,
  last_name: string,
  first_name: string,
  user_email: string,
  user_password: string,
  user_password_confirmation: string
}

function Register() {
  // state qui va contenir tout le contenu des inputs au fur
  // et à mesure qu'ils se remplissent par le user
  const [inputs, setInputs] = useState<InputProps>({});
  // state qui sera un booléen qui va permettre de valider
  // que le password et la confirmation de password sont identiques
  // au moment du la soumission du form (voir dans handleSubmitForm)
  const [passwordVerification, setPasswordVerification] = useState(false);
  // les deux states ci-dessous sont des booléens
  // qui permettent d'afficher ou de masquer les passwords en cliquant sur l'icone 'oeil'
  // (voir dans handleEyeClickPwd et handleEyeClickPwdVerif)
  const [clickEye, setClickEye] = useState(false);
  const [clickEyeVerif, setClickEyeVerif] = useState(false);
  // state booléen qui va permettre la vérification du format de l'email
  const [emailVerification, setEmailVerification] = useState(false);

  // handleChange permet de récupérer les contenus des inputs (onChange)
  //  et de l'ajouter au state 'inputs' au fur et à mesure
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  // permet de vérifier le format de l'email
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // permet d'envoyer les éléments contenus dans les inputs (en donc dans le state 'inputs')
  // tout en vérifiant au moment du submit le format de l'email
  // et la correspondance des deux passwords
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // on reset ces deux states afin de faire disparaître les messages
    // d'erreur s'ils sont affichés ('Les passwords ne correspondent pas'
    // et 'l'email n'est pas valide')
    setPasswordVerification(false);
    setEmailVerification(false);
    // si les deux passords et le format de l'email sont bon
    // on envoie un post vers l'API
    if (inputs.user_password as string === inputs.user_password_confirmation
      && isValidEmail(inputs.user_email)) {
      console.log(inputs);
      axiosInstance.post('/user', { inputs })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      // sinon on affiche les message que les deux passwords ne correspondent pas
    } else if (inputs.user_password as string !== inputs.user_password_confirmation) {
      setPasswordVerification(true);
    // et si ce n'est pas les passwords cela signifie que le format de l'email n'est pas correct
    } else {
      setEmailVerification(true);
    }
  };
  // écouteur sur l'icone oeil du password pour l'afficher
  const handleEyeClickPwd = () => {
    if (clickEye === false) {
      setClickEye(true);
    } else if (clickEye === true) { setClickEye(false); }
  };
  // écouteur sur l'icone oeil du password vérification pour l'afficher
  const handleEyeClickPwdVerif = () => {
    if (clickEyeVerif === false) {
      setClickEyeVerif(true);
    } else if (clickEyeVerif === true) { setClickEyeVerif(false); }
  };

  return (
    <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-rg shadow-xl bg-white opacity-75 mx-auto border-2 border-solid border-secondary10 my-4">
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
                {emailVerification && (
                <p className="text-[red] mx-2">l&apos;email n&apos;est pas valide</p>
                )}
                <input onChange={handleChange} required name="user_email" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="email" type="email" placeholder="votremail@mail.com" />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  Password
                </label>
                <input onChange={handleChange} required name="user_password" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password" type={clickEye ? 'text' : 'password'} placeholder="Mot de passe" />
                <button type="button" className="absolute top-9 right-6 bg-[white]" onClick={handleEyeClickPwd}>
                  {clickEye ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {/* Confirmation password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  Confirmation password
                </label>
                <input onChange={handleChange} required name="user_password_confirmation" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password_confirmation" type={clickEyeVerif ? 'text' : 'password'} placeholder="Confirmation mot de passe" />
                <button type="button" className="absolute top-9 right-6 bg-[white]" onClick={handleEyeClickPwdVerif}>
                  {clickEyeVerif ? <EyeOff /> : <Eye />}
                </button>
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
