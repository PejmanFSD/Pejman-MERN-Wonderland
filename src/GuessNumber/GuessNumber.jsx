import { useState, useEffect } from "react";
import { getRandArr } from "../utils";
import A from "./A.png";
import B from "./B.png";
import C from "./C.png";

export default function GuessNumber({ setShowGameTitles, setShowGuessNumber }) {
  const [num, setNum] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState([
    { guess: null, status: null },
    { guess: null, status: null },
    { guess: null, status: null },
    { guess: null, status: null },
  ]);
  const [showTempResult, setShowTempResult] = useState(false);
  const [allUserGuesses, setAllUserGuesses] = useState([...userGuess]);
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
  const firstHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((item, index) =>
        index === 0
          ? {
              ...item,
              guess: e.target.value,
              status: checkStatus(num, 0, e.target.value),
            }
          : item
      )
    );
    setShowTempResult(false);
  };
  const secondHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((item, index) =>
        index === 1
          ? {
              ...item,
              guess: e.target.value,
              status: checkStatus(num, 1, e.target.value),
            }
          : item
      )
    );
    setShowTempResult(false);
  };
  const thirdHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((item, index) =>
        index === 2
          ? {
              ...item,
              guess: e.target.value,
              status: checkStatus(num, 2, e.target.value),
            }
          : item
      )
    );
    setShowTempResult(false);
  };
  const fourthHandleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    setUserGuess((currUserGuess) =>
      currUserGuess.map((item, index) =>
        index === 3
          ? {
              ...item,
              guess: e.target.value,
              status: checkStatus(num, 3, e.target.value),
            }
          : item
      )
    );
    setShowTempResult(false);
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
  const checkTheNumber = (e) => {
    e.preventDefault();
    console.log(allUserGuesses.slice(9));
    setShowTempResult(true);
  };
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
      {showTempResult &&
        allUserGuesses.slice(9).map((arrayGuess) => (
          <div>
            <div style={{ display: "inline" }}>{`Guess number ${
              11 - chancesNum
            }: `}</div>
            {arrayGuess.map((digitGuess, digitIndex) => (
              <div key={digitIndex} style={{ display: "inline" }}>
                {digitGuess.guess}
              </div>
            ))}
          </div>
        ))}
      {showTempResult &&
        allUserGuesses.slice(9).map((arrayGuess) => (
          <div>
            <div style={{ display: "inline" }}>{`The result of guess number ${
              11 - chancesNum
            } is: `}</div>
            {arrayGuess.map((digitGuess, digitIndex) => (
              <div key={digitIndex} style={{ display: "inline" }}>
                {digitGuess.status === "A" ? (
                  <img
                    src={A}
                    width="20px"
                    alt="GreenCircle"
                    style={{ position: "relative", top: "6px" }}
                  />
                ) : digitGuess.status === "B" ? (
                  <img
                    src={B}
                    width="20px"
                    alt="YellowCircle"
                    style={{ position: "relative", top: "6px" }}
                  />
                ) : (
                  <img
                    src={C}
                    width="20px"
                    alt="RedCircle"
                    style={{ position: "relative", top: "6px" }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      <br></br>
      <button onClick={() => backToHomepage()}>Back to the home page</button>
    </div>
  );
}
