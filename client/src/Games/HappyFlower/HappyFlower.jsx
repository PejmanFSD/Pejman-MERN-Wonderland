import { useState, useEffect } from "react";
import Form from "./Form";
import GuessTable from "./GuessTable";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutHappyFlower from "./AboutHappyFlower";

export default function HappyFlower({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [title, setTitle] = useState("");
  const [word, setWord] = useState("");
  const [wordWithNoSpace, setWordWithNoSpace] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState([]);
  const [userMistakes, setUserMistakes] = useState([]);
  const [isWin, setIsWin] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  const handleReset = () => {
    setTitle("");
    setWord("");
    setWordWithNoSpace([]);
    setIsGameStarted(false);
    setUserGuess([]);
    setUserMistakes([]);
    setIsWin("");
    setEasyMode(false);
    setNormalMode(false);
    setIsTimerRunning(false);
    handleResetTimer();
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
    setShowReviews(true);
  };
  const handleEasy = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormal = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStartTimer = () => setIsTimerRunning(true);
  const handleStopTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setSeconds(60);
    setIsTimerRunning(false);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    handleReset();
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
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
    setIsGameStarted(false);
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    setTitle("");
    setWord("");
    setWordWithNoSpace([]);
    setIsGameStarted(false);
    setUserGuess([]);
    setUserMistakes([]);
    setIsWin("");
    setIsTimerRunning(false);
    handleResetTimer();
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
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
    let interval;
    if (isTimerRunning && normalMode) {
      interval = setInterval(() => {
        setSeconds((prev) => prev > 1 && prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);
  // Creatign a copy of "word", but with no space:
  useEffect(() => {
    setWordWithNoSpace(word.replace(/\s+/g, ""));
  }, [word]);
  useEffect(() => {
    if (userMistakes.length === 5) {
      setIsWin(false);
      handleStopTimer();
    }
  }, [userMistakes]);
  useEffect(() => {
    if (seconds < 1 && normalMode) {
      setIsWin(false);
      handleStopTimer();
    }
  }, [seconds]);
  useEffect(() => {
    let mistakesNum = 0;
    for (let i = 0; i < wordWithNoSpace.length; i++) {
      if (!userGuess.includes(wordWithNoSpace[i].toLowerCase())) {
        mistakesNum++;
      }
    }
    if (mistakesNum === 0 && userGuess.length > 0) {
      setIsWin(true);
      handleStopTimer();
      if (easyMode) {
        updateTotalPoint(1);
      } else if (normalMode) {
        updateTotalPoint(3);
      }
    }
  }, [userGuess]);
  useEffect(() => {
    document.title = "Happy Flower";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutHappyFlower setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Happy Flower
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingReset &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={handleAboutPage}
                    >
                      About Happy Flower
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleLevel()}
                      disabled={(!easyMode && !normalMode) || isWin !== ""}
                    >{`${easyMode ? "Switch to Normal Mode" : normalMode ? "Switch to Easy Mode" : "Switch level"}`}</button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleReset()}
                      disabled={(!easyMode && !normalMode) || isWin !== ""}
                    >
                      Reset the Game
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleHomePage()}
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>
          {isTogglingLevel && !isTogglingHomePage && (
            <ConfirmationBox
              question={`Are you sure you want to switch to ${
                easyMode ? "Normal Mode" : "Easy Mode"
              }?`}
              toggleYes={toggleLevelYes}
              toggleCancel={toggleLevelCancel}
            />
          )}
          {isTogglingReset && !isTogglingHomePage && (
            <ConfirmationBox
              question="Are you sure you want to reset the game?"
              toggleYes={toggleResetYes}
              toggleCancel={toggleResetCancel}
            />
          )}
          {(isGameStarted || (!isGameStarted && (!easyMode || !normalMode))) &&
            isTogglingHomePage && (
              <ConfirmationBox
                question="Are you sure you want to go back to Home Page?"
                toggleYes={toggleHomePageYes}
                toggleCancel={toggleHomePageCancel}
              />
            )}
          {!easyMode && !normalMode && !isTogglingHomePage && (
            <div
              className="four-buttons-container"
              style={{ marginTop: "15px" }}
            >
              <button className="btn1" onClick={handleEasy}>
                Easy
              </button>
              <button className="btn1" onClick={handleNormal}>
                Normal
              </button>
            </div>
          )}
          {isTimerRunning && isWin === "" && normalMode && (
            <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
              {seconds}
            </h3>
          )}
          <br />
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <Form
                title={title}
                setTitle={setTitle}
                word={word}
                setWord={setWord}
                setWordWithNoSpace={setWordWithNoSpace}
                setIsGameStarted={setIsGameStarted}
                setSeconds={setSeconds}
                handleStartTimer={handleStartTimer}
              />
            )}
          {/* <div style={{ color: "gray" }}>
            {title} - {word} - {word.length} - {wordWithNoSpace} - {userGuess} -{" "}
            {isWin ? "T" : "F"}
          </div> */}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div>
                {isWin === "" && (
                  <div
                    style={{ position: "relative", top: "-20px" }}
                  >{`Guess the name of the ${title}`}</div>
                )}
                <GuessTable
                  word={word}
                  userGuess={userGuess}
                  setUserGuess={setUserGuess}
                  userMistakes={userMistakes}
                  setUserMistakes={setUserMistakes}
                  isWin={isWin}
                  seconds={seconds}
                  normalMode={normalMode}
                  isTogglingReset={isTogglingReset}
                  isTogglingHomePage={isTogglingHomePage}
                  isTogglingLevel={isTogglingLevel}
                  title={title}
                  handleReset={handleReset}
                />
              </div>
            )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button
                className="btn1"
                onClick={handleReviewSection}
                style={{ position: "relative", top: "40px" }}
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
              <div style={{ position: "relative", top: "20px" }}>
                <ReviewSection game="HappyFlower" currentUser={currentUser} />
              </div>
            )}
        </div>
      )}
      <br />
      <br />
    </div>
  );
}
