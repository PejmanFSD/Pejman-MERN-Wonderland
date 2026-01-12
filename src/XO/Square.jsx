export default function Square({
  imgSrc,
  idx,
  signs,
  userSign,
  setSquares,
  isUserTurn,
  setIsUserTurn,
  squares,
  userChoices,
  pejmanChoices,
  availableSquares,
  setAvailableSquares,
  normalMode,
}) {
  const handleClickSquare = () => {
    setSquares((currSquares) =>
      currSquares.map((s) =>
        s.id === idx ? { ...s, imgSrc: userSign, owner: "User" } : s
      )
    );
    setAvailableSquares(squares.filter((s) => s.owner === ""));
    setIsUserTurn(false);
  };
  return (
    <img
      src={imgSrc}
      width={isUserTurn && availableSquares.length !== 0 ? "50px" : "10px"}
      alt="Square"
      style={{
        display: "inline",
        pointerEvents: (!isUserTurn || imgSrc !== signs[0]) && "none",
        opacity:
          (!isUserTurn && userChoices.length !== 0) ||
          availableSquares.length === 0
            ? 0.2
            : 1,
        border:
          userChoices.length === 0 &&
          pejmanChoices.length === 0 &&
          normalMode &&
          "1px solid black",
      }}
      onClick={handleClickSquare}
    />
  );
}
