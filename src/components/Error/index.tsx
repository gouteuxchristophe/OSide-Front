import error from '../../assets/404.jpg';

function Error() {
  return (
    <div className="flex justify-center align-middle">
      <img src={error} alt="404" className="mt-10" />
    </div>
  );
}

export default Error;
