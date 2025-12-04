import "./App.css";
import { useState } from "react";
import Star from "./Star.png";
import RockScissorsPaper from "./RockScissorsPaper/RockScissorsPaper";
import GuessNumber from "./GuessNumber/GuessNumber";
import Capitals from "./Capitals/Capitals";
import Cryptogram from "./Cryptogram/Cryptogram";
import Crazy100 from "./Crazy100/Crazy100";
import MemoryCards from "./MemoryCards/MemoryCards";
import MisereNim from "./MisereNim/MisereNim";

function App() {
  const [showGameTitles, setShowGameTitles] = useState(true);
  const [totalPoint, setTotalPoint] = useState(0);
  const [showRockScissorsPaper, setShowRockScissorsPaper] = useState(false);
  const [showGuessNumber, setShowGuessNumber] = useState(false);
  const [showCapitals, setShowCapitals] = useState(false);
  const [showCryptogram, setShowCryptogram] = useState(false);
  const [showCrazy100, setShowCrazy100] = useState(false);
  const [showMemoryCards, setShowMemoryCards] = useState(false);
  const [showMisereNim, setShowMisereNim] = useState(false);
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
  const toggleCryptogram = () => {
    setShowGameTitles(false);
    setShowCryptogram(true);
  };
  const toggleCrazy100 = () => {
    setShowGameTitles(false);
    setShowCrazy100(true);
  };
  const toggleMemoryCards = () => {
    setShowGameTitles(false);
    setShowMemoryCards(true);
  };
  const toggleMisereNim = () => {
    setShowGameTitles(false);
    setShowMisereNim(true);
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
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCapitals && (
          <button onClick={() => toggleCapitals()}>Capitals</button>
        )
      )}
      {!showGameTitles && showCryptogram ? (
        <Cryptogram
          setShowGameTitles={setShowGameTitles}
          setShowCryptogram={setShowCryptogram}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCryptogram && (
          <button onClick={() => toggleCryptogram()}>Cryptogram</button>
        )
      )}
      {!showGameTitles && showCrazy100 ? (
        <Crazy100
          setShowGameTitles={setShowGameTitles}
          setShowCrazy100={setShowCrazy100}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCrazy100 && (
          <button onClick={() => toggleCrazy100()}>Crazy-100</button>
        )
      )}
      {!showGameTitles && showMemoryCards ? (
        <MemoryCards
          setShowGameTitles={setShowGameTitles}
          setShowMemoryCards={setShowMemoryCards}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showMemoryCards && (
          <button onClick={() => toggleMemoryCards()}>Memory Cards</button>
        )
      )}
      {!showGameTitles && showMisereNim ? (
        <MisereNim
          setShowGameTitles={setShowGameTitles}
          setShowMisereNim={setShowMisereNim}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showMisereNim && (
          <button onClick={() => toggleMisereNim()}>Misere Nim</button>
        )
      )}
    </div>
  );
}

export default App;
