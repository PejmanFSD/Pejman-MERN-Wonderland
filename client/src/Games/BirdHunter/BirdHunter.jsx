import { useState } from "react";
import HuntingGround from "./HuntingGround";
import { getRandArr } from "../utils";

export default function BirdHunter() {
  const [grounds, setGrounds] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [chosenGround, setChosenGround] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delayMilliSec, setDelayMilliSec] = useState(1000);
  const [numOfDoneGrounds, setNumOfDoneGrounds] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const handleChooseGround = () => {
    const c = getRandArr(grounds);
    setChosenGround(c);
    setGrounds((currGrounds) => currGrounds.filter((g) => g !== c));
  };
  return (
    <div>
      {grounds.map((g) => (
        <div style={{ display: "inline" }}>{g}-</div>
      ))}
      <div>chosenGround: {chosenGround}</div>
      <div>numOfDoneGrounds: {numOfDoneGrounds}</div>
      <div>userScore: {userScore}</div>
      {new Array(8).fill(null).map((el, idx) => (
        <HuntingGround
          grounds={grounds}
          groundNum={idx + 1}
          chosenGround={chosenGround}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          delayMilliSec={delayMilliSec}
          handleChooseGround={handleChooseGround}
          setChosenGround={setChosenGround}
          setNumOfDoneGrounds={setNumOfDoneGrounds}
          setUserScore={setUserScore}
        />
      ))}
      {chosenGround === 0 && (
        <button
          style={{ position: "relative", top: "10px" }}
          onClick={handleChooseGround}
          disabled={isRunning}
        >
          Start
        </button>
      )}
    </div>
  );
}
