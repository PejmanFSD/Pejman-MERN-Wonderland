import { useState, useEffect } from "react";
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
  const [userGuess, setUserGuess] = useState([
    { guess: null, status: null },
    { guess: null, status: null },
    { guess: null, status: null },
    { guess: null, status: null },
  ]);
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
  // const checkStatus = (arr, idx, el) => {
  //   if (arr[idx].toString() === el.toString()) {
  //     return "A";
  //   } else if (arr.includes(el.toString())) {
  //     return "B";
  //   } else {
  //     return "C";
  //   }
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setChancesNum((currChanceNum) => currChanceNum - 1);
  //   setShowResult(true);
  //   console.log(allUserGuesses);
  // };
  useEffect(
    function () {
      setAllUserGuesses((currAllUserGuesses) => [
        ...currAllUserGuesses,
        userGuess,
      ]);
    },
    [userGuess]
  );
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
      {num}
      {isGameStarted && <Form inputs={inputs} setInputs={setInputs} />}
      {isGameStarted && <Chances chancesNum={chancesNum} />}
      {showResult && <UserGuess allUserGuesses={allUserGuesses} />}
      {showResult && <GuessStatus allUserGuesses={allUserGuesses} />}
      <br></br>
      <button onClick={() => backToHomepage()}>Back to the home page</button>
    </div>
  );
}
