import { useState, useEffect } from "react";
import Square from "./Square";
import ConfirmationBox from "../ConfirmationBox";
import { getRandNum } from "../utils";
import Blank from "./images/Blank.jpg";
import Cross from "./images/Cross.jpg";
import Tick from "./images/Tick.jpg";
import Current from "./images/Current.jpg";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutKukuKube from "./AboutKukuKube";

export default function KukuKube({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
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
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
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
    setShowReviews(true);
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
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
      setSquareNum(36);
      setUniqueSquare(getRandNum(36));
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
      setSquareNum(9);
      setUniqueSquare(getRandNum(9));
    }
    setStep(1);
    setUserChoice(null);
    setIsStepPassed(null);
    setIsUniqueSquareRevealed(false);
    setIsTogglingLevel(false);
    setShowReviews(true);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  useEffect(() => {
    document.title = "Kuku Kube";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutKukuKube setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2>Kuku Kube</h2>
          <div className="four-buttons-container">
            {!isTogglingHomePage &&
              !isTogglingLevel &&
              !isTogglingReset &&
              isGameStarted && (
                <button onClick={handleAboutPage}>About Kuku Kube</button>
              )}
            {isGameStarted &&
              (easyMode || normalMode) &&
              !isTogglingReset &&
              !isTogglingHomePage &&
              !isTogglingLevel &&
              isGameStarted && (
                <button
                  onClick={() => toggleLevel()}
                >{`Switch to ${easyMode ? "Normal Mode" : "Easy Mode"}`}</button>
              )}
            {isGameStarted &&
              !isTogglingReset &&
              !isTogglingHomePage &&
              !isTogglingLevel &&
              (easyMode || normalMode) &&
              isGameStarted && (
                <button onClick={toggleReset}>Reset the Game</button>
              )}
            {!isTogglingHomePage &&
              !isTogglingReset &&
              !isTogglingLevel &&
              isGameStarted && (
                <button onClick={() => toggleHomePage()}>
                  Back to home page
                </button>
              )}
          </div>
          {(easyMode || normalMode) && isTogglingLevel && (
            <div>
              <ConfirmationBox
                question={`Are you sure you want to switch to ${
                  easyMode ? "Normal Mode" : "Easy Mode"
                }?`}
                toggleYes={toggleLevelYes}
                toggleCancel={toggleLevelCancel}
                easyMode={easyMode}
              />
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
          {isTogglingHomePage && (
            <div>
              <ConfirmationBox
                question="Are you sure you want to go back to Home Page?"
                toggleYes={toggleHomePageYes}
                toggleCancel={toggleHomePageCancel}
              />
            </div>
          )}
          {!isGameStarted &&
            !easyMode &&
            !normalMode &&
            !isTogglingHomePage && (
              <div className="four-buttons-container">
                <button onClick={runEasyMode}>Easy Mode</button>
                <button onClick={runNormalMode}>Normal Mode</button>
              </div>
            )}
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div>
                <label htmlFor="color"></label>
                <select
                  onChange={handleColor}
                  name="color"
                  id="color"
                  style={{
                    textAlign: "center",
                    width: "140px",
                    height: "25px",
                  }}
                >
                  <option value={color} disabled selected>
                    Select a Color
                  </option>
                  {["Red", "Green", "Blue"].map((c, i) => (
                    <option key={i}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          {!isGameStarted &&
            (easyMode || normalMode) &&
            isColorChosen &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <button onClick={handleStart} style={{ marginTop: "15px" }}>
                Start the Game
              </button>
            )}
          {/* <div style={{ color: "gray" }}>The chosen square: {uniqueSquare}</div>
          <div style={{ color: "gray" }}>User's choice: {userChoice}</div> */}
          {step > 0 &&
            isColorChosen &&
            isGameStarted &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && <h2>Step {step}</h2>}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            new Array(squareNum).fill(null).map((el, idx) =>
              (idx + 1) % squareNum ** 0.5 !== 0 ? (
                <div style={{ display: "inline" }} key={idx}>
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
                <div style={{ display: "inline" }} key={idx}>
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
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            new Array(12).fill(null).map((el, idx) => (
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
                alt=""
                key={idx}
              />
            ))}
          <br />
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <button
                onClick={submitUserChoice}
                style={{ position: "relative", top: "30px", margin: "10px" }}
                disabled={!userChoice || isStepPassed !== null}
              >
                Submit
              </button>
            )}
          <br />
          {isGameStarted &&
            isStepPassed === true &&
            userChoice &&
            step !== 12 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div
                style={{ position: "relative", top: "30px", margin: "10px" }}
              >
                Well Done! You guessed correctly!
                <div>
                  <button
                    onClick={handleNextStep}
                    style={{ margin: "10px" }}
                  >{`Go to Step ${step + 1}`}</button>
                </div>
              </div>
            )}
          {isGameStarted &&
            isStepPassed === true &&
            userChoice &&
            step === 12 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div style={{ position: "relative", top: "60px" }}>
                <h3>{`You Win${normalMode ? "!" : ", but you don't get any stars!"}`}</h3>
                <div>
                  <div>Play Again?</div>
                  <button onClick={handleReset} style={{ marginTop: "10px" }}>
                    Ok
                  </button>
                </div>
              </div>
            )}
          {isGameStarted &&
            isStepPassed === false &&
            userChoice &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div style={{ position: "relative", top: "60px" }}>
                <h3>Sorry! You didn't guess correctly! You Lose!</h3>
                <div>
                  <div>Try Again?</div>
                  <button onClick={handleReset} style={{ marginTop: "10px" }}>
                    Ok
                  </button>
                </div>
              </div>
            )}
          <br />
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button
                onClick={handleReviewSection}
                style={{ position: "relative", top: "65px" }}
              >
                {showReviews
                  ? "Hide the Reviews Section"
                  : "Show the Reviews Section"}
              </button>
            )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted &&
            showReviews && (
              <div style={{ position: "relative", top: "40px" }}>
                <ReviewSection game="KukuKube" currentUser={currentUser} />
              </div>
            )}
        </div>
      )}
    </div>
  );
}
