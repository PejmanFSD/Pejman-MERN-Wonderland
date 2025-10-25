import { useState } from "react";
import { getRandArr } from "../utils";

export default function GuessNumber() {
  const [num, setNum] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [firstGuess, setFirstGuess] = useState("");
  const [firstGuessStatus, setFirstGuessStatus] = useState("");
  const [secondGuess, setSecondGuess] = useState("");
  const [secondGuessStatus, setSecondGuessStatus] = useState("");
  const [thirdGuess, setThirdGuess] = useState("");
  const [thirdGuessStatus, setThirdGuessStatus] = useState("");
  const [fourthGuess, setFourthGuess] = useState("");
  const [fourthGuessStatus, setFourthGuessStatus] = useState("");
  const generateRandNum = () => {
    setIsGameStarted(true);
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // We can't update the state variable multiple times in one render
    // So we create a separate variable, then assign it to the state variable
    const generatedRandNum = [];
    while (generatedRandNum.length < 4) {
      const randDigit = getRandArr(digits);
      console.log("randDigit: ", randDigit);
      generatedRandNum.push(randDigit);
      digits.splice(digits.indexOf(randDigit), 1);
      console.log("digits: ", digits);
      console.log("generatedRandNum: ", generatedRandNum);
    }
    // The first digit shouldn't be "0"
    if (generatedRandNum[0] === "0") {
      // If the first digit is "0", then we don't have "0" in digits
      const fixedFirstDigit = getRandArr(digits);
      console.log("fixedFirstDigit: ", fixedFirstDigit);
      generatedRandNum[0] = fixedFirstDigit;
      console.log("fixedRandNum: ", generatedRandNum);
    }
    setNum(generatedRandNum);
  };
  const firstHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setFirstGuess(e.target.value);
  };
  const secondHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setSecondGuess(e.target.value);
  };
  const thirdHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setThirdGuess(e.target.value);
  };
  const fourthHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setFourthGuess(e.target.value);
  };
  const checkTheNumber = (e) => {
    e.preventDefault();
    if (parseInt(firstGuess) === parseInt(num[0])) {
      setFirstGuessStatus("Correct");
    } else {
      setFirstGuessStatus("Wrong");
    }
    if (parseInt(secondGuess) === parseInt(num[1])) {
      setSecondGuessStatus("Correct");
    } else {
      setSecondGuessStatus("Wrong");
    }
    if (parseInt(thirdGuess) === parseInt(num[2])) {
      setThirdGuessStatus("Correct");
    } else {
      setThirdGuessStatus("Wrong");
    }
    if (parseInt(fourthGuess) === parseInt(num[3])) {
      setFourthGuessStatus("Correct");
    } else {
      setFourthGuessStatus("Wrong");
    }
  };
  return (
    <div>
      {num && (
        <h3>
          Guess the chosen four digits unrepetitive number correctly and win the
          game
        </h3>
      )}
      {num}
      <button onClick={() => generateRandNum()}>Start the game</button>
      {isGameStarted && (
        <form onSubmit={checkTheNumber}>
          <input
            type="text"
            placeholder="First Digit"
            name="First Digit"
            id="First Digit"
            onChange={firstHandleChange}
          />
          <input
            type="text"
            placeholder="Second Digit"
            name="Second Digit"
            id="Second Digit"
            onChange={secondHandleChange}
          />
          <input
            type="text"
            placeholder="Third Digit"
            name="Third Digit"
            id="Third Digit"
            onChange={thirdHandleChange}
          />
          <input
            type="text"
            placeholder="Fourth Digit"
            name="Fourth Digit"
            id="Fourth Digit"
            onChange={fourthHandleChange}
          />
          <button>Done</button>
        </form>
      )}
      {firstGuessStatus && firstGuessStatus}-
      {secondGuessStatus && secondGuessStatus}-
      {thirdGuessStatus && thirdGuessStatus}-
      {fourthGuessStatus && fourthGuessStatus}
    </div>
  );
}
