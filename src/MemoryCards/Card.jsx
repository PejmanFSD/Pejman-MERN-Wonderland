export default function Card({ image }) {
  return (
    <img
      src={image}
      style={{
        width:"40px",
        border: "2px solid black",
        margin: "3px"
      }}
      alt=""
    />
  );
}
