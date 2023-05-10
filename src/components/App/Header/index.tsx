import logo from '../../../assets/logo.png';
import Menu from '../../Menu';

function Header() {
  return (
    <div className="flex items-center justify-around p-4 sticky top-0 z-10 bg-primary0">
      <div className="">
        <Menu />
      </div>
      <h1 className="text-2xl font-bold">O&apos;Side</h1>
      <img className="w-20 rounded-md" src={logo} alt="Logo O'Side" />
    </div>
  );
}

export default Header;
