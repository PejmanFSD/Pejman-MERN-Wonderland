import { useState, useEffect } from "react";
import { imagesArray } from "./imagesArray";
import { getRandNumInRange } from "../utils";

export default function Counter({ updateTotalPoint }) {
  const [gameArray, setGameArray] = useState(imagesArray);
  const [finalGameArray, setFinalGameArray] = useState([]);
  const [quizArray, setQuizArray] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSlideShowStarted, setIsSlideShowStarted] = useState(false);
  const [isResult, setIsResult] = useState(false);
  // Variables for the timer:
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(false); // A boolean to show/hide images
  const [countdown, setCountdown] = useState(3); // Just for the first 3 numbers (3, 2, 1)
  const [userAnswers, setUserAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
  });
  const [finalMessage, setFinalMessage] = useState("");

  const handleStart = () => {
    setIsGameStarted(true);
    // expanding the gameArray based on the repetition value
    // and store it into a temporary variable (expandedArray):
    const expandedArray = gameArray.flatMap((item) =>
      Array.from({ length: item.repetition }, (_, i) => ({
        ...item,
        instanceId: `${item.id}-${i}`,
      })),
    );
    // Shuffling the new temporary variable (expandedArray):
    const shuffled = expandedArray.sort(() => Math.random() - 0.5);
    // Assigning the new temporary variable (expandedArray) to a
    // permanent variable(finalGameArray):
    setFinalGameArray(shuffled);
    setIsSlideShowStarted(true);
  };
  const handleQuestion1 = (e) => {
    const value = e.target.value;
    setUserAnswers((currUserAnswers) => ({
      ...currUserAnswers,
      answer1: value,
    }));
  };
  const handleQuestion2 = (e) => {
    const value = e.target.value;
    setUserAnswers((currUserAnswers) => ({
      ...currUserAnswers,
      answer2: value,
    }));
  };
  const handleQuestion3 = (e) => {
    const value = e.target.value;
    setUserAnswers((currUserAnswers) => ({
      ...currUserAnswers,
      answer3: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      parseInt(userAnswers.answer1) === quizArray[0].repetition &&
      parseInt(userAnswers.answer2) === quizArray[1].repetition &&
      parseInt(userAnswers.answer3) === quizArray[2].repetition
    ) {
      setFinalMessage("You Win!");
      updateTotalPoint(1);
    } else {
      setFinalMessage("You Loose!");
    }
    setIsResult(true);
  };
  useEffect(() => {
    setGameArray((currGameArray) =>
      currGameArray.map((arr) => ({
        ...arr,
        repetition: getRandNumInRange(1, 3),
      })),
    );
  }, []);
  useEffect(() => {
    if (isGameStarted && isSlideShowStarted) {
      let step = -1;
      const interval = setInterval(() => {
        step++;
        if (step === 0) setCountdown(3);
        if (step === 1) setCountdown(2);
        if (step === 2) setCountdown(1);
        if (step === 3) setCountdown(-1);
        if (step === 4) setCountdown(0);
        if (step >= 5) {
          setShowImage((prev) => !prev); // Every other second, we see nothing
          // For even seconds we see the images:
          if (step % 2 === 0) {
            setCurrentIndex((prev) => prev + 1);
          }
        }
        // Stop when last image reached
        if (step === 6 + 2 * finalGameArray.length) {
          clearInterval(interval);
          setIsSlideShowStarted(false);
          return;
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isGameStarted]);
  useEffect(() => {
    if (!isSlideShowStarted) {
      const shuffled = [...gameArray].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 3);
      setQuizArray(selected);
    }
  }, [isSlideShowStarted]);
  return (
    <div>
      {!isGameStarted && <button onClick={handleStart}>Start the Game</button>}
      <br />
      {gameArray.map((el) => (
        <div style={{ display: "inline" }}>{el.repetition} - </div>
      ))}
      <br />
      {finalGameArray.map((el, i) => (
        <img
          src={finalGameArray[i].image}
          style={{
            width: "40px",
            border: "1px solid black",
            margin: "3px",
          }}
        />
      ))}
      <br />
      <div>
        {isGameStarted && isSlideShowStarted && countdown > 0 && (
          <h1>{countdown}</h1>
        )}
        {isGameStarted && isSlideShowStarted && countdown === -1 && (
          <h1>Go!</h1>
        )}
        {isGameStarted &&
          isSlideShowStarted &&
          countdown === 0 &&
          showImage &&
          finalGameArray[currentIndex] && (
            <img
              src={finalGameArray[currentIndex].image}
              style={{
                width: "80px",
                border: "1px solid black",
                margin: "5px",
              }}
              alt=""
              width="80px"
            />
          )}
      </div>
      {isGameStarted &&
        !isSlideShowStarted &&
        quizArray.map((i) => (
          <div style={{ display: "inline" }}>
            <img
              src={i.image}
              style={{ width: "60px", border: "1px solid red", margin: "4px" }}
            />
            <div style={{ display: "inline", color: "red" }}>
              {i.repetition}
            </div>
            <div style={{ display: "inline", color: "blue" }}>{i.name}</div>
          </div>
        ))}
      {isGameStarted && !isSlideShowStarted && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="question1">{`How many ${quizArray[0].name} did you see?`}</label>
            <select onChange={handleQuestion1} name="question1" id="question1">
              <option value={userAnswers.answer1} disabled selected>
                🔽
              </option>
              {[1, 2, 3].map((i) => (
                <option disabled={isResult}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="question2">{`How many ${quizArray[1].name} did you see?`}</label>
            <select onChange={handleQuestion2} name="question2" id="question2">
              <option value={userAnswers.answer2} disabled selected>
                🔽
              </option>
              {[1, 2, 3].map((i) => (
                <option disabled={isResult}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="question3">{`How many ${quizArray[2].name} did you see?`}</label>
            <select onChange={handleQuestion3} name="question3" id="question3">
              <option value={userAnswers.answer3} disabled selected>
                🔽
              </option>
              {[1, 2, 3].map((i) => (
                <option disabled={isResult}>{i}</option>
              ))}
            </select>
          </div>
          {!isResult && <button>Submit</button>}
        </form>
      )}
      {isGameStarted && !isSlideShowStarted && (
        <div>
          <div>Answer1: {userAnswers.answer1}</div>
          <div>Answer2: {userAnswers.answer2}</div>
          <div>Answer3: {userAnswers.answer3}</div>
        </div>
      )}
      {isResult && (
        <div>
          <div>
            {userAnswers.answer1} - {quizArray[0].repetition}
          </div>
          <div>
            {userAnswers.answer2} - {quizArray[1].repetition}
          </div>
          <div>
            {userAnswers.answer3} - {quizArray[2].repetition}
          </div>
          <div>
            {parseInt(userAnswers.answer1) === quizArray[0].repetition
              ? `The nember of ${quizArray[0].name}: ${quizArray[0].repetition}. You guessed correctly! ✅`
              : `The nember of ${quizArray[0].name}: ${quizArray[0].repetition}. You guessed wrong! ❌`}
          </div>
          <div>
            {parseInt(userAnswers.answer2) === quizArray[1].repetition
              ? `The nember of ${quizArray[1].name}: ${quizArray[1].repetition}. You guessed correctly! ✅`
              : `The nember of ${quizArray[1].name}: ${quizArray[1].repetition}. You guessed wrong! ❌`}
          </div>
          <div>
            {parseInt(userAnswers.answer3) === quizArray[2].repetition
              ? `The nember of ${quizArray[2].name}: ${quizArray[2].repetition}. You guessed correctly! ✅`
              : `The nember of ${quizArray[2].name}: ${quizArray[2].repetition}. You guessed wrong! ❌`}
          </div>
          <h2>{finalMessage}</h2>
        </div>
      )}
    </div>
  );
}
