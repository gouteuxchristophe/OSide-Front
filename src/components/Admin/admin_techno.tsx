import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Delete, Edit3, Trash2 } from "react-feather";
import ModalUpdateTechno from "./ModalUpdateTechno";
import { deleteMessage, deleteMessageUpdate, deleteTechno, getAllTechnos } from "../../store/reducers/techno";
import { toast } from "react-toastify";
import DeleteConfirmation from "./deleteConfirmation";

function Admin_Techno({ closeSection }: { closeSection: (value: string) => void }) {

  const technoList = useAppSelector((state) => state.search.technoLists);
  const successDelete = useAppSelector((state) => state.techno.successDelete);
  const successUpdate = useAppSelector((state) => state.techno.successUpdate);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [showModalUpdateTechno, setShowModalUpdateTechno] = useState(false);
  const [selectedTechnoId, setSelectedTechnoId] = useState<number>();
  const [selectedTechnoLabel, setSelectedTechnoLabel] = useState<string>('');
  const [selectedTechnoColor, setSelectedTechnoColor] = useState<string | undefined>('');
  const dispatch = useAppDispatch();

  // Récupérer la liste des technos
  useEffect(() => {
    dispatch(getAllTechnos());
  }, [dispatch]);
  // Permet de supprimer une techno
  const handleDeleteTechno = () => {
    setDeleteConfirmation(true);
  }

  // Permet d'afficher une notification si la techno a bien été supprimée ou modifiée
  // et de recharger la liste des technos
  useEffect(() => {
    if (successDelete) {
      toast.error(`🦄 ${successDelete}`);
      dispatch(deleteMessage());
    }
    if (successUpdate) {
      toast.success(`🦄 ${successUpdate}`);
      dispatch(deleteMessageUpdate());
    }
    dispatch(getAllTechnos());
  }, [successDelete, successUpdate]);

  return (
    <div className="relative mx-auto">
      <table className="text-xs text-center mx-auto w-[80%] sm:w-[40%]">
        <thead className="text-xs uppercase bg-secondary20">
          <tr>
            <th scope="col" className="px-2 py-2">
              Technologie
            </th>
            <th scope="col" className="px-2 py-2">
              Couleur
            </th>
            <th scope="col" className="px-2 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {technoList.map((techno) => (
            <tr key={techno.id} className="bg-[white] border-solid border-b border-primary0">
              <>
                <th scope="row" className="align-middle font-medium whitespace-nowrap relative">
                  <div className="flex items-center justify-around">
                    {techno.label}
                  </div>
                </th>
                <td className="whitespace-nowrap align-middle">
                  <div className="rounded" style={{ backgroundColor: `${techno.color}` }}>
                    {techno.color}
                  </div>
                </td>
                <td className="flex justify-around">
                  <button onClick={() => {
                    setSelectedTechnoId(techno.id);
                    setSelectedTechnoLabel(techno.label);
                    setSelectedTechnoColor(techno.color);
                    setShowModalUpdateTechno(true);
                  }}>
                    <Edit3 className="w-4" />
                  </button>
                  <button onClick={() => {
                    setSelectedTechnoId(techno.id);
                    handleDeleteTechno()
                  }

                  }>
                    <Trash2 color="red" className="w-4" />
                  </button>
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {showModalUpdateTechno && (
          <ModalUpdateTechno
            id={selectedTechnoId!}
            label={selectedTechnoLabel}
            color={selectedTechnoColor!}
            closeModal={() => setShowModalUpdateTechno(false)}
          />
        )}
        {deleteConfirmation && (
          <DeleteConfirmation
            type="techno"
            id={selectedTechnoId!}
            closeModal={() => setDeleteConfirmation(false)}
          />
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => closeSection('technos')} className="py-2 px-4 rounded-full bg-secondary20 border-2 border-solid">Retour</button>
      </div>

    </div>
  );
}

export default Admin_Techno;