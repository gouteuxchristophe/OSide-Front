import logo from '../../../assets/logo.png';
import { useAppSelector } from '../../../hooks/redux';
import Menu from '../../Menu';

function Header() {
  const isLogged = useAppSelector((state) => state.login.logged);
  const userName = useAppSelector((state) => state.login.github_login);

  return (
    <div className="flex items-center justify-between py-4 sticky top-0 z-10 bg-secondary20">
      <div className="pl-5">
        <img className="w-20 rounded-full" src={logo} alt="Logo O'Side" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">O&apos;Side</h1>
        {isLogged && (
          <h2 className="text-sm">
            Bienvenue
            {' '}
            {userName}
          </h2>
        )}
      </div>
      <div className="rounded-full flex items-center justify-end px-5">
        <div className="bg-secondary20 rounded-full">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default Header;
