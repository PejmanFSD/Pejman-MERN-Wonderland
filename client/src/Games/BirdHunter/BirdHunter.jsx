import { useState } from "react";
import HuntingGround from "./HuntingGround";
import { getRandArr } from "../utils";
import T1 from "./images/T1.jpg";
import T2 from "./images/T2.jpg";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";

export default function BirdHunter({updateTotalPoint}) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [grounds, setGrounds] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [chosenGround, setChosenGround] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delayMilliSec, setDelayMilliSec] = useState(1000);
  const [numOfDoneGrounds, setNumOfDoneGrounds] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

  const navigate = useNavigate();
  const handleStart = () => {
    setIsGameStarted(true);
    handleChooseGround();
  };
  const handleChooseGround = () => {
    const c = getRandArr(grounds);
    setChosenGround(c);
    setGrounds((currGrounds) => currGrounds.filter((g) => g !== c));
  };
  const handleAnnouncingTheGameResult = () => {
    setIsGameStarted(false);
    if (userScore > 13) {
      setFinalMessage("You Win!");
      updateTotalPoint(1);
    } else {
      setFinalMessage("You Loose!");
    }
  };
  const handlePlayAgain = () => {
    setGrounds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    setChosenGround(0);
    setIsRunning(false);
    setDelayMilliSec(1000);
    setNumOfDoneGrounds(0);
    setUserScore(0);
    setFinalMessage("");
    setIsTogglingHomePage(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  return (
    <div>
      {grounds.map((g) => (
        <div style={{ display: "inline" }}>{g}-</div>
      ))}
      <div>chosenGround: {chosenGround}</div>
      <div>numOfDoneGrounds: {numOfDoneGrounds}</div>
      <div>userScore: {userScore}</div>
      {isGameStarted && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", gap: "50px" }}>
            <div style={{ display: "inline" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
                <div style={{ display: "flex", alignItems: "center", border: "1px solid black", margin: "5px", padding: "7px" }}>
                    <img src={T1} height={isTogglingHomePage ? "30px" : "55px"} />
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
                    isTogglingHomePage={isTogglingHomePage}
                    />
                    <img src={T2} height={isTogglingHomePage ? "30px" : "55px"} />
                </div>
              ))}
            </div>
            <div style={{ display: "inline" }}>
              {[9, 10, 11, 12, 13, 14, 15, 16].map((el) => (
                <div style={{ display: "flex", alignItems: "center", border: "1px solid black", margin: "5px", padding: "7px" }}>
                    <img src={T1} height={isTogglingHomePage ? "30px" : "55px"} />
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
                    isTogglingHomePage={isTogglingHomePage}
                    />
                    <img src={T2} height={isTogglingHomePage ? "30px" : "55px"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {grounds.length === 16 && !isTogglingHomePage && (
        <button
          style={{ position: "relative", top: "5px" }}
          onClick={handleStart}
          disabled={isRunning}
        >
          Start the Game
        </button>
      )}
      {numOfDoneGrounds === 16 && finalMessage === "" && !isTogglingHomePage && (
        <button
          style={{ position: "relative", top: "5px" }}
          onClick={handleAnnouncingTheGameResult}
        >
          See the Game Result
        </button>
      )}
      <h2>{finalMessage && !isTogglingHomePage && finalMessage}</h2>
      <div>
        {finalMessage && userScore === 16 && !isTogglingHomePage && "Wow! You didn't miss a single bird!"}
      </div>
      <div>{finalMessage && userScore === 15 && !isTogglingHomePage && "You missed a bird!"}</div>
      <div>
        {finalMessage && userScore < 15 && !isTogglingHomePage &&
          `You missed ${16 - userScore} birds!`}
      </div>
      {finalMessage === "You Win!" && !isTogglingHomePage && (
        <div>
          <div>Play Again!</div>
          <button onClick={handlePlayAgain}>Ok</button>
        </div>
      )}
      {finalMessage === "You Loose!" && !isTogglingHomePage && (
        <div>
          <div>Try Again!</div>
          <button onClick={handlePlayAgain}>Ok</button>
        </div>
      )}
      {!isTogglingHomePage && (
        <div>
          <button onClick={() => toggleHomePage()}>
            Back to the home page
          </button>
        </div>
      )}
      {isTogglingHomePage && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to go back to Home Page?"
            toggleYes={toggleHomePageYes}
            toggleCancel={toggleHomePageCancel}
          />
        </div>
      )}
      {!isTogglingHomePage && isGameStarted && <ReviewSection game="BirdHunter" />}
    </div>
  );
}
