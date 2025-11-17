import { useState, useEffect } from "react";
import ConfirmationBox from "../ConfirmationBox";

export default function Cryptogram() {
  const [isGameStarted, setIsGameStarted] = useState(false);
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
  const [resultMessageStatus, setResultMessageStatus] = useState([]);
  const [isWin, setIsWin] = useState("");
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  async function getAdvice() {
    setIsGameStarted(true);
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
    let misMatch = 0;
    for (let i = 0; i < 4; i++) {
      if (Object.values(inputs)[i] === Object.keys(resultObj)[i]) {
        setResultMessageStatus((currResultMessageStatus) => [
          ...currResultMessageStatus,
          true,
        ]);
      } else {
        setResultMessageStatus((currResultMessageStatus) => [
          ...currResultMessageStatus,
          false,
        ]);
        misMatch += 1;
      }
    }
    if (misMatch === 0) {
      setIsWin(true);
    }
    if (misMatch !== 0) {
      setIsWin(false);
    }
    setIsGameStarted(false);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
    setAdviceArray([]);
    setResultObj({
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
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
    setResultMessageStatus([]);
    setIsWin("");
    setIsTogglingReset(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
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
      {isWin === true && <h1>You Win</h1>}
      {isWin === false && <h1>You Loose</h1>}
      {resultMessageStatus.map((r, idx) =>
        r === true ? (
          <p>{`For code ${idx + 1}, you chose ${
            Object.values(inputs)[idx]
          } ✅`}</p>
        ) : (
          <p>{`For code ${idx + 1}, you chose ${
            Object.values(inputs)[idx]
          } ❌. The correct answer is: ${Object.keys(resultObj)[idx]}`}</p>
        )
      )}
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
                  disabled={!isGameStarted}
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
                  disabled={!isGameStarted}
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
                  disabled={!isGameStarted}
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
                    disabled={!isGameStarted}
                  />
                </div>
              )
            )
          ) : (
            <h2 style={{ display: "inline" }}>{a}</h2>
          )
        )}
        <div>
          {isGameStarted && isWin === "" && !isTogglingReset && (
            <button>Done</button>
          )}
        </div>
      </form>
      {isGameStarted && !isTogglingReset && isWin === "" && (
        <button onClick={() => toggleReset()}>Reset the Game</button>
      )}
      {!isGameStarted && !isTogglingReset && isWin === true && (
        <button onClick={() => toggleReset()}>Play Again</button>
      )}
      {!isGameStarted && !isTogglingReset && isWin === false && (
        <button onClick={() => toggleReset()}>Try Again</button>
      )}
      {isTogglingReset && (
        <ConfirmationBox
          question={
            isGameStarted
              ? "Are you sure you want to reset the game?"
              : isWin === true
              ? "Play again?"
              : "Try again?"
          }
          toggleYes={toggleResetYes}
          toggleCancel={toggleResetCancel}
        />
      )}
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
      {!isGameStarted && isWin === "" && (
        <button onClick={getAdvice}>Start</button>
      )}
    </div>
  );
}
