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
      {Object.values(inputs).map((value) => (
        <p key={value} style={{ display: "inline" }}>
          {value}
        </p>
      ))}
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
          <form>
            <label htmlFor="input1"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[0]}`}
              name="input1"
              id="input1"
              value={inputs.input1}
              onChange={handleChange}
            />
            <label htmlFor="input2"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[1]}`}
              name="input2"
              id="input2"
              value={inputs.input2}
              onChange={handleChange}
            />
            <label htmlFor="input3"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[2]}`}
              name="input3"
              id="input3"
              value={inputs.input3}
              onChange={handleChange}
            />
            <label htmlFor="input4"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[3]}`}
              name="input4"
              id="input4"
              value={inputs.input4}
              onChange={handleChange}
            />
            <label htmlFor="input5"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[4]}`}
              name="input5"
              id="input5"
              value={inputs.input5}
              onChange={handleChange}
            />
            <label htmlFor="input6"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[5]}`}
              name="input6"
              id="input6"
              value={inputs.input6}
              onChange={handleChange}
            />
            <label htmlFor="input7"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[6]}`}
              name="input7"
              id="input7"
              value={inputs.input7}
              onChange={handleChange}
            />
            <label htmlFor="input8"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[7]}`}
              name="input8"
              id="input8"
              value={inputs.input8}
              onChange={handleChange}
            />
            <label htmlFor="input9"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[8]}`}
              name="input9"
              id="input9"
              value={inputs.input9}
              onChange={handleChange}
            />
            <label htmlFor="input10"></label>
            <input
              style={{ display: "block" }}
              type="text"
              placeholder={`Capital of ${questionCountries[9]}`}
              name="input10"
              id="input10"
              value={inputs.input10}
              onChange={handleChange}
            />
          </form>
        </div>
      )}
    </div>
  );
}
