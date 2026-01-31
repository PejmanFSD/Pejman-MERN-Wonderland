import { useState } from "react";
import Square from "./Square";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";
import { getRandNum } from "../utils";
import Blank from "./images/Blank.jpg";
import Cross from "./images/Cross.jpg";
import Tick from "./images/Tick.jpg";
import Current from "./images/Current.jpg";

export default function KukuKube({ updateTotalPoint, setShowGameTitles, setShowKukuKube }) {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isColorChosen, setIsColorChosen] = useState(false);
  const [color, setColor] = useState({ red: null, green: null, blue: null });
  const [squareNum, setSquareNum] = useState(0);
  const [uniqueSquare, setUniqueSquare] = useState(0);
  const [step, setStep] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [isStepPassed, setIsStepPassed] = useState(null);
  const [isUniqueSquareRevealed, setIsUniqueSquareRevealed] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setSquareNum(9);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
    setSquareNum(36);
  };
  const handleStart = () => {
    setIsGameStarted(true);
    setUniqueSquare(getRandNum(squareNum));
    setStep(1);
  };
  const handleReset = () => {
    setStep(1);
    setUserChoice(null);
    setUniqueSquare(getRandNum(squareNum));
    setIsStepPassed(null);
    setIsUniqueSquareRevealed(false);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsColorChosen(false);
    setColor({ red: null, green: null, blue: null });
    setEasyMode(false);
    setNormalMode(false);
    setSquareNum(0);
    setUniqueSquare(0);
    setStep(0);
    setUserChoice(null);
    setIsStepPassed(null);
    setIsUniqueSquareRevealed(false);
    setIsGameStarted(false);
    setIsTogglingReset(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const handleColor = (e) => {
    if (e.target.value === "Red") {
      setColor({ red: 170, green: 0, blue: 0 });
    } else if (e.target.value === "Green") {
      setColor({ red: 0, green: 170, blue: 0 });
    } else if (e.target.value === "Blue") {
      setColor({ red: 0, green: 0, blue: 170 });
    }
    setIsColorChosen(true);
  };
  const submitUserChoice = () => {
    setIsUniqueSquareRevealed(true);
    if (userChoice === uniqueSquare) {
      setIsStepPassed(true);
      if (step === 12 && normalMode) {
        updateTotalPoint(1);
      }
    } else if (userChoice !== uniqueSquare) {
      setIsStepPassed(false);
    }
  };
  const handleNextStep = () => {
    setStep((currStep) => currStep + 1);
    setUserChoice(null);
    setUniqueSquare(getRandNum(squareNum));
    setIsStepPassed(null);
    setIsUniqueSquareRevealed(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setIsGameStarted(false);
    setShowKukuKube(false);
    setShowGameTitles(true);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  return (
    <div>
      <h2>Kuku Kube</h2>
      {!isTogglingReset && !isTogglingHomePage && (
        <h4>In each step, find the square with the unique color</h4>
      )}
      {!isGameStarted && !easyMode && !normalMode && !isTogglingHomePage && (
        <div>
          <button onClick={runEasyMode}>Easy Mode</button>
          <button onClick={runNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode && !normalMode && !isTogglingReset && !isTogglingHomePage ? (
        //   !isTogglingLevel
        <ModeExplaination message="Easy Mode: You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode &&
        !isTogglingReset && !isTogglingHomePage && (
          // !isTogglingLevel
          <ModeExplaination message="Normal Mode: You will get one star if you win." />
        )
      )}
      {!isGameStarted && (easyMode || normalMode) && !isTogglingHomePage && (
        <div>
          <label htmlFor="color"></label>
          <select onChange={handleColor} name="color" id="color">
            <option value={color} disabled selected>
              Select a Color
            </option>
            {["Red", "Green", "Blue"].map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </div>
      )}
      {!isGameStarted && (easyMode || normalMode) && isColorChosen && !isTogglingHomePage && (
        <button onClick={handleStart}>Start the Game</button>
      )}
      <div style={{ color: "gray" }}>The chosen square: {uniqueSquare}</div>
      <div style={{ color: "gray" }}>User's choice: {userChoice}</div>
      {isGameStarted &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        (easyMode || normalMode) && (
          <div>
            <button onClick={toggleReset}>Reset the Game</button>
          </div>
        )}
      {isTogglingReset && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to reset the game?"
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        </div>
      )}
      {!isTogglingHomePage && !isTogglingReset && (
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
      {step > 0 && !isTogglingReset && !isTogglingHomePage && <div>Step {step}</div>}
      {isGameStarted &&
        !isTogglingReset && !isTogglingHomePage && 
        new Array(squareNum).fill(null).map((el, idx) =>
          (idx + 1) % squareNum ** 0.5 !== 0 ? (
            <div style={{ display: "inline" }}>
              <Square
                easyMode={easyMode}
                red={color.red}
                green={color.green}
                blue={color.blue}
                opacity={idx + 1 === uniqueSquare ? step * 0.072 : 1}
                text={idx + 1}
                userChoice={userChoice}
                setUserChoice={setUserChoice}
                isStepPassed={isStepPassed}
                uniqueSquare={uniqueSquare}
                isUniqueSquareRevealed={isUniqueSquareRevealed}
              />
            </div>
          ) : (
            <div style={{ display: "inline" }}>
              <Square
                easyMode={easyMode}
                red={color.red}
                green={color.green}
                blue={color.blue}
                opacity={idx + 1 === uniqueSquare ? step * 0.072 : 1}
                text={idx + 1}
                userChoice={userChoice}
                setUserChoice={setUserChoice}
                isStepPassed={isStepPassed}
                uniqueSquare={uniqueSquare}
                isUniqueSquareRevealed={isUniqueSquareRevealed}
              />
              <br></br>
            </div>
          ),
        )}
      {isGameStarted && !isTogglingReset && !isTogglingHomePage && 
        new Array(12)
          .fill(null)
          .map((el, idx) => (
            <img
              style={{
                height: "19px",
                position: "relative",
                top: "30px",
                margin: "2px",
              }}
              src={
                idx === step - 1 &&
                isUniqueSquareRevealed &&
                userChoice === uniqueSquare
                  ? Tick
                  : idx === step - 1 &&
                      isUniqueSquareRevealed &&
                      userChoice !== uniqueSquare
                    ? Cross
                    : idx === step - 1 &&
                        (userChoice || !isUniqueSquareRevealed)
                      ? Current
                      : idx < step - 1
                        ? Tick
                        : Blank
              }
            />
          ))}
      <br></br>
      {isGameStarted && !isTogglingReset && !isTogglingHomePage && (
        <button
          onClick={submitUserChoice}
          style={{ position: "relative", top: "50px" }}
          disabled={!userChoice || isStepPassed !== null}
        >
          Submit
        </button>
      )}
      {isGameStarted &&
        isStepPassed === true &&
        userChoice &&
        step !== 12 &&
        !isTogglingReset && !isTogglingHomePage && (
          <div style={{ position: "relative", top: "60px" }}>
            Well Done! You guessed correctly!
            <div>
              <button
                onClick={handleNextStep}
              >{`Go to Step ${step + 1}`}</button>
            </div>
          </div>
        )}
      {isGameStarted &&
        isStepPassed === true &&
        userChoice &&
        step === 12 &&
        !isTogglingReset && !isTogglingHomePage && (
          <div style={{ position: "relative", top: "60px" }}>
            {`You Win! ${normalMode ? "You get 1 star :)" : "But you won't get any stars :("}`}
            <div>
              <div>Play Again?</div>
              <button onClick={handleReset}>Ok</button>
            </div>
          </div>
        )}
      {isGameStarted &&
        isStepPassed === false &&
        userChoice &&
        !isTogglingReset && !isTogglingHomePage && (
          <div style={{ position: "relative", top: "60px" }}>
            Sorry! You didn't guess correctly!
            <div>
              <div>Try Again?</div>
              <button onClick={handleReset}>Ok</button>
            </div>
          </div>
        )}
    </div>
  );
}
