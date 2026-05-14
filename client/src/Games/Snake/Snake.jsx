export default function Snake({ updateTotalPoint, currentUser }) {
  const cells = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      cells.push(
        <div
          key={`${x}-${y}`}
          style={{ width: "20px", height: "20px", background: "#1e1e1e" }}
        />,
      );
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h2>Snake</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 20px)",
          gridTemplateRows: "repeat(20, 20px)",
          gap: "1px",
          background: "#333",
          padding: "5px",
        }}
      >
        {cells}
      </div>
      {/* {isGameStarted && !isTogglingReset && !isTogglingHomePage && <ReviewSection game="Snake" currentUser={currentUser} />} */}
    </div>
  );
}