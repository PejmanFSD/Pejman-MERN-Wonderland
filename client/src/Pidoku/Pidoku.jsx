import Square from "./Square";

export default function Pidoku() {
  return (
    <div>
      {new Array(25).fill(null).map((el, idx) =>
        (idx + 1) % 5 !== 0 ? (
          <div style={{ display: "inline" }}>
            <Square />
          </div>
        ) : (
          <div style={{ display: "inline" }}>
            <Square />
            <br></br>
          </div>
        ),
      )}
    </div>
  );
}
