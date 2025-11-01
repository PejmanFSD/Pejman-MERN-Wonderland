import { useState } from "react";
import Form from "./Form";
import Chances from "./Chances";
import UserGuess from "./UserGuess";
import GuessStatus from "./GuessStatus";
import { getRandArr } from "../utils";

export default function GuessNumber({ setShowGameTitles, setShowGuessNumber }) {
  const [num, setNum] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [userGuess, setUserGuess] = useState([]);
  const [userGuessStatus, setUserGuessStatus] = useState([]);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
  const [chancesNum, setChancesNum] = useState(10);
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
  const updateAllUserGuesses = (i, j) => {
    const newGuess = {
      [convertArrayToString(i)]: convertArrayToString(j),
    };
    setAllUserGuesses((currAllUserGuesses) => {
      return [...currAllUserGuesses, newGuess];
    });
    console.log("allUserGuesses: ", allUserGuesses);
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
  return (
    <div>
      <h2>Guess Number</h2>
      {!isGameStarted ? (
        <button onClick={() => generateRandNum()}>Start the Game</button>
      ) : (
        num && (
          <h3>
            Guess the chosen four digits unrepetitive number correctly and win
            the game
          </h3>
        )
      )}
      <div>num: {num}</div>
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
              {userGuessStatus
                .slice(4 * i, 4 * i + 4)
                .toString()
                .replaceAll(",", "")}
            </p>
          </div>
        ))}
      <div>
        {isGameStarted &&
          chancesNum > 0 &&
          userGuess.length !== 0 &&
          userGuess
            .slice(userGuessStatus.length - 4, userGuessStatus.length4)
            .toString()
            .replaceAll(",", "") === convertArrayToString(num) &&
          "Well Done!"}
      </div>
      {isGameStarted && chancesNum > 0 && (
        <Form
          inputs={inputs}
          setInputs={setInputs}
          setChancesNum={setChancesNum}
          setUserGuess={setUserGuess}
          updateUserGuess={updateUserGuess}
          updateUserGuessStatus={updateUserGuessStatus}
          updateAllUserGuesses={updateAllUserGuesses}
          userGuess={userGuess}
          userGuessStatus={userGuessStatus}
          allUserGuesses={allUserGuesses}
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
          generateRandNum={generateRandNum}
        />
      )}
      <UserGuess allUserGuesses={allUserGuesses} />
      <GuessStatus allUserGuesses={allUserGuesses} />
      <br></br>
      <button onClick={() => backToHomepage()}>Back to the home page</button>
    </div>
  );
}
