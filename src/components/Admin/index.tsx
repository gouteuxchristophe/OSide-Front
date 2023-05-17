import { useEffect, useState } from "react";
import { getAllTechnos } from "../../store/reducers/search";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Edit3, Trash2 } from "react-feather";
import ModalUpdateTechno from "./ModalUpdateTechno";
import { deleteMessage, deleteMessageUpdate, deleteTechno } from "../../store/reducers/techno";
import { toast } from "react-toastify";



function AdminPage() {

  const technoList = useAppSelector((state) => state.search.technoLists);
  const [showModalUpdateTechno, setShowModalUpdateTechno] = useState(false);

  const [selectedTechnoId, setSelectedTechnoId] = useState<number>();
  const [selectedTechnoLabel, setSelectedTechnoLabel] = useState<string>('');
  const [selectedTechnoColor, setSelectedTechnoColor] = useState<string | undefined>('');
  const successDelete = useAppSelector((state) => state.techno.successDelete);
  const successUpdate = useAppSelector((state) => state.techno.successUpdate);
  // Récupérer la liste des technos
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllTechnos());
  }, [dispatch]);

  function handleDeleteTechno(id: number) {
    dispatch(deleteTechno(id))
  }

  useEffect(() => {
    if (successDelete) {  
      displaySuccessDeleteNotification();
      dispatch(deleteMessage())
      dispatch(getAllTechnos());
    }
  }, [successDelete]);

  useEffect(() => {
    if (successUpdate) {  
      displaySuccessUpdateNotification();
      dispatch(deleteMessageUpdate())
      dispatch(getAllTechnos());
    }
  }, [successUpdate]);

  // Permet d'afficher une notification d'erreur lors de la connexion
  const displaySuccessUpdateNotification = () => {
    toast.success(`🦄 ${successUpdate}`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  // Permet d'afficher une notification d'erreur lors de la connexion
  const displaySuccessDeleteNotification = () => {
    toast.error(`🦄 ${successDelete}`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (

    <div className="relative overflow-x-auto w-[90%] mx-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-secondary20">
          <tr>
            <th scope="col" className="px-6 py-3">
              Technologie
            </th>
            <th scope="col" className="px-6 py-3">
              Couleur
            </th>
            <th scope="col" className="px-6 py-3">
              Modification
            </th>
            <th scope="col" className="px-3 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {technoList.map((techno) => (
            <tr key={techno.id} className="bg-[white] border-b">
              <>
                <th scope="row" className="px-4 py-4 font-medium whitespace-nowrap relative">
                  <div className="flex items-center justify-around">
                    {techno.label}
                  </div>
                </th>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-around">
                    {techno.color}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => {
                    setSelectedTechnoId(techno.id);
                    setSelectedTechnoLabel(techno.label);
                    setSelectedTechnoColor(techno.color);
                    setShowModalUpdateTechno(true);
                  }}>
                    <Edit3 className="w-5" />
                  </button>
                  <>
                    {showModalUpdateTechno && (
                      <ModalUpdateTechno
                        id={selectedTechnoId!}
                        label={selectedTechnoLabel}
                        color={selectedTechnoColor!}
                        closeModal={() => setShowModalUpdateTechno(false)}
                      />
                    )}
                  </>
                </td>
                <td className="px-4 py-4">
                <button onClick={() => handleDeleteTechno(techno.id!)}>
                    <Trash2 className="color-[red]" />
                  </button>
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default AdminPage;