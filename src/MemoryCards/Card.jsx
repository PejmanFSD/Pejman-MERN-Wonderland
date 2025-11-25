import Pejman from "./images/Pejman.jpg";

export default function Card({
  visibleCards,
  setVisibleCards,
  x,
  y,
  images,
  imageIndex,
}) {
  const toggleCard = () => {
    if (
      visibleCards.length === 1 &&
      visibleCards[0][0] === x &&
      visibleCards[0][1] === y
    ) {
      setVisibleCards([]);
      return;
    } else if (
      visibleCards.length === 2 &&
      visibleCards[0][0] === x &&
      visibleCards[0][1] === y
    ) {
      setVisibleCards((currVisibleCards) => currVisibleCards.slice(1, 2));
      return;
    } else if (
      visibleCards.length === 2 &&
      visibleCards[1][0] === x &&
      visibleCards[1][1] === y
    ) {
      setVisibleCards((currVisibleCards) => currVisibleCards.slice(0, 1));
      return;
    } else if (visibleCards.length < 2) {
      setVisibleCards((currVisibleCards) => [
        ...currVisibleCards,
        [x, y, imageIndex],
      ]);
    } else if (visibleCards.length === 2) {
      setVisibleCards([]);
      setVisibleCards((currVisibleCards) => [
        ...currVisibleCards,
        [x, y, imageIndex],
      ]);
    }
  };
  return (
    <img
      src={imageIndex === "" ? Pejman : images[imageIndex]}
      style={{
        width: "40px",
        border: "2px solid black",
        margin: "3px",
      }}
      alt=""
      onClick={toggleCard}
    />
  );
}
