import { useState } from "react";
import countries from "./countries";

export default function Capitals() {
  const [allCountries, setAllCountries] = useState(countries);
  const [chosenCountries, setChosenCountries] = useState([]);
  const generateCountries = () => {
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * allCountries.length);
      setChosenCountries((currChosenCountries) => [
        ...currChosenCountries,
        allCountries[randomIndex].country,
      ]);
    }
  };
  return (
    <div>
      {chosenCountries.map((i) => (
        <div>{i}</div>
      ))}
      <button onClick={() => generateCountries()}>Generate Countries</button>
    </div>
  );
}
