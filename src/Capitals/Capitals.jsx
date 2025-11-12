import { useState, useEffect } from "react";
import GameLevel from "../GameLevel";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";
import countries from "./countries";
const countryNames = countries.map((c) => c.country);
const capitalNames = countries.map((c) => c.capital);

export default function Capitals({
  updateTotalPoint,
  setShowGameTitles,
  setShowCapitals,
}) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isWin, setIsWin] = useState("");
  const [pack, setPack] = useState(countries);
  const [questionCountries, setQuestionCountries] = useState(countryNames);
  const [questionCapitals, setQuestionCapitals] = useState(capitalNames);
  const [answer, setAnswer] = useState([]);
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    // input6: "",
    // input7: "",
    // input8: "",
    // input9: "",
    // input10: "",
  });
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(26);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let misMatch = 0;
    for (let i = 0; i < 5; i++) {
      if (Object.values(inputs)[i] !== answer[i]) {
        misMatch += 1;
      }
    }
    if (misMatch === 0) {
      setIsWin(true);
      if (normalMode) {
        updateTotalPoint(1);
      }
    } else {
      setIsWin(false);
    }
    handleStopTimer();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
    setIsWin("");
    setPack(countries);
    setQuestionCountries(countryNames);
    setQuestionCapitals(capitalNames);
    setAnswer([]);
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      // input6: "",
      // input7: "",
      // input8: "",
      // input9: "",
      // input10: "",
    });
    setShow(false);
    setPack((currPack) => shuffleArray(currPack));
    setIsTogglingReset(false);
    handleResetTimer();
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setIsGameStarted(false);
    setShowCapitals(false);
    setShowGameTitles(true);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const handleStart = () => {
    setIsGameStarted(true);
    setPack((currPack) => shuffleArray(currPack));
    setQuestionCountries(pack.map((c) => c.country).slice(1, 6));
    setQuestionCapitals(pack.map((c) => c.capital).slice(1, 6));
  };
  const handleShow = () => {
    setQuestionCapitals((currQuestionCapitals) =>
      shuffleArray(currQuestionCapitals)
    );
    questionCapitals.map((el) =>
      setAnswer((currAnswer) => [...currAnswer, el])
    );
    setShow(true);
    handleResetTimer();
    if (normalMode) {
      handleStartTimer();
    }
  };
  const handleStartTimer = () => setIsTimerRunning(true);
  const handleStopTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setSeconds(26);
    setIsTimerRunning(false);
  };
  useEffect(() => {
    setPack((currPack) => shuffleArray(currPack));
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev > 1 && prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);
  return (
    <div>
      <h2>Capitals</h2>
      {isGameStarted && show && normalMode && (
        <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
          {seconds}
        </h3>
      )}
      {!easyMode && !normalMode && !isTogglingHomePage && (
        <GameLevel
          mode1="Easy"
          mode1Function={runEasyMode}
          mode2="Normal"
          mode2Function={runNormalMode}
          runEasyMode={runEasyMode}
          runNormalMode={runNormalMode}
        />
      )}
      {easyMode && !normalMode && !isTogglingReset && !isTogglingHomePage ? (
        <ModeExplaination message="Easy Mode: You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <ModeExplaination message="Normal Mode: You will get one star if you win." />
        )
      )}
      {isWin === true && seconds > 0 && <h1>You Win</h1>}
      {isWin === false && seconds > 0 && <h1>You Loose</h1>}
      {seconds < 1 && <h1>Time's up!</h1>}
      {!isGameStarted && (easyMode || normalMode) && !isTogglingHomePage && (
        <button onClick={() => handleStart()}>Start the Game</button>
      )}
      <h3>Answer:</h3>
      {answer.map((el) => (
        <div>{el}</div>
      ))}
      {isGameStarted && show && !isTogglingReset && !isTogglingHomePage && (
        <div>
          <h3>Countries</h3>
          {questionCountries.map((qc) => (
            <div>{qc}</div>
          ))}
        </div>
      )}
      {isGameStarted &&
        !show &&
        (easyMode || normalMode) &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <h4>
              5 countries are chosen for you, guess their capitals correctly and
              win the game
            </h4>
            <button onClick={() => handleShow()}>Ok</button>
          </div>
        )}
      {isGameStarted && show && !isTogglingReset && !isTogglingHomePage && (
        <div>
          <form onSubmit={handleSubmit}>
            {questionCountries.map((el, i) => (
              <div>
                <label htmlFor={`input${i + 1}`}></label>
                <select
                  onChange={handleChange}
                  name={`input${i + 1}`}
                  id={`input${i + 1}`}
                >
                  <option value={Object.values(inputs)[i]} disabled selected>
                    {`Select the Capital of ${questionCountries[i]}`}
                  </option>
                  {questionCapitals.map((c) => (
                    <option>{c}</option>
                  ))}
                </select>
              </div>
            ))}
            {isWin === "" && seconds > 0 && <button>Done</button>}
          </form>
        </div>
      )}
      {(isWin !== "" || seconds < 1) &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        questionCountries.map((c, i) =>
          Object.values(inputs)[i] ? (
            <h3>
              {`You chose ${Object.values(inputs)[i]} as the capital of ${
                questionCountries[i]
              }`}{" "}
              {Object.values(inputs)[i] === answer[i]
                ? "✅"
                : `❌ -> The correct answer is: ${answer[i]}`}
            </h3>
          ) : (
            <h3>{`You didn't choose any answer for the capital of ${questionCountries[i]} ❗`}</h3>
          )
        )}
      {isGameStarted &&
        show &&
        (easyMode || normalMode) &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <button onClick={() => toggleReset()}>
            {isWin === "" && seconds > 0 ? "Reset" : "Play Again"}
          </button>
        )}
      {isGameStarted &&
        (easyMode || normalMode) &&
        isTogglingReset &&
        !isTogglingHomePage && (
          <ConfirmationBox
            question={
              isWin === "" && seconds > 0
                ? "Are you sure you want to reset the game?"
                : "Play again?"
            }
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        )}
      {
        !isTogglingReset && !isTogglingHomePage && (
          <button onClick={() => toggleHomePage()}>
            Back to the home page
          </button>
        )
      }
      {(isGameStarted || (!isGameStarted && (!easyMode || !normalMode))) &&
        isTogglingHomePage && (
          <ConfirmationBox
            question="Are you sure you want to go back to Home Page?"
            toggleYes={toggleHomePageYes}
            toggleCancel={toggleHomePageCancel}
          />
        )}
    </div>
  );
}
