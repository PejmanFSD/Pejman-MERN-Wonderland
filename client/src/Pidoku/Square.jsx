import { useState } from "react";

export default function Square({
  userNums,
  setUserNums,
  userColor,
  pejmanColor,
  isUserTurn,
  setIsUserTurn,
  idx,
  freeSquares,
  setFreeSquares,
  squares,
  setSquares,
}) {
  const handleClick = () => {
    setSquares((currSquares) =>
      currSquares.map((s) =>
        s.id === idx + 1 ? { ...s, text: userNums[0], owner: "User" } : s,
      ),
    );
    setUserNums(userNums.filter((el) => userNums.indexOf(el) !== 0));
    setFreeSquares(freeSquares.filter((el) => el !== idx + 1));

    setIsUserTurn(false);
  };
  return (
    <button
      style={{
        border: "2px solid black",
        height: "50px",
        width: "50px",
        margin: "2px",
        background:
          squares.find((s) => s.id === idx + 1).text === 0
            ? "lightgray"
            : squares.find((s) => s.id === idx + 1).owner === "User"
              ? `rgba(${userColor.red}, ${userColor.green}, ${userColor.blue})`
              : `rgba(${pejmanColor.red}, ${pejmanColor.green}, ${pejmanColor.blue})`,
        color:
          squares.find((s) => s.id === idx + 1).text === 0
            ? "lightgray"
            : (squares.find((s) => s.id === idx + 1).owner === "User" &&
                  (userColor.red === 240 || userColor.blue === 240)) ||
                (squares.find((s) => s.id === idx + 1).owner === "Pejman" &&
                  (userColor.red === 240 || userColor.blue === 240))
              ? "white"
              : "black",
      }}
      disabled={squares.find((s) => s.id === idx + 1).text !== 0 || !isUserTurn}
      onClick={handleClick}
    >
      {squares.find((s) => s.id === idx + 1).text}
    </button>
  );
}
