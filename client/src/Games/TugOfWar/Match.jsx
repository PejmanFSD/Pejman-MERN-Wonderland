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
  finalMessage,
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
    } else if (theMatch.isMatchSelected) {
      setMatches((currentMatches) =>
        currentMatches.map((match) =>
          match.matchName === matchName
            ? { ...match, isMatchSelected: !match.isMatchSelected }
            : match,
        ),
      );
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
    <div className="my-1">
      {userColor === "Blue" &&
        isUserTurn &&
        dice > 0 &&
        finalMessage === "" && (
          <input
            className="product-tugOfWar-checkBox"
            // style={{ marginRight: "10px" }}
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
          className="product-tugOfWar-image"
          src={theMatch.matchValue[idx]}
          style={{
            position: "relative",
            top: "15px",
            opacity: finalMessage === "" ? 1 : 0.6,
          }}
          alt=""
          key={idx}
        />
      ))}
      {userColor === "Red" && isUserTurn && dice > 0 && finalMessage === "" && (
        <input
          className="product-tugOfWar-checkBox"
          // style={{ marginLeft: "10px" }}
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
      {selectedMatch === matchName &&
        isUserTurn &&
        availableMatches.length > 1 && (
          <div className="container">
            <div className="row">
              <div
                className="col-10 offset-1 d-flex justify-content-center my-2"
                style={{
                  fontSize: "12px",
                  position: "relative",
                  top: "10px",
                }}
              >
                You can change the chosen match, but first you should de-select
                the one you chose.
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
