import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Delete, Edit3, Trash2 } from "react-feather";
import ModalUpdateTechno from "./ModalUpdateTechno";
import AddTechno from "../Modals/AddTechno";
import { deleteMessage, deleteMessageUpdate, deleteMessageAdd, deleteTechno, getAllTechnos, emptySelectedTechnos, deleteTechnoErrorMessage } from "../../store/reducers/techno";
import { toast } from "react-toastify";
import DeleteConfirmation from "./deleteConfirmation";

function Admin_Techno({ closeSection }: { closeSection: (value: string) => void }) {

  const technoList = useAppSelector((state) => state.search.technoLists);
  // state des messages de succès ou d'erreur
  const successDelete = useAppSelector((state) => state.techno.successDelete);
  const successUpdate = useAppSelector((state) => state.techno.successUpdate);
  const successAdd = useAppSelector((state) => state.techno.successAdd);
  const errorAPITechno = useAppSelector((state) => state.techno.errorApiTechno);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  // state des modals
  const [showModalUpdateTechno, setShowModalUpdateTechno] = useState(false);
  const [showModalAddTechno, setShowModalAddTechno] = useState(false);
  // state des technos
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

  // Permet d'afficher une notification si la techno a bien été supprimée, modifiée, ajoutée
  // et de recharger la liste des technos
  useEffect(() => {
    if (errorAPITechno) {
      toast.error(`🦄 ${errorAPITechno}`);
      dispatch(deleteTechnoErrorMessage())
      return
    }
    if (successDelete) {
      toast.error(`🦄 ${successDelete}`);
      dispatch(deleteMessage());
    }
    if (successUpdate) {
      toast.success(`🦄 ${successUpdate}`);
      dispatch(deleteMessageUpdate());
    }
    if (successAdd) {
      toast.success(`🦄 ${successAdd}`);
      dispatch(deleteMessageAdd());
    }
    dispatch(emptySelectedTechnos())
    dispatch(getAllTechnos());
  }, [successDelete, successUpdate, successAdd, errorAPITechno]);

  return (
    <div className="relative mx-auto">
      <div className="flex justify-center mb-5">
        <button onClick={() => setShowModalAddTechno(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none"> Ajouter une techno</button>
      </div>
      {showModalAddTechno && (
        <div className="flex justify-center mx-auto w-[80%] sm:w-[40%] mb-5"><AddTechno
          closeModal={() => setShowModalAddTechno(false)}
        /></div>)}
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
        <button onClick={() => closeSection('technos')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">Retour</button>
      </div>

    </div>
  );
}

export default Admin_Techno;