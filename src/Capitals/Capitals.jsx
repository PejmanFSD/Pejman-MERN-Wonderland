import { useState, useEffect } from "react";
import countries from "./countries";
const countryNames = countries.map((c) => c.country);
const capitalNames = countries.map((c) => c.capital);

export default function Capitals() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isWin, setIsWin] = useState("");
  const [pack, setPack] = useState(countries);
  const [questionCountries, setQuestionCountries] = useState(countryNames);
  const [questionCapitals, setQuestionCapitals] = useState(capitalNames);
  const [answer, setAnswer] = useState([]);
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    // input6: "",
    // input7: "",
    // input8: "",
    // input9: "",
    // input10: "",
  });
  const [show, setShow] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let misMatch = 0;
    for (let i = 0; i < 5; i++) {
      if (Object.values(inputs)[i] !== answer[i]) {
        misMatch += 1;
      }
    }
    if (misMatch === 0) {
      setIsWin(true);
    } else {
      setIsWin(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
  };
  const handleReset = () => {
    setIsGameStarted(false);
    setIsWin("");
    setPack(countries);
    setQuestionCountries(countryNames);
    setQuestionCapitals(capitalNames);
    setAnswer([]);
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      // input6: "",
      // input7: "",
      // input8: "",
      // input9: "",
      // input10: "",
    });
    setShow(false);
    setPack((currPack) => shuffleArray(currPack));
  };
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const handleStart = () => {
    setIsGameStarted(true);
    setPack((currPack) => shuffleArray(currPack));
    setQuestionCountries(pack.map((c) => c.country).slice(1, 6));
    setQuestionCapitals(pack.map((c) => c.capital).slice(1, 6));
  };
  const handleShow = () => {
    setQuestionCapitals((currQuestionCapitals) =>
      shuffleArray(currQuestionCapitals)
    );
    questionCapitals.map((el) =>
      setAnswer((currAnswer) => [...currAnswer, el])
    );
    setShow(true);
  };
  useEffect(function () {
    setPack((currPack) => shuffleArray(currPack));
  }, []);
  return (
    <div>
      {isWin === true && <h1>You Win</h1>}
      {isWin === false && <h1>You Loose</h1>}
      {!isGameStarted && <button onClick={() => handleStart()}>Start</button>}
      <h3>Answer:</h3>
      {answer.map((el) => (
        <div>{el}</div>
      ))}
      {isGameStarted && show && (
        <div>
          <h3>Countries</h3>
          {questionCountries.map((qc) => (
            <div>{qc}</div>
          ))}
        </div>
      )}
      {isGameStarted && !show && (
        <div>
          <h4>
            5 countries are chosen for you, guess their capitals correctly and
            win the game
          </h4>
          <button onClick={() => handleShow()}>Ok</button>
        </div>
      )}
      {isGameStarted && show && (
        <div>
          <form onSubmit={handleSubmit}>
            {questionCountries.map((el, i) => (
              <div>
                <label htmlFor={`input${i + 1}`}></label>
                <select
                  onChange={handleChange}
                  name={`input${i + 1}`}
                  id={`input${i + 1}`}
                >
                  <option value={Object.values(inputs)[i]} disabled selected>
                    {`Select the Capital of ${questionCountries[i]}`}
                  </option>
                  {questionCapitals.map((c) => (
                    <option>{c}</option>
                  ))}
                </select>
              </div>
            ))}
            <button>Done</button>
          </form>
        </div>
      )}
      {isWin !== "" &&
        questionCountries.map((c, i) => (
          <h3>
            {`You chose ${Object.values(inputs)[i]} as the capital of ${
              questionCountries[i]
            }`}{" "}
            {Object.values(inputs)[i] === answer[i]
              ? "✅"
              : `❌ -> The correct answer is: ${answer[i]}`}
          </h3>
        ))}
      <button onClick={() => handleReset()}>Reset</button>
    </div>
  );
}
