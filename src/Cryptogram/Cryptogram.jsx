import { useState } from "react";

export default function Cryptogram() {
  //   const [advice, setAdvice] = useState("");
  const [adviceArray, setAdviceArray] = useState([]);
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    // setAdvice(data.slip.advice);
    convertStringIntoArray(data.slip.advice);
  }
  const convertStringIntoArray = (str) => {
    for (let i = 0; i < str.length; i++) {
      setAdviceArray((currAdviceArray) => [...currAdviceArray, str[i]]);
    }
  };
  return (
    <div>
      <div>
        {adviceArray.map((a) => (
          <h2 style={{ display: "inline" }}>{a}</h2>
        ))}
      </div>
      <button onClick={getAdvice}>Get Advice</button>
    </div>
  );
}
