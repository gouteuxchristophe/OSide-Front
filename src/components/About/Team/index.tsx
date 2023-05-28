import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getAllUsers } from "../../../store/reducers/user";

function Team() {
  // Récupérer la liste des utilisateurs
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const allUser = useAppSelector((state) => state.user.allUsers);

  return (
    <div className="w-full lg:w-3/5 rounded-lg lg:rounded-lg shadow-xl bg-white opacity-75 mx-6 my-6 lg:mx-0 border-2 border-solid border-secondary10">
      <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
        <div className="flex flex-col items-center justify-between mb-3">
          <h1 className="text-2xl font-bold lg:pt-0 text-center my-4">La team</h1>
          <div>
          {allUser.filter((user) => user.role.label === "admin").map((user) => (
            <div key={user.id} className="flex flex-col items-center justify-between mb-8 p-4 rounded-lg shadow-xl">
              <div className="flex flex-col items-center justify-between mb-3">
                <img
                  className="w-24 h-24 rounded-full object-cover my-1"
                  src={user.avatar_url}
                  alt="avatar"
                />
                <h2 className="text-xl font-bold text-center">{user.username}</h2>
                <p className="text-sm py-2 text-center">{user.first_name} {user.last_name}</p>
                <p className="text-sm text-[#2c2c2c] italic text-center">{user.bio}</p>
              </div>
            </div>
          )
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
