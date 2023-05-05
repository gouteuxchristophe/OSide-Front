import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectDetail from '../Project/details';
import Error from '../Error';
import Projects from '../Projects';

function App() {
  //  Permet de scroller en haut de la page à chaque nouvel affiche url
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            // Affichage des derniers projets
            <Projects />

          )}
        />
        <Route
          path="/project/:id"
          element={(
            // Affichage d'un projet par id
            <ProjectDetail />
          )}
        />
        <Route
          path="/error"
          element={(
            // Affichage page erreur 404
            <Error />
          )}
        />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
