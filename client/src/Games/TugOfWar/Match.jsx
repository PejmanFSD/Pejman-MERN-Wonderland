export default function Match({
  theMatch,
  matchName,
  userColor,
  isUserTurn,
  isDiceUpdated,
  dice,
  setMatches,
  selectedMatch,
  setSelectedMatch,
  finishedMatches,
  availableMatches,
  finalMessage
}) {
  const chooseMatch = (matchName) => {
    if (selectedMatch !== "") {
      setSelectedMatch("");
      setMatches((currentMatches) =>
        currentMatches.map((match) =>
          match.matchName === matchName
            ? { ...match, isMatchSelected: !match.isMatchSelected }
            : match,
        ),
      );
      return;
    }
    else if (theMatch.isMatchSelected) {
        setMatches((currentMatches) =>
        currentMatches.map((match) =>
          match.matchName === matchName
            ? { ...match, isMatchSelected: !match.isMatchSelected }
            : match,
        ),
      );
      return;
    }
    else {
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
      {userColor === "Blue" && isUserTurn && dice > 0 && finalMessage === "" && (
        <input
          type="checkbox"
          checked={theMatch.isMatchSelected}
          onChange={() => chooseMatch(theMatch.matchName)}
          disabled={
            !isDiceUpdated ||
            (selectedMatch !== "" && selectedMatch !== theMatch.matchName) ||
            finishedMatches.includes(theMatch.matchName)
          }
        />
      )}
      {theMatch.matchValue.map((m, idx) => (
        <img
          src={theMatch.matchValue[idx]}
          height="80px"
          style={{
            position: "relative",
            top: "15px",
            opacity: finalMessage === "" ? 1 : 0.6
          }}
        />
      ))}
      {userColor === "Red" && isUserTurn && dice > 0 && finalMessage === "" && (
        <input
          type="checkbox"
          checked={theMatch.isMatchSelected}
          onChange={() => chooseMatch(theMatch.matchName)}
          disabled={
            !isDiceUpdated ||
            (selectedMatch !== "" && selectedMatch !== theMatch.matchName) ||
            finishedMatches.includes(theMatch.matchName)
          }
        />
      )}
      {selectedMatch === matchName && isUserTurn && availableMatches.length > 1 && (
        <div
          style={{
            color: "gray",
            fontSize: "12px",
            position: "relative",
            top: "10px",
          }}
        >
          You can change the chosen match, but first you should de-select the one you chose.
        </div>
      )}
    </div>
  );
}
