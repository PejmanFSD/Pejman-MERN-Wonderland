import { useState, useEffect } from "react";
import Form from "./Form";
import GameLevel from "../GameLevel";
import UserGuess from "./UserGuess";
import ConfirmationBox from "../ConfirmationBox";
import Chances from "./Chances";
import { getRandArr } from "../utils";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutGuessNumber from "./AboutGuessNumber";

export default function GuessNumber({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [num, setNum] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [userGuess, setUserGuess] = useState([]);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
  const [userGuessStatus, setUserGuessStatus] = useState([]);
  const [chancesNum, setChancesNum] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [isFirstDigitZero, setIsFirstDigitZero] = useState(false);
  const [isOneDigit, setIsOneDigit] = useState(true);
  const [isDigitNegative, setIsDigitNegative] = useState(false);
  const [isDigitDecimal, setIsDigitDecimal] = useState(false);
  const [isDigitRepetitive, setIsDigitRepetitive] = useState(false);
  const [isInt, setIsInt] = useState(true);
  const [isAlreadyGuessed, setIsAlreadyGuessed] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const navigate = useNavigate();
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const generateRandNum = () => {
    setIsGameStarted(true);
    setChancesNum(easyMode ? 5 : 10);
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // We can't update the state variable multiple times in one render
    // So we create a separate variable, then assign it to the state variable
    const generatedRandNum = [];
    while (generatedRandNum.length < 4) {
      const randDigit = getRandArr(digits);
      generatedRandNum.push(randDigit);
      digits.splice(digits.indexOf(randDigit), 1);
    }
    // The first digit shouldn't be "0"
    if (generatedRandNum[0] === "0") {
      // If the first digit is "0", then we don't have "0" in digits
      const fixedFirstDigit = getRandArr(digits);
      generatedRandNum[0] = fixedFirstDigit;
    }
    setNum(generatedRandNum);
  };
  const updateUserGuess = (item) => {
    setUserGuess((currUserGuess) => {
      return [...currUserGuess, item];
    });
  };
  const updateUserGuessStatus = (i) => {
    setUserGuessStatus((currUserGuessStatus) => {
      return [
        ...currUserGuessStatus,
        checkStatus(num, i, Object.values(inputs)[i]),
      ];
    });
  };
  const convertArrayToString = (arr) => {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
      str += arr[i].toString();
    }
    return str;
  };
  const checkStatus = (arr, idx, el) => {
    if (arr[idx].toString() === el.toString()) {
      return "🟢";
    } else if (arr.includes(el.toString())) {
      return "🟡";
    } else {
      return "🔴";
    }
  };
  const reset = () => {
    setChancesNum(easyMode ? 5 : 10);
    setNum([]);
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
    setUserGuess([]);
    setAllUserGuesses([]);
    setUserGuessStatus([]);
    generateRandNum();
    setIsWin(false);
    setShowReviews(true);
  };
  const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleLevelYes = () => {
    setIsGameStarted(false);
    setNum([]);
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
    setUserGuess([]);
    setAllUserGuesses([]);
    setUserGuessStatus([]);
    generateRandNum();
    setIsWin(false);
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
      setChancesNum(10);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
      setChancesNum(5);
    }
    setIsTogglingLevel(false);
    setShowReviews(true);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    reset();
    setIsTogglingReset(false);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  useEffect(
    function () {
      const handleWin = () => {
        setAllUserGuesses((currAllUserGuesses) => [
          ...currAllUserGuesses,
          userGuess
            .slice(userGuess.length - 4, userGuess.length)
            .toString()
            .replaceAll(",", ""),
        ]);
        if (
          chancesNum >= 0 &&
          userGuess.length !== 0 &&
          userGuess
            .slice(userGuessStatus.length - 4, userGuessStatus.length4)
            .toString()
            .replaceAll(",", "") === convertArrayToString(num)
        ) {
          setIsWin(true);
          if (easyMode) {
          updateTotalPoint(1);
        } else if (normalMode) {
          updateTotalPoint(5);
        }
        }
      };
      handleWin();
    },
    [num, userGuess, userGuessStatus, chancesNum],
  );
  useEffect(() => {
    document.title = "Guess Number";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutGuessNumber setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Guess Number
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
                      disabled={
                        isFirstDigitZero ||
                        !isOneDigit ||
                        isDigitNegative ||
                        isDigitDecimal ||
                        isDigitRepetitive ||
                        !isInt ||
                        isAlreadyGuessed ||
                        isInputEmpty
                      }
                    >
                      About Guess Number
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
                        isFirstDigitZero ||
                        !isOneDigit ||
                        isDigitNegative ||
                        isDigitDecimal ||
                        isDigitRepetitive ||
                        !isInt ||
                        isAlreadyGuessed ||
                        isInputEmpty ||
                        !isGameStarted ||
                        (!easyMode && !normalMode) ||
                        isWin ||
                        chancesNum === 0
                      }
                    >{`${easyMode ? "Switch to Normal Mode" : normalMode ? "Switch to Easy Mode" : "Switch level"}`}</button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingLevel &&
                  !isTogglingReset &&
                  !isTogglingHomePage && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleReset()}
                      disabled={
                        isTogglingLevel ||
                        isFirstDigitZero ||
                        !isOneDigit ||
                        isDigitNegative ||
                        isDigitDecimal ||
                        isDigitRepetitive ||
                        !isInt ||
                        isAlreadyGuessed ||
                        isInputEmpty ||
                        isWin ||
                        !userGuess[0] ||
                        chancesNum === 0
                      }
                    >
                      Reset the Game
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
                      onClick={() => toggleHomePage()}
                      disabled={
                        isFirstDigitZero ||
                        !isOneDigit ||
                        isDigitNegative ||
                        isDigitDecimal ||
                        isDigitRepetitive ||
                        !isInt ||
                        isAlreadyGuessed ||
                        isInputEmpty
                        // isWin
                      }
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>
          {isGameStarted && (easyMode || normalMode) && isTogglingLevel && (
            <ConfirmationBox
              question={`Are you sure you want to switch to ${
                easyMode ? "Normal Mode" : "Easy Mode"
              }?`}
              toggleYes={toggleLevelYes}
              toggleCancel={toggleLevelCancel}
              easyMode={easyMode}
            />
          )}
          {isGameStarted && (easyMode || normalMode) && isTogglingReset && (
            <ConfirmationBox
              question="Are you sure you want to reset the game?"
              toggleYes={toggleResetYes}
              toggleCancel={toggleResetCancel}
            />
          )}
          {(isGameStarted || (!isGameStarted && (!easyMode || !normalMode))) &&
            isTogglingHomePage && (
              <ConfirmationBox
                question="Are you sure you want to go back to Home Page?"
                toggleYes={toggleHomePageYes}
                toggleCancel={toggleHomePageCancel}
              />
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
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingHomePage && (
              <button className="btn1 my-3" onClick={() => generateRandNum()}>
                Start the Game
              </button>
            )}
          {/* <div>num: {num}</div> */}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <UserGuess
                userGuess={userGuess}
                userGuessStatus={userGuessStatus}
                easyMode={easyMode}
                normalMode={normalMode}
              />
            )}
          {isGameStarted && chancesNum > 0 && (
            <Form
              inputs={inputs}
              setInputs={setInputs}
              chancesNum={chancesNum}
              setChancesNum={setChancesNum}
              setUserGuess={setUserGuess}
              updateUserGuess={updateUserGuess}
              updateUserGuessStatus={updateUserGuessStatus}
              userGuess={userGuess}
              userGuessStatus={userGuessStatus}
              num={num}
              convertArrayToString={convertArrayToString}
              setIsWin={setIsWin}
              isWin={isWin}
              allUserGuesses={allUserGuesses}
              setAllUserGuesses={setAllUserGuesses}
              isTogglingLevel={isTogglingLevel}
              isTogglingReset={isTogglingReset}
              isTogglingHomePage={isTogglingHomePage}
              isFirstDigitZero={isFirstDigitZero}
              setIsFirstDigitZero={setIsFirstDigitZero}
              isOneDigit={isOneDigit}
              setIsOneDigit={setIsOneDigit}
              isDigitNegative={isDigitNegative}
              setIsDigitNegative={setIsDigitNegative}
              isDigitDecimal={isDigitDecimal}
              setIsDigitDecimal={setIsDigitDecimal}
              isDigitRepetitive={isDigitRepetitive}
              setIsDigitRepetitive={setIsDigitRepetitive}
              isInt={isInt}
              setIsInt={setIsInt}
              isAlreadyGuessed={isAlreadyGuessed}
              setIsAlreadyGuessed={setIsAlreadyGuessed}
              isInputEmpty={isInputEmpty}
              setIsInputEmpty={setIsInputEmpty}
              easyMode={easyMode}
              normalMode={normalMode}
              updateTotalPoint={updateTotalPoint}
            />
          )}
          {isGameStarted && (
            <Chances
              chancesNum={chancesNum}
              // setChancesNum={setChancesNum}
              num={num}
              setNum={setNum}
              setInputs={setInputs}
              setUserGuess={setUserGuess}
              setUserGuessStatus={setUserGuessStatus}
              setAllUserGuesses={setAllUserGuesses}
              generateRandNum={generateRandNum}
              reset={reset}
              isWin={isWin}
              userGuess={userGuess}
              // setIsWin={setIsWin}
              easyMode={easyMode}
              normalMode={normalMode}
              // updateTotalPoint={updateTotalPoint}
              isGameStarted={isGameStarted}
              toggleResetYes={toggleResetYes}
              toggleResetCancel={toggleResetCancel}
              isTogglingLevel={isTogglingLevel}
              isTogglingReset={isTogglingReset}
              setIsTogglingReset={setIsTogglingReset}
              isTogglingHomePage={isTogglingHomePage}
            />
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
          {!isTogglingLevel &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            isGameStarted &&
            showReviews && (
              <ReviewSection game="GuessNumber" currentUser={currentUser} />
            )}
        </div>
      )}
      <br />
    </div>
  );
}
