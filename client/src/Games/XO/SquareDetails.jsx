export default function ({ filledSquares, color }) {
  return (
    <div style={{ display: "center", backgroundColor: "black" }}>
      <div style={{ margin: "2px" }}>
        <div>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} style={{ height: "23px" }}>
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  id={`cell-${rowIndex}-${colIndex}`}
                  style={{
                    height: "20px",
                    display: "inline",
                    margin: "1px",
                    // marginLeft: "1px",
                    // marginRight: "1px",
                    // marginTop: "1px",
                    // marginBottom: "1px",
                    border: "1px solid black",
                    fontSize: "15px",
                    backgroundColor: filledSquares.includes(
                      rowIndex * 5 + colIndex,
                    )
                      ? color
                      : "yellow",
                    color: filledSquares.includes(rowIndex * 5 + colIndex)
                      ? color
                      : "yellow",
                  }}
                >
                  --
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
