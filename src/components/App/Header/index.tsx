import { useState } from 'react';
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
    <div className="flex items-center justify-around p-4">
      <div className="relative">
        {displayMenu && (
          <Menu />
        )}
        <button type="button" className="space-y-2" onClick={handleClickBtn}>
          <div className="w-8 h-0.5 bg-gray-600" />
          <div className="w-8 h-0.5 bg-gray-600" />
          <div className="w-8 h-0.5 bg-gray-600" />
        </button>
      </div>
      <h1 className="text-2xl font-bold">O&apos;Side</h1>
      <img className="w-20" src={logo} alt="Logo O'Side" />
    </div>
  );
}

export default Header;
