export default function Chances({
  chancesNum,
  num,
  isWin,
  reset,
  easyMode,
  normalMode,
  updateTotalPoint,
  isGameStarted,
  userGuess,
  isTogglingLevel,
  isTogglingReset,
  setIsTogglingReset,
  toggleResetYes,
  toggleResetCancel,
  isTogglingHomePage,
}) {
  const handleOk = () => {
    if (easyMode) {
      updateTotalPoint(1);
    } else if (normalMode) {
      updateTotalPoint(5);
    }
    reset();
  };
  return (
    <div>
      {chancesNum === 10 &&
        !isWin &&
        normalMode &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <strong>You have 10 chances to find the number</strong>
          </div>
        )}
      {chancesNum === 5 &&
        !isWin &&
        easyMode &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <strong>You have 5 chances to find the number</strong>
          </div>
        )}
      {chancesNum > 1 &&
        chancesNum < 10 &&
        !isWin &&
        normalMode &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <strong>{`You have ${chancesNum} chances left`}</strong>
          </div>
        )}
      {chancesNum > 1 &&
        chancesNum < 5 &&
        !isWin &&
        easyMode &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <strong>{`You have ${chancesNum} chances left`}</strong>
          </div>
        )}
      {chancesNum === 1 &&
        !isWin &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div style={{ color: "red" }}>
            <strong>Warning! You only have one chance left!</strong>
          </div>
        )}
      {chancesNum === 0 &&
        !isWin &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <h3>You Lose!</h3>
            <h3>{`The number was: ${num.toString().replaceAll(",", "")}`}</h3>
            <button onClick={() => reset()}>Try again</button>
          </div>
        )}
      {isWin && (
        <div>
          <h3>You Win!</h3>
          <h3>
            Your total point increases by{" "}
            {easyMode ? "one" : normalMode && "five"}.
          </h3>
          <button onClick={() => handleOk()}>Ok</button>
        </div>
      )}
    </div>
  );
}
