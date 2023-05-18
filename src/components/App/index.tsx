import { Route, Routes, useLocation  } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectDetail from '../Project/details';
import Error from '../Error';
import Projects from '../Projects';
import About from '../About';
import SearchProject from '../Search';
import { getAllProjects } from '../../store/reducers/projects';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import AdminPage from '../Admin';
import { toast } from 'react-toastify';

function App() {
  const errorAPIUser = useAppSelector((state) => state.user.errorAPIUser);
  //  Permet de scroller en haut de la page à chaque nouvel affiche url
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Permet de lancer la requête API
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

   // Affiche la notification si la récupération des données de l'utilisateur a échoué
 useEffect(() => {
  if (errorAPIUser) {
    toast.error(errorAPIUser);
  }
}, [errorAPIUser]);


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
            <ProjectDetail/>
          )}
        />
        <Route
          path="/about"
          element={(
            <About />
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
          path="/login"
          element={(
            <Login />
          )}
        />
        <Route
          path="/register"
          element={(
            <Register />
          )}
        />
        <Route
          path="/dashboard"
          element={(
            <Dashboard />
          )}
        />
        <Route
          path="dashboard/admin"
          element={(
            <AdminPage />
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
