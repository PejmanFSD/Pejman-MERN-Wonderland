import { useState, useEffect } from "react";
import Form from "./Form";
import Chances from "./Chances";
import UserGuess from "./UserGuess";
import GuessStatus from "./GuessStatus";
import { getRandArr } from "../utils";

export default function GuessNumber({ setShowGameTitles, setShowGuessNumber }) {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
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
  const [chancesNum, setChancesNum] = useState(10);
  const [isWin, setIsWin] = useState(false);
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const backToHomepage = () => {
    setIsGameStarted(false);
    setShowGuessNumber(false);
    setShowGameTitles(true);
  };
  const generateRandNum = () => {
    setIsGameStarted(true);
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
  const toggleLevel = () => {
    setIsGameStarted(false);
    setChancesNum(10);
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
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
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
          chancesNum > 0 &&
          userGuess.length !== 0 &&
          userGuess
            .slice(userGuessStatus.length - 4, userGuessStatus.length4)
            .toString()
            .replaceAll(",", "") === convertArrayToString(num)
        ) {
          setIsWin(true);
        }
      };
      handleWin();
    },
    [num, userGuess, userGuessStatus, chancesNum]
  );
  return (
    <div>
      <h2>Guess Number</h2>
      {!easyMode && !normalMode && (
        <div>
          <button onClick={() => runEasyMode()}>Easy</button>
          <button onClick={() => runNormalMode()}>Normal</button>
        </div>
      )}
      {easyMode && (
        <h3 style={{ color: "lightblue" }}>
          Easy Mode: The colorful circles appear in the exact order of each
          digit
        </h3>
      )}
      {normalMode && (
        <h3 style={{ color: "lightblue" }}>
          Normal Mode: The colorful circles don't appear in the order of digits
        </h3>
      )}
      {!isGameStarted && (easyMode || normalMode) && (
        <button onClick={() => generateRandNum()}>Start the Game</button>
      )}
      {isGameStarted &&
        num &&
        !isWin &&
        chancesNum !== 0 &&
        (easyMode || normalMode) && (
          <div>
            <h5>Guess the chosen four-digits number</h5>
            <h5>Rules:</h5>
            <h5>1- The first digit can't be 0</h5>
            <h5>2- None of the digits can be greater than 9</h5>
            <h5>3- None of the digits can be negative</h5>
            <h5>4- None of the digits can be decimal</h5>
            <h5>5- The digits can't be repetitive</h5>
          </div>
        )}
      {/* <div>num: {num}</div> */}
      {isGameStarted &&
        chancesNum > 0 &&
        new Array(10).fill(null).map((el, i) => (
          <div>
            <p style={{ display: "inline" }}>
              {userGuess
                .slice(4 * i, 4 * i + 4)
                .toString()
                .replaceAll(",", "")}
            </p>
            <p style={{ display: "inline" }}>
              {easyMode && userGuessStatus.slice(4 * i, 4 * i + 4)}
              {normalMode &&
                userGuessStatus
                  .slice(4 * i, 4 * i + 4)
                  .sort()
                  .reverse()}
            </p>
          </div>
        ))}
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
        />
      )}
      {isGameStarted && (
        <Chances
          chancesNum={chancesNum}
          setChancesNum={setChancesNum}
          num={num}
          setNum={setNum}
          setInputs={setInputs}
          setUserGuess={setUserGuess}
          setUserGuessStatus={setUserGuessStatus}
          setAllUserGuesses={setAllUserGuesses}
          generateRandNum={generateRandNum}
          isWin={isWin}
          userGuess={userGuess}
          setIsWin={setIsWin}
        />
      )}
      <UserGuess />
      <GuessStatus />
      <br></br>
      {isGameStarted && (easyMode || normalMode) && (
        <button onClick={() => toggleLevel()}>{`Switch to ${
          easyMode ? "Normal Mode" : "Easy Mode"
        }`}</button>
      )}
      <button onClick={() => backToHomepage()}>Back to the home page</button>
    </div>
  );
}
