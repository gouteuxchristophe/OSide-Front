import { useState } from "react";
import Admin_Techno from "./admin_techno";
import Admin_Users from "./admin_user";
import Admin_Projects from "./admin_projects";
import Admin_Roles from "./admin_roles";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserDataFromLocalStorage } from "../../utils/login";
import { LoginResponse } from "../../@types/login";
import { useAppSelector } from "../../hooks/redux";

function AdminPage() {

  const [showMenuAdmin, setShowMenuAdmin] = useState(true);
  const [showAdminTechno, setShowAdminTechno] = useState(false);
  const [showAdminUser, setShowAdminUser] = useState(false);
  const [showAdminRole, setShowAdminRole] = useState(false);
  const [showAdminProject, setShowAdminProject] = useState(false);
  const userData = useAppSelector((state) => state.user.data);
  // Object { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0NjYzOTcxLCJleHAiOjE2ODQ3NTAzNzF9.z3qjC8gxJG6mKAOOWfbJcXWOQ6ZAcGAgvD8hES8QI5Y", id: 1, logged: true, role: "Administrateur" }
  const role = userData.role.id
  

  if (role !== 3) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }

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
            <button onClick={() => handleAdminSection('technos')} className="py-2 px-4 rounded bg-secondary20 border-2 border-solid">Gestion des technos</button>
            <button onClick={() => handleAdminSection('users')} className="py-2 px-4 rounded bg-secondary20 border-2 border-solid">Gestion des Utilisateurs</button>
            <button onClick={() => handleAdminSection('projects')} className="py-2 px-4 rounded bg-secondary20 border-2 border-solid">Gestion des Projets</button>
            <button onClick={() => handleAdminSection('roles')} className="py-2 px-4 rounded bg-secondary20 border-2 border-solid">Gestion des Rôles</button>
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