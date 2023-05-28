import { ITechnoProjet } from '../../@types/project';

interface TechnosButtonsProps {
  technosList: ITechnoProjet[]
  handleChangeTechno: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function TechnosButtons({ technosList, handleChangeTechno }: TechnosButtonsProps) {
  
  return (
    <div className="flex space-x-2 justify-center flex-wrap gap-5 pb-5 rounded w-[70%] mt-5">
      {technosList.map((techno) => (
        <button onClick={handleChangeTechno} className="py-2 px-4 rounded-full w-[40%] sm:w-[20%] border border-solid bg-[white]" style={{ borderColor: `${techno.color?.length === 0 ? "red" : techno.color}` }} type="button" key={techno.id}>{techno.label}</button>
      ))}
    </div>
  );
}

export default TechnosButtons;
