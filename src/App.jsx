import "./App.css";
import { useState } from "react";
import Star from "./Star.png";
import RockScissorsPaper from "./RockScissorsPaper/RockScissorsPaper";
import GuessNumber from "./GuessNumber/GuessNumber";

function App() {
  const [showGameTitles, setShowGameTitles] = useState(true);
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
    setShowGameTitles(false);
    setShowRockScissorsPaper(true);
  };
  const toggleGuessNumber = () => {
    setShowGameTitles(false);
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
      {!showGameTitles && showRockScissorsPaper ? (
        <RockScissorsPaper
          setShowGameTitles={setShowGameTitles}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
          setShowRockScissorsPaper={setShowRockScissorsPaper}
        />
      ) : (
        showGameTitles &&
        !showRockScissorsPaper && (
          <button onClick={() => toggleRockScissorsPaper()}>
            Rock - Scissors - Paper
          </button>
        )
      )}
      {!showGameTitles && showGuessNumber ? (
        <GuessNumber
          setShowGameTitles={setShowGameTitles}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
          setShowGuessNumber={setShowGuessNumber}
        />
      ) : (
        showGameTitles &&
        !showGuessNumber && (
          <button onClick={() => toggleGuessNumber()}>Guess Number</button>
        )
      )}
    </div>
  );
}

export default App;
