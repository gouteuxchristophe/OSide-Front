import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ITechnoProjet } from "../../@types/project";
import { addTechno, deleteMessage, updatedSelectedTechnos } from "../../store/reducers/techno";
import { getAllTechnos } from "../../store/reducers/techno";
import { PlusSquare } from "react-feather";
import { toast } from "react-toastify";

export interface newTechno {
  id?: number;
  label: string;
  color?: string;
}

interface AddTechnoProps {
  closeModal: () => void;
  technoPred?: ITechnoProjet[];
}

function AddTechno({ closeModal, technoPred }: AddTechnoProps) {
  // state des technos
  const technoList = useAppSelector((state) => state.techno.technoLists);
  // state des champs de saisie
  const [inputValue, setInputValue] = useState('');
  // state des technos existantes
  const [technoExist, setTechnoExist] = useState<ITechnoProjet[]>([]);
  // state des technos non existantes
  const [technoNotExist, setTechnoNotExist] = useState<newTechno[]>([]);
  // state des technos prédéfinies
  const [technoPredExist, setTechnoPredExist] = useState<ITechnoProjet[]>(technoPred as ITechnoProjet[])
  // state des technos à envoyer
  const [allTechno, setAllTechno] = useState<newTechno[]>([]);
  const dispatch = useAppDispatch();
  // state des messages de succès ou d'erreur
  const successAdd = useAppSelector((state) => state.techno.successAdd);
  
  // Récupérer la liste des technos
  useEffect(() => {
    dispatch(getAllTechnos());
  }, [dispatch]);

  // Afficher un toast si la techno a bien été ajouté
  useEffect(() => {
    if (successAdd) {
      toast.success(`🦄 ${successAdd}`);
      dispatch(deleteMessage());
    }
  }, [successAdd]);

  // Ajouter l'ensemble des technos dans le tableau allTechno
  useEffect(() => {
    const technoSelected = [...technoExist, ...technoNotExist]
    if (technoPredExist) {
      technoSelected.push(...technoPredExist)
    }
    setAllTechno(technoSelected)
  }, [technoExist, technoNotExist, technoPredExist])

  // Ajouter une techno dans le tableau technoExist ou technoNotExist
  const handleAddTechno = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Vérifier si la techno existe déjà dans la liste
    const techno = technoList.find((techno) => techno.label === inputValue)
    if (techno) {
      // Si oui, ajouter la techno dans le tableau technoExist
      const arrayTechnoExist = [...technoExist, techno]
      setTechnoExist(arrayTechnoExist)
    } else {
      // Si non, on créer un objet techno avec la techno et on l'ajoute dans le tableau technoNotExist
      const newTechno = {
        label: inputValue,
        color: '#808080'
      }
      const arrayTechnoNotExist = [...technoNotExist, newTechno]
      setTechnoNotExist(arrayTechnoNotExist)
    }
    // Vider l'input
    setInputValue('')
  }

  // Ajouter les technos dans la base de données
  const handleValidationAddTechno = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (technoNotExist.length > 0) {
    dispatch(addTechno(technoNotExist))
    }
    dispatch(updatedSelectedTechnos(allTechno))
    dispatch(getAllTechnos())
    closeModal()
  }
  // Supprimer une techno du tableau technoExist, technoNotExist ou technoPredExist
  const handleRemoveTechno = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    // Si le label de la techno est dans le tableau technoPredExist, on supprime la techno du tableau technoPredExist
    const technoPred = technoPredExist.find((techno) => techno.label === event.currentTarget.previousSibling?.textContent)
    if (technoPred) {
      const arrayTechnoPredExist = technoPredExist.filter((techno) => techno.label !== event.currentTarget.previousSibling?.textContent)
      setTechnoPredExist(arrayTechnoPredExist)
    }
    // Si le label de la techno est dans le tableau technoExist, on supprime la techno du tableau technoExist
    const techno = technoExist.find((techno) => techno.label === event.currentTarget.previousSibling?.textContent)
    if (techno) { 
      const arrayTechnoExist = technoExist.filter((techno) => techno.label !== event.currentTarget.previousSibling?.textContent)
      setTechnoExist(arrayTechnoExist)
    } 
    // Sinon, on supprime la techno du tableau technoNotExist
    else {
      const arrayTechnoNotExist = technoNotExist.filter((techno) => techno.label !== event.currentTarget.previousSibling?.textContent)
      setTechnoNotExist(arrayTechnoNotExist)
    } 
  }

  return (
    <div className="flex flex-col items-center justify-around gap-[2rem] rounded relative border border-solid w-[90%] mx-auto bg-secondary20 h-full">
      <h2 className="bg-[white] px-2 py-1 rounded border-2 border-solid border-primary0">Ajouter une techno</h2>
      <form onSubmit={(e) => handleAddTechno(e)} className="flex gap-2">
        <input list="technoOptions" type="search" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} />
        <datalist id="technoOptions">
          {technoList.map((techno, index) => (
            <option key={index} value={techno.label} />
          ))}
        </datalist>
        <button type="submit"><PlusSquare /></button>
      </form>
      <div>
        <div className="flex flex-wrap gap-2 justify-center">
          {allTechno.map((techno) => (
            <div className="relative" key={`${techno.id}-${techno.label}`}>
            <span className={`p-2 bg-[white] rounded border border-solid border-${techno.color}`}>{techno.label}</span>
            <button onClick={handleRemoveTechno} className="absolute top-[-50%] right-[-10%] w-6 h-6 rounded-full border border-solid border-[red] bg-[red] text-[white]">X</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button onClick={handleValidationAddTechno} className="bg-primary0 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center mb-5" type='submit' value='Add'>Valider les modif</button>
      </div>
      <button
        className="absolute top-1 right-1 w-7 h-7 rounded-full border border-solid border-[red] bg-[red] text-[white]"
        onClick={closeModal}
      >
        X
      </button>
    </div>
  );
}

export default AddTechno;