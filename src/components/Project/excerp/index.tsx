import { Box, Grid, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Project } from '../../../@types/project';

function ProjectItem({
  title, status, author, content, member_projet,
}: Project) {
  const excerpContent = content.substring(0, 100);
  return (
    <Grid item xs>
      <Card>
        <CardContent sx={{
          minHeight: '450px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant="h5" component="div" align="center">
              {title}
            </Typography>
            <Typography
              sx={{
                border: 1, borderRadius: 1, backgroundColor: '#0BAD92', padding: '0.5rem',
              }}
              variant="subtitle1"
              component="div"
              align="center"
            >
              {status}
            </Typography>
          </Box>
          <Typography
            component="span"
            sx={{
              alignSelf: 'self-start', borderRadius: 1, backgroundColor: '#2BEE86', padding: '0.5rem',
            }}
          >
            {author.pseudo}
          </Typography>
          <Box>
            {member_projet.map((item) => (
              <Typography component="span" key={item.id}>
                {item.pseudo}
              </Typography>
            ))}
          </Box>
          <Typography variant="body2" component="p" marginTop={2}>
            {`${excerpContent}...`}
          </Typography>
          <CardActions>
            <Link href="/" underline="none">Detail</Link>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>

  );
}

export default ProjectItem;
