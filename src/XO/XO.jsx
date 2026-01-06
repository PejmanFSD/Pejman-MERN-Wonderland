import { useState, useEffect } from "react";
import Square from "./Square";
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
  const allowPejman = () => {
    setIsPejmanTurn(true);
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
      console.log("newPejmanChoice: ", newPejmanChoice);
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
  useEffect(() => {
    if (isUserTurn) {
    const userChoicesIndexes = userChoices.map((item) => item.id);
    // console.log("userChoicesIndexes: ", userChoicesIndexes);
    const userGreenSquares = [];
    for (const i of userChoicesIndexes) {
        if (6 <= i <= 18) {
            if (
                userChoicesIndexes.includes(i-6) && userChoicesIndexes.includes(i) && userChoicesIndexes.includes(i+6)
                ) {
                    userGreenSquares.push(i-6);
                    userGreenSquares.push(i);
                    userGreenSquares.push(i+6);
                    console.log('userGreenSquares: ', userGreenSquares);
                }
            if (
                userChoicesIndexes.includes(i-4) && userChoicesIndexes.includes(i) && userChoicesIndexes.includes(i+4)
                ) {
                    userGreenSquares.push(i-4);
                    userGreenSquares.push(i);
                    userGreenSquares.push(i+4);
                    console.log('userGreenSquares: ', userGreenSquares);
                }
            if (
                userChoicesIndexes.includes(i-1) && userChoicesIndexes.includes(i) && userChoicesIndexes.includes(i+1)
                ) {
                    userGreenSquares.push(i-1);
                    userGreenSquares.push(i);
                    userGreenSquares.push(i+1);
                    console.log('userGreenSquares: ', userGreenSquares);
                }
            if (
                userChoicesIndexes.includes(i-5) && userChoicesIndexes.includes(i) && userChoicesIndexes.includes(i+5)
                ) {
                    userGreenSquares.push(i-5);
                    userGreenSquares.push(i);
                    userGreenSquares.push(i+5);
                    console.log('userGreenSquares: ', userGreenSquares);
                }
        }
        // else if (1 <= i <= 3) {

        // }
        // else if (21 <= i <= 23) {

        // }
        // else if (i === 5 || i === 10 || i === 15) {

        // }
        // else if (i === 9 || i === 14 || i === 19) {

        // }
        // else if (i === 0) {

        // }
        // else if (i === 4) {

        // }
        // else if (i === 20) {

        // }
        // else if (i === 24) {

        // }
    }
        
            setSquares((currSquares) =>
                currSquares.map((s) =>
                    userGreenSquares.includes(s.id) && userSign === signs[1]
            ? { ...s, imgSrc: XU }
            : userGreenSquares.includes(s.id) && userSign === signs[2]
            ? { ...s, imgSrc: OU }
            : s
        )
    );
    setUserPoint(userGreenSquares.length / 3);
    }
  }, [isUserTurn]);
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
      {userSign !== "" && !isGameStarted && (
        <button onClick={handleStart}>Start the Game</button>
      )}
      <div style={{ color: "gray" }}>User's Sign: {userSign}</div>
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
      <div>Your Point: {userPoint}</div>
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
                  setAvailableSquares={setAvailableSquares}
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
                  setAvailableSquares={setAvailableSquares}
                />
              }
              <br></br>
            </div>
          )
        )}
      {isGameStarted && !isUserTurn && (
        <div>
          <div>{`Allow Pejman to ${
            normalMode && pejmanChoices.length === 0
              ? "start the game"
              : "make his move"
          }`}</div>
          <button onClick={allowPejman}>Ok</button>
        </div>
      )}
    </div>
  );
}
