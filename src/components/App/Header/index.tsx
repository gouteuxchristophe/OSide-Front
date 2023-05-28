import logo from '../../../assets/logo.png';
import { useAppSelector } from '../../../hooks/redux';
import Menu from '../../Menu';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

function Header() {
  // Utilisation du selector pour récupérer les données de l'utilisateur
  const isLogged = useAppSelector((state) => state.login.logged);
  const userName = useAppSelector((state) => state.user.data.username);
  const githubLogin = useAppSelector((state) => state.user.data.github.login);

  return (
    <div className="flex items-center justify-between py-4 sticky top-0 z-10 bg-gradient-to-r from-emeral to-cyan">
      <div>
        <ToastContainer
        position="top-left"
        autoClose= {3000}
        hideProgressBar= {false}
        closeOnClick= {true}
        pauseOnHover= {true}
        draggable= {true}
        theme= "dark"
        limit={1} />
      </div>
      <div className="">
        <Link 
        to={'/'}>
        <img className="w-20 rounded-full" src={logo} alt="Logo O'Side" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="header-title text-2xl font-bold">O&apos;Side</h1>
        {isLogged && (
          <h2 className="text-sm">
            {(githubLogin.length === 0) ? userName : githubLogin}
          </h2>
        )}
      </div>
      <div className="rounded-full flex items-center">
        <div className="rounded-full">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default Header;
