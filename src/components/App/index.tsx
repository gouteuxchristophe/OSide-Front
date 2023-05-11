import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectDetail from '../Project/details';
import Error from '../Error';
import Projects from '../Projects';
import SearchProject from '../Search';

function App() {
  //  Permet de scroller en haut de la page à chaque nouvel affiche url
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="flex flex-col justify-between max-w-screen-xl min-h-screen my-0 mx-auto border border-solid border-secondary20">
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
          path="/projects"
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
          path="/search"
          element={(
            // Affichage page erreur 404
            <SearchProject />
          )}
        />
        <Route
          path="/error"
          element={(
            // Affichage page erreur 404
            <Error />
          )}
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
