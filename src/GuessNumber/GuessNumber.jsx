import { useState } from "react";
import { getRandArr } from "../utils";

export default function GuessNumber() {
  const [num, setNum] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState([null, null, null, null]);
  const [userGuessStatus, setUserGuessStatus] = useState([null, null, null, null]);
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
    setUserGuess((currUserGuess) =>
      currUserGuess.map((userGuess, i) =>
        i === 0 ? e.target.value : userGuess
      )
    );
  };
  const secondHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((userGuess, i) =>
        i === 1 ? e.target.value : userGuess
      )
    );
  };
  const thirdHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((userGuess, i) =>
        i === 2 ? e.target.value : userGuess
      )
    );
  };
  const fourthHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((userGuess, i) =>
        i === 3 ? e.target.value : userGuess
      )
    );
  };
  const checkTheNumber = (e) => {
    e.preventDefault();
    if (parseInt(userGuess[0]) === parseInt(num[0])) {
      setUserGuessStatus((currUserGuessStatus) =>
        currUserGuessStatus.map((userGuessStatus, i) =>
          i === 0 ? "Correct" : userGuessStatus
        )
      );
    } else {
      setUserGuessStatus((currUserGuessStatus) =>
        currUserGuessStatus.map((userGuessStatus, i) =>
          i === 0 ? "Wrong" : userGuessStatus
        )
      );
    }
    if (parseInt(userGuess[1]) === parseInt(num[1])) {
      setUserGuessStatus((currUserGuessStatus) =>
        currUserGuessStatus.map((userGuessStatus, i) =>
          i === 1 ? "Correct" : userGuessStatus
        )
      );
    } else {
      setUserGuessStatus((currUserGuessStatus) =>
        currUserGuessStatus.map((userGuessStatus, i) =>
          i === 1 ? "Wrong" : userGuessStatus
        )
      );
    }
    if (parseInt(userGuess[2]) === parseInt(num[2])) {
      setUserGuessStatus((currUserGuessStatus) =>
        currUserGuessStatus.map((userGuessStatus, i) =>
          i === 2 ? "Correct" : userGuessStatus
        )
      );
    } else {
      setUserGuessStatus((currUserGuessStatus) =>
        currUserGuessStatus.map((userGuessStatus, i) =>
          i === 2 ? "Wrong" : userGuessStatus
        )
      );
    }
    if (parseInt(userGuess[3]) === parseInt(num[3])) {
      setUserGuessStatus((currUserGuessStatus) =>
        currUserGuessStatus.map((userGuessStatus, i) =>
          i === 3 ? "Correct" : userGuessStatus
        )
      );
    } else {
      setUserGuessStatus((currUserGuessStatus) =>
        currUserGuessStatus.map((userGuessStatus, i) =>
          i === 3 ? "Wrong" : userGuessStatus
        )
      );
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
      {userGuess}
      {userGuessStatus && userGuessStatus}
    </div>
  );
}
