import { useState } from "react";
import countries from "./countries";
// const countryNames = countries.map((c) => c.country);
// const capitalNames = countries.map((c) => c.capital);
export default function Capitals() {
  const [pack, setPack] = useState(countries);
  const [questionCountries, setQuestionCountries] = useState([]);
  const [questionCapitals, setQuestionCapitals] = useState([]);
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const handleStart = () => {
    setPack((prev) => shuffleArray(prev));
    setQuestionCountries(pack.map((c) => c.country));
    setQuestionCapitals(pack.map((c) => c.capital));
  };
  return (
    <div>
      <button onClick={() => handleStart()}>Start</button>
      <div>
        <h3>Countries</h3>
        {questionCountries.slice(1, 21).map((qc, i) => (
          <div>
            {i + 1} - {qc}
          </div>
        ))}
      </div>
      <div>
        <h3>Capitals</h3>
        {questionCapitals.slice(1, 21).map((qc, i) => (
          <div>
            {i + 1} - {qc}
          </div>
        ))}
      </div>
    </div>
  );
}
