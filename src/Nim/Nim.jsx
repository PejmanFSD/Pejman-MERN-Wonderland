import { useState } from "react";
import Bowls from "./Bowls";
import ModeExplaination from "../ModeExplaination";

export default function Nim({ updateTotalPoint }) {
  const [standard, setStandard] = useState(false);
  const [misere, setMisere] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isFillingTheBowlsByUserStarted, setIsFillingTheBowlsByUserStarted] =
    useState(false);
  const [isFillingTheBowlsByUserFinished, setIsFillingTheBowlsByUserFinished] =
    useState(false);
  const [
    isFillingTheBowlsByPejmanStarted,
    setIsFillingTheBowlsByPejmanStarted,
  ] = useState(false);
  const [
    isFillingTheBowlsByPejmanFinished,
    setIsFillingTheBowlsByPejmanFinished,
  ] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);

  const handleStandeardNim = () => {
    setStandard(true);
    setMisere(false);
  };
  const handleMisereNim = () => {
    setMisere(true);
    setStandard(false);
  };
  const handleEasy = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormal = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const toggleUserTurn = () => {
    setIsUserTurn((currIsUserTurn) => !currIsUserTurn);
  };
  const startFillingUserBowls = () => {
    setIsFillingTheBowlsByUserStarted(true);
  };
  const startTheGame = () => {
    setIsGameStarted(true);
    toggleUserTurn();
  };
  return (
    <div>
      {standard && (
        <ModeExplaination message="Standard Nim: Get the last ball and win." />
      )}
      {misere && (
        <ModeExplaination message="Misere Nim: Get the last ball and loose!" />
      )}
      {easyMode && (
        <ModeExplaination message="Easy Mode: In his turn, Pejman chooses the bowl and the number of balls randomly. You'll get 1 star if you win." />
      )}
      {normalMode && (
        <ModeExplaination message="Normal Mode: In his turn, Pejman chooses the bowl and the number of balls with a strategy! You'll get 3 stars if you win." />
      )}
      {!standard && !misere && (
        <div>
          <button onClick={handleStandeardNim}>Standeard Nim</button>
          <button onClick={handleMisereNim}>Misère Nim</button>
        </div>
      )}
      {(standard || misere) && !easyMode && !normalMode && (
        <div>
          <button onClick={handleEasy}>Easy</button>
          <button onClick={handleNormal}>Normal</button>
        </div>
      )}
      {!isFillingTheBowlsByUserStarted && (easyMode || normalMode) && (
        <button onClick={startFillingUserBowls}>
          Start Filling your Bowls with Balls
        </button>
      )}
      {isFillingTheBowlsByPejmanFinished && !isGameStarted && !isTogglingReset && (
        <button onClick={startTheGame}>Start the Game</button>
      )}
      {isFillingTheBowlsByUserStarted && (
        <Bowls
          isFillingTheBowlsByUserFinished={isFillingTheBowlsByUserFinished}
          setIsFillingTheBowlsByUserFinished={setIsFillingTheBowlsByUserFinished}
          isFillingTheBowlsByPejmanFinished={isFillingTheBowlsByPejmanFinished}
          setIsFillingTheBowlsByPejmanFinished={setIsFillingTheBowlsByPejmanFinished}
          setIsFillingTheBowlsByUserStarted={setIsFillingTheBowlsByUserStarted}
          setIsFillingTheBowlsByPejmanStarted={setIsFillingTheBowlsByPejmanStarted}
          isGameStarted={isGameStarted}
          setIsGameStarted={setIsGameStarted}
          easyMode={easyMode}
          setEasyMode={setEasyMode}
          normalMode={normalMode}
          setNormalMode={setNormalMode}
          standard={standard}
          setStandard={setStandard}
          misere={misere}
          setMisere={setMisere}
          isUserTurn={isUserTurn}
          setIsUserTurn={setIsUserTurn}
          toggleUserTurn={toggleUserTurn}
          updateTotalPoint={updateTotalPoint}
          isTogglingReset={isTogglingReset}
          setIsTogglingReset={setIsTogglingReset}
        />
      )}
    </div>
  );
}
