export default function Card({ visibleCards, setVisibleCards, x, y, image }) {
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
    }
    if (visibleCards.length < 2) {
      setVisibleCards((currVisibleCards) => [...currVisibleCards, [x, y]]);
    } else if (visibleCards.length === 2) {
      setVisibleCards([]);
      setVisibleCards((currVisibleCards) => [...currVisibleCards, [x, y]]);
    }
  };
  return (
    <img
      src={image}
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
