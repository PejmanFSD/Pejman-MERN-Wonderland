export default function Square({
  easyMode,
  red,
  green,
  blue,
  opacity,
  setUserChoice,
  text,
  isStepPassed,
}) {
  const handleClick = () => {
    setUserChoice(text);
  };
  return (
    <button
      style={{
        // display: "inline",
        border: "1px solid black",
        margin: easyMode ? "6px" : "3px",
        width: easyMode ? "80px" : "40px",
        height: easyMode ? "80px" : "40px",
        position: "relative",
        top: "20px",
        backgroundColor: `rgba(${red}, ${green}, ${blue}, ${opacity})`,
      }}
      onClick={() => handleClick()}
      disabled={isStepPassed !== null}
    >
      {text}
    </button>
  );
}
