export default function Square({
  easyMode,
  red,
  green,
  blue,
  opacity,
  userChoice,
  setUserChoice,
  text,
  isStepPassed,
  uniqueSquare,
  isUniqueSquareRevealed
}) {
  const handleClick = () => {
    setUserChoice(text);
  };
  return (
    <button
      style={{
        border: userChoice === text ? "5px solid black" : "1px solid black",
        margin: easyMode ? "6px" : "3px",
        width: easyMode ? "80px" : "40px",
        height: easyMode ? "80px" : "40px",
        position: "relative",
        top: "20px",
        backgroundColor: `rgba(${red}, ${green}, ${blue}, ${opacity})`,
        color: isUniqueSquareRevealed && uniqueSquare === text ? "black" : `rgba(${red}, ${green}, ${blue}, 0)`,
        
      }}
      onClick={() => handleClick()}
      disabled={isStepPassed !== null}
    >
      {isUniqueSquareRevealed && uniqueSquare === text ? "X" : text}
    </button>
  );
}
