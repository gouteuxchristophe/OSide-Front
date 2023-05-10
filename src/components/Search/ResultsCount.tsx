interface ResultsCountProps {
  numberProject: number,
  activeSearched: boolean
}

function ResultsCount({ numberProject, activeSearched }: ResultsCountProps) {
  return (
    <div>
      {activeSearched && (
        <span>
          Votre recherche a retourné
          {' '}
          {numberProject}
          {' '}
          résultat
          {numberProject > 1 ? 's' : ''}
        </span>

      )}
    </div>
  );
}

export default ResultsCount;
