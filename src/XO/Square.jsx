export default function Square({ imgSrc, idx, signs, userSign, setSquares }) {
  const handleClickSquare = () => {
    if (userSign === "X") {
      setSquares((currSquares) =>
        currSquares.map((s) => (s.id === idx ? { ...s, imgSrc: signs[1] } : s))
      );
    } else if (userSign === "O") {
      setSquares((currSquares) =>
        currSquares.map((s) => (s.id === idx ? { ...s, imgSrc: signs[2] } : s))
      );
    }
  };
  return (
    <img
      src={imgSrc}
      width="50px"
      alt="Square"
      style={{ display: "inline" }}
      onClick={handleClickSquare}
    />
  );
}
