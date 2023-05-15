import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
// typage des éléments envoyés en post à l'API
interface InputProps {
  username: string,
  last_name: string,
  first_name: string,
  email: string,
  password: string,
  passwordConfirm: string
}

function Register() {
  const navigate = useNavigate();
  // state qui va contenir tout le contenu des inputs au fur
  // et à mesure qu'ils se remplissent par le user
  const [inputs, setInputs] = useState<InputProps>({});
  // les deux states ci-dessous sont des booléens
  // qui permettent d'afficher ou de masquer les passwords en cliquant sur l'icone 'oeil'
  // (voir dans handleEyeClickPwd et handleEyeClickPwdVerif)
  const [clickEye, setClickEye] = useState(false);
  const [clickEyeVerif, setClickEyeVerif] = useState(false);

  // handleChange permet de récupérer les contenus des inputs (onChange)
  //  et de l'ajouter au state 'inputs' au fur et à mesure de la saisie
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  // permet de vérifier le format de l'email
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  // permet de vérifier le format du password
  const isValidPassword = (password: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\/])(?=.*[a-zA-Z]).{8,}$/.test(password);
  // permet d'envoyer les éléments contenus dans les inputs (en donc dans le state 'inputs')
  // tout en vérifiant au moment du submit le format de l'email
  // et la correspondance des deux passwords
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // si les deux passords et le format de l'email sont bon
    // on envoie un post vers l'API
    if (inputs.password as string === inputs.passwordConfirm
      && isValidEmail(inputs.email) && isValidPassword(inputs.password)) {
      console.log(inputs);
      axiosInstance.post('/user/register', inputs)
        .then((response) => {
          if (response.status === 200) {
            toast.success("🦄 Votre profil est créé !", {
              position: 'bottom-left',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            });
            navigate('/login');
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    // Si le format de l'email n'est pas correct une notification est envoyée
    } else if (isValidEmail(inputs.email) === false) {
      toast.error("🦄 L'email n'est pas valide", {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      console.log("🦄 L'email n'est pas valide");
      // Si le format du mot de passe n'est pas correct une notification est envoyée
    } else if (isValidPassword(inputs.password) === false) {
      toast.error("🦄 Le mot de passe n'est pas au bon format", {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      console.log('pas le bon format de mdp');
      // Si les mots de passe ne correspondent pas une notification est envoyée
    } else if (inputs.password as string !== inputs.passwordConfirm) {
      toast.error('🦄 Les mots de passe sont différents', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      console.log('Passwords différents !');
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
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="username">
                  Pseudo
                </label>
                <input value={inputs.username || ''} onChange={handleChange} required name="username" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white]" type="text" placeholder="Pseudo" />
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
                <input onChange={handleChange} required name="email" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="email" type="email" placeholder="votremail@mail.com" />
              </div>
            </div>
            {/* Password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input onChange={handleChange} required name="password" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password" type={clickEye ? 'text' : 'password'} placeholder="Mot de passe" />
                <button type="button" className="absolute top-9 right-6 bg-[white]" onClick={handleEyeClickPwd}>
                  {clickEye ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {/* Confirmation password */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="passwordConfirm">
                  Confirmation password
                </label>
                <input onChange={handleChange} required name="passwordConfirm" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" id="password_confirmation" type={clickEyeVerif ? 'text' : 'password'} placeholder="Confirmation mot de passe" />
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
              <div className="md:w-2/3" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
