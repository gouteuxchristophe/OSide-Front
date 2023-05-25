import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="flex justify-around items-center mt-2 h-full ">
      <p className="tracking-wider text-center ">O&apos;Side copyright 2023</p>
      <p className='tracking-wider '>Créer par trois étudiants 
      <a className='text-fof font-bold' target='_blank' href="https://oclock.io/"> O'Clock</a>
      </p>
      <a href="https://oside.mimouss.fr/swagger-ui/" className='tracking-wider text-center' target='_blank' >Swagger</a>
      <div className="flex justify-center gap-2 items-center p-2">
        <Link to="/Contact" className="p-2 border border-solid border-[white] rounded bg-primary0 tracking-wider">
          Contact
        </Link>
        <Link to="/rgpd" className="p-2 border border-solid border-[white] rounded bg-primary0 tracking-wider">
          RGPD
        </Link>
      </div>
    </div>
  );
}

export default Footer;
