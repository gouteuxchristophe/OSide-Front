import { Send } from "react-feather";
import { IComment } from "../../../@types/project";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { postComment, reseterrorPostComment, resetsuccessPostComment } from "../../../store/reducers/comments";
import { getProjectByID } from "../../../store/reducers/projects";
import { getAllUsers } from "../../../store/reducers/user";
import { User } from "../../../@types/user";
// Référence à la div des commentaires
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

interface ICommentsProps {
  comments: IComment[];
  ownerProject: number;
  projectId: number;
}

function Comments({ comments, ownerProject, projectId }: ICommentsProps) {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const blackList = useAppSelector(state => state.comment.blackList)
  const allUsers = useAppSelector(state => state.user.allUsers)
  // State des messages de succès et d'erreur de l'ajout d'un commentaire
  const successComment = useAppSelector((state) => state.comment.successPostComment)
  const errorComment = useAppSelector((state) => state.comment.errorPostComment)
  // Référence à la div des commentaires
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const [filtered, setFiltered] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState("");

  // Permet de récupérer la liste des utilisateurs au chargement du composant
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  // Permet de gérer les messages de succès et d'erreur de l'ajout d'un commentaire
  useEffect(() => {
    if (successComment) {
      toast.success(`🦄 ${successComment}`);
      // On reset le state de succès
      dispatch(resetsuccessPostComment())
      // On vide le champ de commentaire
      dispatch(getProjectByID(projectId))
      setComment('')
    }
    if (errorComment) {
      dispatch(reseterrorPostComment())
      toast.error(`🦄 ${errorComment}`);
    }
  }, [successComment, errorComment, dispatch])

  // Permet de faire défiler la div des commentaires vers le bas à chaque nouveau commentaire
  useEffect(() => {
    // Fait défiler vers la fin de la div des commentaires
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  // on envoie le commentaire au serveur
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // si le commentaire est vide, on envoie une notification
    if (!comment) {
      toast.error('Vous ne pouvez pas envoyer un commentaire vide')
      return
    }
    // si le commentaire contient un mot de la blacklist, on envoie une notification
    if (blackList.some((word: string) => comment.includes(word))) {
      toast.error('Votre commentaire contient un mot interdit')
      return
    }
    // on créer le data qui sera envoyé au serveur
    const data = {
      project_id: projectId,
      content: comment,
    }
    dispatch(postComment(data))
  }

  // on vérifier la saisie de l'utilisateur au fu et a mesure et si l'utilisateur saisie un pseudo présent dans le tableau allUsers, on modifie la couleur du texte
  const handleChangeValue = (value: string) => {
    // on met à jour le state comment
    setComment(value);
    // si on détecte un @ et un caractère dans le commentaire on cherche si le pseudo existe dans le tableau allUsers
    if (value.includes('@')) {
      // Si il n'y a pas de caractère après le @ on donne la liste des utilisateurs
      if (value.split('@')[1] === '') {
        setFiltered(allUsers)
        return
      }
      // Si une lettre est saisie après le @ on filtre le tableau allUsers
      const pseudo = value.split('@')[1]
      // on filtre le tableau allUsers pour ne garder que les utilisateurs dont le pseudo contient une partie du pseudo saisi par l'utilisateur
      const filteredUser = allUsers.filter((user: User) => user.github.login.includes(pseudo))
      // on met à jour le state filteredUsers
      setFiltered(filteredUser as User[])
    }
    setSelectedUser("");
  };

  return (
    <>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {comments.map((comment: IComment, index: Number) => (
          <div className="flex flex-col gap-5 p-2 items-center w-[80%] mx-auto" key={comment.id} ref={index === comments.length - 1 ? commentsEndRef : null}>
            <div className={`${(comment.commentUser.id === ownerProject) ? 'self-end' : 'self-start pl-10'}`}>
              <img className="w-12 h-12 rounded-full" src={comment.commentUser.avatar_url} alt="avatar" />
            </div>
            <div className={`text-left ${(comment.commentUser.id === ownerProject) ? 'message--mine self-end' : 'message__other self-start'}`}>
              <p className="min-w-[50%] bg-[white] rounded-full py-1">
                {comment.content.split('@').map((word: string, index: number) => {
                  if (index !== 0) {
                    const [pseudo, ...rest] = word.split(' ');
                    return (
                      <span key={index}>
                        <span className="font-bold text-cyan">{pseudo}</span> {rest.join(' ')}
                      </span>
                    );
                  } else {
                    return word;
                  }
                })}
              </p>
              <footer className="text-right">
                <p className="text-xs italic">{comment.commentUser.username} - {new Date(comment.created_at as string).toLocaleDateString('fr')}</p>
              </footer>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="flex justify-center">
        <TextInput
          onChange={(e: string) => handleChangeValue(e)}
          value={selectedUser !== "" ? `@${selectedUser}` : comment}
          className="w-[80%] rounded-l-lg border-y-2 border-l-2 border-gray-300 p-2"
          placeholder="Ajouter un commentaire"
          trigger={["@", "@@"]}
          options={filtered.map((user: User) => user.github.login)}
        />
        <button className="w-[10%] bg-[white] rounded-r-lg border-y-2 border-r-2 border-gray-300 p-2" type="submit"><Send /></button>
      </form>
    </>
  );
}

export default Comments;