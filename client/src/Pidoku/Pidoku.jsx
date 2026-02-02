import { useState } from "react";
import Square from "./Square";
import ModeExplaination from "../ModeExplaination";

export default function Pidoku() {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isUserColorChosen, setIsUserColorChosen] = useState(false);
  const [userColor, setUserColor] = useState({
    red: null,
    green: null,
    blue: null,
  });
  const [isPejmanColorChosen, setIsPejmanColorChosen] = useState(false);
  const [pejmanColor, setPejmanColor] = useState({
    red: null,
    green: null,
    blue: null,
  });
  const [isIdenticalColor, setIsIdenticalColor] = useState(false);
  const [userNums, setUserNums] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor({ red: 240, green: 20, blue: 20 });
    } else if (e.target.value === "Green") {
      setUserColor({ red: 0, green: 200, blue: 0 });
    } else if (e.target.value === "Blue") {
      setUserColor({ red: 20, green: 20, blue: 240 });
    } else if (e.target.value === "Yellow") {
      setUserColor({ red: 220, green: 220, blue: 0 });
    }
    setIsUserColorChosen(true);
  };
  const handlePejmanColor = (e) => {
    if (e.target.value === "Red") {
      setPejmanColor({ red: 240, green: 20, blue: 20 });
    } else if (e.target.value === "Green") {
      setPejmanColor({ red: 0, green: 200, blue: 0 });
    } else if (e.target.value === "Blue") {
      setPejmanColor({ red: 20, green: 20, blue: 240 });
    } else if (e.target.value === "Yellow") {
      setPejmanColor({ red: 220, green: 220, blue: 0 });
    }
    setIsPejmanColorChosen(true);
  };
  const handleStart = () => {
    if (
      userColor.red === pejmanColor.red &&
      userColor.blue === pejmanColor.blue &&
      userColor.green === pejmanColor.green
    ) {
      setIsIdenticalColor(true);
    } else {
      setIsGameStarted(true);
    }
  };
  const handleOk = () => {
    setUserColor({ red: null, green: null, blue: null });
    setPejmanColor({ red: null, green: null, blue: null });
    setIsIdenticalColor(false);
  };
  return (
    <div>
      <h2>Pidoku</h2>
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={runEasyMode}>Easy Mode</button>
          <button onClick={runNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode && !normalMode ? (
        <ModeExplaination message="Easy Mode: In his turn, Pejman chooses the squares randomly. You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode && (
          <ModeExplaination message="Normal Mode: In his turn, Pejman chooses the squares with a strategy. You will get one star if you win." />
        )
      )}
      {!isGameStarted && !isIdenticalColor && (easyMode || normalMode) && (
        <div>
          <div>
            <label htmlFor="userColor">Select a Color for yourself </label>
            <br></br>
            <select onChange={handleUserColor} name="userColor" id="userColor">
              <option value={userColor} disabled selected>
                🔽🔽🔽
              </option>
              {["Red", "Green", "Blue", "Yellow"].map((c) => (
                <option>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pejmanColor">Select a Color for Pejman </label>
            <br></br>
            <select
              onChange={handlePejmanColor}
              name="pejmanColor"
              id="pejmanColor"
            >
              <option value={pejmanColor} disabled selected>
                🔽🔽🔽
              </option>
              {["Red", "Green", "Blue", "Yellow"].map((c) => (
                <option>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {!isGameStarted &&
        (easyMode || normalMode) &&
        (userColor.red || userColor.blue || userColor.green) &&
        (pejmanColor.red || pejmanColor.blue || pejmanColor.green) &&
        !isIdenticalColor && (
          <button onClick={handleStart}>Start the Game</button>
        )}
      {isIdenticalColor && (
        <div>
          <div>You can't choose an identical color for both players</div>
          <button onClick={handleOk}>Ok</button>
        </div>
      )}
      {isGameStarted &&
        new Array(25).fill(null).map((el, idx) =>
          (idx + 1) % 5 !== 0 ? (
            <div style={{ display: "inline" }}>
              <Square
                userNums={userNums}
                setUserNums={setUserNums}
                userColor={userColor}
              />
            </div>
          ) : (
            <div style={{ display: "inline" }}>
              <Square
                userNums={userNums}
                setUserNums={setUserNums}
                userColor={userColor}
              />
              <br></br>
            </div>
          ),
        )}
    </div>
  );
}
