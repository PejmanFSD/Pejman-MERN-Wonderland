import Square from "./Square";
import S from "./Images/S.jpg";
import X from "./Images/X.jpg";
import O from "./Images/O.jpg";

export default function XO() {
  return (
    <div>
      {new Array(16).fill(null).map((square, idx) =>
        (idx + 1) % 4 !== 0 ? (
          <div style={{ display: "inline", margin: "2px" }}>
            {<Square imgSrc={S} />}
          </div>
        ) : (
          <div style={{ display: "inline", margin: "2px" }}>
            {<Square imgSrc={S} />}
            <br></br>
          </div>
        )
      )}
    </div>
  );
}
