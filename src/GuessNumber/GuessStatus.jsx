import A from "./A.png";
import B from "./B.png";
import C from "./C.png";

export default function GuessStatus({allUserGuesses}) {
  return (
    <>
      {allUserGuesses.slice(5).map((arrayGuess) => (
        <div>
          <div style={{ display: "inline" }}>{`The result of guess number ${
            allUserGuesses.indexOf(arrayGuess) - 4
          } is: `}</div>
          {arrayGuess.map((digitGuess, digitIndex) => (
            <div key={digitIndex} style={{ display: "inline" }}>
              {digitGuess.status === "A" ? (
                <img
                  src={A}
                  width="20px"
                  alt="GreenCircle"
                  style={{ position: "relative", top: "6px" }}
                />
              ) : digitGuess.status === "B" ? (
                <img
                  src={B}
                  width="20px"
                  alt="YellowCircle"
                  style={{ position: "relative", top: "6px" }}
                />
              ) : (
                <img
                  src={C}
                  width="20px"
                  alt="RedCircle"
                  style={{ position: "relative", top: "6px" }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
