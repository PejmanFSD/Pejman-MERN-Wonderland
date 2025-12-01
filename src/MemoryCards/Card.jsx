import Pejman from "./images/Pejman.jpg";
import Tick from "./images/Tick.jpg";

export default function Card({
  visibleCards,
  setVisibleCards,
  x,
  y,
  status,
  images,
  imageIndex,
  setBoard,
  easy,
  normal,
}) {
  const toggleCard = () => {
    if (visibleCards.length === 0) {
      setVisibleCards((currVisibleCards) => [
        ...currVisibleCards,
        [x, y, imageIndex, 0],
      ]);
      return;
    } else if (
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
    } else if (
      visibleCards.length === 1 &&
      images[visibleCards[0][2]] === images[imageIndex]
    ) {
      setBoard((currBoard) =>
        currBoard.map((row) =>
          row.map((card) =>
            (card[0] === x && card[1] === y) ||
            (card[0] === visibleCards[0][0] && card[1] === visibleCards[0][1])
              ? [...card.slice(0, -1), 1]
              : card
          )
        )
      );
      setVisibleCards([]);
      return;
    } else if (
      visibleCards.length === 1 &&
      images[visibleCards[0][2]] !== images[imageIndex]
    ) {
      setVisibleCards((currVisibleCards) => [
        ...currVisibleCards,
        [x, y, imageIndex, 0],
      ]);
      return;
    } else if (visibleCards.length === 2) {
      setVisibleCards([]);
      setVisibleCards((currVisibleCards) => [
        ...currVisibleCards,
        [x, y, imageIndex, 0],
      ]);
    }
  };
  return (
    <img
      src={
        status === 1
          ? Tick
          : visibleCards.some((pair) => pair[0] === x && pair[1] === y)
          ? images[imageIndex]
          : Pejman
      }
      style={{
        width: easy ? "150px" : normal ? "75px" : "60px",
        border: "2px solid black",
        margin: "3px",
        pointerEvents: status === 1 && "none",
      }}
      alt=""
      onClick={toggleCard}
    />
  );
}
