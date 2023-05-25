import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogged = useAppSelector(state => state.login.logged)
  const role = useAppSelector((state) => state.user.data.role);

  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }

  if (role.id !== 3) {
    toast.warn('🦄 Vous n\'avez pas accès à cette page !');
    return <Navigate to="/home" replace />
  }


  // Permet de gérer l'affichage des sections
  const [showAdminTechno, setShowAdminTechno] = useState(false);
  const [showAdminUser, setShowAdminUser] = useState(false);
  const [showAdminRole, setShowAdminRole] = useState(false);
  const [showAdminProject, setShowAdminProject] = useState(false);

  // Fonction pour mettre à jour l'état des sections en fonction de l'URL
  const updateSectionState = (pathname: string) => {
    setShowAdminTechno(pathname === "/admin/technos");
    setShowAdminUser(pathname === "/admin/users");
    setShowAdminProject(pathname === "/admin/projects");
    setShowAdminRole(pathname === "/admin/roles");
  };

  // Fonction pour mettre à jour l'URL en fonction de l'état des sections
  const updateURL = (section: string) => {
    let pathname = "/admin";
    if (section === "technos") {
      pathname += "/technos";
    } else if (section === "users") {
      pathname += "/users";
    } else if (section === "projects") {
      pathname += "/projects";
    } else if (section === "roles") {
      pathname += "/roles";
    }
    navigate(pathname);
  };

  // Effectue la mise à jour de l'état des sections lors du chargement de la page
  useEffect(() => {
    updateSectionState(location.pathname);
  }, []);

  // Effectue la mise à jour de l'état des sections lors du changement d'URL
  useEffect(() => {
    updateSectionState(location.pathname);
  }, [location]);

  // Permet de gérer l'affichage de la section
  const handleAdminSection = (value : string) => {
    updateURL(value);
  };

  return (
    <div className="mt-10">
          <div className="flex flex-col gap-5 w-[60%] mx-auto">
            <button onClick={() => handleAdminSection('technos')} className="py-2 px-4 rounded bg-secondary20">Gestion des technos</button>
            <button onClick={() => handleAdminSection('users')} className="py-2 px-4 rounded bg-secondary20">Gestion des Utilisateurs</button>
            <button onClick={() => handleAdminSection('projects')} className="py-2 px-4 rounded bg-secondary20">Gestion des Projets</button>
            <button onClick={() => handleAdminSection('roles')} className="py-2 px-4 rounded bg-secondary20">Gestion des Rôles</button>
          </div> 
    </div>
  );
}

export default AdminPage;