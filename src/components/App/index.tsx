import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './styles.scss';
import Projects from '../Projects';
import ProjectDetail from '../Project/details';
import Error from '../Error';

function App() {
  //  Permet de scroller en haut de la page
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    // <div className="app">
    //   <h1 className="app__title">Vite + React</h1>
    //   <img src={reactLogo} alt="react logo" />
    // </div>
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
  );
}

export default App;
