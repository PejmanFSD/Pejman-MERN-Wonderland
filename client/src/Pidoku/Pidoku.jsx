import { useState, useEffect } from "react";
import Square from "./Square";
import ModeExplaination from "../ModeExplaination";
import { getRandArr } from "../utils";

export default function Pidoku({setShowPidoku, setShowGameTitles, updateTotalPoint}) {
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
  const [userPoint, setUserPoint] = useState(0);
  const [pejmanPoint, setPejmanPoint] = useState(0);
  const [finalSquares, setFinalSquares] = useState([]);
  const [isShowTime, setIsShowTime] = useState(false);
  const [isGameResult, setIsGameResult] = useState(false);
  const [crucialSquares, setCrucialSquares] = useState([
    { id: 1, crucialPoint: 0 },
    { id: 2, crucialPoint: 0 },
    { id: 3, crucialPoint: 0 },
    { id: 4, crucialPoint: 0 },
    { id: 5, crucialPoint: 0 },
    { id: 6, crucialPoint: 0 },
    { id: 7, crucialPoint: 0 },
    { id: 8, crucialPoint: 0 },
    { id: 9, crucialPoint: 0 },
    { id: 10, crucialPoint: 0 },
    { id: 11, crucialPoint: 0 },
    { id: 12, crucialPoint: 0 },
    { id: 13, crucialPoint: 0 },
    { id: 14, crucialPoint: 0 },
    { id: 15, crucialPoint: 0 },
    { id: 16, crucialPoint: 0 },
    { id: 17, crucialPoint: 0 },
    { id: 18, crucialPoint: 0 },
    { id: 19, crucialPoint: 0 },
    { id: 20, crucialPoint: 0 },
    { id: 21, crucialPoint: 0 },
    { id: 22, crucialPoint: 0 },
    { id: 23, crucialPoint: 0 },
    { id: 24, crucialPoint: 0 },
    { id: 25, crucialPoint: 0 },
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
    if (easyMode) {
      const pejmanNewEasyChoice = getRandArr(freeSquares);
      setSquares((currSquares) =>
        currSquares.map((s) =>
          s.id === pejmanNewEasyChoice
            ? { ...s, text: pejmanNums[0], owner: "Pejman" }
            : s,
        ),
      );
      setPejmanNums(pejmanNums.filter((el) => pejmanNums.indexOf(el) !== 0));
      setFreeSquares(freeSquares.filter((el) => el !== pejmanNewEasyChoice));
      setIsUserTurn(true);
    } else if (normalMode) {
      setCrucialSquares([
        { id: 1, crucialPoint: 0 },
        { id: 2, crucialPoint: 0 },
        { id: 3, crucialPoint: 0 },
        { id: 4, crucialPoint: 0 },
        { id: 5, crucialPoint: 0 },
        { id: 6, crucialPoint: 0 },
        { id: 7, crucialPoint: 0 },
        { id: 8, crucialPoint: 0 },
        { id: 9, crucialPoint: 0 },
        { id: 10, crucialPoint: 0 },
        { id: 11, crucialPoint: 0 },
        { id: 12, crucialPoint: 0 },
        { id: 13, crucialPoint: 0 },
        { id: 14, crucialPoint: 0 },
        { id: 15, crucialPoint: 0 },
        { id: 16, crucialPoint: 0 },
        { id: 17, crucialPoint: 0 },
        { id: 18, crucialPoint: 0 },
        { id: 19, crucialPoint: 0 },
        { id: 20, crucialPoint: 0 },
        { id: 21, crucialPoint: 0 },
        { id: 22, crucialPoint: 0 },
        { id: 23, crucialPoint: 0 },
        { id: 24, crucialPoint: 0 },
        { id: 25, crucialPoint: 0 },
      ]);
      for (const fs of freeSquares) {
        if ([7, 8, 9, 12, 13, 14, 17, 18, 19].includes(fs)) {
          for (const i of [
            fs - 1,
            fs + 1,
            fs - 5,
            fs + 5,
            fs - 6,
            fs + 6,
            fs - 4,
            fs + 4,
          ]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if ([2, 3, 4].includes(fs)) {
          for (const i of [fs - 1, fs + 1, fs + 4, fs + 5, fs + 6]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if ([22, 23, 24].includes(fs)) {
          for (const i of [fs - 1, fs + 1, fs - 6, fs - 5, fs - 4]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if ([6, 11, 16].includes(fs)) {
          for (const i of [fs + 1, fs - 5, fs + 5, fs - 4, fs + 6]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if ([10, 15, 20].includes(fs)) {
          for (const i of [fs - 1, fs - 5, fs + 5, fs - 6, fs + 4]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if ([10, 15, 20].includes(fs)) {
          for (const i of [fs - 1, fs - 5, fs + 5, fs - 6, fs + 4]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if (fs === 1) {
          for (const i of [2, 6, 7]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if (fs === 5) {
          for (const i of [4, 9, 10]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if (fs === 21) {
          for (const i of [16, 17, 22]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        } else if (fs === 25) {
          for (const i of [19, 20, 24]) {
            if (squares.find((s) => s.id === i).owner === "User") {
              setCrucialSquares((currCrucialSquares) =>
                currCrucialSquares.map((cs) =>
                  cs.id === fs
                    ? {
                        ...cs,
                        crucialPoint:
                          cs.crucialPoint +
                          squares.find((s) => s.id === i).text,
                      }
                    : cs,
                ),
              );
            }
          }
        }
      }
      setCrucialSquares((currCrucialSquares) =>
        [...currCrucialSquares].sort((a, b) => b.crucialPoint - a.crucialPoint),
      );
      let pejmanNewNormalChoice;
      for (const cs of crucialSquares) {
        if (freeSquares.includes(cs.id)) {
          pejmanNewNormalChoice = cs.id;
          break;
        }
      }
      setSquares((currSquares) =>
        currSquares.map((s) =>
          s.id === pejmanNewNormalChoice
            ? { ...s, text: pejmanNums[0], owner: "Pejman" }
            : s,
        ),
      );
      setPejmanNums(pejmanNums.filter((el) => pejmanNums.indexOf(el) !== 0));
      setFreeSquares(freeSquares.filter((el) => el !== pejmanNewNormalChoice));
      setIsUserTurn(true);
    }
  };
  const handleShowTime = () => {
    setIsShowTime(true);
  };
  const handleGameResult = () => {
    setIsGameResult(true);
  };
  const playAgain = () => {
    setIsGameStarted(false);
    setUserColor({
      red: null,
      green: null,
      blue: null,
    });
    setPejmanColor({
      red: null,
      green: null,
      blue: null,
    });
    setIsIdenticalColor(false);
    setUserNums([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    setPejmanNums([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    setIsUserTurn(true);
    setSquares([
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
    setFreeSquares([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25,
    ]);
    setUserPoint(0);
    setPejmanPoint(0);
    setFinalSquares([]);
    setIsShowTime(false);
    setIsGameResult(false);
  };
  useEffect(() => {
    if (isShowTime) {
      const star = freeSquares[0];
      if ([7, 8, 9, 12, 13, 14, 17, 18, 19].includes(star)) {
        setFinalSquares((currFinalSquares) => [
          ...currFinalSquares,
          star - 1,
          star + 1,
          star - 5,
          star + 5,
          star - 6,
          star + 6,
          star - 4,
          star + 4,
        ]);
      } else if ([2, 3, 4].includes(star)) {
        setFinalSquares((currFinalSquares) => [
          ...currFinalSquares,
          star - 1,
          star + 1,
          star + 4,
          star + 5,
          star + 6,
        ]);
      } else if ([22, 23, 24].includes(star)) {
        setFinalSquares((currFinalSquares) => [
          ...currFinalSquares,
          star - 1,
          star + 1,
          star - 6,
          star - 5,
          star - 4,
        ]);
      } else if ([6, 11, 16].includes(star)) {
        setFinalSquares((currFinalSquares) => [
          ...currFinalSquares,
          star + 1,
          star - 5,
          star + 5,
          star - 4,
          star + 6,
        ]);
      } else if ([10, 15, 20].includes(star)) {
        setFinalSquares((currFinalSquares) => [
          ...currFinalSquares,
          star - 1,
          star - 5,
          star + 5,
          star - 6,
          star + 4,
        ]);
      } else if (star === 1) {
        setFinalSquares((currFinalSquares) => [...currFinalSquares, 2, 6, 7]);
      } else if (star === 5) {
        setFinalSquares((currFinalSquares) => [...currFinalSquares, 4, 9, 10]);
      } else if (star === 21) {
        setFinalSquares((currFinalSquares) => [
          ...currFinalSquares,
          16,
          17,
          22,
        ]);
      } else if (star === 25) {
        setFinalSquares((currFinalSquares) => [
          ...currFinalSquares,
          19,
          20,
          24,
        ]);
      }
    }
  }, [isShowTime]);
  useEffect(() => {
    if (isGameResult) {
      for (const s of squares) {
        if (finalSquares.includes(s.id)) {
          if (s.owner === "User") {
            setUserPoint((currUserPoint) => currUserPoint + s.text);
          } else {
            setPejmanPoint((currPejmanPoint) => currPejmanPoint + s.text);
          }
        }
      }
    }
  }, [isGameResult]);
    useEffect(() => {
    if (normalMode && (userPoint > 0 || pejmanPoint > 0) && isGameResult) {
      if (userPoint > pejmanPoint) {
        updateTotalPoint(1);
      }
    }
  }, [userPoint, pejmanPoint]);
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
      {/* <div style={{ color: "gray" }}>
        Free Squares:
        {Object.values(freeSquares).map((s) => (
          <div style={{ display: "inline", color: "gray" }}>{s}-</div>
        ))}
      </div>
      <div style={{ color: "gray" }}>
        Crucial Squares:
        {crucialSquares.map((s) => (
          <div style={{ display: "inline", color: "magenta" }}>
            {s.id}-{s.crucialPoint}**
          </div>
        ))}
      </div>
      <div style={{ color: "gray" }}>
        Final Squares:
        {Object.values(finalSquares).map((s) => (
          <div style={{ display: "inline", color: "gray" }}>{s}-</div>
        ))}
      </div> */}
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
                finalSquares={finalSquares}
                isShowTime={isShowTime}
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
                finalSquares={finalSquares}
                isShowTime={isShowTime}
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
      {freeSquares.length === 1 && finalSquares.length === 0 && (
        <div>
          <div>
            All 24 squares are selected, the result of the game relies on the
            squares around the last empty one
          </div>
          <button onClick={handleShowTime}>Show the decisive squares</button>
        </div>
      )}
      {finalSquares.length !== 0 && !isGameResult && (
        <button onClick={handleGameResult}>Show the Game Result</button>
      )}
      {isGameResult && (
        <div>
          <h3>Your totoal Point: {userPoint}</h3>
          <div style={{ display: "inline", margin: "10px" }}>{userPoint !== 0 && "("}</div>
          {finalSquares.map((fs) =>
            squares.find((s) => s.id === fs).owner === "User" &&
            <div
            style={{
              display: "inline",
              margin: "10px",
              color: userColor.red === 240 || userColor.blue === 240 ? "white" : "black",
              background: `rgba(${userColor.red}, ${userColor.green}, ${userColor.blue})`,
              padding: "7px",
              border: "4px solid black"
            }}
              >
                {squares.find((s) => s.id === fs).text < 10 ? `0${squares.find((s) => s.id === fs).text}` : squares.find((s) => s.id === fs).text}
              </div>
          )}
          <div style={{ display: "inline", margin: "10px" }}>{userPoint !== 0 && ")"}</div>
          <h3>Pejman's totoal Point: {pejmanPoint}</h3>
          <div style={{ display: "inline", margin: "10px" }}>{pejmanPoint !== 0 && "("}</div>
          {finalSquares.map((fs) =>
            squares.find((s) => s.id === fs).owner === "Pejman" &&
            <div
            style={{
              display: "inline",
              margin: "10px",
              color: pejmanColor.red === 240 || pejmanColor.blue === 240 ? "white" : "black",
              background: `rgba(${pejmanColor.red}, ${pejmanColor.green}, ${pejmanColor.blue})`,
              padding: "7px",
              border: "4px solid black"
            }}
              >
                {squares.find((s) => s.id === fs).text < 10 ? `0${squares.find((s) => s.id === fs).text}` : squares.find((s) => s.id === fs).text}
              </div>
          )}
          <div style={{ display: "inline", margin: "10px" }}>{pejmanPoint !== 0 && ")"}</div>
        </div>
      )}
      {isGameResult && userPoint > pejmanPoint && (
        <div>
          <h2>You Win!</h2>
          <button onClick={playAgain}>Play Again</button>
        </div>
      )}
      {isGameResult && userPoint === pejmanPoint && (
        <div>
          <h2>No Winner!</h2>
          <button onClick={playAgain}>Play Again</button>
        </div>
      )}
      {isGameResult && userPoint < pejmanPoint && (
        <div>
          <h2>You Loose!</h2>
          <button onClick={playAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
}
