import { useState } from "react";
import Square from "./Square";

export default function Pidoku() {
  const [userNums, setUserNums] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  return (
    <div>
      {new Array(25).fill(null).map((el, idx) =>
        (idx + 1) % 5 !== 0 ? (
          <div style={{ display: "inline" }}>
            <Square userNums={userNums} setUserNums={setUserNums} />
          </div>
        ) : (
          <div style={{ display: "inline" }}>
            <Square userNums={userNums} setUserNums={setUserNums} />
            <br></br>
          </div>
        ),
      )}
    </div>
  );
}
