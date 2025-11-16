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
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
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
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    const { name, value } = e.target;
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
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
      <form onSubmit={handleSubmit}>
        {adviceArray.map((a) =>
          Object.keys(resultObj).slice(0, 4).includes(a.toLowerCase()) ? (
            Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
            0 ? (
              <div style={{ display: "inline" }}>
                <label htmlFor="input1"></label>
                <input
                  type="text"
                  placeholder="1"
                  name="input1"
                  id="input1"
                  value={inputs.input1}
                  onChange={handleChange}
                  style={{ width: "15px", height: "30px" }}
                />
              </div>
            ) : Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
              1 ? (
              <div style={{ display: "inline" }}>
                <label htmlFor="input2"></label>
                <input
                  type="text"
                  placeholder="2"
                  name="input2"
                  id="input2"
                  value={inputs.input2}
                  onChange={handleChange}
                  style={{ width: "15px", height: "30px" }}
                />
              </div>
            ) : Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
              2 ? (
              <div style={{ display: "inline" }}>
                <label htmlFor="input3"></label>
                <input
                  type="text"
                  placeholder="3"
                  name="input3"
                  id="input3"
                  value={inputs.input3}
                  onChange={handleChange}
                  style={{ width: "15px", height: "30px" }}
                />
              </div>
            ) : (
              Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
                3 && (
                <div style={{ display: "inline" }}>
                  <label htmlFor="input4"></label>
                  <input
                    type="text"
                    placeholder="4"
                    name="input4"
                    id="input4"
                    value={inputs.input4}
                    onChange={handleChange}
                    style={{ width: "15px", height: "30px" }}
                  />
                </div>
              )
            )
          ) : (
            <h2 style={{ display: "inline" }}>{a}</h2>
          )
        )}
        <button>Done</button>
      </form>
      <div>
        {Object.values(inputs).map((value, index) => (
          <div key={index}>{`input${index + 1}: ${value}`}</div>
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
