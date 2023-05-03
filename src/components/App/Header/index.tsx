import logo from '../../../assets/logo.png';
import './styles.scss';

function Header() {
  return (
    <div className="header">
      <h1 className="header__title">O&apos;Side</h1>
      <img className="header__logo" src={logo} alt="Logo O'Side" />
    </div>
  );
}

export default Header;
