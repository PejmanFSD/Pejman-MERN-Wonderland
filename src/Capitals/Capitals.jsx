import { useState, useEffect } from "react";
import countries from "./countries";
const countryNames = countries.map((c) => c.country);
const capitalNames = countries.map((c) => c.capital);
export default function Capitals() {
  const [pack, setPack] = useState(countries);
  const [questionCountries, setQuestionCountries] = useState(countryNames);
  const [questionCapitals, setQuestionCapitals] = useState(capitalNames);
  const [showQuestion, setShowQuestion] = useState(false);
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
    setQuestionCountries(pack.map((c) => c.country).slice(1, 31));
    setQuestionCapitals(pack.map((c) => c.capital).slice(1, 31));
    setShowQuestion(true);
  };
  useEffect(function () {
    setPack((prev) => shuffleArray(prev));
  }, []);
  return (
    <div>
      <button onClick={() => handleStart()}>Start</button>
      {showQuestion && (
        <div>
          <div>
            <h3>Countries</h3>
            <div>
              {questionCountries.map((qc, i) => (
                <div>
                  {i + 1} - {qc}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Capitals</h3>
            <div>
              {questionCapitals.map((qc, i) => (
                <div>
                  {i + 1} - {qc}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
