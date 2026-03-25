import Cell from "./Cell";
import { bluePicsArray, redPicsArray, board } from "./imagesArray";

export default function Puzzle() {
  return (
    <div>
      <div
        style={{
          position: "relative",
          top: "15px",
          display: "grid",
          gridTemplateColumns: "repeat(5, auto)",
          justifyContent: "center",
        }}
      >
        {board.map((cell) => (
          <Cell image={cell.image} />
        ))}
      </div>
    </div>
  );
}
