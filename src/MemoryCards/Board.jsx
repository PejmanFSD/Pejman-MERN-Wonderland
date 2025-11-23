import { useState } from "react";
import Card from "./Card";
import Emoji1 from "./emoji1.jpg";

export default function Board({ nrows, ncols }) {
  const [board, setBoard] = useState([]);
  const generateBoard = () => {
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(<Card image={Emoji1} />);
      }
      setBoard((currBoard) => [...currBoard, row]);
    }
  };
  return (
    <div>
      {board.map((el) => (
        <div>{el}</div>
      ))}
      <button onClick={generateBoard}>generate Board</button>
    </div>
  );
}
