import { useState } from "react";
import countries from "./countries";
const indexesArray = new Array(countries.length).fill(null).map((c, i) => i);
export default function Capitals() {
  const [indexes, setIndexes] = useState(indexesArray);
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const handleShuffle = () => {
    setIndexes((prev) => shuffleArray(prev));
  };
  return (
    <div>
      <p>Indexes: {indexes.join(", ")}</p>
      <button onClick={() => handleShuffle()}>Shuffle</button>
    </div>
  );
}
