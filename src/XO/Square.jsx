export default function Square({
  imgSrc,
  idx,
  signs,
  userSign,
  setSquares,
  isUserTurn,
  setIsUserTurn,
}) {
  const handleClickSquare = () => {
    if (userSign === "X") {
      setSquares((currSquares) =>
        currSquares.map((s) =>
          s.id === idx ? { ...s, imgSrc: signs[1], owner: "User" } : s
        )
      );
      setIsUserTurn(false);
    } else if (userSign === "O") {
      setSquares((currSquares) =>
        currSquares.map((s) =>
          s.id === idx ? { ...s, imgSrc: signs[2], owner: "User" } : s
        )
      );
      setIsUserTurn(false);
    }
  };
  return (
    <img
      src={imgSrc}
      width="50px"
      alt="Square"
      style={{ display: "inline", pointerEvents: !isUserTurn && "none" }}
      onClick={handleClickSquare}
    />
  );
}
