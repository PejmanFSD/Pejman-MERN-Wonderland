import { useState } from "react";
import HuntingGround from "./HuntingGround";
import { getRandArr } from "../utils";

export default function BirdHunter() {
  const [grounds, setGrounds] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [chosenGround, setChosenGround] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delayMilliSec, setDelayMilliSec] = useState(1000);
  const [numOfDoneGrounds, setNumOfDoneGrounds] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");

  const handleChooseGround = () => {
    const c = getRandArr(grounds);
    setChosenGround(c);
    setGrounds((currGrounds) => currGrounds.filter((g) => g !== c));
  };
  const handleAnnouncingTheGameResult = () => {
    if (userScore > 13) {
        setFinalMessage("You Win!");
    } else {
        setFinalMessage("You Loose!");
    }
  }
  return (
    <div>
      {grounds.map((g) => (
        <div style={{ display: "inline" }}>{g}-</div>
      ))}
      <div>chosenGround: {chosenGround}</div>
      <div>numOfDoneGrounds: {numOfDoneGrounds}</div>
      <div>userScore: {userScore}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: "50px" }}>
        <div style={{ display: "inline" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
            <HuntingGround
              grounds={grounds}
              groundNum={el}
              chosenGround={chosenGround}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              delayMilliSec={delayMilliSec}
              setDelayMilliSec={setDelayMilliSec}
              handleChooseGround={handleChooseGround}
              setChosenGround={setChosenGround}
              setNumOfDoneGrounds={setNumOfDoneGrounds}
              setUserScore={setUserScore}
            />
          ))}
        </div>
        <div style={{ display: "inline" }}>
          {[9, 10, 11, 12, 13, 14, 15, 16].map((el) => (
            <HuntingGround
              grounds={grounds}
              groundNum={el}
              chosenGround={chosenGround}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              delayMilliSec={delayMilliSec}
              setDelayMilliSec={setDelayMilliSec}
              handleChooseGround={handleChooseGround}
              setChosenGround={setChosenGround}
              setNumOfDoneGrounds={setNumOfDoneGrounds}
              setUserScore={setUserScore}
            />
          ))}
        </div>
      </div>
          </div>
      {grounds.length === 16 && (
        <button
          style={{ position: "relative", top: "30px" }}
          onClick={handleChooseGround}
          disabled={isRunning}
        >
          Start
        </button>
      )}
      {numOfDoneGrounds === 16 && finalMessage === "" &&
        <button
          style={{ position: "relative", top: "30px" }}
          onClick={handleAnnouncingTheGameResult}
        >
          See the game result
        </button>
      }
      <h2>{finalMessage && finalMessage}</h2>
      <div>{finalMessage && userScore === 16 && "Wow! You didn't miss a bird!"}</div>
      <div>{finalMessage && userScore === 15 && "You missed a bird!"}</div>
      <div>{finalMessage && userScore < 15 && `You missed ${16 - userScore} birds!`}</div>
    </div>
  );
}
