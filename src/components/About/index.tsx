import Description from './Description';
import Contact from './Contact';

function About() {
  return (

    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 relative justify-center gap-y-8">
      <Description />
      <Contact />
    </div>
  );
}

export default About;
