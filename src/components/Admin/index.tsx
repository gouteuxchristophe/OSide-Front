import { useState } from "react";
import Admin_Techno from "./admin_techno";
import Admin_Users from "./admin_user";
import Admin_Projects from "./admin_projects";

function AdminPage() {
  const [showMenuAdmin, setShowMenuAdmin] = useState(true);
  const [showAdminTechno, setShowAdminTechno] = useState(false);
  const [showAdminUser, setShowAdminUser] = useState(false);
  const [showAdminProject, setShowAdminProject] = useState(false);
  
  // Permet de gérer l'affichage des sections
  const handleAdminSection = (value: string) => {
    setShowAdminTechno(value === 'technos');
    setShowAdminUser(value === 'users');
    setShowAdminProject(value === 'projects');
    setShowMenuAdmin(false);
  };
  // Permet de fermer les sections
  const handleCloseSection = (value: string) => {
    setShowAdminTechno(false);
    setShowAdminUser(false);
    setShowAdminProject(false);
    setShowMenuAdmin(true);
  };

  return (
    <div className="">
    <>
    {showMenuAdmin && (
      <div className="flex flex-col gap-5 w-[60%] mx-auto">
        <button onClick={() => handleAdminSection('technos')} className="py-2 px-4 rounded bg-secondary20 border-2 border-solid">Gestion des technos</button>
        <button onClick={() => handleAdminSection('users')} className="py-2 px-4 rounded bg-secondary20 border-2 border-solid">Gestion des Utilisateurs</button>
        <button onClick={() => handleAdminSection('projects')} className="py-2 px-4 rounded bg-secondary20 border-2 border-solid">Gestion des Projets</button>
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
      <Admin_Projects closeSection={() => handleCloseSection('projects')}  />
    )}
    </>
    </div>
  );
}

export default AdminPage;