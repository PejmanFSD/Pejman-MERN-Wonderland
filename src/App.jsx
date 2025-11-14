import "./App.css";
import { useState } from "react";
import Star from "./Star.png";
import RockScissorsPaper from "./RockScissorsPaper/RockScissorsPaper";
import GuessNumber from "./GuessNumber/GuessNumber";
import Capitals from "./Capitals/Capitals";
import Cryptogram from "./Cryptogram/Cryptogram";

function App() {
  const [showGameTitles, setShowGameTitles] = useState(true);
  const [totalPoint, setTotalPoint] = useState(0);
  const [showRockScissorsPaper, setShowRockScissorsPaper] = useState(false);
  const [showGuessNumber, setShowGuessNumber] = useState(false);
  const [showCapitals, setShowCapitals] = useState(false);
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
  const toggleCapitals = () => {
    setShowGameTitles(false);
    setShowCapitals(true);
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
          setShowRockScissorsPaper={setShowRockScissorsPaper}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
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
          setShowGuessNumber={setShowGuessNumber}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showGuessNumber && (
          <button onClick={() => toggleGuessNumber()}>Guess Number</button>
        )
      )}
      {!showGameTitles && showCapitals ? (
        <Capitals
          setShowGameTitles={setShowGameTitles}
          setShowCapitals={setShowCapitals}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCapitals && (
          <button onClick={() => toggleCapitals()}>
            Capitals
          </button>
        )
      )}
      <Cryptogram />
    </div>
  );
}

export default App;
