import { useState, useEffect } from "react";
import countries from "./countries";
const countryNames = countries.map((c) => c.country);
const capitalNames = countries.map((c) => c.capital);

export default function Capitals() {
  const [pack, setPack] = useState(countries);
  const [questionCountries, setQuestionCountries] = useState(countryNames);
  const [questionCapitals, setQuestionCapitals] = useState(capitalNames);
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
  });
  const [showCountries, setShowCountries] = useState(false);
  const [showCapitals, setShowCapitals] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted!");
  }
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
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const handleStart = () => {
    setPack((currPack) => shuffleArray(currPack));
    setQuestionCountries(pack.map((c) => c.country).slice(1, 11));
    setQuestionCapitals(pack.map((c) => c.capital).slice(1, 11));
    setShowCountries(true);
  };
  const handleShowCapitals = () => {
    setQuestionCapitals((currQuestionCapitals) =>
      shuffleArray(currQuestionCapitals)
    );
    setShowCapitals(true);
  };
  useEffect(function () {
    setPack((currPack) => shuffleArray(currPack));
  }, []);
  return (
    <div>
      <button onClick={() => handleStart()}>Start</button>
      <h3>inputs:</h3>
      {/* {Object.values(inputs).map((value) => (
        <p key={value} style={{ display: "inline" }}>
          {value}
        </p>
      ))} */}
      {showCountries && (
        <div>
          <h3>Question Countries</h3>
          {questionCountries.map((qc, i) => (
            <div>
              {i + 1} - {qc}
            </div>
          ))}
        </div>
      )}
      {!showCapitals && showCountries && (
        <div>
          <h4>
            10 countries are chosen for you, guess their capitals correctly and
            win the game
          </h4>
          <button onClick={() => handleShowCapitals()}>Ok</button>
        </div>
      )}
      {showCapitals && (
        <div>
          <h3>Question Capitals</h3>
          {questionCapitals.map((qc, i) => (
            <div>
              {i + 1} - {qc}
            </div>
          ))}
        </div>
      )}
      {showCapitals && (
        <div>
          <form onSubmit={handleSubmit}>
            {questionCountries.map((el, i) => (
              <div>
                <label htmlFor={`input${i + 1}`}></label>
                <input
                  style={{ display: "block" }}
                  type="text"
                  placeholder={`Capital of ${questionCountries[i]}`}
                  name={`input${i + 1}`}
                  id={`input${i + 1}`}
                  value={Object.values(inputs)[i]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button>Done</button>
          </form>
        </div>
      )}
    </div>
  );
}
