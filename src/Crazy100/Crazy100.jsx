import { useState } from "react";
import { getRandArr } from "../utils";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";

const table = Array.from({ length: 16 }, (_, i) => i);
export default function Crazy100() {
  const [nums, setNums] = useState([
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
  ]);
  const [allNums, setAllNums] = useState(
    Array.from({ length: 33 }, (_, i) => i + 1)
  );
  const [extraNums, setExtraNums] = useState(
    Array.from({ length: 99 }, (_, i) => i + 1)
  );
  const [chosenExtraNums, setChosenExtraNums] = useState([]);
  const [blockNums, setBlockNums] = useState(
    Array.from({ length: 16 }, (_, i) => i)
  );
  const [answer, setAnswer] = useState([]);
  const [isWin, setIsWin] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const generateNums = () => {
    setIsGameStarted(true);
    let copyAllNums = [...allNums];
    let copyblockNums = [...blockNums];
    let copyExtraNums = [...extraNums];
    let pickedNums = [];
    for (let i = 0; i < 4; i++) {
      let newNum;
      if (i !== 3) {
        newNum = copyAllNums[Math.floor(Math.random() * copyAllNums.length)];
      }
      if (i === 3) {
        newNum =
          100 -
          pickedNums[0].number -
          pickedNums[1].number -
          pickedNums[2].number;
      }
      const newBlockNums =
        copyblockNums[Math.floor(Math.random() * copyblockNums.length)];
      pickedNums.push({ number: newNum, blockNum: newBlockNums });
      copyAllNums = copyAllNums.filter((n) => n !== newNum);
      copyblockNums = copyblockNums.filter((r) => r !== newBlockNums);
      copyExtraNums = copyExtraNums.filter((e) => e !== newNum);
    }
    for (let i = 0; i < 4; i++) {
      setNums((currNums) => {
        const copyNums = [...currNums];
        copyNums[i] = {
          ...copyNums[i],
          number: pickedNums[i].number,
          blockNum: pickedNums[i].blockNum,
          clicked: false,
        };
        return copyNums;
      });
    }
    let pickedChosenExtraNums = [];
    for (let i = 0; i < 16; i++) {
      let newNum = getRandArr(copyExtraNums);
      pickedChosenExtraNums.push(newNum);
      copyExtraNums = copyExtraNums.filter((e) => e !== newNum);
    }
    for (let i = 0; i < 16; i++) {
      setChosenExtraNums((currChosenExtraNums) => {
        const copyChosenExtraNums = [...currChosenExtraNums];
        copyChosenExtraNums[i] = {
          number: pickedChosenExtraNums[i],
          clicked: false,
        };
        return copyChosenExtraNums;
      });
    }
    setAllNums(copyAllNums);
    setBlockNums(copyblockNums);
    setExtraNums(copyExtraNums);
  };
  const toggleClicked = (el) => {
    if (el.clicked) {
      return false;
    } else {
      return true;
    }
  };
  const handleClickChosenExtraNum = (e) => {
    if (!answer.includes(e.target.innerText)) {
      setAnswer((currAnswer) => [...currAnswer, e.target.innerText]);
    } else {
      setAnswer(answer.filter((num) => num !== e.target.innerText));
    }
    for (let chosenExtraNum of chosenExtraNums) {
      if (e.target.innerText.toString() === chosenExtraNum.number.toString()) {
        setChosenExtraNums((currChosenExtraNum) =>
          currChosenExtraNum.map(
            (chosenNum) =>
              chosenNum.number.toString() === e.target.innerText.toString()
                ? { ...chosenNum, clicked: toggleClicked(chosenExtraNum) } // update only this object
                : chosenNum // leave the other objects unchanged
          )
        );
      }
    }
  };
  const handleClickNum = (e) => {
    if (!answer.includes(e.target.innerText)) {
      setAnswer((currAnswer) => [...currAnswer, e.target.innerText]);
    } else {
      setAnswer(answer.filter((num) => num !== e.target.innerText));
    }
    for (let num of nums) {
      if (e.target.innerText.toString() === num.number.toString()) {
        setNums((currNum) =>
          currNum.map(
            (num) =>
              num.number.toString() === e.target.innerText.toString()
                ? { ...num, clicked: toggleClicked(num) } // update only this object
                : num // leave the other objects unchanged
          )
        );
      }
    }
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
    setNums([
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
    ]);
    setAllNums(Array.from({ length: 33 }, (_, i) => i + 1));
    setExtraNums(Array.from({ length: 99 }, (_, i) => i + 1));
    setChosenExtraNums([]);
    setBlockNums(Array.from({ length: 16 }, (_, i) => i));
    setAnswer([]);
    setIsWin("");
    setIsTogglingReset(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const handleSubmit = () => {
    let sum = 0;
    for (let i = 0; i < answer.length; i++) {
      sum += Number(answer[i]);
    }
    if (sum === 100) {
      setIsWin(true);
    }
    if (sum !== 100) {
      setIsWin(false);
    }
    console.log(sum);
  };
  return (
    <div>
      <h2>Crazy-100</h2>
      <ModeExplaination message="Among the 16 numbers, choose 4 of them whose sum equals 100." />
      {isWin === true && <h1>You Win!</h1>}
      {isWin === false && <h1>You Loose!</h1>}
      {answer.map((a) => (
        <div>{a}</div>
      ))}
      {!isGameStarted && !isTogglingReset && (
        <div>
          <button onClick={() => generateNums()}>Start</button>
        </div>
      )}
      {isGameStarted &&
        table.map((t) =>
          blockNums.includes(t) ? (
            <button
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "30px",
                display: "inline",
                position: "relative",
                top: "20px",
                background: chosenExtraNums[t]?.clicked && "gray",
              }}
              onClick={handleClickChosenExtraNum}
              disabled={isTogglingReset || isWin !== ""}
            >
              {chosenExtraNums[t]?.number}
            </button>
          ) : (
            <button
              style={{
                border: "1px solid black",
                padding: "5px",
                width: "30px",
                display: "inline",
                position: "relative",
                top: "20px",
                background:
                  nums.find((obj) => obj.blockNum === t)?.clicked && "gray",
                color: "red",
              }}
              onClick={handleClickNum}
              disabled={isTogglingReset || isWin !== ""}
            >
              {nums.find((obj) => obj.blockNum === t)?.number}
            </button>
          )
        )}
      {isGameStarted && isWin === "" && !isTogglingReset && (
        <div>
          <button
            onClick={handleSubmit}
            style={{ position: "relative", top: "30px" }}
          >
            Done
          </button>
        </div>
      )}
      {isWin !== "" && !isTogglingReset && (
        <div>
          <button
            onClick={toggleResetYes}
            style={{ position: "relative", top: "30px" }}
          >
            {isWin ? "Play Again" : "Try Again"}
          </button>
        </div>
      )}
      {isGameStarted && isWin === "" && !isTogglingReset && (
        <div>
          <button
            onClick={toggleReset}
            style={{ position: "relative", top: "30px" }}
          >
            Reset the Game
          </button>
        </div>
      )}
      {isTogglingReset && (
        <div
          style={{
            position: "relative",
            top: "20px",
          }}
        >
          <ConfirmationBox
            question="Are you sure you want to reset the game?"
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        </div>
      )}
    </div>
  );
}
