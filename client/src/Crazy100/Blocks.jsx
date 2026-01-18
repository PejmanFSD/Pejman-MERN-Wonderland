const table = Array.from({ length: 16 }, (_, i) => i);
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
      {table.map((t) =>
        blockNums.includes(t) ? (
          <button
            style={{
              border: "1px solid black",
              padding: "5px",
              width: "30px",
              display: "inline",
              position: "relative",
              top: "20px",
              background: chosenExtraNums[t]?.clicked && "gray",
            }}
            onClick={handleClickChosenExtraNum}
            disabled={isWin !== "" || seconds < 1}
          >
            {chosenExtraNums[t]?.number}
          </button>
        ) : (
          <button
            style={{
              border: "1px solid black",
              padding: "5px",
              width: "30px",
              display: "inline",
              position: "relative",
              top: "20px",
              background:
                nums.find((obj) => obj.blockNum === t)?.clicked &&
                (isWin === "" || isWin === true)
                  ? "gray"
                  : isWin === false && "lightblue",
              color: "red",
            }}
            onClick={handleClickNum}
            disabled={isWin !== "" || seconds < 1}
          >
            {nums.find((obj) => obj.blockNum === t)?.number}
          </button>
        )
      )}
    </div>
  );
}
