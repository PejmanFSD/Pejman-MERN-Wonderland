import { useState, useEffect } from "react";
import ConfirmationBox from "../ConfirmationBox";
import GameLevel from "../GameLevel";
import Rock from "./Rock.png";
import Scissors from "./Scissors.png";
import Paper from "./Paper.png";
import { getRandNum } from "../utils";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutRockScissorsPaper from "./AboutRockScissorsPaper";
const optionsArray = ["Rock", "Scissors", "Paper"];

export default function RockScissorsPaper({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
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
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  const runNormalMode = () => {
    setNormalMode(true);
    setExtremelySuperDifficultMode(false);
  };
  const runExtremelySuperDifficultMode = () => {
    setExtremelySuperDifficultMode(true);
    setNormalMode(false);
  };
  const handleStart = () => {
    setIsGameStarted(true);
  };
  const announcingTheWinner = (user, pejman) => {
    if (user === "" || pejman === "") return;
    else if (user === pejman) {
      setGameResult("No winner!");
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
      setPejmanChoice(optionsArray[getRandNum(3) - 1]);
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
    navigate("/");
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
    setShowReviews(true);
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
  useEffect(
    function () {
      handleTotalPoint();
      announcingTheWinner(userChoice, pejmanChoice);
    },
    [userChoice, pejmanChoice],
  );
  useEffect(() => {
    document.title = "Rock-Scissors-Paper";
  }, []);
  return (
    <div>
      {isAboutPage && (
        <AboutRockScissorsPaper setIsAboutPage={setIsAboutPage} />
      )}
      {!isAboutPage && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 d-flex justify-content-center">
                <h2 className="fasterOne" style={{ fontSize: "45px" }}>
                  Rock - Scissors - Paper
                </h2>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xl-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isTogglingReset && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "240px" }}
                      onClick={handleAboutPage}
                    >
                      About Rock - Scissors - Paper
                    </button>
                  )}
              </div>
              <div className="col-xl-3 align-self-center">
                {!isTogglingLevel &&
                  !isTogglingHomePage &&
                  !isTogglingReset && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "340px" }}
                      onClick={() => toggleLevel()}
                      disabled={
                        !isGameStarted ||
                        (!normalMode && !extremelySuperDifficultMode) ||
                        !showImages
                      }
                    >{`${normalMode ? "Switch to Extremely-Super-Difficult Mode" : extremelySuperDifficultMode ? "Switch to Normal Mode" : "Switch level"}`}</button>
                  )}
              </div>
              <div className="col-xl-2 offset-xl-1 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingReset &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "150px" }}
                      onClick={() => toggleReset()}
                      disabled={
                        !isGameStarted ||
                        !showImages ||
                        (!normalMode && !extremelySuperDifficultMode) ||
                        score === 0
                      }
                    >
                      Reset the Game
                    </button>
                  )}
              </div>
              <div className="col-xl-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingReset &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "170px" }}
                      onClick={() => toggleHomePage()}
                      disabled={!showImages}
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>
          {isTogglingLevel && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question={`Are you sure you want to switch to ${
                      extremelySuperDifficultMode
                        ? "Normal Mode"
                        : "extremely-Super-Difficult Mode"
                    }?`}
                    toggleYes={toggleLevelYes}
                    toggleCancel={toggleLevelCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {isTogglingReset && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question="Are you sure you want to reset the game? By reseting the game, your score will be reset to zero!"
                    toggleYes={toggleResetYes}
                    toggleCancel={toggleResetCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {isTogglingHomePage && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question="Are you sure you want to go back to Home Page?"
                    toggleYes={toggleHomePageYes}
                    toggleCancel={toggleHomePageCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {!normalMode &&
            !extremelySuperDifficultMode &&
            !isGameStarted &&
            !isTogglingHomePage && (
              <GameLevel
                mode1="Normal"
                mode1Function={runNormalMode}
                mode2="Extremely Super Difficult"
                mode2Function={runExtremelySuperDifficultMode}
              />
            )}
          {!isGameStarted &&
            (normalMode || extremelySuperDifficultMode) &&
            !isTogglingHomePage && (
              <button
                className="btn1"
                onClick={handleStart}
                style={{ marginTop: "10px" }}
              >
                Start
              </button>
            )}
          {isGameStarted &&
            !isTogglingHomePage &&
            !isTogglingReset &&
            !isTogglingLevel &&
            showImages &&
            (normalMode || extremelySuperDifficultMode) && (
              <div className="container">
                <div className="row">
                  <div className="col-10 offset-1 d-flex justify-content-center">
                    <img
                      src={Rock}
                      className="product-RSP-image"
                      style={{ cursor: "pointer" }}
                      alt="Rock"
                      onClick={() => handleUserChoice("Rock")}
                    />
                    <img
                      src={Scissors}
                      className="product-RSP-image"
                      style={{ cursor: "pointer" }}
                      alt="Scissors"
                      onClick={() => handleUserChoice("Scissors")}
                    />
                    <img
                      src={Paper}
                      style={{ cursor: "pointer" }}
                      className="product-RSP-image"
                      alt="Paper"
                      onClick={() => handleUserChoice("Paper")}
                    />
                  </div>
                </div>
              </div>
            )}
          {!isTogglingHomePage &&
            !isTogglingReset &&
            !isTogglingLevel &&
            (normalMode || extremelySuperDifficultMode) &&
            new Array(tripleScore).fill(null).map((s, i) => (
              <div style={{ display: "inline", fontSize: "70px" }} key={i}>
                ❁
              </div>
            ))}
          {isGameStarted &&
          tripleScore === 3 &&
          !isTogglingHomePage &&
          !isTogglingReset &&
          !isTogglingLevel &&
          (normalMode || extremelySuperDifficultMode) ? (
            <div className="container">
              <div className="row">
                <h4 className="col-10 offset-1 d-flex justify-content-center fasterOne">
                  Excellent! You just beat Pejman three times in a row.
                </h4>
                <h4 className="col-10 offset-1 d-flex justify-content-center fasterOne">
                  Your total point increases by one.
                </h4>
                <div className="col-10 offset-1 d-flex justify-content-center my-2">
                  <button className="btn2" onClick={() => handleOk()}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          ) : (
            isGameStarted &&
            !isTogglingHomePage &&
            !isTogglingReset &&
            !isTogglingLevel &&
            (normalMode || extremelySuperDifficultMode) && (
              <div>
                <div>
                  {userChoice && (
                    <div>
                      Your choice: <strong>{userChoice}</strong>
                    </div>
                  )}
                </div>
                <div>
                  {pejmanChoice && (
                    <div>
                      Pejman's choice: <strong>{pejmanChoice}</strong>
                    </div>
                  )}
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-10 offset-1 d-flex justify-content-center">
                      <h2>{gameResult}</h2>
                    </div>
                  </div>
                </div>
                <h2>Your score: {score}</h2>
              </div>
            )
          )}
          {isGameStarted &&
            !showImages &&
            !isTogglingHomePage &&
            tripleScore !== 3 &&
            (normalMode || extremelySuperDifficultMode) && (
              <ConfirmationBox
                question="Play again?"
                toggleYes={togglePlayAgainYes}
                toggleCancel={togglePlayAgainCancel}
              />
            )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button
                className="btn1"
                onClick={handleReviewSection}
                style={{ marginTop: "25px" }}
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
              <ReviewSection
                game="RockScissorsPaper"
                currentUser={currentUser}
              />
            )}
        </div>
      )}
      <br />
    </div>
  );
}
