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
      str += arr[i];
    }
    return str;
  };
  const updateAllUserGuesses = (i, j) => {
    const newGuess = {
      [i]: j,
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
      <div>userGuess: {userGuess}</div>
      <div>userGuessStatus: {userGuessStatus}</div>
      <div>
        allUserGuesses:{" "}
        {
          <div>
            <p>
              {allUserGuesses.map((obj, index) => {
                const key = Object.keys(obj)[0]; // extract the single key
                return <li key={index}>{key}</li>;
              })}
            </p>

            <p>
              {allUserGuesses.map((obj, index) => {
                const value = Object.values(obj)[0]; // extract the single value
                return <li key={index}>{value}</li>;
              })}
            </p>
          </div>
        }
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
