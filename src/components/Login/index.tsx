import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { KeysOfCredentials, changeCredentialsField, login, loginOAuth, updateCode } from '../../store/reducers/login';
import { getUserById } from '../../store/reducers/user';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { GitHub } from 'react-feather';

function Login() {
  // Utilisation du selector pour récupérer les données de l'utilisateur
  const email = useAppSelector((state) => state.login.credentials.email);
  const password = useAppSelector((state) => state.login.credentials.password);
  const isLogged = useAppSelector((state) => state.login.logged);
  const errorLogin = useAppSelector((state) => state.login.message);
  const dispatch = useAppDispatch();

  const handleGitHubAuth = () => {
    const clientId = '68016fb353cfb675fa69';
    const redirectUri = 'http://localhost:5173/login';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  }
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      dispatch(updateCode(code))
      dispatch(loginOAuth())
    }
  }, []);

    // Permet d'afficher une notification d'erreur lors de la connexion
    const displayErrorNotification = () => {
      toast.error(`🦄 ${errorLogin}`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };
    // Affiche la notification si la connexion échoue
    useEffect(() => {
      if (errorLogin) {
        displayErrorNotification();
      }
    }, [errorLogin]);

    // Permet de changer la valeur des champs du formulaire
    function handleChangeField(event: React.ChangeEvent<HTMLInputElement>): void {
      const newValue = event.target.value;
      const fieldName = event.target.name as KeysOfCredentials;
      dispatch(changeCredentialsField({
        propertyKey: fieldName,
        value: newValue,
      }));
    }
    // Permet de soumettre le formulaire
    const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      dispatch(login());
    };

    const navigate = useNavigate();
    // Redirige l'utilisateur vers la page d'accueil si il est connecté
    useEffect(() => {
      if (isLogged) {
        navigate('/');
      }
    }, [isLogged, dispatch, navigate]);

    return (
      <section className="">
        <div>
          <ToastContainer />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-[white] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                Sign in to your account
              </h1>
              <div>
                <button onClick={handleGitHubAuth} className='flex gap-2 text-[white] bg-primary0 font-medium rounded-lg text-sm px-5 py-2.5 text-center' > <GitHub className='text-[black]' />Login with Github</button>
              </div>
              <form onSubmit={handleSubmitLogin} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                  <input value={email} onChange={handleChangeField} type="email" name="email" id="email" className="border border-secondary20 sm:text-sm rounded-lg  block w-full p-2.5" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                  <input value={password} onChange={handleChangeField} type="password" name="password" id="password" placeholder="••••••••" className="border border-secondary20 sm:text-sm rounded-lg  block w-full p-2.5" required />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-primary0 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember">Remember me</label>
                    </div>
                  </div>
                  <Link to="/" className="text-sm font-medium">Forgot password?</Link>
                </div>
                <button type="submit" className="w-full text-[white] bg-primary0 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  {' '}
                  <Link to="/register" className="font-medium">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }

  export default Login;
