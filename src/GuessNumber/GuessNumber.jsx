import { useState } from "react";
import { getRandArr } from "../utils";

export default function GuessNumber() {
  const [num, setNum] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [firstGuessStatus, setFirstGuessStatus] = useState("");
  const [firstGuess, setFirstGuess] = useState("");
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
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    // const changedField = e.target.name;
    // const newValue = e.target.value;
    setFirstGuess(e.target.value);
  };
  const checkTheNumber = (e) => {
    e.preventDefault();
    if (parseInt(firstGuess) === parseInt(num[0])) {
      setFirstGuessStatus("Welldone");
    } else {
      setFirstGuessStatus("Wrong Guess");
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
            onChange={handleChange}
          />
          <button>Done</button>
        </form>
      )}
      {firstGuessStatus && firstGuessStatus}
    </div>
  );
}
