function Menu() {
  return (
    <div className="flex flex-col absolute top-12 left-2 bg-primary3 px-3">
      <ul>
        <a href="/">
          <li className="my-2">Accueil</li>
        </a>
        <a href="/login">
          <li className="my-2">Login</li>
        </a>
        <a href="/projects">
          <li className="my-2">Projets</li>
        </a>
        <a href="/search">
          <li className="my-2">Rechercher</li>
        </a>
      </ul>
    </div>
  );
}

export default Menu;
