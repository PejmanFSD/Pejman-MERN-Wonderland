import { useState, useEffect } from "react";

export default function Cryptogram() {
  const [adviceArray, setAdviceArray] = useState([]);
  const [resultObj, setResultObj] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  });
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    convertStringIntoArray(data.slip.advice);
  }
  const convertStringIntoArray = (str) => {
    for (let i = 0; i < str.length; i++) {
      setAdviceArray((currAdviceArray) => [...currAdviceArray, str[i]]);
    }
  };
  useEffect(
    function () {
      function generateResult() {
        const copy = adviceArray.slice().map((item) => item.toLowerCase());
        setResultObj((currResultObj) => {
          const updated = { ...currResultObj };
          copy.forEach((item) => {
            if (item in updated) {
              updated[item] += 1;
            }
          });
          return updated;
        });
        setResultObj((currResultObj) => {
          return Object.fromEntries(
            Object.entries(currResultObj).sort(([, v1], [, v2]) => v2 - v1)
          );
        });
      }
      generateResult();
    },
    [adviceArray]
  );
  return (
    <div>
      <div>
        {adviceArray.map((a) => (
          <h2 style={{ display: "inline" }}>{a}</h2>
        ))}
      </div>
      <div>
        {adviceArray.map((a) => (
          <h2 style={{ display: "inline" }}>
            {Object.keys(resultObj).slice(0, 4).includes(a.toLowerCase())
              ? "-"
              : a}
          </h2>
        ))}
      </div>
      <div>
        {Object.entries(resultObj).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
      </div>
      <button onClick={getAdvice}>Get Advice</button>
    </div>
  );
}
