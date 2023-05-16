import { XCircle } from "react-feather"
import { useAppSelector } from "../../hooks/redux"

export default function ModalUpdateContent({ closeModal }: { closeModal: () => void }) {
  const user = useAppSelector(state => state.user)
  const technosList = useAppSelector((state) => state.search.technoLists);
  return (
    <div className="fixed overflow-scroll top-[20vh] bg-primary0 rounded w-full h-[100vh] ">
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 p-2.5 cursor-pointer"
      >{<XCircle />}
      </div>
      <div className="p-10 rounded">
        <h2 className="text-center">Modification de vos informations</h2>
        <form className="flex flex-col">
          <div className="mb-6">
            <label htmlFor="pseudo" className="block mb-2 text-sm font-medium">Pseudo</label>
            <input value={user.github_login} type="pseudo" id="pseudo" className="shadow-sm text-sm rounded block w-full p-2.5" placeholder="pseudo" required />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input value={user.email} type="email" id="email" className="shadow-sm text-sm rounded block w-full p-2.5" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-6 flex justify-around flex-wrap items-center gap-2">
            {technosList.map((techno) => (
              <>
                <div className="flex items-center h-5">
                  {user.ability.find((item) => item.label === techno.label)
                  ? <input id="techno" type="checkbox" value={techno.label} className="w-4 h-4 rounded" required checked /> 
                  : <input id="techno" type="checkbox" value={techno.label} className="w-4 h-4 rounded" required />}
                  <label htmlFor="techno" className="ml-2 text-sm font-medium">{techno.label}</label>
                </div>
              </>
            ))}
          </div>
          <button type="submit" className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">Valider les modifications</button>
        </form>
      </div>
    </div>
  )
}