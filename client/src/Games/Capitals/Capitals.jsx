import { useState, useEffect } from "react";
import Form from "./Form";
import GameLevel from "../GameLevel";
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
  const [pack, setPack] = useState(countries); // The state variable of the list of all the countries with their capitals as an array
  const [questionCountries, setQuestionCountries] = useState(countryNames); // The state variable of the countries
  const [questionCapitals, setQuestionCapitals] = useState(capitalNames); // The state variable of the capitals of the countries
  const [answer, setAnswer] = useState([]); // The answer, which is an array of the capitals of the 7 randomly chosen countries
  // The state variable of the answers of the user:
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
  });
  const [show, setShow] = useState(false); // The state variable of showing the 7 randomly chosen countries
  const [seconds, setSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false); // The state variable of showing if the timer has started
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  // The function for assigning the game on easy mode
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  // The function for assigning the game on normal mode
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  // The function for the user to submit their answers:
  const handleSubmit = (e) => {
    e.preventDefault();
    let misMatch = 0; // The number of wrong answers
    for (let i = 0; i < 7; i++) { // Looping through the 7 answers
      if (Object.values(inputs)[i] === "") { // If the answer hasn't been chosen from the dropdown
        setIsInputEmpty(true); // Toggle the "isInputEmpty" state variable to true
        return; // and leave the function
        // When the "isInputEmpty" state variable is true, the error message appears
        // saying that the user can't leave any dropdown unselected.
        // Of course if in normal mode, the time is up and a dropdown isn't been assigned to an answer, the user don't get any error
      }
      if (Object.values(inputs)[i] !== answer[i]) { // If the value of the "inputs" state variable is different from the
      // "answer" state variable
        misMatch += 1; // The "misMatch" variable will increase by one
      }
    }
    // When looping through the 7 answers is done:
    if (misMatch === 0) { // If the "misMatch" variable is still zero
      setIsWin(true); // It means that all the guesses of the user are true, so the user wins the game
      if (normalMode) { // And if the game is on normal mode
        updateTotalPoint(12); // The user gets 12 stars
      }
    } else { // If the "misMatch" variable is not zero, it means that the user has a least one mistake
      setIsWin(false); // So, the user loses
    }
    handleStopTimer(); // In both cases, the game is over and the timer should stop
  };
  // The function for assigning the chosen answer from each dropdown to the user's answers
  const handleChange = (e) => {
    const { name, value } = e.target; // De-structuring the "name" and "value" from e.target
    // Assigning the value of the chosen dropdown to the value of the appropriate key of the "inputs" state variable
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
  };
  // The functions for reseting the game:
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    // Reseting the appropriate state variables:
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
    setShowReviews(true);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  // The functions for returning to the home page:
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  // The functions for toggling the game mode:
  const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    // Reseting the appropriate state variables:
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
    // Toggling the game mode:
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    handleResetTimer();
    setPack((currPack) => shuffleArray(currPack)); // Shuffling the "pack" state variable
    setIsTogglingLevel(false);
    setShowReviews(true);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  // The function for shuffling the array
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  // The function for starting the game:
  const handleStart = () => {
    setIsGameStarted(true);
    setPack((currPack) => shuffleArray(currPack)); // Assigning the shuffled countries to the pack
    setQuestionCountries(pack.map((c) => c.country).slice(1, 8)); // Slicing the first 7 items of the shuffled countries and assigning them to the countries
    setQuestionCapitals(pack.map((c) => c.capital).slice(1, 8)); // Slicing the first 7 items of the shuffled capitals and assigning them to the capitals
  };
  // The function for revealing the 7 randomly chosen countries:
  const handleShow = () => {
    // Assigning the capitals of the 7 randomly chosen countries to the "questionCapitals" state variable
    setQuestionCapitals((currQuestionCapitals) =>
      shuffleArray(currQuestionCapitals),
    );
    // Looping through the "questionCapitals" state variable and assigning each to the "answer" state variable
    questionCapitals.map((el) =>
      setAnswer((currAnswer) => [...currAnswer, el]),
    );
    setShow(true);
    handleResetTimer();
    if (normalMode) {
      handleStartTimer();
    }
  };
  // The functions of handling the timer:
  const handleStartTimer = () => setIsTimerRunning(true); // Starting the timer
  const handleStopTimer = () => setIsTimerRunning(false); // Stopping the timer
  const handleResetTimer = () => { // Reseting the timer
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
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Capitals
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isTogglingReset && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={handleAboutPage}
                    >
                      About Capitals
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingLevel &&
                  !isTogglingReset &&
                  !isTogglingHomePage && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleLevel()}
                      disabled={
                        !isGameStarted ||
                        (!easyMode && !normalMode) ||
                        isInputEmpty
                      }
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
                      disabled={
                        !isGameStarted ||
                        (!easyMode && !normalMode) ||
                        isInputEmpty ||
                        isWin !== "" ||
                        seconds < 1 ||
                        !show
                      }
                    >
                      Reset the game
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
                      disabled={isInputEmpty}
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>
          {isGameStarted && (easyMode || normalMode) && isTogglingLevel && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question={`Are you sure you want to switch to ${
                      easyMode ? "Normal Mode" : "Easy Mode"
                    }?`}
                    toggleYes={toggleLevelYes}
                    toggleCancel={toggleLevelCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {isGameStarted &&
            (easyMode || normalMode) &&
            isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isWin === "" &&
            seconds > 0 && (
              <div className="container">
                <div className="row">
                  <div className="col-10 offset-1 d-flex justify-content-center">
                    <ConfirmationBox
                      question={"Are you sure you want to reset the game?"}
                      toggleYes={toggleResetYes}
                      toggleCancel={toggleResetCancel}
                    />
                  </div>
                </div>
              </div>
            )}
          {(isGameStarted || (!isGameStarted && (!easyMode || !normalMode))) &&
            !isTogglingLevel &&
            isTogglingHomePage && (
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
          {isGameStarted &&
            show &&
            normalMode &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h3
                className="mt-3"
                style={seconds > 9 ? { color: "green" } : { color: "red" }}
              >
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
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <button className="btn1 my-2" onClick={() => handleStart()}>
                Start the Game
              </button>
            )}
          {isWin === true &&
            seconds > 0 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div className="container">
                <div className="row">
                  <div className="col-10 offset-1 d-flex justify-content-center">
                    <h1
                      className="fasterOne"
                      style={{ fontSize: "40px" }}
                    >{`You Win${normalMode ? "!" : ", but you don't get any stars!"}`}</h1>
                  </div>
                </div>
              </div>
            )}
          {isGameStarted &&
            // show &&
            (easyMode || normalMode) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            !isInputEmpty &&
            isWin === true && (
              <button className="btn1 my-3" onClick={() => toggleResetYes()}>
                Play Again
              </button>
            )}
          {isWin === false &&
            seconds > 0 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h1 className="fasterOne" style={{ fontSize: "40px" }}>
                You Lose
              </h1>
            )}
          {seconds < 1 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h1 className="fasterOne" style={{ fontSize: "40px" }}>
                Time's up!
              </h1>
            )}
          {isGameStarted &&
            // show &&
            (easyMode || normalMode) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            !isInputEmpty &&
            (isWin === false || seconds < 1) && (
              <button className="btn1 my-3" onClick={() => toggleResetYes()}>
                Try Again
              </button>
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
              <div className="mt-3">
                <h3>Countries</h3>
                {questionCountries.map((qc, i) => (
                  <div
                    key={i}
                    style={{
                      color: "var(--secondary)",
                    }}
                  >
                    {qc}
                  </div>
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
                <div className="container">
                  <div className="row">
                    <div className="col-10 offset-1 d-flex justify-content-center my-2">
                      <h4 className="my-2">
                        7 countries are chosen for you, guess their capitals
                        correctly and win the game
                      </h4>
                    </div>
                  </div>
                </div>
                <button className="btn2 my-2" onClick={() => handleShow()}>
                  Ok
                </button>
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
              <div className="container">
                <div className="row">
                  <div className="col-10 offset-1 d-flex justify-content-center">
                    You shouldn't leave any dropdown unselected!
                  </div>
                </div>
              </div>
              <button className="btn2 mt-2" onClick={handleIsInputEmpty}>
                OK
              </button>
            </div>
          )}
          {(isWin !== "" || seconds < 1) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            questionCountries.map((c, i) =>
              Object.values(inputs)[i] ? (
                <div className="container">
                  <div className="row">
                    <div className="col-10 offset-1 d-flex justify-content-center">
                      <h6 key={i}>
                        {`You chose ${Object.values(inputs)[i]} as the capital of ${
                          questionCountries[i]
                        }`}{" "}
                        {Object.values(inputs)[i] === answer[i]
                          ? "✔"
                          : `✖ ➜ The correct answer is: ${answer[i]}`}
                      </h6>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="container">
                  <div className="row">
                    <div className="col-10 offset-1 d-flex justify-content-center">
                      <h6
                        key={i}
                      >{`You didn't choose any answer for the capital of ${questionCountries[i]} ❗`}</h6>
                    </div>
                  </div>
                </div>
              ),
            )}
          <br />
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button className="btn1" onClick={handleReviewSection}>
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
      <br />
    </div>
  );
}
