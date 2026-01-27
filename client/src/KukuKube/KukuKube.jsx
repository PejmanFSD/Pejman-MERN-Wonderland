import { useState } from "react";
import Square from "./Square";
import ModeExplaination from "../ModeExplaination";
import { getRandNum } from "../utils";

export default function KukuKube() {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isColorChosen, setIsColorChosen] = useState(false);
  const [color, setColor] = useState({ red: null, green: null, blue: null });
  const [squareNum, setSquareNum] = useState(0);
  const [uniqueSquare, setUniqueSquare] = useState(0);
  const [step, setStep] = useState(0);
  const [userChoice, setUserChoice] = useState(null);

  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setSquareNum(9);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
    setSquareNum(36);
  };
  const handleStart = () => {
    setIsGameStarted(true);
    setUniqueSquare(getRandNum(squareNum));
    setStep(1);
  };
  const handleColor = (e) => {
    if (e.target.value === "Red") {
      setColor({ red: 170, green: 0, blue: 0 });
    } else if (e.target.value === "Green") {
      setColor({ red: 0, green: 170, blue: 0 });
    } else if (e.target.value === "Blue") {
      setColor({ red: 0, green: 0, blue: 170 });
    }
    setIsColorChosen(true);
  };
  return (
    <div>
      <h2>Kuku Kube</h2>
      <h4>In each step, find the square with the unique color</h4>
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={runEasyMode}>Easy Mode</button>
          <button onClick={runNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode && !normalMode ? (
        //   && !isTogglingReset &&
        //   !isTogglingHomePage &&
        //   !isTogglingLevel
        <ModeExplaination message="Easy Mode: You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode && (
          // && !isTogglingReset &&
          // !isTogglingHomePage &&
          // !isTogglingLevel
          <ModeExplaination message="Normal Mode: You will get one star if you win." />
        )
      )}
      {!isGameStarted && (easyMode || normalMode) && (
        <div>
          <label htmlFor="color"></label>
          <select onChange={handleColor} name="color" id="color">
            <option value={color} disabled selected>
              Select a Color
            </option>
            {["Red", "Green", "Blue"].map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </div>
      )}
      {!isGameStarted && (easyMode || normalMode) && isColorChosen && (
        <button onClick={handleStart}>Start the Game</button>
      )}
      <div style={{ color: "gray" }}>The chosen square: {uniqueSquare}</div>
      <div style={{ color: "gray" }}>User's choice: {userChoice}</div>
      {step > 0 && <div>Step {step}</div>}
      {isGameStarted &&
        new Array(squareNum).fill(null).map((el, idx) =>
          (idx + 1) % squareNum ** 0.5 !== 0 ? (
            <div style={{ display: "inline" }}>
              <Square
                easyMode={easyMode}
                red={color.red}
                green={color.green}
                blue={color.blue}
                opacity={idx + 1 === uniqueSquare ? step * 0.085 : 1}
                text={idx + 1}
                setUserChoice={setUserChoice}
              />
            </div>
          ) : (
            <div style={{ display: "inline" }}>
              <Square
                easyMode={easyMode}
                red={color.red}
                green={color.green}
                blue={color.blue}
                opacity={idx + 1 === uniqueSquare ? step * 0.085 : 1}
                text={idx + 1}
                setUserChoice={setUserChoice}
              />
              <br></br>
            </div>
          ),
        )}
    </div>
  );
}
