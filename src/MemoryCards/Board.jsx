import { useState } from "react";
import Card from "./Card";
import Emoji1 from "./emoji1.jpg";
import Hide from "./hide.jpg";

export default function Board({ nrows, ncols }) {
  const [board, setBoard] = useState([]);
  const [visibleCards, setVisibleCards] = useState([
    // [4, 4],
    // [5, 6],
  ]);
  const generateBoard = () => {
    for (let b = 0; b < nrows; b++) {
      let row = [];
      for (let a = 0; a < ncols; a++) {
        row.push([a, b]);
        console.log(row);
      }
      setBoard((currBoard) => [...currBoard, row]);
    }
  };
  return (
    <div>
      {board.map((row) =>
        row.map((card) =>
          visibleCards.some(
            (pair) => pair[0] === card[0] && pair[1] === card[1]
          ) ? (
            card[0] !== ncols - 1 ? (
              <div style={{ display: "inline" }}>
                {
                  <Card
                    setVisibleCards={setVisibleCards}
                    x={card[0]}
                    y={card[1]}
                    image={Emoji1}
                  />
                }
              </div>
            ) : (
              <div style={{ display: "inline" }}>
                {
                  <Card
                    setVisibleCards={setVisibleCards}
                    x={card[0]}
                    y={card[1]}
                    image={Emoji1}
                  />
                }
                <br></br>
              </div>
            )
          ) : card[0] !== ncols - 1 ? (
            <div style={{ display: "inline" }}>
              {
                <Card
                  setVisibleCards={setVisibleCards}
                  x={card[0]}
                  y={card[1]}
                  image={Hide}
                />
              }
            </div>
          ) : (
            <div style={{ display: "inline" }}>
              {
                <Card
                  setVisibleCards={setVisibleCards}
                  x={card[0]}
                  y={card[1]}
                  image={Hide}
                />
              }
              <br></br>
            </div>
          )
        )
      )}
      <button onClick={generateBoard}>generate Board</button>
    </div>
  );
}
