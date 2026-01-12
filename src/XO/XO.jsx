import { useState, useEffect } from "react";
import Square from "./Square";
import SquareDetails from "./SquareDetails";
import S from "./Images/S.jpg";
import X from "./Images/X.jpg";
import XU from "./Images/XU.jpg";
import XP from "./Images/XP.jpg";
import O from "./Images/O.jpg";
import OU from "./Images/OU.jpg";
import OP from "./Images/OP.jpg";
import { getRandArr } from "../utils";
const signs = [S, X, O, XU, XP, OU, OP];

export default function XO() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [userSign, setUserSign] = useState("");
  const [pejmanSign, setPejmanSign] = useState("");
  const [squares, setSquares] = useState([
    { id: 0, owner: "", imgSrc: signs[0] },
    { id: 1, owner: "", imgSrc: signs[0] },
    { id: 2, owner: "", imgSrc: signs[0] },
    { id: 3, owner: "", imgSrc: signs[0] },
    { id: 4, owner: "", imgSrc: signs[0] },
    { id: 5, owner: "", imgSrc: signs[0] },
    { id: 6, owner: "", imgSrc: signs[0] },
    { id: 7, owner: "", imgSrc: signs[0] },
    { id: 8, owner: "", imgSrc: signs[0] },
    { id: 9, owner: "", imgSrc: signs[0] },
    { id: 10, owner: "", imgSrc: signs[0] },
    { id: 11, owner: "", imgSrc: signs[0] },
    { id: 12, owner: "", imgSrc: signs[0] },
    { id: 13, owner: "", imgSrc: signs[0] },
    { id: 14, owner: "", imgSrc: signs[0] },
    { id: 15, owner: "", imgSrc: signs[0] },
    { id: 16, owner: "", imgSrc: signs[0] },
    { id: 17, owner: "", imgSrc: signs[0] },
    { id: 18, owner: "", imgSrc: signs[0] },
    { id: 19, owner: "", imgSrc: signs[0] },
    { id: 20, owner: "", imgSrc: signs[0] },
    { id: 21, owner: "", imgSrc: signs[0] },
    { id: 22, owner: "", imgSrc: signs[0] },
    { id: 23, owner: "", imgSrc: signs[0] },
    { id: 24, owner: "", imgSrc: signs[0] },
  ]);
  const [availableSquares, setAvailableSquares] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [isPejmanTurn, setIsPejmanTurn] = useState(false);
  const [userChoices, setUserChoices] = useState([]);
  const [pejmanChoices, setPejmanChoices] = useState([]);
  const [userPoint, setUserPoint] = useState(0);
  const [pejmanPoint, setPejmanPoint] = useState(0);
  const [filledSquaresByUser, setFilledSquaresByUser] = useState([]);
  const [filledSquaresByPejman, setFilledSquaresByPejman] = useState([]);
  const [isWin, setIsWin] = useState("");
  const userX = () => {
    setUserSign(signs[1]);
    setPejmanSign(signs[2]);
  };
  const userO = () => {
    setUserSign(signs[2]);
    setPejmanSign(signs[1]);
  };
  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setIsUserTurn(true);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
    setIsUserTurn(false);
  };
  const handleStart = () => {
    setIsGameStarted(true);
  };
  const handleReset = () => {
    setIsGameStarted(false);
    setEasyMode(false);
    setNormalMode(false);
    setUserSign("");
    setPejmanSign("");
    setSquares([
      { id: 0, owner: "", imgSrc: signs[0] },
      { id: 1, owner: "", imgSrc: signs[0] },
      { id: 2, owner: "", imgSrc: signs[0] },
      { id: 3, owner: "", imgSrc: signs[0] },
      { id: 4, owner: "", imgSrc: signs[0] },
      { id: 5, owner: "", imgSrc: signs[0] },
      { id: 6, owner: "", imgSrc: signs[0] },
      { id: 7, owner: "", imgSrc: signs[0] },
      { id: 8, owner: "", imgSrc: signs[0] },
      { id: 9, owner: "", imgSrc: signs[0] },
      { id: 10, owner: "", imgSrc: signs[0] },
      { id: 11, owner: "", imgSrc: signs[0] },
      { id: 12, owner: "", imgSrc: signs[0] },
      { id: 13, owner: "", imgSrc: signs[0] },
      { id: 14, owner: "", imgSrc: signs[0] },
      { id: 15, owner: "", imgSrc: signs[0] },
      { id: 16, owner: "", imgSrc: signs[0] },
      { id: 17, owner: "", imgSrc: signs[0] },
      { id: 18, owner: "", imgSrc: signs[0] },
      { id: 19, owner: "", imgSrc: signs[0] },
      { id: 20, owner: "", imgSrc: signs[0] },
      { id: 21, owner: "", imgSrc: signs[0] },
      { id: 22, owner: "", imgSrc: signs[0] },
      { id: 23, owner: "", imgSrc: signs[0] },
      { id: 24, owner: "", imgSrc: signs[0] },
    ]);
    setAvailableSquares([]);
    setIsUserTurn(false);
    setIsPejmanTurn(false);
    setUserChoices([]);
    setPejmanChoices([]);
    setUserPoint(0);
    setPejmanPoint(0);
    setFilledSquaresByUser([]);
    setFilledSquaresByPejman([]);
    setIsWin("");
  };
  const allowPejman = () => {
    setIsPejmanTurn(true);
  };
  const announcingTheGameResult = () => {
    handlePlayerPoints(
      setFilledSquaresByUser,
      userChoices,
      userSign,
      setUserPoint
    );
    handlePlayerPoints(
      setFilledSquaresByPejman,
      pejmanChoices,
      pejmanSign,
      setPejmanPoint
    );
    if (userPoint > pejmanPoint) {
      setIsWin(true);
    } else if (pejmanPoint > userPoint) {
      setIsWin(false);
    }
    // else if (pejmanPoint === userPoint) {
    //   setIsWin("Equal");
    // }
    setIsGameStarted(false);
  };
  useEffect(() => {
    setAvailableSquares(squares.filter((s) => s.owner === ""));
  }, [squares]);
  useEffect(() => {
    setUserChoices(squares.filter((s) => s.owner === "User"));
  }, [squares]);
  useEffect(() => {
    if (isPejmanTurn && ((easyMode && userChoices.length > 0) || normalMode)) {
      const newPejmanChoice = getRandArr(
        availableSquares.map((item) => item.id)
      );
      setSquares((currSquares) =>
        currSquares.map((s) =>
          s.id === newPejmanChoice
            ? { ...s, imgSrc: pejmanSign, owner: "Pejman" }
            : s
        )
      );
      setIsUserTurn(true);
    }
    setPejmanChoices(squares.filter((s) => s.owner === "Pejman"));
    setIsPejmanTurn(false);
  }, [isPejmanTurn]);
  const handlePlayerPoints = (
    filledSquareFunction,
    choicesArray,
    sign,
    setPointFunction
  ) => {
    filledSquareFunction([]);
    const choicesIndexes = choicesArray.map((item) => item.id);
    const greenSquares = [];
    for (const i of choicesIndexes) {
      if ([6, 7, 8, 11, 12, 13, 16, 17, 18].includes(i)) {
        if (
          choicesIndexes.includes(i - 6) &&
          choicesIndexes.includes(i) &&
          choicesIndexes.includes(i + 6)
        ) {
          greenSquares.push(i - 6);
          greenSquares.push(i);
          greenSquares.push(i + 6);
          filledSquareFunction((currFilledSquares) => [
            ...currFilledSquares,
            i - 6,
            i,
            i + 6,
          ]);
        }
        if (
          choicesIndexes.includes(i - 4) &&
          choicesIndexes.includes(i) &&
          choicesIndexes.includes(i + 4)
        ) {
          greenSquares.push(i - 4);
          greenSquares.push(i);
          greenSquares.push(i + 4);
          filledSquareFunction((currFilledSquares) => [
            ...currFilledSquares,
            i - 4,
            i,
            i + 4,
          ]);
        }
        if (
          choicesIndexes.includes(i - 1) &&
          choicesIndexes.includes(i) &&
          choicesIndexes.includes(i + 1)
        ) {
          greenSquares.push(i - 1);
          greenSquares.push(i);
          greenSquares.push(i + 1);
          filledSquareFunction((currFilledSquares) => [
            ...currFilledSquares,
            i - 1,
            i,
            i + 1,
          ]);
        }
        if (
          choicesIndexes.includes(i - 5) &&
          choicesIndexes.includes(i) &&
          choicesIndexes.includes(i + 5)
        ) {
          greenSquares.push(i - 5);
          greenSquares.push(i);
          greenSquares.push(i + 5);
          filledSquareFunction((currFilledSquares) => [
            ...currFilledSquares,
            i - 5,
            i,
            i + 5,
          ]);
        }
      } else if ([1, 2, 3].includes(i)) {
        if (
          choicesIndexes.includes(i - 1) &&
          choicesIndexes.includes(i) &&
          choicesIndexes.includes(i + 1)
        ) {
          greenSquares.push(i - 1);
          greenSquares.push(i);
          greenSquares.push(i + 1);
          filledSquareFunction((currFilledSquares) => [
            ...currFilledSquares,
            i - 1,
            i,
            i + 1,
          ]);
        }
      } else if ([21, 22, 23].includes(i)) {
        if (
          choicesIndexes.includes(i - 1) &&
          choicesIndexes.includes(i) &&
          choicesIndexes.includes(i + 1)
        ) {
          greenSquares.push(i - 1);
          greenSquares.push(i);
          greenSquares.push(i + 1);
          filledSquareFunction((currFilledSquares) => [
            ...currFilledSquares,
            i - 1,
            i,
            i + 1,
          ]);
        }
      } else if ([5, 10, 15].includes(i)) {
        if (
          choicesIndexes.includes(i - 5) &&
          choicesIndexes.includes(i) &&
          choicesIndexes.includes(i + 5)
        ) {
          greenSquares.push(i - 5);
          greenSquares.push(i);
          greenSquares.push(i + 5);
          filledSquareFunction((currFilledSquares) => [
            ...currFilledSquares,
            i - 5,
            i,
            i + 5,
          ]);
        }
      } else if ([9, 14, 19].includes(i)) {
        if (
          choicesIndexes.includes(i - 5) &&
          choicesIndexes.includes(i) &&
          choicesIndexes.includes(i + 5)
        ) {
          greenSquares.push(i - 5);
          greenSquares.push(i);
          greenSquares.push(i + 5);
          filledSquareFunction((currFilledSquares) => [
            ...currFilledSquares,
            i - 5,
            i,
            i + 5,
          ]);
        }
      }
    }
    setSquares((currSquares) =>
      currSquares.map((s) =>
        greenSquares.includes(s.id) && isUserTurn && sign === signs[1]
          ? { ...s, imgSrc: signs[3] }
          : greenSquares.includes(s.id) && isUserTurn && sign === signs[2]
          ? { ...s, imgSrc: signs[5] }
          : greenSquares.includes(s.id) && isPejmanTurn && sign === signs[1]
          ? { ...s, imgSrc: signs[4] }
          : greenSquares.includes(s.id) && isPejmanTurn && sign === signs[2]
          ? { ...s, imgSrc: signs[6] }
          : s
      )
    );
    console.log(`${isUserTurn ? "User" : "Pejman"}: ${greenSquares}`);
    setPointFunction(greenSquares.length / 3);
  };
  useEffect(() => {
    if (isUserTurn) {
      handlePlayerPoints(
        setFilledSquaresByUser,
        userChoices,
        userSign,
        setUserPoint
      );
    } else if (isPejmanTurn) {
      handlePlayerPoints(
        setFilledSquaresByPejman,
        pejmanChoices,
        pejmanSign,
        setPejmanPoint
      );
    }
  }, [isUserTurn, isPejmanTurn]);
  return (
    <div>
      {!easyMode && !normalMode && (
        <div>
          <button onClick={handleEasyMode}>Easy</button>
          <button onClick={handleNormalMode}>Normal</button>
        </div>
      )}
      {userSign === "" && (easyMode || normalMode) && (
        <div>
          Choose One:
          <div>
            <button onClick={userX}>X</button>
            <button onClick={userO}>O</button>
          </div>
        </div>
      )}
      {userSign !== "" && !isGameStarted && isWin === "" && (
        <button onClick={handleStart}>Start the Game</button>
      )}
      <div style={{ color: "gray" }}>isUserTurn: {isUserTurn ? "T" : "F"}</div>
      <div style={{ color: "gray" }}>
        isPejmanTurn: {isPejmanTurn ? "T" : "F"}
      </div>
      <div style={{ color: "gray" }}>
        Available Squares:{" "}
        {availableSquares.map((s) => (
          <div style={{ display: "inline" }}>{s.id}-</div>
        ))}
      </div>
      <div style={{ color: "gray" }}>
        User Choices:{" "}
        {userChoices.map((s) => (
          <div style={{ display: "inline" }}>{s.id}-</div>
        ))}
      </div>
      <div style={{ color: "gray" }}>
        Pejman Choices:{" "}
        {pejmanChoices.map((s) => (
          <div style={{ display: "inline" }}>{s.id}-</div>
        ))}
      </div>
      {isWin === "" && isGameStarted && (
        <div
          style={{
            opacity: !isUserTurn || availableSquares.length === 0 ? 0.2 : 1,
          }}
        >
          Your Point: {userPoint}
        </div>
      )}
      {isWin === "" && isGameStarted && (
        <div
          style={{
            opacity: !isUserTurn || availableSquares.length === 0 ? 0.2 : 1,
          }}
        >
          Pejman's Point: {pejmanPoint}
        </div>
      )}
      {isWin === true && (
        <div>
          <h3>{`Your total point: ${userPoint} - Pejman's total point: ${pejmanPoint}`}</h3>
          <h2>You Win!</h2>
          <div>Play Again?</div>
          <button onClick={handleReset}>Ok</button>
        </div>
      )}
      {isWin === false && (
        <div>
          <h3>{`Your total point: ${userPoint} - Pejman's total point: ${pejmanPoint}`}</h3>
          <h2>Pejman Wins!</h2>
          <div>Try Again?</div>
          <button onClick={handleReset}>Ok</button>
        </div>
      )}
      {isGameStarted &&
        new Array(25).fill(null).map((square, idx) =>
          (idx + 1) % 5 !== 0 ? (
            <div style={{ display: "inline", margin: "2px" }}>
              {
                <Square
                  imgSrc={squares[idx].imgSrc}
                  idx={squares[idx].id}
                  signs={signs}
                  userSign={userSign}
                  setSquares={setSquares}
                  isUserTurn={isUserTurn}
                  setIsUserTurn={setIsUserTurn}
                  squares={squares}
                  userChoices={userChoices}
                  pejmanChoices={pejmanChoices}
                  availableSquares={availableSquares}
                  setAvailableSquares={setAvailableSquares}
                  normalMode={normalMode}
                />
              }
            </div>
          ) : (
            <div style={{ display: "inline", margin: "2px" }}>
              {
                <Square
                  imgSrc={squares[idx].imgSrc}
                  idx={squares[idx].id}
                  signs={signs}
                  userSign={userSign}
                  setSquares={setSquares}
                  isUserTurn={isUserTurn}
                  setIsUserTurn={setIsUserTurn}
                  squares={squares}
                  userChoices={userChoices}
                  pejmanChoices={pejmanChoices}
                  availableSquares={availableSquares}
                  setAvailableSquares={setAvailableSquares}
                  normalMode={normalMode}
                />
              }
              <br></br>
            </div>
          )
        )}
      {isGameStarted &&
        !isUserTurn &&
        (availableSquares.length !== 0 ? (
          <div>
            <div>{`Allow Pejman to ${
              normalMode && pejmanChoices.length === 0
                ? "start the game"
                : "make his move"
            }`}</div>
            <button onClick={allowPejman}>Ok</button>
          </div>
        ) : (
          <div>
            <div>The game is finished. Let's see who is the winner.</div>
            <button onClick={announcingTheGameResult}>Ok</button>
          </div>
        ))}
      {isGameStarted && isUserTurn && availableSquares.length === 0 && (
        <div>
          <div>The game is finished. Let's see who is the winner.</div>
          <button onClick={announcingTheGameResult}>Ok</button>
        </div>
      )}
      {userPoint > 0 && (
        <div>
          <div>
            {`You ${isWin === "" ? "have " : "got "}${userPoint} point${
              userPoint > 1 ? "s" : ""
            } for having the following match${userPoint > 1 ? "es" : ""}: `}
          </div>
          {filledSquaresByUser.map(
            (f, i) =>
              i % 3 === 0 && (
                <div
                  style={{
                    display: "inline-block",
                    border: "1px solid black",
                    margin: "5px",
                    color: "lightblue",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "lightblue",
                    }}
                  >
                    <SquareDetails
                      filledSquares={[
                        filledSquaresByUser[i],
                        filledSquaresByUser[i + 1],
                        filledSquaresByUser[i + 2],
                      ]}
                      color="green"
                      style={{ color: "lightblue" }}
                    />
                  </div>
                </div>
              )
          )}
        </div>
      )}
      {pejmanPoint > 0 && (
        <div>
          <div>
            {`Pejman ${isWin === "" ? "has " : "got "}${pejmanPoint} point${
              pejmanPoint > 1 ? "s" : ""
            } for having the following match${pejmanPoint > 1 ? "es" : ""}: `}
          </div>
          {filledSquaresByPejman.map(
            (f, i) =>
              i % 3 === 0 && (
                <div
                  style={{
                    display: "inline-block",
                    border: "1px solid black",
                    margin: "5px",
                    color: "lightblue",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "lightblue",
                    }}
                  >
                    <SquareDetails
                      filledSquares={[
                        filledSquaresByPejman[i],
                        filledSquaresByPejman[i + 1],
                        filledSquaresByPejman[i + 2],
                      ]}
                      color="brown"
                      style={{ color: "lightblue" }}
                    />
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
