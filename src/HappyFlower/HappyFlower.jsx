import { useState, useEffect } from "react";
import Form from "./Form";
import GuessTable from "./GuessTable";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";

export default function HappyFlower({ updateTotalPoint }) {
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
  const [isTogglingReset, setIsTogglingReset] = useState(false);

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
      if (normalMode) {
        updateTotalPoint(1);
      }
    }
  }, [userGuess]);
  return (
    <div>
      <h2>Happy Flower</h2>
      {!easyMode && !normalMode && (
        <div>
          <button onClick={handleEasy}>Easy</button>
          <button onClick={handleNormal}>Normal</button>
        </div>
      )}
      {easyMode && (
        <ModeExplaination message="Easy Mode: You will not get any star if you win, because there's no time limitation." />
      )}
      {normalMode && (
        <ModeExplaination message="Normal Mode: You'll get a star if you guess the word in 60 seconds." />
      )}
      {isTimerRunning && isWin === "" && normalMode && !isTogglingReset && (
        <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
          {seconds}
        </h3>
      )}
      {(easyMode || normalMode) && isWin === "" && !isTogglingReset && (
        <div>
          <button onClick={() => toggleReset()}>Reset the Game</button>
        </div>
      )}
      {isTogglingReset && (
        <ConfirmationBox
          question="Are you sure you want to reset the game?"
          toggleYes={toggleResetYes}
          toggleCancel={toggleResetCancel}
        />
      )}
      {!isGameStarted && (easyMode || normalMode) && !isTogglingReset && (
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
      <div style={{ color: "gray" }}>
        {title} - {word} - {word.length} - {wordWithNoSpace} - {userGuess} -{" "}
        {isWin ? "T" : "F"}
      </div>
      <div>
        {normalMode && seconds < 1 && !isTogglingReset && <h2>Time's Up!</h2>}
        {isWin === false && (
          <div>
            <h2>You loose!</h2>
            <h3>{`The name of the ${title} is "${word}"`}</h3>
            <div>Try again?</div>
            <button onClick={handleReset}>Ok</button>
          </div>
        )}
        {isWin === true && (
          <div>
            <h2>You Win!</h2>
            <div>Play again?</div>
            <button onClick={handleReset}>Ok</button>
          </div>
        )}
      </div>
      {isGameStarted && !isTogglingReset && (
        <div>
          {isWin === "" && <div>{`Guess the name of the ${title}`}</div>}
          <GuessTable
            word={word}
            userGuess={userGuess}
            setUserGuess={setUserGuess}
            userMistakes={userMistakes}
            setUserMistakes={setUserMistakes}
            isWin={isWin}
            seconds={seconds}
          />
        </div>
      )}
    </div>
  );
}
