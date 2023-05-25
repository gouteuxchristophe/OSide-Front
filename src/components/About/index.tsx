import Description from './Description';
import Team from './Team';

function About() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Description />
      <Team />
    </div>
  );
}

export default About;
