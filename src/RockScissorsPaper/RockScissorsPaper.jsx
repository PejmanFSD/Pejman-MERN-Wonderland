import { useState, useEffect } from "react";
import ConfirmationBox from "./ConfirmationBox";
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
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

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
    setPejmanChoice(optionsArray[getRandNum(1) - 1]);
  };
  const handleTotalPoint = () => {
    if (tripleScore === 3) {
      setTripleScore(0);
    }
  };
  // const reset = () => {
  //   setScore(0);
  //   setUserChoice("");
  //   setPejmanChoice("");
  //   setGameResult("");
  // };
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
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setScore(0);
    setUserChoice("");
    setPejmanChoice("");
    setGameResult("");
    setIsTogglingReset(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const toggleHomePageYes = () => {
    setShowRockScissorsPaper(false);
    setShowGameTitles(true);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
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
      {!isTogglingHomePage && !isTogglingReset && (
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
      {tripleScore === 3 && !isTogglingHomePage && !isTogglingReset ? (
        <div>
          <h3>Excellent! You just beat Pejman three times in a row</h3>
          <h3>Your total point increases by one</h3>
          <button onClick={() => handleOk()}>OK</button>
        </div>
      ) : (
        !isTogglingHomePage &&
        !isTogglingReset && (
          <div>
            <div>{userChoice && <p>Your choice: {userChoice}</p>}</div>
            <div>{pejmanChoice && <p>Pejman's choice: {pejmanChoice}</p>}</div>
            <h2>{gameResult}</h2>
            <h2>Your score: {score}</h2>
            <h3>Your Total Point: {totalPoint}</h3>
            {/* {gameResult && <button onClick={() => reset()}>Reset</button>} */}
          </div>
        )
      )}
      {!isTogglingHomePage && !isTogglingReset && (
        <button onClick={() => toggleReset()}>Reset</button>
      )}
      {isTogglingReset && (
        <ConfirmationBox
          areYouSureQuestion="Are you sure you want to reset the game?"
          toggleYes={toggleResetYes}
          toggleCancel={toggleResetCancel}
        />
      )}
      {!isTogglingHomePage && !isTogglingReset && (
        <button onClick={() => toggleHomePage()}>Back to the home page</button>
      )}
      {isTogglingHomePage && (
        <ConfirmationBox
          areYouSureQuestion="Are you sure you want to go back to Home Page?"
          toggleYes={toggleHomePageYes}
          toggleCancel={toggleHomePageCancel}
        />
      )}
    </div>
  );
}
