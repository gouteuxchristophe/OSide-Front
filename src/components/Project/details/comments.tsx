import { IComment } from "../../../@types/project";

function Comments({ comments, ownerProject }: any) {
 
  return (
    <>
      {comments.map((comment: IComment) => (
        <div className="flex flex-col gap-5 p-2 items-center w-[80%] mx-auto" key={comment.id}>
          <div className={`${(comment.commentUser.id === ownerProject) ? 'self-end' : 'self-start pl-10' }`}>
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
    </>
  );
}

export default Comments;