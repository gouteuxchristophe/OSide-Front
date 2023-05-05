import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import './styles.scss';

// import ProjectDetail from '../Project/details';
// import Error from '../Error';
// import Projects from '../Projects';


function App() {
  //  Permet de scroller en haut de la page
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (

    <Routes>
      <Route
        path="/"
        element={(
          <>
            <Header />
            {/* <Projects /> */}
            <Footer />
          </>
        )}
      />
      {/ <Route
        path="/project/:id"
        element={(
          // <ProjectDetail />

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
