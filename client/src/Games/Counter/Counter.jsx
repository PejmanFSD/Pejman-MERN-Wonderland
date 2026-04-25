import { useState, useEffect } from "react";
import { imagesArray } from "./imagesArray";
import { getRandNumInRange } from "../utils";
import ConfirmationBox from "../ConfirmationBox";
import ModeExplaination from "../ModeExplaination";

export default function Counter({
  updateTotalPoint,
  setShowGameTitles,
  setShowCounter
}) {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [gameArray, setGameArray] = useState([]);
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
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
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
      if (normalMode) {
        setFinalMessage("You Win!");
        updateTotalPoint(1);
      } else if (easyMode) {
        setFinalMessage("You Win, but you don't get any stars!");
      }
    } else {
      setFinalMessage("You Loose!");
    }
    setIsResult(true);
  };
  const handlePlayAgain = () => {
    setGameArray([]);
    setFinalGameArray([]);
    setQuizArray([]);
    setIsGameStarted(false);
    setIsSlideShowStarted(false);
    setIsResult(false);
    setCurrentIndex(0);
    setShowImage(false);
    setCountdown(3);
    setUserAnswers({
      answer1: "",
      answer2: "",
      answer3: "",
    });
    setFinalMessage("");
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
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
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setIsGameStarted(false);
    setShowCounter(false);
    setShowGameTitles(true);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  useEffect(() => {
    if (easyMode) {
      setGameArray(
        imagesArray.slice(0, 5).map((arr) => ({
          ...arr,
          repetition: getRandNumInRange(1, 3),
        })),
      );
    } else if (normalMode) {
      setGameArray(
        imagesArray.map((arr) => ({
          ...arr,
          repetition: getRandNumInRange(1, 3),
        })),
      );
    }
  }, [easyMode, normalMode, isGameStarted]);
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
      }, 1000);
      const shuffled = [...gameArray].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 3);
      setQuizArray(selected);
      return () => clearInterval(interval);
    }
  }, [isGameStarted]);
  return (
    <div>
      <h2>Counter</h2>
      {!isGameStarted && !easyMode && !normalMode && !isTogglingHomePage && (
        <div>
          <button onClick={handleEasyMode}>Easy Mode</button>
          <button onClick={handleNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode &&
      !normalMode &&
      !isTogglingReset &&
      !isTogglingHomePage &&
      !isTogglingLevel ? (
        <ModeExplaination message="Easy Mode: There are only 5 images. You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        !isTogglingLevel && (
          <ModeExplaination message="Normal Mode: There are 16 images. You will get one star if you win." />
        )
      )}
      {!isGameStarted &&
        (easyMode || normalMode) &&
        !isTogglingLevel &&
        !isTogglingHomePage && (
          <button onClick={handleStart}>Start the Game</button>
        )}
      {/* {gameArray.map((el) => (
        <div style={{ display: "inline", color: "gray" }}>{el.repetition} - </div>
      ))} */}
      {isGameStarted &&
        !isTogglingReset &&
        finalMessage === "" &&
        !isTogglingHomePage &&
        !isTogglingLevel &&
        (easyMode || normalMode) && (
          <div>
            <button onClick={toggleReset}>Reset the Game</button>
          </div>
        )}
      {isTogglingReset && finalMessage === "" && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to reset the game?"
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        </div>
      )}
      {(easyMode || normalMode) &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        !isTogglingLevel &&
        finalMessage === "" && (
          <div>
            <button
              style={{
                display: "inline",
              }}
              onClick={() => toggleLevel()}
            >{`Switch to ${easyMode ? "Normal Mode" : "Easy Mode"}`}</button>
          </div>
        )}
      {isTogglingLevel && finalMessage === "" && (
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
      {!isTogglingHomePage &&
        !isTogglingReset &&
        !isTogglingLevel &&
        finalMessage === "" && (
          <div>
            <button onClick={() => toggleHomePage()}>
              Back to the home page
            </button>
          </div>
        )}
      {isTogglingHomePage && finalMessage === "" && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to go back to Home Page?"
            toggleYes={toggleHomePageYes}
            toggleCancel={toggleHomePageCancel}
          />
        </div>
      )}
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
            {/* <img
              src={i.image}
              style={{ width: "60px", border: "1px solid red", margin: "4px" }}
            /> */}
            <div style={{ display: "inline", color: "gray" }}>
              {i.repetition}
            </div>
            {/* <div style={{ display: "inline", color: "gray" }}>{i.name}***</div> */}
          </div>
        ))}
      {isGameStarted &&
        !isSlideShowStarted &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage &&
        quizArray.map((i) => (
          <div style={{ display: "inline" }}>
            <img
              src={i.image}
              style={{
                width: "60px",
                border: "1px solid black",
                margin: "4px",
              }}
            />
          </div>
        ))}
      {isGameStarted &&
        !isSlideShowStarted &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="question1">{`How many ${quizArray[0].name} did you see?`}</label>
              <select
                onChange={handleQuestion1}
                name="question1"
                id="question1"
              >
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
              <select
                onChange={handleQuestion2}
                name="question2"
                id="question2"
              >
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
              <select
                onChange={handleQuestion3}
                name="question3"
                id="question3"
              >
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
      {isResult &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage && (
          <div>
            <strong>
              {parseInt(userAnswers.answer1) === quizArray[0].repetition
                ? `The nember of ${quizArray[0].name}: ${quizArray[0].repetition}➡️ You guessed correctly! ✅`
                : `The nember of ${quizArray[0].name}: ${quizArray[0].repetition}➡️ You guessed wrong! ❌`}
            </strong>
            <br />
            <strong>
              {parseInt(userAnswers.answer2) === quizArray[1].repetition
                ? `The nember of ${quizArray[1].name}: ${quizArray[1].repetition}➡️ You guessed correctly! ✅`
                : `The nember of ${quizArray[1].name}: ${quizArray[1].repetition}➡️ You guessed wrong! ❌`}
            </strong>
            <br />
            <strong>
              {parseInt(userAnswers.answer3) === quizArray[2].repetition
                ? `The nember of ${quizArray[2].name}: ${quizArray[2].repetition}➡️ You guessed correctly! ✅`
                : `The nember of ${quizArray[2].name}: ${quizArray[2].repetition}➡️ You guessed wrong! ❌`}
            </strong>
            <h2>{finalMessage}</h2>
            {finalMessage === "You Loose!" && (
              <div>
                <div>Try Again?</div>
                <button onClick={handlePlayAgain}>Ok</button>
              </div>
            )}
            {finalMessage && finalMessage !== "You Loose!" && (
              <div>
                <div>Play Again?</div>
                <button onClick={handlePlayAgain}>Ok</button>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
