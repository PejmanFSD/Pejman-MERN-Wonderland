export default function Square({
  imgSrc,
  idx,
  signs,
  userSign,
  setSquares,
  isUserTurn,
  setIsUserTurn,
  squares,
  setAvailableSquares,
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
      width="50px"
      alt="Square"
      style={{
        display: "inline",
        pointerEvents:
          (!isUserTurn || imgSrc === signs[1] || imgSrc === signs[2]) && "none",
      }}
      onClick={handleClickSquare}
    />
  );
}
