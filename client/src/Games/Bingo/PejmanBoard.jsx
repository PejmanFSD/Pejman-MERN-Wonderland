import PejmanCell from "./PejmanCell";

export default function PejmanBoard({ nums, selectedNums }) {
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
                isSelected={nums[idx].isSelected}
            />
          ))}
        </div>
      }
    </div>
  );
}
