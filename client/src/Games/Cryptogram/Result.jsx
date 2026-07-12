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
        <h1 className="fasterOne" style={{ fontSize: "40px" }}>
          You Win
        </h1>
      )}
      {!isTogglingReset && !isTogglingHomePage && isWin === false && (
        <h1 className="fasterOne" style={{ fontSize: "40px" }}>
          You Lose
        </h1>
      )}
      {!isTogglingReset &&
        !isTogglingHomePage &&
        resultMessageStatus.map((r, idx) =>
          r === true ? (
            <h5 key={idx}>{`For code ${idx + 1}, you chose "${
              Object.values(inputs)[idx].toLowerCase()
            }" ✔`}</h5>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1 d-flex justify-content-center">
                  <div key={idx}>
                    <h5>{`For code ${idx + 1}, you chose "${
                      Object.values(inputs)[idx].toLowerCase()
                    }" ✖ ➜ The correct answer is: "${Object.keys(resultObj)[idx]}"`}</h5>
                    {acceptedAsRepetition.includes(
                      Object.values(inputs)[idx]
                    ) && (
                      <div>
                        <p style={{ display: "inline" }}>
                          (You had been informed that{" "}
                        </p>
                        <span
                          style={{
                            display: "inline",
                            color: "red",
                            fontWeight: "bold",
                            textDecoration: "red underline",
                          }}
                        >
                          {Object.values(inputs)[idx].toLowerCase()}
                        </span>
                        <p style={{ display: "inline" }}>
                          {" "}
                          had been already used in the phrase!)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      {!isTogglingReset && !isTogglingHomePage && isWin === false && (
        <div>The correct answer:</div>
      )}
      {!isTogglingReset && !isTogglingHomePage && isWin !== "" && (
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 d-flex justify-content-center">
              <div>
                {adviceArray.map((a, i) => (
                  <h2
                    style={{
                      display: "inline",
                      color: acceptedAsRepetition.includes(a) && "red",
                      textDecoration:
                        acceptedAsRepetition.includes(a) && "red underline",
                    }}
                    key={i}
                  >
                    <strong>{a}</strong>
                  </h2>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
