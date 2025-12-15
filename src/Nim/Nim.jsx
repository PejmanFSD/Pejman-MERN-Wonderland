import { useState } from "react";
import Bowls from "./Bowls";
import ModeExplaination from "../ModeExplaination";

export default function Nim({updateTotalPoint}) {
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
        <ModeExplaination message="Easy Mode: In his turn, Pejman chooses the bowl and the number of balls randomly." />
      )}
      {normalMode && (
        <ModeExplaination message="Normal Mode: In his turn, Pejman chooses the bowl and the number of balls with a strategy!" />
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
      {isFillingTheBowlsByUserStarted && (
        <Bowls
          isFillingTheBowlsByUserFinished={isFillingTheBowlsByUserFinished}
          setIsFillingTheBowlsByUserFinished={
            setIsFillingTheBowlsByUserFinished
          }
          isFillingTheBowlsByPejmanStarted={isFillingTheBowlsByPejmanStarted}
          setIsFillingTheBowlsByPejmanStarted={
            setIsFillingTheBowlsByPejmanStarted
          }
          isFillingTheBowlsByPejmanFinished={isFillingTheBowlsByPejmanFinished}
          setIsFillingTheBowlsByPejmanFinished={
            setIsFillingTheBowlsByPejmanFinished
          }
          isGameStarted={isGameStarted}
          easyMode={easyMode}
          normalMode={normalMode}
          standard={standard}
          misere={misere}
          isUserTurn={isUserTurn}
          toggleUserTurn={toggleUserTurn}
          updateTotalPoint={updateTotalPoint}
        />
      )}
      {isFillingTheBowlsByPejmanFinished && !isGameStarted && (
        <button onClick={startTheGame}>Start the Game</button>
      )}
    </div>
  );
}
