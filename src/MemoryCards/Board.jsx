import { useState } from "react";
import Card from "./Card";
import Hide from "./hide.jpg";

export default function Board({ nrows, ncols }) {
  const [board, setBoard] = useState([]);
  // const [visibleCards, setVisibleCards] = useState([]);
  const generateBoard = () => {
    for (let b = 0; b < nrows; b++) {
      let row = [];
      for (let a = 0; a < ncols; a++) {
        row.push([a, b, <Card image={Hide} />]);
      }
      setBoard((currBoard) => [...currBoard, row]);
    }
  };
  return (
    <div>
      {board.map((row) =>
        row.map((card) =>
          card[0] !== ncols - 1 ? (
            <div style={{ display: "inline" }}>{card[2]}</div>
          ) : (
            <div style={{ display: "inline" }}>
              {card[2]}
              <br></br>
            </div>
          )
        )
      )}
      <button onClick={generateBoard}>generate Board</button>
    </div>
  );
}
