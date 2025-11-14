import { useState } from "react";

export default function Cryptogram() {
  const [advice, setAdvice] = useState("");
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
  }
  return (
    <div>
      <h3>{advice}</h3>
      <button onClick={getAdvice}>Get Advice</button>
    </div>
  );
}