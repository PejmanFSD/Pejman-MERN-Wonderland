import { useState } from "react";
import ModeExplaination from "../ModeExplaination";

export default function TripleEmojiMatch() {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setIsGameStarted(true);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
    setIsGameStarted(true);
  };

  return (
    <div>
      <h2>Triple Emoji Match</h2>
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={runEasyMode}>Easy Mode</button>
          <button onClick={runNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode && !normalMode ? (
        <ModeExplaination message="Easy Mode: There's no timer. You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode && (
          <ModeExplaination message="Normal Mode: Find all the matches in *** seconds. You will get one star if you win." />
        )
      )}
      {isGameStarted &&
        <div>
            Triple Emoji Match
        </div>
        }
    </div>
  );
}
