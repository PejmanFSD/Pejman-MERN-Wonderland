export default function UserGuess({allUserGuesses}) {
  return (
    <>
      {allUserGuesses.slice(5).map((arrayGuess) => (
        <div>
          <div style={{ display: "inline" }}>{`You guess number ${
            allUserGuesses.indexOf(arrayGuess) - 4
          } is: `}</div>
          {arrayGuess.map((digitGuess, digitIndex) => (
            <div key={digitIndex} style={{ display: "inline" }}>
              {digitGuess.guess}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
