import { useState } from "react";
import ModeExplaination from "../ModeExplaination";

export default function KukuKube() {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStart = () => {
    setIsGameStarted(true);
  };
  return (
  <div>
    <h2>Kuku Kube</h2>
    <h4>In each step, find the square with the unique color</h4>
    {!isGameStarted && !easyMode && !normalMode &&
    <div>
        <button onClick={runEasyMode}>Easy Mode</button>
        <button onClick={runNormalMode}>Normal Mode</button>
    </div>
    }
    {!isGameStarted && (easyMode || normalMode) &&
        <button onClick={handleStart}>Start the Game</button>
    }
    {easyMode && !normalMode
        //   && !isTogglingReset &&
        //   !isTogglingHomePage &&
        //   !isTogglingLevel
          ? (
            <ModeExplaination message="Easy Mode: You won't get any stars if you win." />
          ) : (
            !easyMode && normalMode
            // && !isTogglingReset &&
            // !isTogglingHomePage &&
            // !isTogglingLevel
            && (
              <ModeExplaination message="Normal Mode: You will get one star if you win." />
            )
          )}
    {isGameStarted && <div>The game is started</div>}
  </div>
  )
}
