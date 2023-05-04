import './styles.scss';

function Footer() {
  return (
    <div className="flex justify-around items-center my-2">
      <p>O&apos;Side copyright 2023</p>
      <button type="button" className="rounded-lg bg-none border-2 border-solid border-black p-2">About / RGPD</button>
    </div>
  );
}

export default Footer;
