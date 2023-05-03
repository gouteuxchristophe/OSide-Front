import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';

function Projects() {
  // On récupère le state
  const projectsList = useAppSelector((state) => state.projects.lists);

  return (

    <Grid container justifyContent="center" p={5} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {projectsList.map((item) => (
        <ProjectItem
          key={item.id}
          {...item}
        />
      ))}
    </Grid>

  );
}

export default Projects;
