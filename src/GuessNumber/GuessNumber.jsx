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
  const [showResult, setShowResult] = useState(false);
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
      return "A";
    } else if (arr.includes(el.toString())) {
      return "B";
    } else {
      return "C";
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
      <div>
        <p style={{ display: "inline" }}>
          userGuess-1: {userGuess.slice(0, 4)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(0, 4)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-2: {userGuess.slice(4, 8)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(4, 8)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-3: {userGuess.slice(8, 12)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(8, 12)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-4: {userGuess.slice(12, 16)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(12, 16)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-5: {userGuess.slice(16, 20)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(16, 20)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-6: {userGuess.slice(20, 24)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(20, 24)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-7: {userGuess.slice(24, 28)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(24, 28)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-8: {userGuess.slice(28, 32)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(28, 32)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-9: {userGuess.slice(32, 36)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(32, 36)}
        </p>
      </div>
      <div>
        <p style={{ display: "inline" }}>
          userGuess-10: {userGuess.slice(36, 40)}
        </p>
        <p style={{ display: "inline" }}> - </p>
        <p style={{ display: "inline" }}>
          userGuessStatus: {userGuessStatus.slice(36, 40)}
        </p>
      </div>
      {isGameStarted && (
        <Form
          inputs={inputs}
          setInputs={setInputs}
          setChancesNum={setChancesNum}
          setShowResult={setShowResult}
          setUserGuess={setUserGuess}
          updateUserGuess={updateUserGuess}
          updateUserGuessStatus={updateUserGuessStatus}
          updateAllUserGuesses={updateAllUserGuesses}
          userGuess={userGuess}
          userGuessStatus={userGuessStatus}
          allUserGuesses={allUserGuesses}
        />
      )}
      {isGameStarted && <Chances chancesNum={chancesNum} />}
      <UserGuess allUserGuesses={allUserGuesses} />
      <GuessStatus allUserGuesses={allUserGuesses} />
      <br></br>
      <button onClick={() => backToHomepage()}>Back to the home page</button>
    </div>
  );
}
