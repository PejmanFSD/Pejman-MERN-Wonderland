import { useState, useEffect } from "react";
import { getRandArr } from "../utils";
import A from "./A.png";
import B from "./B.png";
import C from "./C.png";

export default function GuessNumber({ setShowGuessNumber }) {
  const [num, setNum] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState([
    { guess: null, status: null },
    { guess: null, status: null },
    { guess: null, status: null },
    { guess: null, status: null },
  ]);
  const [showResult, setShowResult] = useState(false);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
  const [chancesNum, setChancesNum] = useState(10);
  const handleGame = () => {
    if (isGameStarted) {
      setIsGameStarted(false);
      setShowGuessNumber(false);
    }
    if (!isGameStarted) {
      setIsGameStarted(true);
      generateRandNum();
    }
  };
  const generateRandNum = () => {
    // setIsGameStarted(true);
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
  const firstHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((item, index) =>
        index === 0
          ? { ...item, guess: e.target.value, status: currUserGuess[0].status }
          : item
      )
    );
  };
  const secondHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((item, index) =>
        index === 1
          ? { ...item, guess: e.target.value, status: currUserGuess[0].status }
          : item
      )
    );
  };
  const thirdHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((item, index) =>
        index === 2
          ? { ...item, guess: e.target.value, status: currUserGuess[0].status }
          : item
      )
    );
  };
  const fourthHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((item, index) =>
        index === 3
          ? { ...item, guess: e.target.value, status: currUserGuess[0].status }
          : item
      )
    );
  };
  const checkTheNumber = (e) => {
    e.preventDefault();
    for (let i = 0; i < 4; i++) {
      if (parseInt(userGuess[i].guess) === parseInt(num[i])) {
        setUserGuess((currUserGuess) =>
          currUserGuess.map((item, index) =>
            index === i
              ? { ...item, guess: currUserGuess[i].guess, status: "A" }
              : item
          )
        );
      } else if (num.includes(userGuess[i].guess)) {
        setUserGuess((currUserGuess) =>
          currUserGuess.map((item, index) =>
            index === i
              ? { ...item, guess: currUserGuess[i].guess, status: "B" }
              : item
          )
        );
      } else {
        setUserGuess((currUserGuess) =>
          currUserGuess.map((item, index) =>
            index === i
              ? { ...item, guess: currUserGuess[i].guess, status: "C" }
              : item
          )
        );
      }
    }
    setShowResult(true);
  };
  useEffect(
    function () {
      setAllUserGuesses(userGuess.map((u) => u.status));
    },
    [userGuess]
  );
  return (
    <div>
      {num && (
        <h3>
          Guess the chosen four digits unrepetitive number correctly and win the
          game
        </h3>
      )}
      {num}
      <button onClick={() => handleGame()}>
        {isGameStarted ? "Back to Home Page" : "Start the Game"}
      </button>
      {isGameStarted && (
        <form onSubmit={checkTheNumber}>
          <label htmlFor="FirstDigit"></label>
          <input
            type="text"
            placeholder="First Digit"
            name="FirstDigit"
            id="FirstDigit"
            onChange={firstHandleChange}
          />
          <label htmlFor="SecondDigit"></label>
          <input
            type="text"
            placeholder="Second Digit"
            name="SecondDigit"
            id="SecondDigit"
            onChange={secondHandleChange}
          />
          <label htmlFor="ThirdDigit"></label>
          <input
            type="text"
            placeholder="Third Digit"
            name="ThirdDigit"
            id="ThirdDigit"
            onChange={thirdHandleChange}
          />
          <label htmlFor="FourthDigit"></label>
          <input
            type="text"
            placeholder="Fourth Digit"
            name="FourthDigit"
            id="FourthDigit"
            onChange={fourthHandleChange}
          />
          <button>Done</button>
        </form>
      )}
      {showResult && (
        <div style={{ display: "inline" }}>{`Guess number ${
          11 - chancesNum
        }: `}</div>
      )}
      {showResult &&
        userGuess.map((digitGuess, index) => (
          <div key={index} style={{ display: "inline" }}>
            {digitGuess.guess}
          </div>
        ))}
      <br></br>
      {showResult && (
        <div>{`The result of guess number ${11 - chancesNum} is: `}</div>
      )}
      {allUserGuesses.map((guessStatus, index) => (
        <div key={index} style={{ display: "inline" }}>
          {guessStatus === "A" ? (
            <img src={A} width="35px" alt="GreenCircle" />
          ) : guessStatus === "B" ? (
            <img src={B} width="35px" alt="YellowCircle" />
          ) : (
            guessStatus === "C" && <img src={C} width="35px" alt="RedCircle" />
          )}
        </div>
      ))}
    </div>
  );
}
