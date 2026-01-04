import { useState, useEffect } from "react";
import Square from "./Square";
import S from "./Images/S.jpg";
import X from "./Images/X.jpg";
import O from "./Images/O.jpg";
import { getRandArr } from "../utils";
const signs = [S, X, O];

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
  }
  useEffect(() => {
    setAvailableSquares(squares.filter((s) =>
          s.owner === ""))
  }, [squares]);
  useEffect(() => {
    setUserChoices(squares.filter((s) => s.owner === "User"));
  }, [squares]);
  useEffect(() => {
    if (isPejmanTurn && userChoices.length > 0) {
      const newPejmanChoice = getRandArr(availableSquares.map(item => item.id));
      console.log("newPejmanChoice: ", newPejmanChoice);
      setSquares((currSquares) =>
        currSquares.map((s) =>
          s.id === newPejmanChoice ? { ...s, imgSrc: pejmanSign, owner: "Pejman" } : s
        )
      );
      setIsUserTurn(true);
    }
    setPejmanChoices(squares.filter((s) => s.owner === "Pejman"));
    setIsPejmanTurn(false);
  }, [isPejmanTurn]);
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
      {isGameStarted &&
        new Array(25).fill(null).map((square, idx) =>
          (idx + 1) % 5 !== 0 ? (
            <div style={{ display: "inline", margin: "2px" }}>
              {
                <Square
                  imgSrc={squares[idx].imgSrc}
                  idx={squares[idx].id}
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
        {isGameStarted && !isUserTurn &&
            <div>
            <div>Allow Pejman to make a move</div>
            <button onClick={allowPejman}>Ok</button>
        </div>
        }
    </div>
  );
}
