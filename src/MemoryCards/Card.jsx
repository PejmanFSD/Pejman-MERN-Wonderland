export default function Card({ visibleCards, setVisibleCards, x, y, image }) {
  const toggleCard = () => {
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
