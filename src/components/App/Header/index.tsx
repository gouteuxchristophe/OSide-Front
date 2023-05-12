import logo from '../../../assets/logo.png';
import { useAppSelector } from '../../../hooks/redux';
import Menu from '../../Menu';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';

function Header() {
  const isLogged = useAppSelector((state) => state.login.logged);
  const userName = useAppSelector((state) => state.user.github_login);


  const displayLoginNotification = () => {
    toast.success('🦄 Login Success !', {
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

  useEffect(() => {
    if (isLogged) {
      displayLoginNotification();
    }
  }, [isLogged]);

  return (
    <div className="flex items-center justify-between py-4 sticky top-0 z-10 bg-secondary20">
      <div>
        <ToastContainer />
      </div>
      <div className="pl-5">
        <img className="w-10 sm:w-20 rounded-full" src={logo} alt="Logo O'Side" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">O&apos;Side</h1>
        {isLogged && (
          <h2 className="text-sm">
            {userName}
          </h2>
        )}
      </div>
      <div className="rounded-full flex items-center px-5">
        <div className="bg-secondary20 rounded-full">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default Header;
