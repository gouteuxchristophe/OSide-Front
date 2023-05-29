import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { 
  getAllComments,
  deleteCommentErrorMessage,
  deleteMessage,
  deleteComment,
 } from "../../store/reducers/comments";
import { Trash2 } from "react-feather";
import { toast } from "react-toastify";
import DeleteConfirmation from "./deleteConfirmation";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserDataFromLocalStorage } from "../../utils/login";

function Admin_Comments() {

  const commentsList = useAppSelector((state) => state.comment.commentLists);
  // filtrer les comments avec un flag == true
  const commentsListFiltered = commentsList.filter((comment) => comment.flag === true);
    // state des roles
    const [selectedCommentId, setSelectedCommentId] = useState<number>();
    const [selectedCommentContent, setSelectedCommentContent] = useState<string>();// state des messages de succès ou d'erreur
  const successDelete = useAppSelector((state) => state.comment.deleteCommentSuccess);
  const errorAPIComments = useAppSelector((state) => state.comment.errorAPIComments);
  // state de la suppression
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  // state qui permet de savoir si l'utilisateur est connecté
  const isLogged = useAppSelector(state => state.login.logged)
  // state qui permet de savoir si l'utilisateur est admin
  const sessionStorage = getUserDataFromLocalStorage()
  const role = sessionStorage?.role
  
  // Permet le dispatch et le navigate
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion
  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }
  // Si l'utilisateur n'est pas admin, il est redirigé vers la page d'accueil
  if (role !== 3) {
    toast.warn('🦄 Vous n\'avez pas accès à cette page !');
    return <Navigate to="/" replace />
  }

  // Récupérer la liste des Comments
  useEffect(() => {
    dispatch(getAllComments())
  }, [dispatch]);

  // Permet d'afficher une notification si le Commentaire a bien été supprimée
  // et de recharger la liste des roles
  useEffect(() => {
    if (errorAPIComments) {
      toast.error(`🦄 ${errorAPIComments}`);
      dispatch(deleteCommentErrorMessage())
      return
    }
    if (successDelete) {
      toast.success(`🦄 ${successDelete}`);
      dispatch(deleteMessage());
    }


    dispatch(getAllComments());
  }, [successDelete,  errorAPIComments]);

  // Permet d'afficher la modal de suppression d'un role
  const handleDeleteComment = () => {
    setDeleteConfirmation(true);
  }
  
return(
  <div className="w-full relative mx-auto">
  <div>
    {deleteConfirmation && (
      <DeleteConfirmation
        id={selectedCommentId!}
        type="comment"
        closeModal={() => setDeleteConfirmation(false)}
      />
    )}
  </div>
  <>
    <table className="text-xs text-center mx-auto w-[80%] sm:w-[40%]">
      <thead className="text-xs uppercase bg-secondary20">
        <tr>
          <th scope="col" className="px-2 py-2">
            Comment
          </th>
          <th scope="col" className="px-2 py-2">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {commentsList.map((comment) => (
          <tr key={comment.id} className="bg-[white] border-solid border-b border-primary0">
            <>
              <th scope="row" className="align-middle font-medium whitespace-nowrap relative">
                <div className="flex items-center justify-around">
                  {comment.content}
                </div>
              </th>
              <td className="flex justify-around">
                <button onClick={() => {
                  setSelectedCommentId(comment.id);
                  setSelectedCommentContent(comment.content);
                }}>
                </button>
                <button onClick={() => {
                  setSelectedCommentId(role.id);
                  handleDeleteComment()
                }}>
                  <Trash2 color="red" className="w-4" />
                </button>
              </td>
            </>
          </tr>
        ))}
      </tbody>
    </table>
  </>

  <div className="flex justify-center mt-5">
    <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">Retour</button>
  </div>
</div>
)

}

export default Admin_Comments;