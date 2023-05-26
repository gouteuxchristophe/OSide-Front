import { IComment } from "../../../@types/project";

function Comments({ comments, ownerProject }: any) {
 
  return (
    <>
      {comments.map((comment: IComment) => (
        <div className="flex gap-2 justify-start p-2 items-center" key={comment.id}>
          <img className={`w-12 h-12 rounded-full ${(comment.commentUser.id != ownerProject) ? 'order-last' : '' }`} src={comment.commentUser.avatar_url} alt="avatar" />
          <div className="bg-[white] rounded-full px-4 py-1 w-[100%] text-left">
            <p>{comment.content}</p>
            <footer className="text-right">
              <p className="text-xs italic">{comment.commentUser.username} - {new Date(comment.created_at as string).toLocaleDateString('fr')}</p>
            </footer>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comments;