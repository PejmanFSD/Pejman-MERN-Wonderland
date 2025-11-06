import { useState, useEffect } from "react";
import ConfirmationBox from "../ConfirmationBox";
import GameLevel from "../GameLevel";
import ModeExplaination from "../ModeExplaination";
import Rock from "./Rock.png";
import Scissors from "./Scissors.png";
import Paper from "./Paper.png";
import { getRandNum } from "../utils";
const optionsArray = ["Rock", "Scissors", "Paper"];

export default function RockScissorsPaper({
  setShowGameTitles,
  totalPoint,
  updateTotalPoint,
  setShowRockScissorsPaper,
}) {
  const [userChoice, setUserChoice] = useState("");
  const [pejmanChoice, setPejmanChoice] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [score, setScore] = useState(0);
  const [tripleScore, setTripleScore] = useState(0);
  const [showImages, setShowImages] = useState(true);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [extremelySuperDifficultMode, setExtremelySuperDifficultMode] =
    useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);

  const runNormalMode = () => {
    setNormalMode(true);
    setExtremelySuperDifficultMode(false);
  };
  const runExtremelySuperDifficultMode = () => {
    setExtremelySuperDifficultMode(true);
    setNormalMode(false);
  };
  const announcingTheWinner = (user, pejman) => {
    if (user === "" || pejman === "") return;
    else if (user === pejman) {
      setGameResult("No winner, try again");
    } else if (user === "Rock" && pejman === "Scissors") {
      setGameResult("You win!");
      updateScore(1);
      setTripleScore((currTripleScore) => currTripleScore + 1);
    } else if (user === "Scissors" && pejman === "Paper") {
      setGameResult("You win!");
      updateScore(1);
      setTripleScore((currTripleScore) => currTripleScore + 1);
    } else if (user === "Paper" && pejman === "Rock") {
      setGameResult("You win!");
      updateScore(1);
      setTripleScore((currTripleScore) => currTripleScore + 1);
    } else {
      setGameResult("Pejman wins!");
      updateScore(-1);
      setTripleScore(0);
    }
  };
  const updateScore = (i) => {
    setScore((currScore) => currScore + i);
  };
  const handleUserChoice = (input) => {
    setUserChoice(input);
    if (normalMode) {
      setPejmanChoice(optionsArray[getRandNum(1) - 1]);
    } else if (extremelySuperDifficultMode) {
      if (input === "Rock") {
        setPejmanChoice("Paper");
      } else if (input === "Paper") {
        setPejmanChoice("Scissors");
      } else if (input === "Scissors") {
        setPejmanChoice("Rock");
      }
    }
    setShowImages(false);
  };
  const handleTotalPoint = () => {
    if (tripleScore === 3) {
      setTripleScore(0);
    }
  };
  const handleOk = () => {
    updateTotalPoint(1);
    setTripleScore(0);
    setUserChoice("");
    setPejmanChoice("");
    setGameResult("");
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setShowRockScissorsPaper(false);
    setShowGameTitles(true);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setScore(0);
    setTripleScore(0);
    setUserChoice("");
    setPejmanChoice("");
    setGameResult("");
    setIsTogglingReset(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const togglePlayAgainYes = () => {
    setUserChoice("");
    setPejmanChoice("");
    setGameResult("");
    setShowImages(true);
  };
  const togglePlayAgainCancel = () => {
    setIsTogglingHomePage(true);
  };
  const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    setUserChoice("");
    setPejmanChoice("");
    setScore(0);
    setTripleScore(0);
    setGameResult("");
    if (normalMode) {
      setNormalMode(false);
      setExtremelySuperDifficultMode(true);
    } else if (extremelySuperDifficultMode) {
      setExtremelySuperDifficultMode(false);
      setNormalMode(true);
    }
    setIsTogglingLevel(false);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  useEffect(
    function () {
      handleTotalPoint();
      announcingTheWinner(userChoice, pejmanChoice);
    },
    [userChoice, pejmanChoice]
  );
  return (
    <div>
      <h2>Rock - Scissors - Paper</h2>
      {!normalMode && !extremelySuperDifficultMode && !isTogglingHomePage && (
        <GameLevel
          mode1="Normal"
          mode1Function={runNormalMode}
          mode2="Extremely Super Difficult"
          mode2Function={runExtremelySuperDifficultMode}
        />
      )}
      {normalMode && !extremelySuperDifficultMode ? (
        <ModeExplaination message="Normal Mode: If you win Pejman 3 times in a row, you'll get one star." />
      ) : (
        extremelySuperDifficultMode &&
        !normalMode && (
          <ModeExplaination message="Extremely-Super-Difficult Mode: If you beat Pejman, you'll get 1,000,000 stars!" />
        )
      )}
      {!isTogglingHomePage &&
        !isTogglingReset &&
        !isTogglingLevel &&
        showImages &&
        (normalMode || extremelySuperDifficultMode) && (
          <div>
            <img
              src={Rock}
              width="150px"
              alt="Rock"
              onClick={() => handleUserChoice("Rock")}
            />
            <img
              src={Scissors}
              width="150px"
              alt="Scissors"
              onClick={() => handleUserChoice("Scissors")}
            />
            <img
              src={Paper}
              width="150px"
              alt="Paper"
              onClick={() => handleUserChoice("Paper")}
            />
          </div>
        )}
      {tripleScore === 3 &&
      !isTogglingHomePage &&
      !isTogglingReset &&
      !isTogglingLevel &&
      (normalMode || extremelySuperDifficultMode) ? (
        <div>
          <h3>Excellent! You just beat Pejman three times in a row</h3>
          <h3>Your total point increases by one</h3>
          <button onClick={() => handleOk()}>OK</button>
        </div>
      ) : (
        !isTogglingHomePage &&
        !isTogglingReset &&
        !isTogglingLevel &&
        (normalMode || extremelySuperDifficultMode) && (
          <div>
            <div>{userChoice && <p>Your choice: {userChoice}</p>}</div>
            <div>{pejmanChoice && <p>Pejman's choice: {pejmanChoice}</p>}</div>
            <h2>{gameResult}</h2>
            <h2>Your score: {score}</h2>
            <h3>Your Total Point: {totalPoint}</h3>
          </div>
        )
      )}
      {!showImages &&
        !isTogglingHomePage &&
        tripleScore !== 3 &&
        (normalMode || extremelySuperDifficultMode) && (
          <ConfirmationBox
            question="Play again?"
            toggleYes={togglePlayAgainYes}
            toggleCancel={togglePlayAgainCancel}
          />
        )}
      {!isTogglingHomePage &&
        !isTogglingReset &&
        showImages &&
        (normalMode || extremelySuperDifficultMode) &&
        !isTogglingLevel &&
        score !== 0 && <button onClick={() => toggleReset()}>Reset</button>}
      {isTogglingReset && (
        <ConfirmationBox
          question="Are you sure you want to reset the game? By reseting the game, your score will be reset to zero!"
          toggleYes={toggleResetYes}
          toggleCancel={toggleResetCancel}
        />
      )}
      {!isTogglingLevel &&
        (normalMode || extremelySuperDifficultMode) &&
        !isTogglingHomePage &&
        showImages &&
        !isTogglingReset && (
          <button onClick={() => toggleLevel()}>{`Switch to ${
            extremelySuperDifficultMode
              ? "Normal Mode"
              : "extremely-Super-Difficult Mode"
          }`}</button>
        )}
      {isTogglingLevel && (
        <ConfirmationBox
          question={`Are you sure you want to switch to ${
            extremelySuperDifficultMode
              ? "Normal Mode"
              : "extremely-Super-Difficult Mode"
          }?`}
          toggleYes={toggleLevelYes}
          toggleCancel={toggleLevelCancel}
        />
      )}
      {!isTogglingHomePage &&
        !isTogglingReset &&
        showImages &&
        !isTogglingLevel && (
          <button onClick={() => toggleHomePage()}>
            Back to the home page
          </button>
        )}
      {isTogglingHomePage && (
        <ConfirmationBox
          question="Are you sure you want to go back to Home Page?"
          toggleYes={toggleHomePageYes}
          toggleCancel={toggleHomePageCancel}
        />
      )}
    </div>
  );
}
