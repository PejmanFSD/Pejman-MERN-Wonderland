import { useState } from "react";
import { getRandArr } from "../utils";

export default function GuessNumber() {
  const [num, setNum] = useState([]);
  const generateRandNum = () => {
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
  return (
    <div>
      {num}
      <button onClick={() => generateRandNum()}>Generate Random Number</button>
    </div>
  );
}
