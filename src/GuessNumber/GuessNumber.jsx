import { useState } from "react";
import { getRandArr } from "../utils";

export default function GuessNumber() {
  const [num, setNum] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState([
    { guess: null, status: null },
    { guess: null, status: null },
    { guess: null, status: null },
    { guess: null, status: null },
  ]);
  const [allUserGuesses, setAllUserGuesses] = useState([]);
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
              ? { ...item, guess: currUserGuess[i].guess, status: "Correct" }
              : item
          )
        );
      } else {
        setUserGuess((currUserGuess) =>
          currUserGuess.map((item, index) =>
            index === i
              ? { ...item, guess: currUserGuess[i].guess, status: "Wrong" }
              : item
          )
        );
      }
    }
    setAllUserGuesses((currAllUserGuesses) => [
      ...currAllUserGuesses,
      { guess: userGuess.guess, status: userGuess.status },
    ]);
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
      {userGuess[0].guess !== null &&
        userGuess[1].guess !== null &&
        userGuess[2].guess !== null &&
        userGuess[3].guess !== null &&
        userGuess.map((item, index) => (
          <div key={index}>
            <p>Guess: {item.guess}</p>
            <p>Status: {item.status}</p>
          </div>
        ))}
    </div>
  );
}
