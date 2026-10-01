const table = Array.from({ length: 16 }, (_, i) => i); // Creating an array from 0 to 15
export default function Blocks({
  nums,
  chosenExtraNums,
  blockNums,
  isWin,
  seconds,
  handleClickNum,
  handleClickChosenExtraNum,
}) {
  return (
    <div>
      {/* Rendering the 16 blocks */}
      {table.map((t, i) => // Looping thorugh the "table" array
        blockNums.includes(t) ? ( // If the current element of the "table" array is one of the "blockNums"
          // Render the following <button />
          <button
            style={{
              border: "1px solid black",
              borderRadius: "12px",
              padding: "5px",
              width: "40px",
              display: "inline",
              position: "relative",
              top: "20px",
              background: chosenExtraNums[t]?.clicked && "gray", // If it's been clicked, then the background color should be gray
              margin: "5px",
            }}
            onClick={handleClickChosenExtraNum}
            disabled={isWin !== "" || seconds < 1} // The button is disabled if either the game is not over or the time isn't up
            key={i}
          >
            {/* The text of the button is the value of the "number" key of the current element of chosenExtraNums */}
            {chosenExtraNums[t]?.number}
          </button>
        ) : ( // Otherwise (If the current element of the "table" array is not one of the "blockNums")
          <button
            style={{
              border: "1px solid black",
              borderRadius: "12px",
              padding: "5px",
              width: "40px",
              display: "inline",
              position: "relative",
              top: "20px",
              background: // The background color of this button:
              // Fetching the current block:
                nums.find((obj) => obj.blockNum === t)?.clicked && // If the current block is clicked AND
                (isWin === "" || isWin === true) // Either the user has won the game or the game isn't over yet
                  ? "gray" // In this case, the background color of this button is gray
                  : (isWin === false || seconds < 1) && "var(--primary)", // Otherwise, if the user has lost the game or
                  // the time is up, it should be the primary color of the theme
              // color: "red",
              margin: "5px",
            }}
            onClick={handleClickNum}
            disabled={isWin !== "" || seconds < 1} // The button is disabled if either the game is not over or the time isn't up
            key={i}
          >
            {/* The text of the button is the value of the "number" key of the current block */}
            {nums.find((obj) => obj.blockNum === t)?.number}
          </button>
        ),
      )}
    </div>
  );
}
