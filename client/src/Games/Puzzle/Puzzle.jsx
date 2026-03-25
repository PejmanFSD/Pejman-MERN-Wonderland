import { useState, useEffect } from "react";
import Cell from "./Cell";
import { bluePicsArray, redPicsArray } from "./imagesArray";
import E00 from "./images/E00.jpg";

export default function Puzzle() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [imageGroup, setImageGroup] = useState([]);
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
  useEffect(() => {
    setImageGroup((currImage) =>
      currImage.map((image) => ({
        ...image,
        currentLocation: currImage.indexOf(image),
      })),
    );
  }, [imageGroup, isGameStarted]);
  return (
    <div>
      {!isGameStarted && (
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
      {!isGameStarted && imageGroup.length !== 0 && (
        <button onClick={handleStart}>Start the Game</button>
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
          <div style={{ backgroundColor: "lightblue", margin: "2px" }}>
            {cell.currentLocation} - {cell.correctLocation} - {cell.isFilled ? "T" : "F"}
          </div>
        ))}
      </div>
    </div>
  );
}
