import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="flex flex-col absolute top-8 left-2 bg-secondary10 px-3 shadow-3xl rounded-md">
      <ul>
        <Link to="/">
          <li className="my-2 hover:bg-secondary13 px-1 rounded-md transition-all">Accueil</li>
        </Link>
        <Link to="/login">
          <li className="my-2 hover:bg-secondary13 px-1 rounded-md transition-all">Login</li>
        </Link>
        <Link to="/projects">
          <li className="my-2 hover:bg-secondary13 px-1 rounded-md transition-all">Projets</li>
        </Link>
        <Link to="/search">
          <li className="my-2 hover:bg-secondary13 px-1 rounded-md transition-all">Rechercher</li>
        </Link>
      </ul>
    </div>
  );
}

export default Menu;
