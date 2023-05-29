import { Send } from "react-feather";
import { IComment } from "../../../@types/project";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { postComment, reseterrorPostComment, resetsuccessPostComment } from "../../../store/reducers/comments";

function Comments({ comments, ownerProject }: any) {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const blackList = useAppSelector(state => state.comment.blackList)
  // State des messages de succès et d'erreur de l'ajout d'un commentaire
  const successComment = useAppSelector((state) => state.comment.successPostComment)
  const errorComment = useAppSelector((state) => state.comment.errorPostComment)

useEffect(() => {
  if (successComment) {
    toast.success(`🦄 ${successComment}`);
    dispatch(resetsuccessPostComment())
    // dispatch pour rafraichir les commentaires
  }
  if (errorComment) {
    dispatch(reseterrorPostComment())
    toast.error(`🦄 ${errorComment}`);
  }
}, [successComment, errorComment, dispatch])

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
      project_id: comments[0].project_id,
      content: comment,
    }
    dispatch(postComment(data))
  }

  return (
    <>
      {comments.map((comment: IComment) => (
        <div className="flex flex-col gap-5 p-2 items-center w-[80%] mx-auto" key={comment.id}>
          <div className={`${(comment.commentUser.id === ownerProject) ? 'self-end' : 'self-start pl-10'}`}>
            <img className="w-12 h-12 rounded-full" src={comment.commentUser.avatar_url} alt="avatar" />
          </div>
          <div className={`text-left ${(comment.commentUser.id === ownerProject) ? 'message--mine self-end' : 'message__other self-start'}`}>
            <p className="min-w-[50%] bg-[white] rounded-full py-1">{comment.content}</p>
            <footer className="text-right">
              <p className="text-xs italic">{comment.commentUser.username} - {new Date(comment.created_at as string).toLocaleDateString('fr')}</p>
            </footer>
          </div>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input onChange={(e) => setComment(e.currentTarget.value)} type="text" className="w-[80%] mx-auto rounded-full border-2 border-gray-300 p-2" placeholder="Ajouter un commentaire" />
        <button type="submit"><Send /></button>
      </form>
    </>
  );
}

export default Comments;