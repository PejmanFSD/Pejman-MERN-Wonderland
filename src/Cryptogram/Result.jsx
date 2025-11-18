export default function Result({
  adviceArray,
  inputs,
  resultObj,
  resultMessageStatus,
  isWin,
  isTogglingReset,
  isTogglingHomePage,
  acceptedAsRepetition,
}) {
  return (
    <div>
      {!isTogglingReset && !isTogglingHomePage && isWin === true && (
        <h1>You Win</h1>
      )}
      {!isTogglingReset && !isTogglingHomePage && isWin === false && (
        <h1>You Loose</h1>
      )}

      {!isTogglingReset &&
        !isTogglingHomePage &&
        resultMessageStatus.map((r, idx) =>
          r === true ? (
            <p>{`For code ${idx + 1}, you chose ${
              Object.values(inputs)[idx]
            } ✅`}</p>
          ) : (
            <div>
              <p>{`For code ${idx + 1}, you chose ${
                Object.values(inputs)[idx]
              } ❌. The correct answer is: ${Object.keys(resultObj)[idx]}.`}</p>
              {acceptedAsRepetition.includes(Object.values(inputs)[idx]) && (
                <p>{`(You had been informed that "${
                  Object.values(inputs)[idx]
                }" is a visible letter!)`}</p>
              )}
            </div>
          )
        )}

      {!isTogglingReset && !isTogglingHomePage && isWin !== "" && (
        <div>
          {adviceArray.map((a) => (
            <h2 style={{ display: "inline" }}>{a}</h2>
          ))}
        </div>
      )}
    </div>
  );
}
