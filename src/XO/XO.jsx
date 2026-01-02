import { useState } from "react";
import Square from "./Square";
import S from "./Images/S.jpg";
import X from "./Images/X.jpg";
import O from "./Images/O.jpg";

export default function XO() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userSign, setUserSign] = useState("");
  const [squares, setSquares] = useState([
    { id: 0, owner: "" },
    { id: 1, owner: "" },
    { id: 2, owner: "" },
    { id: 3, owner: "" },
    { id: 4, owner: "" },
    { id: 5, owner: "" },
    { id: 6, owner: "" },
    { id: 7, owner: "" },
    { id: 8, owner: "" },
    { id: 9, owner: "" },
    { id: 10, owner: "" },
    { id: 11, owner: "" },
    { id: 12, owner: "" },
    { id: 13, owner: "" },
    { id: 14, owner: "" },
    { id: 15, owner: "" },
  ]);
  const userX = () => {
    setUserSign("X");
    setIsGameStarted(true);
  };
  const userO = () => {
    setUserSign("O");
    setIsGameStarted(true);
  };
  return (
    <div>
      {!isGameStarted && (
        <div>
          Choose One:
          <div>
            <button onClick={userX}>X</button>
            <button onClick={userO}>O</button>
          </div>
        </div>
      )}
      <div style={{ color: "gray" }}>User's Sign: {userSign}</div>
      {isGameStarted &&
        new Array(16).fill(null).map((square, idx) =>
          (idx + 1) % 4 !== 0 ? (
            <div style={{ display: "inline", margin: "2px" }}>
              {<Square imgSrc={S} idx={squares[idx].id} />}
            </div>
          ) : (
            <div style={{ display: "inline", margin: "2px" }}>
              {<Square imgSrc={S} idx={squares[idx].id} />}
              <br></br>
            </div>
          )
        )}
    </div>
  );
}
