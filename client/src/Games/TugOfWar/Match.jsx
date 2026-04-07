export default function Match({
  matchImages,
  matchName,
  userColor,
  isUserTurn,
  isDiceUpdated,
  dice,
  setMatches,
  selectedMatch,
  setSelectedMatch,
}) {
  const chooseMatch = (matchName) => {
    if (selectedMatch !== "") {
      setSelectedMatch("");
      return;
    } else {
      setMatches((currentMatches) =>
        currentMatches.map((match) =>
          match.matchName === matchName
            ? { ...match, isMatchSelected: !match.isMatchSelected }
            : match,
        ),
      );
      setSelectedMatch(matchName);
    }
  };
  return (
    <div>
      {userColor === "Blue" && (
        <input
          type="checkbox"
          value={selectedMatch === matchImages.matchName}
          onChange={() => chooseMatch(matchImages.matchName)}
          disabled={
            !isUserTurn ||
            !isDiceUpdated ||
            dice < 1 ||
            (selectedMatch !== "" && selectedMatch !== matchImages.matchName)
          }
        />
      )}
      {matchImages.matchValue.map((m, idx) => (
        <img
          src={matchImages.matchValue[idx]}
          height="80px"
          style={{
            position: "relative",
            top: "15px",
          }}
        />
      ))}
      {userColor === "Red" && (
        <input
          type="checkbox"
          value={selectedMatch === matchImages.matchName}
          onChange={() => chooseMatch(matchImages.matchName)}
          disabled={
            !isUserTurn ||
            !isDiceUpdated ||
            dice < 1 ||
            (selectedMatch !== "" && selectedMatch !== matchImages.matchName)
          }
        />
      )}
      {selectedMatch === matchName && isUserTurn && (
        <div
          style={{
            color: "gray",
            fontSize: "12px",
            position: "relative",
            top: "10px",
          }}
        >
          You can change the chosen match, but you should de-select it first
        </div>
      )}
    </div>
  );
}
