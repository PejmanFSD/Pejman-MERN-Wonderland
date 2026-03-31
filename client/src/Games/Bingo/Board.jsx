import Cell from "./Cell";

export default function Board({ nums }) {
  return (
    <div>
      UserTens1:
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
            <Cell value={nums[idx]} />
          ))}
        </div>
      }
    </div>
  );
}
