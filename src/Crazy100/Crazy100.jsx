import { useState } from "react";
import {getRandNumInRange} from "../utils";

export default function Crazy100() {
  const [nums, setNums] = useState([]);
  const generateNums = () => {
    const num1 = getRandNumInRange(5, 33);
    const num2 = getRandNumInRange(5, 33);
    const num3 = getRandNumInRange(5, 33);
    setNums((currNums) => [...currNums, num1]);
    setNums((currNums) => [...currNums, num2]);
    setNums((currNums) => [...currNums, num3]);
    setNums((currNums) => [...currNums, 100 - num1 - num2 - num3]);
  };
  return (
    <div>
      {nums.map((n) => (
        <div>{n}</div>
      ))}
      <button onClick={() => generateNums()}>Generate Numbers</button>
    </div>
  );
}
