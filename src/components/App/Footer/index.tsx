import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="flex justify-around items-center mt-2 bg-secondary20">
      <p className="text-[white] tracking-wider text-center">O&apos;Side copyright 2023</p>
      <div className="flex justify-center gap-2 items-center p-2">
        <Link to="/about" className="p-2 border border-solid border-[white] rounded-full bg-primary0">
          About
        </Link>
        <Link to="/rgpd" className="p-2 border border-solid border-[white] rounded-full bg-primary0">
          RGPD
        </Link>
      </div>
    </div>
  );
}

export default Footer;
