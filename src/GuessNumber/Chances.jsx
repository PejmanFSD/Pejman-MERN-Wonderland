import ConfirmationBox from "./ConfirmationBox";

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
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const handleOk = () => {
    if (easyMode) {
      updateTotalPoint(1);
    } else if (normalMode) {
      updateTotalPoint(3);
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
          <div style={{ color: "blue" }}>
            You have 10 chances to find the number
          </div>
        )}
      {chancesNum === 5 &&
        !isWin &&
        easyMode &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div style={{ color: "blue" }}>
            You have 5 chances to find the number
          </div>
        )}
      {chancesNum > 1 &&
        chancesNum < 10 &&
        !isWin &&
        normalMode &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div
            style={{ color: "blue" }}
          >{`You have ${chancesNum} chances left`}</div>
        )}
      {chancesNum > 1 &&
        chancesNum < 5 &&
        !isWin &&
        easyMode &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div
            style={{ color: "blue" }}
          >{`You have ${chancesNum} chances left`}</div>
        )}
      {chancesNum === 1 &&
        !isWin &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div style={{ color: "red" }}>
            Warning! You only have one chane left!
          </div>
        )}
      {chancesNum === 0 &&
        !isWin &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <div style={{ color: "gray" }}>Sorry! You loose!</div>
            <div style={{ color: "gray" }}>{`The number was: ${num
              .toString()
              .replaceAll(",", "")}`}</div>
            <button onClick={() => reset()}>Try again</button>
          </div>
        )}
      {isWin && (
        <div>
          <div style={{ color: "green" }}>
            Well Done! You won the {easyMode ? "Easy" : normalMode && "Normal"}{" "}
            Mode.
          </div>
          <div style={{ color: "green" }}>
            Your total point increases by{" "}
            {easyMode ? "one" : normalMode && "three"}.
          </div>
          <button onClick={() => handleOk()}>Ok</button>
        </div>
      )}
      {!isWin &&
        userGuess[0] &&
        chancesNum !== 0 &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <button onClick={() => toggleReset()} disabled={isTogglingLevel}>
            Reset the Game
          </button>
        )}
      {isGameStarted && (easyMode || normalMode) && isTogglingReset && (
        <ConfirmationBox
          areYouSureQuestion="Are you sure you want to reset the game?"
          toggleYes={toggleResetYes}
          toggleCancel={toggleResetCancel}
        />
      )}
    </div>
  );
}
