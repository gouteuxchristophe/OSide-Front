import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogged = useAppSelector(state => state.login.logged)
  const role = useAppSelector((state) => state.login.role);

  useEffect(() => {
    if (!isLogged) {
      toast.warn("🦄 Veuillez vous connecter !");
      navigate("/login", { replace: true });
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
  ];

  const updateSectionState = (pathname: string) => {
    setActiveSection(pathname.replace("/admin/", ""));
  };

  const updateURL = (section: string) => {
    navigate(`/admin/${section}`);
  };

  useEffect(() => {
    updateSectionState(location.pathname);
  }, [location]);

  const handleAdminSection = (value: string) => {
    updateURL(value);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-5 w-[60%] mx-auto">
        {sections.map((section) => (
          <button
            key={section.value}
            onClick={() => handleAdminSection(section.value)}
            className={`py - 2 px-4 rounded bg-secondary20 ${activeSection === section.value ? "bg-secondary30" : ""}`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div >
  );
}

export default AdminPage;