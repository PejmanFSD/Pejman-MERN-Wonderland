export default function chances({
  chancesNum,
  setChancesNum,
  num,
  setNum,
  setInputs,
  setUserGuess,
  setUserGuessStatus,
  setAllUserGuesses,
  generateRandNum,
  isWin,
  setIsWin,
  easyMode,
  normalMode,
  updateTotalPoint,
}) {
  const reset = () => {
    setChancesNum(easyMode ? 5 : 10);
    setNum([]);
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
    setUserGuess([]);
    setAllUserGuesses([]);
    setUserGuessStatus([]);
    generateRandNum();
    setIsWin(false);
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
      {chancesNum === 10 && !isWin && normalMode && (
        <div style={{ color: "blue" }}>
          You have 10 chances to find the number
        </div>
      )}
      {chancesNum === 5 && !isWin && easyMode && (
        <div style={{ color: "blue" }}>
          You have 5 chances to find the number
        </div>
      )}
      {chancesNum > 1 && chancesNum < 10 && !isWin && normalMode && (
        <div
          style={{ color: "blue" }}
        >{`You have ${chancesNum} chances left`}</div>
      )}
      {chancesNum > 1 && chancesNum < 5 && !isWin && easyMode && (
        <div
          style={{ color: "blue" }}
        >{`You have ${chancesNum} chances left`}</div>
      )}
      {chancesNum === 1 && !isWin && (
        <div style={{ color: "red" }}>
          Warning! You only have one chane left!
        </div>
      )}
      {chancesNum === 0 && !isWin && (
        <div>
          <div style={{ color: "gray" }}>Sorry! You loose!</div>
          <div style={{ color: "gray" }}>{`The number is: ${num
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
    </div>
  );
}
