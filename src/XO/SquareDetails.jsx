export default function ({ filledSquares }) {
  return (
    <div style={{ display: "center", backgroundColor: "lightblue" }}>
      <table style={{ margin: "5px" }}>
        <tbody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  id={`cell-${rowIndex}-${colIndex}`}
                  style={{
                    display: "inline",
                    margin: "1px",
                    border: "1px solid black",
                    fontSize: "15px",
                    backgroundColor: filledSquares.includes(
                      rowIndex * 5 + colIndex
                    )
                      ? "green"
                      : "yellow",
                    color: filledSquares.includes(rowIndex * 5 + colIndex)
                      ? "green"
                      : "yellow",
                  }}
                >
                  ---
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
