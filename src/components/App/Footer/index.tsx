import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="flex flex-col justify-around items-center mt-2  ">
      <p className="tracking-wider text-center ">O&apos;Side copyright 2023</p>
      <p className='tracking-wider '>Créer par trois étudiants <a className='text-fof font-bold' target='_blank' href="https://oclock.io/?utm_source=google&utm_medium=cpc&utm_campaign=brand&adgroupname=oclock&keyword=o%27clock&gad=1&gclid=Cj0KCQjwyLGjBhDKARIsAFRNgW_ppkEcl9Cul7Y6nmJtgccpR1Jil1VTFFWdjkKS025ituQNlkEhK4MaAsYSEALw_wcB">O'Clock</a></p>
      <div className="flex justify-center gap-2 items-center p-2">
        <Link to="/about" className="p-2 border border-solid border-[white] rounded bg-primary0 tracking-wider">
          About
        </Link>
        <Link to="/rgpd" className="p-2 border border-solid border-[white] rounded bg-primary0 tracking-wider">
          RGPD
        </Link>
      </div>
    </div>
  );
}

export default Footer;
