export default function Card({ image }) {
  return (
    <img
      src={image}
      style={{
        width:"50px",
        display: "inline",
        border: "1px solid black",
        margin: "3px"
      }}
      alt=""
    />
  );
}
