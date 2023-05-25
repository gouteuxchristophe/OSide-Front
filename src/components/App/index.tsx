import { Route, Routes, useLocation } from 'react-router-dom';
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
import { getUserById, resetSuccessDelete } from '../../store/reducers/user';
import AddProjects from '../Project/add';
import UserProfile from '../Profile';
import Admin_Techno from '../Admin/admin_techno';
import Admin_Projects from '../Admin/admin_projects';
import Admin_Users from '../Admin/admin_user';
import Admin_Roles from '../Admin/admin_roles';
import Contact from '../Contact';
import RGPD from '../RGPD';
        
function App() {
  // state pour les erreurs de l'API sur getprojet
  const errorAPIUser = useAppSelector((state) => state.user.errorAPIUser);
  // state pour s'assurer de la réception des données de l'API
  const dataReception = useAppSelector((state) => state.projects.dataReception);
  // state qui défini si l'utilisateur est connecté ou non
  const isLogged = useAppSelector((state) => state.login.logged);
  // state pour le message de delete de l'utilisateur
  const successDelete = useAppSelector(state => state.user.successDelete)
  //  Permet de scroller en haut de la page à chaque nouvel affiche url
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Permet de lancer la requête API
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!dataReception) {
      dispatch(getAllProjects());
    }
  }, [dispatch, dataReception]);
  // Permet de récupérer les données de l'utilisateur
  useEffect(() => {
    if (sessionStorage) {
      dispatch(getUserById())
    }
  }, [dispatch, sessionStorage]);

  // Affiche la notification si la récupération des données de l'utilisateur a échoué
  useEffect(() => {
    if (errorAPIUser) {
      toast.error(errorAPIUser);
    }
  }, [errorAPIUser]);
  
  // useEffect pour le delete
  useEffect(() => {
    if (successDelete) {
      toast.success(`🦄 ${successDelete}`)
      dispatch(resetSuccessDelete())
    }
  }, [successDelete])

  return (
    <div className="flex flex-col justify-between max-w-screen-xl min-h-screen my-0 mx-auto border border-solid bg-gradient-to-t from-emeral to-cyan">
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
          path="/about"
          element={(
            <About />
          )}
        />
                <Route
          path="/contact"
          element={(
            <Contact />
          )}
        />
        <Route
          path="/search"
          element={(
            // Affichage page search
            <SearchProject />
          )}
        />
        <Route
          path="/login"
          element={(
            // Affichage page login
            <Login />
          )}
        />
        <Route
          path="/register"
          element={(
            // Affichage page register
            <Register />
          )}
        />
        <Route
          path="/dashboard"
          element={(
            // Affichage page dashboard
            <Dashboard />
          )}
        />
        <Route
          path="/admin"
          element={(
            // Affichage page admin
            <AdminPage />
          )}
        />
        <Route
          path="/admin/technos"
          element={(
            // Affichage page admin
            <Admin_Techno />
          )}
        />
        <Route
          path="/admin/projects"
          element={(
            // Affichage page admin
            <Admin_Projects />
          )}
        />
        <Route
          path="/admin/users"
          element={(
            // Affichage page admin
            <Admin_Users />
          )}
        />
        <Route
          path="/admin/roles"
          element={(
            // Affichage page admin
            <Admin_Roles />
          )}
        />
        <Route
          path="/addProject"
          element={(
            // Affichage page ajout de projet
            <AddProjects />
          )}
        />        
        <Route
        path="/rgpd"
        element={(
          // Affichage page ajout de projet
          <RGPD />
        )}
      />
        <Route
          path="/profile/:id"
          element={(
            // Affichage page ajout de projet
            <UserProfile />
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