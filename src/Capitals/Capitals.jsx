import { useState, useEffect } from "react";
import countries from "./countries";
const countryNames = countries.map((c) => c.country);
const capitalNames = countries.map((c) => c.capital);
export default function Capitals() {
  const [pack, setPack] = useState(countries);
  const [questionCountries, setQuestionCountries] = useState(countryNames);
  const [questionCapitals, setQuestionCapitals] = useState(capitalNames);
  //   const [answerCountries, setAnswerCountries] = useState([]);
  //   const [answerCapitals, setAnswerCapitals] = useState([]);
  const [showCountries, setShowCountries] = useState(false);
  const [showCapitals, setShowCapitals] = useState(false);
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
    setQuestionCountries(pack.map((c) => c.country).slice(1, 31));
    // setAnswerCountries(questionCountries);
    setQuestionCapitals(pack.map((c) => c.capital).slice(1, 31));
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
            30 countries are chosen for you, guess their capitals correctly and
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
            {questionCountries.map((el) => (
              <input type="number" placeholder={`Capital of ${el}`} />
            ))}
          </form>
        </div>
      )}
    </div>
  );
}
