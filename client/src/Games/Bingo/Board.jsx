import Cell from "./Cell";

export default function Board({ nums, color, selectedNums }) {
  return (
    <div>
      {
        <div
          style={{
            position: "relative",
            top: "5px",
            display: "grid",
            gridTemplateColumns: "repeat(5, auto)",
            justifyContent: "center",
          }}
        >
          {new Array(25).fill(null).map((cell, idx) => (
            <Cell value={nums[idx]} color={color} selectedNums={selectedNums} />
          ))}
        </div>
      }
    </div>
  );
}
