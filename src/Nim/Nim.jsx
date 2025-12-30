import { useState } from "react";
import Bowls from "./Bowls";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";

export default function Nim({ updateTotalPoint, setShowNim, setShowGameTitles }) {
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
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

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
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setIsGameStarted(false);
    setShowNim(false);
    setShowGameTitles(true);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  return (
    <div>
      <h2>Nim</h2>
      {standard && !isTogglingHomePage && (
        <ModeExplaination message="Standard Nim: Get the last ball and win." />
      )}
      {misere && !isTogglingHomePage && (
        <ModeExplaination message="Misere Nim: Get the last ball and loose!" />
      )}
      {easyMode && !isTogglingHomePage && (
        <ModeExplaination message="Easy Mode: In his turn, Pejman chooses the bowl and the number of balls randomly. You'll get 1 star if you win." />
      )}
      {normalMode && !isTogglingHomePage && (
        <ModeExplaination message="Normal Mode: In his turn, Pejman chooses the bowl and the number of balls with a strategy! You'll get 3 stars if you win." />
      )}
      {!standard && !misere && !isTogglingHomePage && (
        <div>
          <button onClick={handleStandeardNim}>Standeard Nim</button>
          <button onClick={handleMisereNim}>Misère Nim</button>
        </div>
      )}
      {(standard || misere) && !easyMode && !normalMode && !isTogglingHomePage && (
        <div>
          <button onClick={handleEasy}>Easy</button>
          <button onClick={handleNormal}>Normal</button>
        </div>
      )}
      {!isFillingTheBowlsByUserStarted && (easyMode || normalMode) && !isTogglingHomePage && (
        <button onClick={startFillingUserBowls}>
          Start Filling your Bowls with Balls
        </button>
      )}
      {isFillingTheBowlsByPejmanFinished && !isGameStarted && !isTogglingReset && !isTogglingHomePage && (
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
          isTogglingHomePage={isTogglingHomePage}
          setIsTogglingHomePage={setIsTogglingHomePage}
          setShowNim={setShowNim}
          setShowGameTitles={setShowGameTitles}
        />
      )}
      {!isTogglingReset &&
        !isTogglingHomePage &&
        (
          <button onClick={() => toggleHomePage()}>
            Back to the home page
          </button>
        )}
      {(isGameStarted || (!isGameStarted && (!easyMode || !normalMode))) &&
        isTogglingHomePage && (
          <ConfirmationBox
            question="Are you sure you want to go back to Home Page?"
            toggleYes={toggleHomePageYes}
            toggleCancel={toggleHomePageCancel}
          />
        )}
    </div>
  );
}
