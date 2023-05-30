import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDataFromLocalStorage } from "../../utils/login";

function AdminPage() {
  // Permet de vérifier si l'utilisateur est connecté et si il a le rôle admin
  const isLogged = useAppSelector(state => state.login.logged)
  const sessionStorage = getUserDataFromLocalStorage()
  const role = sessionStorage?.role
  // Permet de récupérer l'url et de naviguer
  const location = useLocation();
  const navigate = useNavigate();
  
  // Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion
  useEffect(() => {
    if (!isLogged) {
      toast.warn("🦄 Veuillez vous connecter !");
      navigate("/login", { replace: true });
      // Si l'utilisateur n'est pas admin, il est redirigé vers la page d'accueil
    } else if (role !== 3) {
      toast.warn("🦄 Vous n'avez pas accès à cette page !");
      navigate("/", { replace: true });
    }
  }, [isLogged, navigate, role]);

  // Permet de gérer l'affichage des sections
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { value: "technos", label: "Gestion des technos" },
    { value: "users", label: "Gestion des Utilisateurs" },
    { value: "projects", label: "Gestion des Projets" },
    { value: "roles", label: "Gestion des Rôles" },
    { value: "comments", label: "Gestion des commentaires signalés" },
  ];

  // Permet de mettre à jour la section active
  const updateSectionState = (pathname: string) => {
    setActiveSection(pathname.replace("/admin/", ""));
  };

  // Permet de naviguer vers la section souhaitée
  const updateURL = (section: string) => {
    navigate(`/admin/${section}`);
  };

  // Permet de mettre à jour la section active en fonction de l'url
  useEffect(() => {
    updateSectionState(location.pathname);
  }, [location]);

  // Permet de mettre à jour l'url en fonction de la section active
  const handleAdminSection = (value: string) => {
    updateURL(value);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-5 mx-auto items-center w-[40%] sm:w-[20%]">
        {sections.map((section) => (
          <button
            key={section.value}
            onClick={() => handleAdminSection(section.value)}
            className={`py-2 px-2 rounded bg-secondary20 w-full`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div >
  );
}

export default AdminPage;