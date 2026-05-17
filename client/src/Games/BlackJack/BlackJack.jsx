import { useState } from "react";
import ReviewSection from "../../Components/ReviewSection";
import ModeExplaination from "../ModeExplaination";
import { deckArray, chips, clubs, diamonds, hearts, spades } from "./images";

export default function BlackJack({ updateTotalPoint, currentUser }) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [deck, setDeck] = useState(deckArray);
  const [usedCards, setUsedCards] = useState([]);

  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStart = () => {
    setIsGameStarted(true);
  };
  return (
    <div>
      <h2>BlackJack</h2>
      {easyMode && !normalMode ? (
        // !isTogglingReset &&
        // !isTogglingLevel &&
        // !isTogglingHomePage &&
        <ModeExplaination message="Easy Mode: Pejman doesn't memorize the cards and if both hands have the same value, you win the round. You get one star if you win." />
      ) : (
        !easyMode &&
        normalMode && (
          //   !isTogglingReset &&
          //   !isTogglingLevel &&
          //   !isTogglingHomePage &&
          <ModeExplaination message="Normal Mode: Pejman memorizes the cards and if both hands have the same value, Pejman wins the round. You get three star if you win." />
        )
      )}
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={handleEasyMode}>Easy Mode</button>
          <button onClick={handleNormalMode}>Normal Mode</button>
        </div>
      )}
      {!isGameStarted && (easyMode || normalMode) && (
        // !isTogglingLevel &&
        // !isTogglingHomePage &&
        <button onClick={handleStart}>Start the Game</button>
      )}
      {/* {isGameStarted &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage &&
        (
          <ReviewSection game="Snake" currentUser={currentUser} />
        )} */}
    </div>
  );
}
