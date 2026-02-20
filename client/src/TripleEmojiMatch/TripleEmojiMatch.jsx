import { useState, useEffect } from "react";
import Emoji from "./Emoji";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";
import { emojisArray, selectedEmojisArray } from "./emojisArray";
import E00 from "./images/000.jpg";
import Skull from "./images/Skull.jpg";

export default function TripleEmojiMatch({
  updateTotalPoint,
  setShowTripleEmojiMatch,
  setShowGameTitles,
}) {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [emojis, setEmojis] = useState(emojisArray);
  const [selectedEmojis, setSelectedEmojis] = useState(selectedEmojisArray);
  const [tripleMatch, setTripleMatch] = useState(false);
  const [isWin, setIsWin] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);

  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setIsGameStarted(true);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
    setIsGameStarted(true);
    setIsTimerRunning(true);
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
    setSelectedEmojis(selectedEmojisArray);
    setTripleMatch(false);
    setSeconds(10);
    setIsTimerRunning(true);
    setIsTogglingReset(false);
    setIsTogglingHomePage(false);
    setIsTogglingLevel(false);
    setIsWin("");
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
    setIsGameStarted(false);
    setShowTripleEmojiMatch(false);
    setShowGameTitles(true);
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
      if (normalMode) {
        updateTotalPoint(1);
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
  return (
    <div>
      <h2>Triple Emoji Match</h2>
      {!isGameStarted && !easyMode && !normalMode && !isTogglingHomePage && (
        <div>
          <button onClick={runEasyMode}>Easy Mode</button>
          <button onClick={runNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode &&
      !normalMode &&
      !isTogglingReset &&
      !isTogglingHomePage &&
      !isTogglingLevel ? (
        <ModeExplaination message="Easy Mode: There's no timer. You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        !isTogglingLevel && (
          <ModeExplaination message="Normal Mode: Find all the matches in *** seconds. You will get one star if you win." />
        )
      )}
      {isTimerRunning && isWin === "" && normalMode && (
        <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
          {seconds}
        </h3>
      )}
      {isGameStarted &&
        !isTogglingReset &&
        isWin === "" &&
        !isTogglingHomePage &&
        !isTogglingLevel &&
        (easyMode || normalMode) && (
          <div>
            <button onClick={toggleReset}>Reset the Game</button>
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
      {!isTogglingHomePage &&
        !isTogglingReset &&
        !isTogglingLevel &&
        isWin === "" && (
          <div>
            <button onClick={() => toggleHomePage()}>
              Back to the home page
            </button>
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
      {(easyMode || normalMode) &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        !isTogglingLevel &&
        isWin === "" && (
          <div>
            <button
              style={{
                display: "inline",
              }}
              onClick={() => toggleLevel()}
            >{`Switch to ${easyMode ? "Normal Mode" : "Easy Mode"}`}</button>
          </div>
        )}
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
      {isWin === false && (
        <div>
          <h2>{seconds < 1 && normalMode ? "Time's Up!" : "You lose!"}</h2>
          <div>Try Again?</div>
          <button onClick={handlePlayAgain}>Ok</button>
        </div>
      )}
      {isWin === true && (
        <div>
          <h2>You Win!</h2>
          <div>Play Again?</div>
          <button onClick={handlePlayAgain}>Ok</button>
        </div>
      )}
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
            {selectedEmojis.map((selectedEmoji) => (
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
              />
            ))}
          </div>
        )}
      {tripleMatch === true &&
        isWin === "" &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        !isTogglingLevel && (
          <div>
            <div>Well Done! You found a tripleMatch</div>
            <div>
              {selectedEmojis.map(
                (s) =>
                  s.repetitionNum === 3 && (
                    <img
                      src={s.image}
                      style={{
                        position: "relative",
                        top: "7px",
                        width: "60px",
                        margin: "3px",
                        border: "1px solid red",
                      }}
                    />
                  ),
              )}
            </div>
            <button
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
              top: "15px",
              display: "grid",
              gridTemplateColumns: "repeat(20, auto)",
              justifyContent: "center",
            }}
          >
            {emojis.map((emoji) => (
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
              />
            ))}
          </div>
        )}
    </div>
  );
}
