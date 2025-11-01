export default function chances({
  chancesNum,
  setChancesNum,
  num,
  setNum,
  setInputs,
  setUserGuess,
  setUserGuessStatus,
  generateRandNum,
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
  };
  return (
    <div>
      {chancesNum === 10 && (
        <div style={{ color: "blue" }}>
          You have 10 chances to find the number
        </div>
      )}
      {chancesNum > 1 && chancesNum < 10 && (
        <div
          style={{ color: "blue" }}
        >{`You have ${chancesNum} chances left`}</div>
      )}
      {chancesNum === 1 && (
        <div style={{ color: "red" }}>
          Warning! You only have one chane left!
        </div>
      )}
      {chancesNum === 0 && (
        <div>
          <div style={{ color: "gray" }}>Sorry! You loose!</div>
          <div style={{ color: "gray" }}>{`The number is: ${num
            .toString()
            .replaceAll(",", "")}`}</div>
          <button onClick={() => reset()}>Try again</button>
        </div>
      )}
    </div>
  );
}
