import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="flex justify-around items-center my-2 bg-secondary10">
      <p>O&apos;Side copyright 2023</p>
      <div className="flex justify-center text-[black]">
        <Link to="/about" className="px-2 py-1 my-4 mx-1 text-center border-1 border-solid">
          About
        </Link>
        <Link to="/rgpd" className="px-2 py-1 my-4 mx-1 text-center border-1 border-solid">
          RGPD
        </Link>
      </div>
    </div>
  );
}

export default Footer;
