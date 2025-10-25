import { useState } from "react";
import { getRandArr } from "../utils";

export default function GuessNumber() {
  const [num, setNum] = useState([]);
  const generateRandNum = () => {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const generatedRandNum = [];
    while (generatedRandNum.length < 4) {
      const randDigit = getRandArr(digits);
      console.log("randDigit: ", randDigit);
      generatedRandNum.push(randDigit);
      digits.splice(digits.indexOf(randDigit), 1);
      console.log("digits: ", digits);
      console.log("generatedRandNum: ", generatedRandNum);
    }
    setNum(generatedRandNum);
  };
  return (
    <div>
      {num}
      <button onClick={() => generateRandNum()}>Generate Random Number</button>
    </div>
  );
}
