export default function chances({ chancesNum }) {
  return (
    <div>
      {chancesNum === 10 && (
        <div style={{ color: "blue" }}>
          You have 10 chances to find the number
        </div>
      )}
      {chancesNum > 1 && chancesNum < 10 && (
        <div
          style={{ color: "blue" }}
        >{`You have ${chancesNum} chances left`}</div>
      )}
      {chancesNum === 1 && (
        <div style={{ color: "red" }}>
          Warning! You only have one chane left!
        </div>
      )}
      {chancesNum === 0 && (
        <div style={{ color: "gray" }}>Sorry! You loose!</div>
      )}
    </div>
  );
}
