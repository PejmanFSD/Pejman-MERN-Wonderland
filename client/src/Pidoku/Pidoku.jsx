import { useState } from "react";
import Square from "./Square";
import ModeExplaination from "../ModeExplaination";
import { getRandArr } from "../utils";

export default function Pidoku() {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userColor, setUserColor] = useState({
    red: null,
    green: null,
    blue: null,
  });
  const [pejmanColor, setPejmanColor] = useState({
    red: null,
    green: null,
    blue: null,
  });
  const [isIdenticalColor, setIsIdenticalColor] = useState(false);
  const [userNums, setUserNums] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [pejmanNums, setPejmanNums] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [squares, setSquares] = useState([
    { id: 1, text: 0, owner: null },
    { id: 2, text: 0, owner: null },
    { id: 3, text: 0, owner: null },
    { id: 4, text: 0, owner: null },
    { id: 5, text: 0, owner: null },
    { id: 6, text: 0, owner: null },
    { id: 7, text: 0, owner: null },
    { id: 8, text: 0, owner: null },
    { id: 9, text: 0, owner: null },
    { id: 10, text: 0, owner: null },
    { id: 11, text: 0, owner: null },
    { id: 12, text: 0, owner: null },
    { id: 13, text: 0, owner: null },
    { id: 14, text: 0, owner: null },
    { id: 15, text: 0, owner: null },
    { id: 16, text: 0, owner: null },
    { id: 17, text: 0, owner: null },
    { id: 18, text: 0, owner: null },
    { id: 19, text: 0, owner: null },
    { id: 20, text: 0, owner: null },
    { id: 21, text: 0, owner: null },
    { id: 22, text: 0, owner: null },
    { id: 23, text: 0, owner: null },
    { id: 24, text: 0, owner: null },
    { id: 25, text: 0, owner: null },
  ]);
  const [freeSquares, setFreeSquares] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
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
    setIsUserTurn(true);
  };
  const handleOk = () => {
    setUserColor({ red: null, green: null, blue: null });
    setPejmanColor({ red: null, green: null, blue: null });
    setIsIdenticalColor(false);
  };
  const handleAllowPejman = () => {
    let pejmanNewChoice;
    if (easyMode) {
      pejmanNewChoice = getRandArr(freeSquares);
    }
    setSquares((currSquares) =>
      currSquares.map((s) =>
        s.id === pejmanNewChoice
          ? { ...s, text: pejmanNums[0], owner: "Pejman" }
          : s,
      ),
    );
    setPejmanNums(pejmanNums.filter((el) => pejmanNums.indexOf(el) !== 0));
    setFreeSquares(freeSquares.filter((el) => el !== pejmanNewChoice));
    setIsUserTurn(true);
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
      <div style={{ color: "gray" }}>
        Free Squares:
        {Object.values(freeSquares).map((s) => (
          <div style={{ display: "inline", color: "gray" }}>{s}-</div>
        ))}
      </div>
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
                pejmanColor={pejmanColor}
                isUserTurn={isUserTurn}
                setIsUserTurn={setIsUserTurn}
                idx={idx}
                freeSquares={freeSquares}
                setFreeSquares={setFreeSquares}
                squares={squares}
                setSquares={setSquares}
              />
            </div>
          ) : (
            <div style={{ display: "inline" }}>
              <Square
                userNums={userNums}
                setUserNums={setUserNums}
                userColor={userColor}
                pejmanColor={pejmanColor}
                isUserTurn={isUserTurn}
                setIsUserTurn={setIsUserTurn}
                idx={idx}
                freeSquares={freeSquares}
                setFreeSquares={setFreeSquares}
                squares={squares}
                setSquares={setSquares}
              />
              <br></br>
            </div>
          ),
        )}
      {isGameStarted && !isUserTurn && (
        <div>
          <div>Allow Pejman to make his move</div>
          <button onClick={handleAllowPejman}>Ok</button>
        </div>
      )}
    </div>
  );
}
