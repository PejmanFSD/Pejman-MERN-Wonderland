import { useState } from "react";
import { getRandArr } from "../utils";

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
  const generateNums = () => {
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
        copyChosenExtraNums[i] = pickedChosenExtraNums[i];
        return copyChosenExtraNums;
      });
    }
    setAllNums(copyAllNums);
    setBlockNums(copyblockNums);
    setExtraNums(copyExtraNums);
  };
  const handleClick = (e) => {
    if (!answer.includes(e.target.innerText)) {
      setAnswer((currAnswer) => [...currAnswer, e.target.innerText]);
    } else {
      setAnswer(answer.filter(num => num !== e.target.innerText))
    }
  };
  const handleSubmit = () => {
    let sum = 0;
    for (let i = 0; i < 4; i++) {
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
      {isWin === true && <h1>You Win!</h1>}
      {isWin === false && <h1>You Loose!</h1>}
      {answer.map((a) => (
        <div>{a}</div>
      ))}
      <div>
        <button onClick={() => generateNums()}>Start</button>
      </div>
      {table.map((t) =>
        blockNums.includes(t) ? (
          <div
            style={{
              border: "1px solid black",
              padding: "5px",
              width: "70px",
              display: "inline",
              position: "relative",
              top: "20px",
            }}
            onClick={handleClick}
          >
            {chosenExtraNums[t]}
          </div>
        ) : (
          <div
            style={{
              border: "1px solid black",
              padding: "5px",
              width: "70px",
              display: "inline",
              position: "relative",
              top: "20px",
              color: "red",
            }}
            onClick={handleClick}
          >
            {nums.find((obj) => obj.blockNum === t)?.number}
          </div>
        )
      )}
      <div>
        <button
          onClick={handleSubmit}
          style={{ position: "relative", top: "30px" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
