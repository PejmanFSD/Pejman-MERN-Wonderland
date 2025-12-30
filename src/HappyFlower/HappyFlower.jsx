import { useState, useEffect } from "react";
import Form from "./Form";
import GuessTable from "./GuessTable";

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

  const handleReset = () => {
    setTitle("");
    setWord("");
    setWordWithNoSpace([]);
    setIsGameStarted(false);
    setUserGuess([]);
    setUserMistakes([]);
    setIsWin("");
    setIsTimerRunning(false);
    handleResetTimer();
  };

  const handleStartTimer = () => setIsTimerRunning(true);
  const handleStopTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setSeconds(60);
    setIsTimerRunning(false);
  };
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
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
    }
  }, [userMistakes]);
  useEffect(() => {
    if (seconds < 1) {
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
      updateTotalPoint(1);
    }
  }, [userGuess]);
  return (
    <div>
      <h2>Happy Flower</h2>
      {isTimerRunning && isWin === "" && (
        <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
          {seconds}
        </h3>
      )}
      {!isGameStarted && (
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
        {seconds < 1 && <h2>Time's Up!</h2>}
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
      {isGameStarted && (
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
