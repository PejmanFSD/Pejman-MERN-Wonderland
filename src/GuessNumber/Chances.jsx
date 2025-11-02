export default function chances({
  chancesNum,
  setChancesNum,
  num,
  setNum,
  setInputs,
  setUserGuess,
  setUserGuessStatus,
  generateRandNum,
  isWin,
  setIsWin,
}) {
  const reset = () => {
    setChancesNum(10);
    setNum([]);
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
    setUserGuess([]);
    setUserGuessStatus([]);
    generateRandNum();
    setIsWin(false);
  };
  return (
    <div>
      {chancesNum === 10 && !isWin && (
        <div style={{ color: "blue" }}>
          You have 10 chances to find the number
        </div>
      )}
      {chancesNum > 1 && chancesNum < 10 && !isWin && (
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
          <div style={{ color: "green" }}>Well Done!</div>
          <button onClick={() => reset()}>Play again</button>
        </div>
      )}
    </div>
  );
}
