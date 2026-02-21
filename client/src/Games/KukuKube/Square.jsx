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
        border: userChoice === text && red === 0 && green === 170 && blue === 0 ? "5px solid black" :
        userChoice === text && red === 170 && green === 0 && blue === 0 ? "5px solid limegreen" :
        userChoice === text && red === 0 && green === 0 && blue === 170 ? "5px solid magenta" :
        "1px solid black",
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
