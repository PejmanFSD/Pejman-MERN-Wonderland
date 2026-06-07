import { useState, useEffect } from "react";
import Form from "./Form";
import GameLevel from "../GameLevel";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";
import countries from "./countries";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutCapitals from "./AboutCapitals";
const countryNames = countries.map((c) => c.country);
const capitalNames = countries.map((c) => c.capital);

export default function Capitals({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
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
    input6: "",
    input7: "",
  });
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
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
    for (let i = 0; i < 7; i++) {
      if (Object.values(inputs)[i] === "") {
        setIsInputEmpty(true);
        return;
      }
      if (Object.values(inputs)[i] !== answer[i]) {
        misMatch += 1;
      }
    }
    if (misMatch === 0) {
      setIsWin(true);
      if (normalMode) {
        updateTotalPoint(3);
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
      input6: "",
      input7: "",
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
      input6: "",
      input7: "",
    });
    setShow(false);
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    handleResetTimer();
    setPack((currPack) => shuffleArray(currPack));
    setIsTogglingLevel(false);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
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
    setQuestionCountries(pack.map((c) => c.country).slice(1, 8));
    setQuestionCapitals(pack.map((c) => c.capital).slice(1, 8));
  };
  const handleShow = () => {
    setQuestionCapitals((currQuestionCapitals) =>
      shuffleArray(currQuestionCapitals),
    );
    questionCapitals.map((el) =>
      setAnswer((currAnswer) => [...currAnswer, el]),
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
    setSeconds(45);
    setIsTimerRunning(false);
  };
  const handleIsInputEmpty = () => {
    setIsInputEmpty(false);
  };
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
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
  useEffect(() => {
        document.title = "Capitals";
    }, []);
  return (
    <div>
      {isAboutPage && <AboutCapitals setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          {!isTogglingHomePage && !isTogglingLevel && !isTogglingReset && (
            <button onClick={handleAboutPage}>About Capitals</button>
          )}
          <h2>Capitals</h2>
          {isGameStarted &&
            show &&
            normalMode &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
                {seconds}
              </h3>
            )}
          {!easyMode &&
            !normalMode &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <GameLevel
                mode1="Easy"
                mode1Function={runEasyMode}
                mode2="Normal"
                mode2Function={runNormalMode}
                runEasyMode={runEasyMode}
                runNormalMode={runNormalMode}
              />
            )}
          {easyMode &&
          !normalMode &&
          !isTogglingReset &&
          !isTogglingHomePage &&
          !isTogglingLevel ? (
            <ModeExplaination message="Easy Mode: You won't get any stars if you win." />
          ) : (
            !easyMode &&
            normalMode &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <ModeExplaination message="Normal Mode: You will get three stars if you win in 45 seconds." />
            )
          )}
          {isGameStarted &&
            show &&
            (easyMode || normalMode) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            !isInputEmpty &&
            isWin === "" &&
            seconds > 0 && (
              <button onClick={() => toggleReset()}>Reset the game</button>
            )}
          {isGameStarted &&
            (easyMode || normalMode) &&
            isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isWin === "" &&
            seconds > 0 && (
              <ConfirmationBox
                question={"Are you sure you want to reset the game?"}
                toggleYes={toggleResetYes}
                toggleCancel={toggleResetCancel}
              />
            )}
          {isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingLevel &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isInputEmpty && (
              <button onClick={() => toggleLevel()}>{`Switch to ${
                easyMode ? "Normal Mode" : "Easy Mode"
              }`}</button>
            )}
          {isGameStarted && (easyMode || normalMode) && isTogglingLevel && (
            <ConfirmationBox
              question={`Are you sure you want to switch to ${
                easyMode ? "Normal Mode" : "Easy Mode"
              }?`}
              toggleYes={toggleLevelYes}
              toggleCancel={toggleLevelCancel}
            />
          )}
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <button onClick={() => handleStart()}>Start the Game</button>
            )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            !isInputEmpty && (
              <button onClick={() => toggleHomePage()}>
                Back to home page
              </button>
            )}
          {(isGameStarted || (!isGameStarted && (!easyMode || !normalMode))) &&
            !isTogglingLevel &&
            isTogglingHomePage && (
              <ConfirmationBox
                question="Are you sure you want to go back to Home Page?"
                toggleYes={toggleHomePageYes}
                toggleCancel={toggleHomePageCancel}
              />
            )}
          {isWin === true &&
            seconds > 0 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && <h1>{`You Win${normalMode ? "!" : ", but you don't get any stars!"}`}</h1>}
          {isGameStarted &&
            // show &&
            (easyMode || normalMode) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            !isInputEmpty &&
            isWin === true && (
              <button onClick={() => toggleResetYes()}>Play Again</button>
            )}
          {isWin === false &&
            seconds > 0 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && <h1>You Lose</h1>}
          {seconds < 1 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && <h1>Time's up!</h1>}
          {isGameStarted &&
            // show &&
            (easyMode || normalMode) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            !isInputEmpty &&
            (isWin === false || seconds < 1) && (
              <button onClick={() => toggleResetYes()}>Try Again</button>
            )}
          {/*<h3>Answer:</h3>
            {answer.map((el) => (
            <div>{el}</div>
          ))} */}
          {isGameStarted &&
            show &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isWin === "" &&
            seconds > 0 && (
              <div>
                <h3>Countries</h3>
                {questionCountries.map((qc, i) => (
                  <div key={i}>{qc}</div>
                ))}
              </div>
            )}
          {isGameStarted &&
            !show &&
            (easyMode || normalMode) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div>
                <h4>
                  7 countries are chosen for you, guess their capitals correctly
                  and win the game
                </h4>
                <button onClick={() => handleShow()}>Ok</button>
              </div>
            )}
          {isGameStarted &&
            show &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isWin === "" &&
            seconds > 0 && (
              <Form
                inputs={inputs}
                seconds={seconds}
                questionCountries={questionCountries}
                questionCapitals={questionCapitals}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isInputEmpty={isInputEmpty}
                isWin={isWin}
              />
            )}
          {isInputEmpty && (
            <div>
              <p>You shouldn't leave any dropdown unselected!</p>
              <button onClick={handleIsInputEmpty}>OK</button>
            </div>
          )}
          {(isWin !== "" || seconds < 1) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            questionCountries.map((c, i) =>
              Object.values(inputs)[i] ? (
                <h3 key={i}>
                  {`You chose ${Object.values(inputs)[i]} as the capital of ${
                    questionCountries[i]
                  }`}{" "}
                  {Object.values(inputs)[i] === answer[i]
                    ? "✅"
                    : `❌ -> The correct answer is: ${answer[i]}`}
                </h3>
              ) : (
                <h3 key={i}>{`You didn't choose any answer for the capital of ${questionCountries[i]} ❗`}</h3>
              ),
            )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button onClick={handleReviewSection}>
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
              <ReviewSection game="Capitals" currentUser={currentUser} />
            )}
        </div>
      )}
    </div>
  );
}
