import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './styles.scss';

import Header from './Header';
import Footer from './Footer';
import ProjectDetail from '../Project/details';
import Error from '../Error';
import Projects from '../Projects';

function App() {
  //  Permet de scroller en haut de la page
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
            <Projects />

          )}
        />
        <Route
          path="/project/:id"
          element={(
            <ProjectDetail />
          )}
        />
        <Route
          path="/error"
          element={(
            <Error />
          )}
        />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
