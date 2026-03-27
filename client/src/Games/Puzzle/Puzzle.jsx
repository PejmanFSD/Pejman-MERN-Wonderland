import { useState } from "react";
import Cell from "./Cell";
import { bluePicsArray, redPicsArray } from "./imagesArray";
import E00 from "./images/E00.jpg";

export default function Puzzle() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [imageGroup, setImageGroup] = useState([]);
  const [isImageGroupChosen, setIsImageGroupChosen] = useState(false);
  const [isActiveUpButton, setIsActiveUpButton] = useState(false);
  const [isActiveLeftButton, setIsActiveLeftButton] = useState(false);
  const [isActiveDownButton, setIsActiveDownButton] = useState(false);
  const [isActiveRightButton, setIsActiveRightButton] = useState(false);
  const [isAnImageClicked, setIsAnImageClicked] = useState(false);

  const handleStart = () => {
    setIsGameStarted(true);
    setImageGroup((currImage) =>
      currImage.map((image) => ({
        ...image,
        currentLocation: currImage.indexOf(image),
      })),
    );
  };
  const handleImageGroup = (e) => {
    if (e.target.value === "Blue Numbers") {
      setImageGroup(bluePicsArray.sort(() => Math.random() - 0.5));
    } else if (e.target.value === "Red Numbers") {
      setImageGroup(redPicsArray.sort(() => Math.random() - 0.5));
    }
    setIsImageGroupChosen(true);
  };
  const handleUp = () => {
    setImageGroup((currImageGroup) =>
      currImageGroup.map((i) =>
        i.isClicked === true
          ? {
              ...i,
              correctLocation: imageGroup.find(
                (img) => img.isSwapUpTarget === true,
              ).correctLocation,
              image: E00,
              isClicked: false,
              isSwapUpTarget: false,
              isSwapLeftTarget: false,
              isSwapDownTarget: false,
              isSwapRightTarget: false,
            }
          : i.isSwapUpTarget === true
            ? {
                ...i,
                correctLocation: imageGroup.find(
                  (img) => img.isClicked === true,
                ).correctLocation,
                image: imageGroup.find((img) => img.isClicked === true).image,
                isClicked: false,
                isSwapUpTarget: false,
                isSwapLeftTarget: false,
                isSwapDownTarget: false,
                isSwapRightTarget: false,
              }
            : {
                ...i,
                isClicked: false,
                isSwapUpTarget: false,
                isSwapLeftTarget: false,
                isSwapDownTarget: false,
                isSwapRightTarget: false,
              },
      ),
    );
    setIsActiveUpButton(false);
    setIsActiveLeftButton(false);
    setIsActiveDownButton(false);
    setIsActiveRightButton(false);
    setIsAnImageClicked(false);
  };
  const handleLeft = () => {
    setImageGroup((currImageGroup) =>
      currImageGroup.map((i) =>
        i.isClicked === true
          ? {
              ...i,
              correctLocation: imageGroup.find(
                (img) => img.isSwapLeftTarget === true,
              ).correctLocation,
              image: E00,
              isClicked: false,
              isSwapUpTarget: false,
              isSwapLeftTarget: false,
              isSwapDownTarget: false,
              isSwapRightTarget: false,
            }
          : i.isSwapLeftTarget === true
            ? {
                ...i,
                correctLocation: imageGroup.find(
                  (img) => img.isClicked === true,
                ).correctLocation,
                image: imageGroup.find((img) => img.isClicked === true).image,
                isClicked: false,
                isSwapUpTarget: false,
                isSwapLeftTarget: false,
                isSwapDownTarget: false,
                isSwapRightTarget: false,
              }
            : {
                ...i,
                isClicked: false,
                isSwapUpTarget: false,
                isSwapLeftTarget: false,
                isSwapDownTarget: false,
                isSwapRightTarget: false,
              },
      ),
    );
    setIsActiveUpButton(false);
    setIsActiveLeftButton(false);
    setIsActiveDownButton(false);
    setIsActiveRightButton(false);
    setIsAnImageClicked(false);
  };
  const handleDown = () => {
    setImageGroup((currImageGroup) =>
      currImageGroup.map((i) =>
        i.isClicked === true
          ? {
              ...i,
              correctLocation: imageGroup.find(
                (img) => img.isSwapDownTarget === true,
              ).correctLocation,
              image: E00,
              isClicked: false,
              isSwapUpTarget: false,
              isSwapLeftTarget: false,
              isSwapDownTarget: false,
              isSwapRightTarget: false,
            }
          : i.isSwapDownTarget === true
            ? {
                ...i,
                correctLocation: imageGroup.find(
                  (img) => img.isClicked === true,
                ).correctLocation,
                image: imageGroup.find((img) => img.isClicked === true).image,
                isClicked: false,
                isSwapUpTarget: false,
                isSwapLeftTarget: false,
                isSwapDownTarget: false,
                isSwapRightTarget: false,
              }
            : {
                ...i,
                isClicked: false,
                isSwapUpTarget: false,
                isSwapLeftTarget: false,
                isSwapDownTarget: false,
                isSwapRightTarget: false,
              },
      ),
    );
    setIsActiveUpButton(false);
    setIsActiveLeftButton(false);
    setIsActiveDownButton(false);
    setIsActiveRightButton(false);
    setIsAnImageClicked(false);
  };
  const handleRight = () => {
    setImageGroup((currImageGroup) =>
      currImageGroup.map((i) =>
        i.isClicked === true
          ? {
              ...i,
              correctLocation: imageGroup.find(
                (img) => img.isSwapRightTarget === true,
              ).correctLocation,
              image: E00,
              isClicked: false,
              isSwapUpTarget: false,
              isSwapLeftTarget: false,
              isSwapDownTarget: false,
              isSwapRightTarget: false,
            }
          : i.isSwapRightTarget === true
            ? {
                ...i,
                correctLocation: imageGroup.find(
                  (img) => img.isClicked === true,
                ).correctLocation,
                image: imageGroup.find((img) => img.isClicked === true).image,
                isClicked: false,
                isSwapUpTarget: false,
                isSwapLeftTarget: false,
                isSwapDownTarget: false,
                isSwapRightTarget: false,
              }
            : {
                ...i,
                isClicked: false,
                isSwapUpTarget: false,
                isSwapLeftTarget: false,
                isSwapDownTarget: false,
                isSwapRightTarget: false,
              },
      ),
    );
    setIsActiveUpButton(false);
    setIsActiveLeftButton(false);
    setIsActiveDownButton(false);
    setIsActiveRightButton(false);
    setIsAnImageClicked(false);
  };
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
            <Cell
              imageSrc={cell.image}
              setIsActiveUpButton={setIsActiveUpButton}
              setIsActiveLeftButton={setIsActiveLeftButton}
              setIsActiveDownButton={setIsActiveDownButton}
              setIsActiveRightButton={setIsActiveRightButton}
              imageGroup={imageGroup}
              setImageGroup={setImageGroup}
              isAnImageClicked={isAnImageClicked}
              setIsAnImageClicked={setIsAnImageClicked}
            />
          ))}
        </div>
      )}
      <div>
        <button
          onClick={handleUp}
          style={{ position: "relative", top: "20px" }}
          disabled={isActiveUpButton === false || isAnImageClicked === false}
        >
          &#8593;
        </button>
        <br />
        <button
          onClick={handleLeft}
          style={{ position: "relative", top: "20px" }}
          disabled={isActiveLeftButton === false || isAnImageClicked === false}
        >
          &#8592;
        </button>
        <button
          onClick={handleDown}
          style={{ position: "relative", top: "20px" }}
          disabled={isActiveDownButton === false || isAnImageClicked === false}
        >
          &#8595;
        </button>
        <button
          onClick={handleRight}
          style={{ position: "relative", top: "20px" }}
          disabled={isActiveRightButton === false || isAnImageClicked === false}
        >
          &#8594;
        </button>
      </div>
      <div
        style={{
          position: "relative",
          top: "15px",
          display: "grid",
          gridTemplateColumns: "repeat(5, auto)",
          justifyContent: "center",
          position: "relative",
          top: "25px",
        }}
      >
        {imageGroup.map((cell) => (
          <div style={{ border: "3px solid black", margin: "5px" }}>
            <div style={{ backgroundColor: "lightblue", display: "inline" }}>
              {cell.currentLocation}
            </div>
            -
            <div style={{ backgroundColor: "pink", display: "inline" }}>
              {cell.correctLocation}
            </div>
            -
            <div style={{ backgroundColor: "white", display: "inline" }}>
              {cell.isClicked ? "T" : "F"}
            </div>
            -
            <div
              style={{ backgroundColor: "orange", display: "inline" }}
            >{`up: ${cell.isSwapUpTarget ? "T" : "F"}`}</div>
            -
            <div
              style={{ backgroundColor: "lightgreen", display: "inline" }}
            >{`left: ${cell.isSwapLeftTarget ? "T" : "F"}`}</div>
            -
            <div
              style={{ backgroundColor: "orange", display: "inline" }}
            >{`down: ${cell.isSwapDownTarget ? "T" : "F"}`}</div>
            -
            <div
              style={{ backgroundColor: "lightgreen", display: "inline" }}
            >{`right: ${cell.isSwapRightTarget ? "T" : "F"}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
