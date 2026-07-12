export default function UserGuess({
  userGuess,
  userGuessStatus,
  easyMode,
  normalMode,
}) {
  return (
    <div className="my-3">
      {new Array(easyMode ? 5 : 10).fill(null).map((el, i) => (
        <div key={i}>
          <p style={{ display: "inline" }}>
            {userGuess
              .slice(4 * i, 4 * i + 4)
              .toString()
              .replaceAll(",", "")}
          </p>
          <p style={{ display: "inline" }}>
            {easyMode && userGuessStatus.slice(4 * i, 4 * i + 4)}
            {normalMode &&
              userGuessStatus
                .slice(4 * i, 4 * i + 4)
                .sort()
                .reverse()}
          </p>
        </div>
      ))}
    </div>
  );
}
