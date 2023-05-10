import { useState } from 'react';
import { Menu as Burger } from 'react-feather';
import logo from '../../../assets/logo.png';
import Menu from '../../Menu';

function Header() {
  // State qui gère l'affiche du menu via un toogle booléen
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  // Fonction qui modifie le state displayMenu
  const handleClickBtn = () => {
    setDisplayMenu(!displayMenu);
  };
  return (
    <div className="flex items-center justify-around p-4 bg-secondary10 sticky top-0">
      <div className="relative">
        {displayMenu && (
          <Menu />
        )}
        <button type="button" className="space-y-2" onClick={handleClickBtn}>
          <Burger />
        </button>
      </div>
      <h1 className="text-2xl font-bold">O&apos;Side</h1>
      <img className="w-20 rounded-md" src={logo} alt="Logo O'Side" />
    </div>
  );
}

export default Header;
