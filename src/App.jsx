import "./App.css";
import { useState } from "react";
import Star from "./Star.png";
import RockScissorsPaper from "./RockScissorsPaper/RockScissorsPaper";
import GuessNumber from "./GuessNumber/GuessNumber";

function App() {
  const [totalPoint, setTotalPoint] = useState(0);
  const [score, setScore] = useState(0);
  const [showRockScissorsPaper, setShowRockScissorsPaper] = useState(false);
  const [showGuessNumber, setShowGuessNumber] = useState(false);
  const updateScore = (i) => {
    setScore((currScore) => currScore + i);
  };
  const updateTotalPoint = (i) => {
    setTotalPoint((currTotalPoint) => currTotalPoint + i);
  };
  const toggleRockScissorsPaper = () => {
    setShowRockScissorsPaper(true);
  };
  const toggleGuessNumber = () => {
    setShowGuessNumber(true);
  };
  return (
    <div className="App">
      <h1>Pejman MERN Wonderland</h1>
      <div>
        {new Array(totalPoint).fill(null).map((t) => (
          <img src={Star} width="30px" alt="Star" />
        ))}
      </div>
      <div>
        {!totalPoint
          ? "You don't have any stars yet, play the interesting games and win some!"
          : `You have ${totalPoint} star${totalPoint > 1 ? "s" : ""}`}
      </div>
      {showRockScissorsPaper ? (
        <RockScissorsPaper
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
          setShowRockScissorsPaper={setShowRockScissorsPaper}
        />
      ) : (
        <button onClick={() => toggleRockScissorsPaper()}>
          Rock - Scissors - Paper
        </button>
      )}
      {showGuessNumber ? (
        <GuessNumber
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
          setShowGuessNumber={setShowGuessNumber}
        />
      ) : (
        <button onClick={() => toggleGuessNumber()}>Guess Number</button>
      )}
    </div>
  );
}

export default App;
