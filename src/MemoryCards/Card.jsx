export default function Card({ setVisibleCards, x, y, image }) {
  const toggleCard = () => {
    setVisibleCards((currVisibleCards) => [...currVisibleCards, [x, y]]);
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
