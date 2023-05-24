import { useState } from "react";
import Admin_Techno from "./admin_techno";
import Admin_Users from "./admin_user";
import Admin_Projects from "./admin_projects";
import Admin_Roles from "./admin_roles";
import { useAppSelector } from "../../hooks/redux";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { getUserDataFromLocalStorage } from "../../utils/login";

function AdminPage() {

  const isLogged = useAppSelector(state => state.login.logged)

  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }

  // Permet de gérer l'affichage du menu
  const [showMenuAdmin, setShowMenuAdmin] = useState(true);
  const [showAdminTechno, setShowAdminTechno] = useState(false);
  const [showAdminUser, setShowAdminUser] = useState(false);
  const [showAdminRole, setShowAdminRole] = useState(false);
  const [showAdminProject, setShowAdminProject] = useState(false);
  
  // Permet de gérer l'affichage des sections
  const handleAdminSection = (value: string) => {
    setShowAdminTechno(value === 'technos');
    setShowAdminUser(value === 'users');
    setShowAdminProject(value === 'projects');
    setShowAdminRole(value === 'roles');
    setShowMenuAdmin(false);
  };
  // Permet de fermer les sections
  const handleCloseSection = (value: string) => {
    setShowAdminTechno(false);
    setShowAdminUser(false);
    setShowAdminProject(false);
    setShowAdminRole(false);
    setShowMenuAdmin(true);
  };

  return (
    <div>
      <>
        {showMenuAdmin && (
          <div className="flex flex-col gap-5 w-[60%] mx-auto">
            <button onClick={() => handleAdminSection('technos')} className="py-2 px-4 rounded bg-secondary20">Gestion des technos</button>
            <button onClick={() => handleAdminSection('users')} className="py-2 px-4 rounded bg-secondary20">Gestion des Utilisateurs</button>
            <button onClick={() => handleAdminSection('projects')} className="py-2 px-4 rounded bg-secondary20">Gestion des Projets</button>
            <button onClick={() => handleAdminSection('roles')} className="py-2 px-4 rounded bg-secondary20">Gestion des Rôles</button>
          </div>
        )}
      </>
      <>
        {showAdminTechno && (
          <Admin_Techno closeSection={() => handleCloseSection('technos')} />
        )}
        {showAdminUser && (
          <Admin_Users closeSection={() => handleCloseSection('users')} />
        )}
        {showAdminProject && (
          <Admin_Projects closeSection={() => handleCloseSection('projects')} />
        )}
        {showAdminRole && (
          <Admin_Roles closeSection={() => handleCloseSection('roles')} />
        )}
      </>
    </div>
  );
}

export default AdminPage;