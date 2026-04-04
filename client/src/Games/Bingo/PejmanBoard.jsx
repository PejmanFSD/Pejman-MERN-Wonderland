import PejmanCell from "./PejmanCell";

export default function PejmanBoard({ nums, selectedNums, finalMessage }) {
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
            <PejmanCell
                value={nums[idx].num}
                owner={nums[idx].owner}
                isWinnerCell={nums[idx].isWinnerCell}
                isSelected={nums[idx].isSelected}
                finalMessage={finalMessage}
            />
          ))}
        </div>
      }
    </div>
  );
}
