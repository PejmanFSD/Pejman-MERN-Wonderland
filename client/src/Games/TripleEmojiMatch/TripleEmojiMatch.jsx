import { useState, useEffect } from "react";
import Emoji from "./Emoji";
import ConfirmationBox from "../ConfirmationBox";
import { emojisArray, selectedEmojisArray } from "./emojisArray";
import E00 from "./images/000.jpg";
import Skull from "./images/Skull.jpg";
import { getRandArr } from "../utils";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutTripleEmojiMatch from "./AboutTripleEmojiMatch";

export default function TripleEmojiMatch({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [emojis, setEmojis] = useState(emojisArray);
  const [selectedEmojis, setSelectedEmojis] = useState(selectedEmojisArray);
  const [tripleMatch, setTripleMatch] = useState(false);
  const [isWin, setIsWin] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(720);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [addTimeChanse, setAddTimeChanse] = useState(true);
  const [availableEmojis, setAvailableEmojis] = useState([]);
  const [pair1Chance, setPair1Chance] = useState(true);
  const [pair1ChoseEmoji, setPair1ChoseEmoji] = useState(null);
  const [pair2Chance, setPair2Chance] = useState(true);
  const [pair2ChoseEmoji, setPair2ChoseEmoji] = useState(null);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  const runEasyMode = () => {
    setEmojis((currEmojis) => shuffleArray(currEmojis));
    setEasyMode(true);
    setNormalMode(false);
    setIsGameStarted(true);
    for (const emoji of emojis) {
      if (!emoji.isSelected) {
        setAvailableEmojis((currAvailableEmojis) => [
          ...currAvailableEmojis,
          emoji,
        ]);
      }
    }
  };
  const runNormalMode = () => {
    setEmojis((currEmojis) => shuffleArray(currEmojis));
    setNormalMode(true);
    setEasyMode(false);
    setIsGameStarted(true);
    setIsTimerRunning(true);
    for (const emoji of emojis) {
      if (!emoji.isSelected) {
        setAvailableEmojis((currAvailableEmojis) => [
          ...currAvailableEmojis,
          emoji,
        ]);
      }
    }
  };
  const handleTripleMatch = () => {
    setSelectedEmojis((currSelectedEmojis) =>
      currSelectedEmojis.map((emoji) =>
        emoji.repetitionNum === 3
          ? { ...emoji, image: E00, isFilled: false, repetitionNum: 0 }
          : emoji,
      ),
    );
    setTripleMatch(false);
  };
  const handlePlayAgain = () => {
    setEmojis(emojisArray);
    setEmojis((currEmojis) => shuffleArray(currEmojis));
    setSelectedEmojis(selectedEmojisArray);
    setTripleMatch(false);
    setSeconds(720);
    setAddTimeChanse(true);
    setAvailableEmojis([]);
    setPair1Chance(true);
    setPair1ChoseEmoji(null);
    setPair2Chance(true);
    setPair2ChoseEmoji(null);
    setIsTimerRunning(true);
    setIsTogglingReset(false);
    setIsTogglingHomePage(false);
    setIsTogglingLevel(false);
    setIsWin("");
    for (const emoji of emojis) {
      if (!emoji.isSelected) {
        setAvailableEmojis((currAvailableEmojis) => [
          ...currAvailableEmojis,
          emoji,
        ]);
      }
    }
    setShowReviews(true);
  };
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    handlePlayAgain();
    setIsTogglingReset(false);
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
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    handlePlayAgain();
    setIsTogglingLevel(false);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  const add30Seconds = () => {
    setSeconds((currSeconds) => currSeconds + 30);
    setAddTimeChanse(false);
  };
  const showPair1 = () => {
    setPair1ChoseEmoji(getRandArr(availableEmojis));
    setPair1Chance(false);
  };
  const showPair2 = () => {
    setPair2ChoseEmoji(getRandArr(availableEmojis));
    setPair2Chance(false);
  };
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  useEffect(() => {
    setAvailableEmojis([]);
    for (const emoji of emojis) {
      if (!emoji.isSelected) {
        setAvailableEmojis((currAvailableEmojis) => [
          ...currAvailableEmojis,
          emoji,
        ]);
      }
    }
  }, [emojis]);
  useEffect(() => {
    setSelectedEmojis((currSelectedEmojis) =>
      currSelectedEmojis.map((emoji) => ({ ...emoji, repetitionNum: 0 })),
    );
    for (const i of selectedEmojis) {
      for (const j of selectedEmojis) {
        if (i.image === j.image && j.image !== E00) {
          setSelectedEmojis((currSelectedEmojis) =>
            currSelectedEmojis.map((emoji) =>
              emoji.id === i.id
                ? { ...emoji, repetitionNum: emoji.repetitionNum + 1 }
                : emoji,
            ),
          );
        }
      }
    }
  }, [emojis]);
  useEffect(() => {
    let i = 0;
    for (const emoji of emojis) {
      if (emoji.image !== E00) {
        i++;
      }
    }
    if (i === 0) {
      setIsWin(true);
      setIsTimerRunning(false);
      if (easyMode) {
        updateTotalPoint(2);
      } else if (normalMode) {
        updateTotalPoint(5);
      }
    }
  }, [emojis]);
  useEffect(() => {
    for (const selectedEmoji of selectedEmojis) {
      if (selectedEmoji.repetitionNum === 3) {
        setTripleMatch(true);
        break;
      }
    }
  }, [selectedEmojis]);
  useEffect(() => {
    let freeSquares = 0;
    for (const selectedEmoji of selectedEmojis) {
      if (selectedEmoji.image === E00 || selectedEmoji.image === Skull) {
        freeSquares++;
      }
    }
    if (freeSquares === 0) {
      setIsWin(false);
      setIsTimerRunning(false);
    }
  }, [selectedEmojis]);
  useEffect(() => {
    let interval;
    if (isTimerRunning && normalMode) {
      interval = setInterval(() => {
        setSeconds((prev) => prev > 1 && prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);
  useEffect(() => {
    if (seconds < 1 && normalMode) {
      setIsWin(false);
      setIsTimerRunning(false);
    }
  }, [seconds]);
  useEffect(() => {
    document.title = "Triple Emoji Match";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutTripleEmojiMatch setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Triple Emoji Match
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isTogglingReset && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "207px" }}
                      onClick={handleAboutPage}
                    >
                      About Triple Emoji Match
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
                      disabled={
                        !isGameStarted ||
                        isWin !== "" ||
                        (!easyMode && !normalMode)
                      }
                      onClick={toggleReset}
                    >
                      Reset the Game
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingReset &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleHomePage()}
                      disabled={isWin !== ""}
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>
          {isTogglingLevel && isWin === "" && (
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
          {isTogglingReset && isWin === "" && (
            <div>
              <ConfirmationBox
                question="Are you sure you want to reset the game?"
                toggleYes={toggleResetYes}
                toggleCancel={toggleResetCancel}
              />
            </div>
          )}
          {isTogglingHomePage && isWin === "" && (
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
              <div
                className="four-buttons-container"
                style={{ marginTop: "15px" }}
              >
                <button className="btn1" onClick={runEasyMode}>
                  Easy Mode
                </button>
                <button className="btn1" onClick={runNormalMode}>
                  Normal Mode
                </button>
              </div>
            )}
          {isTimerRunning && isWin === "" && normalMode && (
            <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
              {seconds}
            </h3>
          )}

          {normalMode &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isWin === "" && (
              <button
                className="btn1"
                onClick={add30Seconds}
                disabled={!addTimeChanse}
              >
                add 30 seconds
              </button>
            )}
          <div className="four-buttons-container" style={{ marginTop: "15px" }}>
            {(normalMode || easyMode) &&
              !isTogglingReset &&
              !isTogglingHomePage &&
              !isTogglingLevel &&
              isWin === "" &&
              !tripleMatch && (
                <button
                  className="btn1"
                  onClick={showPair1}
                  disabled={!pair1Chance}
                >
                  Show me a triple match
                </button>
              )}
            {(normalMode || easyMode) &&
              !isTogglingReset &&
              !isTogglingHomePage &&
              !isTogglingLevel &&
              isWin === "" &&
              !tripleMatch && (
                <button
                  className="btn1"
                  onClick={showPair2}
                  disabled={!pair2Chance}
                >
                  Show me a triple match
                </button>
              )}
          </div>
          {isWin === false && (
            <div>
              <h2 className="fasterOne" style={{ fontSize: "40px" }}>
                {seconds < 1 && normalMode ? "Time's Up!" : "You Lose!"}
              </h2>
              <div>Try Again?</div>
              <button
                className="btn2"
                onClick={handlePlayAgain}
                style={{ marginTop: "15px" }}
              >
                Ok
              </button>
            </div>
          )}
          {isWin === true && (
            <div>
              <h2 className="fasterOne" style={{ fontSize: "40px" }}>
                You Win!
              </h2>
              <div>Play Again?</div>
              <button
                className="btn2"
                onClick={handlePlayAgain}
                style={{ marginTop: "15px" }}
              >
                Ok
              </button>
            </div>
          )}
          <br />
          {isGameStarted &&
            isWin === "" &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, auto)",
                  justifyContent: "center",
                  position: "relative",
                  top: "7px",
                }}
              >
                {selectedEmojis.map((selectedEmoji, idx) => (
                  <Emoji
                    key={selectedEmojis.indexOf(selectedEmoji)}
                    imgId={selectedEmojis.indexOf(selectedEmoji)}
                    imgSrc={selectedEmoji.image}
                    emojis={emojis}
                    setEmojis={setEmojis}
                    selectedEmojis={selectedEmojis}
                    setSelectedEmojis={setSelectedEmojis}
                    tripleMatch={tripleMatch}
                    isWin={isWin}
                    isSelected={true}
                    setAvailableEmojis={setAvailableEmojis}
                  />
                ))}
              </div>
            )}
          {tripleMatch === true &&
            isWin === "" &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div style={{ position: "relative", top: "10px" }}>
                <div>Well Done! You found a tripleMatch</div>
                <div>
                  {selectedEmojis.map(
                    (s, i) =>
                      s.repetitionNum === 3 && (
                        <img
                          src={s.image}
                          style={{
                            position: "relative",
                            top: "7px",
                            width: "60px",
                            margin: "3px",
                            border: "2px solid black",
                          }}
                          alt=""
                          key={i}
                        />
                      ),
                  )}
                </div>
                <button
                  className="btn2 my-2"
                  onClick={handleTripleMatch}
                  style={{ position: "relative", top: "7px" }}
                >
                  Ok
                </button>
              </div>
            )}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div
                style={{
                  position: "relative",
                  top: "25px",
                  display: "grid",
                  gridTemplateColumns: "repeat(14, auto)",
                  justifyContent: "center",
                }}
              >
                {emojis.map((emoji, i) => (
                  <Emoji
                    key={emoji.id}
                    imgId={emoji.id}
                    imgSrc={emoji.image}
                    emojis={emojis}
                    setEmojis={setEmojis}
                    selectedEmojis={selectedEmojis}
                    setSelectedEmojis={setSelectedEmojis}
                    tripleMatch={tripleMatch}
                    isWin={isWin}
                    isSelected={false}
                    pair1ChoseEmoji={pair1ChoseEmoji}
                    pair2ChoseEmoji={pair2ChoseEmoji}
                    setAvailableEmojis={setAvailableEmojis}
                  />
                ))}
              </div>
            )}
          <br />
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button
                className="btn1 my-3"
                onClick={handleReviewSection}
                style={{ position: "relative", top: "25px" }}
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
                game="TripleEmojiMatch"
                currentUser={currentUser}
              />
            )}
          <div style={{ marginTop: "50px" }}></div>
        </div>
      )}
    </div>
  );
}
