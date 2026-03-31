import {useState} from "react";
import Board from "./Board";

const initialTens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const array1To9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const array10To19 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const array20To29 = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
const array30To39 = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
const array40To49 = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
const array50To59 = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
const array60To69 = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69];
const array70To79 = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79];
const array80To89 = [80, 81, 82, 83, 84, 85, 86, 87, 88, 89];
const array90To99 = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

export default function Bingo() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [userColor, setUserColor] = useState("");
    const [userTens1, setUserTens1] = useState([]);
    const [userTens2, setUserTens2] = useState([]);
    const [userTens3, setUserTens3] = useState([]);
    const [pejmanTens1, setPejmanTens1] = useState([]);
    const [pejmanTens2, setPejmanTens2] = useState([]);
    const [pejmanTens3, setPejmanTens3] = useState([]);
    const [user1Nums, setUser1Nums] = useState([]);

  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor("red");
    } else if (e.target.value === "Green") {
      setUserColor("green");
    } else if (e.target.value === "Blue") {
      setUserColor("blue");
    }
    updateTensArray(setUserTens1);
    updateTensArray(setUserTens2);
    updateTensArray(setUserTens3);
    updateTensArray(setPejmanTens1);
    updateTensArray(setPejmanTens2);
    updateTensArray(setPejmanTens3);
  };

  const updateTensArray = (arr) => {
    const shuffled = [...initialTens].sort(() => Math.random() - 0.5);
    arr(shuffled.slice(0, 5).sort());
  }
    const updateNumsArray = (arr, updateFunc) => {
        const shuffledArr = [...arr].sort(() => Math.random() - 0.5).slice(0, 5).sort();
        updateFunc(curr => [...curr, shuffledArr[0], shuffledArr[1], shuffledArr[2], shuffledArr[3], shuffledArr[4]]);
    }
    const handleStart = () => {
        setIsGameStarted(true);
        for (const ut1 of userTens1) {
            if (ut1 === 0) {updateNumsArray(array1To9, setUser1Nums);}
            if (ut1 === 1) {updateNumsArray(array10To19, setUser1Nums);}
            if (ut1 === 2) {updateNumsArray(array20To29, setUser1Nums);}
            if (ut1 === 3) {updateNumsArray(array30To39, setUser1Nums);}
            if (ut1 === 4) {updateNumsArray(array40To49, setUser1Nums);}
            if (ut1 === 5) {updateNumsArray(array50To59, setUser1Nums);}
            if (ut1 === 6) {updateNumsArray(array60To69, setUser1Nums);}
            if (ut1 === 7) {updateNumsArray(array70To79, setUser1Nums);}
            if (ut1 === 8) {updateNumsArray(array80To89, setUser1Nums);}
            if (ut1 === 9) {updateNumsArray(array90To99, setUser1Nums);}
        }
    };
    return (
        <div>
        {!isGameStarted && userColor === "" && (
            <div>
              <label htmlFor="userColor">Select a Color</label>
              <br></br>
              <select
                onChange={handleUserColor}
                name="userColor"
                id="userColor"
              >
                <option value={userColor} disabled selected>
                  🔽🔽🔽
                </option>
                {["Red", "Green", "Blue"].map((c) => (
                  <option>{c}</option>
                ))}
              </select>
            </div>
        )}
            {!isGameStarted && userColor !== "" &&
                <button onClick={handleStart}>Start</button>
            }
            {isGameStarted && userTens1.map(n => <div style={{display: "inline", color: "red"}}>{n} -</div>)}
            {isGameStarted && user1Nums.map(n => <div style={{display: "inline"}}>{n} -</div>)}
            {isGameStarted && <Board nums={user1Nums} userColor={userColor} />}
        </div>
    )
}