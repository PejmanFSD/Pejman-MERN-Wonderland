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
          {/* Rendering 25 cells (5 x 5) of <PejmanCell /> components */}
          {new Array(25).fill(null).map((cell, idx) => (
            // idxth cell
            <PejmanCell
                value={nums[idx].num} // The value of the idxth element of the "nums" array
                owner={nums[idx].owner} // The owner of the cell (Pejman)
                isWinnerCell={nums[idx].isWinnerCell} // The winning status of the cell
                isSelected={nums[idx].isSelected} // The selection(clicked) status of the cell
                finalMessage={finalMessage}
                key={idx}
            />
          ))}
        </div>
      }
    </div>
  );
}
