import { useState, useEffect } from "react";
import Square from "./Square";
import SquareDetails from "./SquareDetails";
import ConfirmationBox from "../ConfirmationBox";
import ModeExplaination from "../ModeExplaination";
import S from "./Images/S.jpg";
import X from "./Images/X.jpg";
import XU from "./Images/XU.jpg";
import XP from "./Images/XP.jpg";
import O from "./Images/O.jpg";
import OU from "./Images/OU.jpg";
import OP from "./Images/OP.jpg";
import { getRandArr } from "../utils";
const signs = [S, X, O, XU, XP, OU, OP];

export default function XO({ setShowGameTitles, setShowXO, updateTotalPoint }) {
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
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [redArray, setRedArray] = useState([]);
  const [greenArray, setGreenArray] = useState([]);

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
  const handleFinalPlayerPoints = () => {
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
    announcingTheGameResult();
  };
  const announcingTheGameResult = () => {
      if (userPoint > pejmanPoint) {
      setIsWin(true);
      if (normalMode) {
        updateTotalPoint(1);
      }
    } else {
      setIsWin(false);
    }
    setIsGameStarted(false);
  }
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
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
    setUserChoices([]);
    setPejmanChoices([]);
    setUserPoint(0);
    setPejmanPoint(0);
    setFilledSquaresByUser([]);
    setFilledSquaresByPejman([]);
    setIsWin("");
    if (easyMode) {
      setIsUserTurn(true);
      setIsPejmanTurn(false);
    } else if (normalMode) {
      setIsPejmanTurn(true);
      setIsUserTurn(false);
    }
    setIsTogglingReset(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setIsGameStarted(false);
    setShowXO(false);
    setShowGameTitles(true);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
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
    setPointFunction(greenSquares.length / 3);
  };
  useEffect(() => {
    setAvailableSquares(squares.filter((s) => s.owner === ""));
  }, [squares]);
  useEffect(() => {
    setUserChoices(squares.filter((s) => s.owner === "User"));
  }, [squares]);
  useEffect(() => {
    let newPejmanChoice;
    if (isPejmanTurn && easyMode && userChoices.length > 0) {
      newPejmanChoice = getRandArr(availableSquares.map((item) => item.id));
    } else if (normalMode && pejmanChoices.length === 0) {
      newPejmanChoice = 12;
    } else if (isPejmanTurn && normalMode && pejmanChoices.length !== 0) {
      newPejmanChoice = getRandArr(availableSquares.map((item) => item.id)); // Will be removed at the End!!!!!!!!!!!!!
      setRedArray([]);
      setGreenArray([]);
      const handleCrucialArray = (playerIndexes, idx1, idx2, idx3, rivalIndexes, setArray) => {
        if (playerIndexes.includes(idx1) && playerIndexes.includes(idx2) && !playerIndexes.includes(idx3) && !rivalIndexes.includes(idx3)) {
            setArray(currRedArray => [...currRedArray, idx3 ]);
          }
      }
      const userIndexes = userChoices.map((item) => item.id);
      const pejmanIndexes = pejmanChoices.map((item) => item.id);
      const allIndexes = squares.map((item) => item.id);
      // Creating the red array:
      for (const i of allIndexes) {
        if ([6, 7, 8, 11, 12, 13, 16, 17, 18].includes(i)) {
          handleCrucialArray(userIndexes, i-6, i, i+6, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i-6, i+6, i, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i, i+6, i-6, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i-4, i, i+4, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i-4, i+4, i, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i, i+4, i-4, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i-5, i, i+5, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i-5, i+5, i, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i, i+5, i-5, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i-1, i, i+1, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i-1, i+1, i, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i, i+1, i-1, pejmanIndexes, setRedArray);
        }
        else if ([1, 2, 3, 21, 22, 23].includes(i)) {
          handleCrucialArray(userIndexes, i-1, i, i+1, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i-1, i+1, i, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i, i+1, i-1, pejmanIndexes, setRedArray);
        }
        else if ([5, 9, 10, 14, 15, 19].includes(i)) {
          handleCrucialArray(userIndexes, i-5, i, i+5, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i+5, i-5, i, pejmanIndexes, setRedArray);
          handleCrucialArray(userIndexes, i, i+5, i-5, pejmanIndexes, setRedArray);
        }
      }
      // Creating the green array:
      for (const i of allIndexes) {
        if ([6, 7, 8, 11, 12, 13, 16, 17, 18].includes(i)) {
          handleCrucialArray(pejmanIndexes, i-6, i, i+6, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i-6, i+6, i, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i, i+6, i-6, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i-4, i, i+4, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i-4, i+4, i, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i, i+4, i-4, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i-5, i, i+5, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i-5, i+5, i, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i, i+5, i-5, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i-1, i, i+1, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i-1, i+1, i, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i, i+1, i-1, userIndexes, setGreenArray);
        }
        else if ([1, 2, 3, 21, 22, 23].includes(i)) {
          handleCrucialArray(pejmanIndexes, i-1, i, i+1, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i-1, i+1, i, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i, i+1, i-1, userIndexes, setGreenArray);
        }
        else if ([5, 9, 10, 14, 15, 19].includes(i)) {
          handleCrucialArray(pejmanIndexes, i-5, i, i+5, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i+5, i-5, i, userIndexes, setGreenArray);
          handleCrucialArray(pejmanIndexes, i, i+5, i-5, userIndexes, setGreenArray);
        }
      }
      // Considering the 4-5 conditions:

    }
    setSquares((currSquares) =>
      currSquares.map((s) =>
        s.id === newPejmanChoice
          ? { ...s, imgSrc: pejmanSign, owner: "Pejman" }
          : s
      )
    );
    setIsUserTurn(true);
    setPejmanChoices(squares.filter((s) => s.owner === "Pejman"));
    setIsPejmanTurn(false);
  }, [isPejmanTurn]);
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
      <h2>X-O</h2>
      {!easyMode && !normalMode && !isTogglingHomePage && (
        <div>
          <button onClick={handleEasyMode}>Easy</button>
          <button onClick={handleNormalMode}>Normal</button>
        </div>
      )}
      {userSign === "" && (easyMode || normalMode) && !isTogglingHomePage && (
        <div>
          Choose One:
          <div>
            <button onClick={userX}>X</button>
            <button onClick={userO}>O</button>
          </div>
        </div>
      )}
      {easyMode && isWin === "" && !isTogglingReset && !isTogglingHomePage && (
        <ModeExplaination message="Easy Mode: In his turn, Pejman chooses a square randomly. You won't get any stars if you win." />
      )}
      {normalMode &&
        isWin === "" &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <ModeExplaination message="Normal Mode: In his turn, Pejman chooses a square with a strategy. You'll get 1 star if you win." />
        )}
      {userSign !== "" &&
        !isGameStarted &&
        isWin === "" &&
        !isTogglingHomePage && (
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
      <div style={{ color: "gray" }}>
        Red Array:{" "}
        {redArray.map((s) => (
          <div style={{ display: "inline" }}>{s}-</div>
        ))}
      </div>
      <div style={{ color: "gray" }}>
        Green Array:{" "}
        {greenArray.map((s) => (
          <div style={{ display: "inline" }}>{s}-</div>
        ))}
      </div>
      {isWin === "" &&
        isGameStarted &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div
            style={{
              opacity: !isUserTurn || availableSquares.length === 0 ? 0.2 : 1,
            }}
          >
            Your Point: {userPoint}
          </div>
        )}
      {isWin === "" &&
        isGameStarted &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div
            style={{
              opacity: !isUserTurn || availableSquares.length === 0 ? 0.2 : 1,
            }}
          >
            Pejman's Point: {pejmanPoint}
          </div>
        )}
      {isWin === true && !isTogglingHomePage && (
        <div>
          <h3>{`Your total point: ${userPoint} - Pejman's total point: ${pejmanPoint}`}</h3>
          <h2>You Win!</h2>
          <div>Play Again?</div>
          <button onClick={handleReset}>Ok</button>
        </div>
      )}
      {isWin === false && !isTogglingHomePage && (
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
                  isTogglingReset={isTogglingReset}
                  isTogglingHomePage={isTogglingHomePage}
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
                  isTogglingReset={isTogglingReset}
                  isTogglingHomePage={isTogglingHomePage}
                />
              }
              <br></br>
            </div>
          )
        )}
      {isGameStarted &&
        !isUserTurn &&
        !isTogglingReset &&
        !isTogglingHomePage &&
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
            <button onClick={handleFinalPlayerPoints}>Ok</button>
          </div>
        ))}
      {isGameStarted &&
        isUserTurn &&
        availableSquares.length === 0 &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <div>The game is finished. Let's see who is the winner.</div>
            <button onClick={handleFinalPlayerPoints}>Ok</button>
          </div>
        )}
      {isGameStarted &&
        isWin === "" &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        (easyMode || normalMode) &&
        userSign !== "" && (
          <div>
            <button onClick={toggleReset}>Reset the Game</button>
          </div>
        )}
      {isTogglingReset && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to reset the game?"
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        </div>
      )}
      {!isTogglingHomePage && !isTogglingReset && (
        <div>
          <button onClick={() => toggleHomePage()}>
            Back to the home page
          </button>
        </div>
      )}
      {isTogglingHomePage && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to go back to Home Page?"
            toggleYes={toggleHomePageYes}
            toggleCancel={toggleHomePageCancel}
          />
        </div>
      )}
      {userPoint > 0 && !isTogglingReset && !isTogglingHomePage && (
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
      {pejmanPoint > 0 && !isTogglingReset && !isTogglingHomePage && (
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
