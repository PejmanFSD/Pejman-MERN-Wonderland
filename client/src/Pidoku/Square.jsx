import { useState } from "react";

export default function Square({ userNums, setUserNums, userColor }) {
  const [btnText, setBtnText] = useState(0);
  const handleClick = () => {
    setBtnText(userNums[0]);
    setUserNums(userNums.filter((el) => userNums.indexOf(el) !== 0));
  };
  return (
    <button
      style={{
        border: "2px solid black",
        height: "50px",
        width: "50px",
        margin: "2px",
        background:
          btnText === 0
            ? "lightgray"
            : `rgba(${userColor.red}, ${userColor.green}, ${userColor.blue})`,
        color:
          btnText === 0
            ? "lightgray"
            : userColor.red === 240 || userColor.blue === 240
              ? "white"
              : "black",
      }}
      disabled={btnText !== 0}
      onClick={handleClick}
    >
      {btnText}
    </button>
  );
}
