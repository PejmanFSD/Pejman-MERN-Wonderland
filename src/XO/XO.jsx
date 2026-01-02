import { useState } from "react";
import Square from "./Square";
import S from "./Images/S.jpg";
import X from "./Images/X.jpg";
import O from "./Images/O.jpg";
const signs = [S, X, O];

export default function XO() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userSign, setUserSign] = useState("");
//   const [imgSrc, setImgSrc] = useState(signs[0]);
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
              {<Square imgSrc={squares[idx].imgSrc} idx={squares[idx].id} signs={signs} userSign={userSign} setSquares={setSquares} />}
            </div>
          ) : (
            <div style={{ display: "inline", margin: "2px" }}>
              {<Square imgSrc={squares[idx].imgSrc} idx={squares[idx].id} signs={signs} userSign={userSign} setSquares={setSquares} />}
              <br></br>
            </div>
          )
        )}
    </div>
  );
}
