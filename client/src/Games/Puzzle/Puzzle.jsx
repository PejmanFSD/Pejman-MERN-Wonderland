import { useState } from "react";
import Cell from "./Cell";
import { bluePicsArray, redPicsArray } from "./imagesArray";

export default function Puzzle() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [imageGroup, setImageGroup] = useState(null);
  const [isImageGroupChosen, setIsImageGroupChosen] = useState(false);

  const handleStart = () => {
    setIsGameStarted(true);
  };
  const handleImageGroup = (e) => {
    if (e.target.value === "Blue Numbers") {
      setImageGroup(bluePicsArray.sort(() => Math.random() - 0.5));
    } else if (e.target.value === "Red Numbers") {
      setImageGroup(redPicsArray.sort(() => Math.random() - 0.5));
    }
    setIsImageGroupChosen(true);
  };
  return (
    <div>
      {!isGameStarted && <button onClick={handleStart}>Start the Game</button>}
      {isGameStarted && (
        <div>
          <label htmlFor="imageGroup"></label>
          <select onChange={handleImageGroup} name="imageGroup" id="imageGroup">
            <option value={imageGroup} disabled selected>
              Select an image group
            </option>
            {["Blue Numbers", "Red Numbers"].map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </div>
      )}
      {isGameStarted && isImageGroupChosen && (
        <div
          style={{
            position: "relative",
            top: "15px",
            display: "grid",
            gridTemplateColumns: "repeat(5, auto)",
            justifyContent: "center",
          }}
        >
          {imageGroup.map((cell) => (
            <Cell image={cell.image} />
          ))}
        </div>
      )}
    </div>
  );
}
