import { useState } from "react";
import Board from "./Board";
import { fruits, characters, animals, cars, emojis } from "./imagesGroup";

const imagesGroup = ["Emojis", "Animals", "Fruits", "Cars", "Movie Characters"];
export default function MemoryCards() {
  const [images, setImages] = useState([]);
  const [isImagesGroupChosen, setIsImagesGroupChosen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easy, setEasy] = useState(false);
  const [normal, setNormal] = useState(false);
  const [hard, setHard] = useState(false);
  const handleEasy = () => {
    setEasy(true);
    setNormal(false);
    setHard(false);
    setIsGameStarted(true);
  };
  const handleNormal = () => {
    setEasy(false);
    setNormal(true);
    setHard(false);
    setIsGameStarted(true);
  };
  const handleHard = () => {
    setEasy(false);
    setNormal(false);
    setHard(true);
    setIsGameStarted(true);
  };
  const handleChangeImages = (e) => {
    if (e.target.value === "Fruits") {
      let initialImagesArray;
      if (easy) {
        initialImagesArray = fruits.slice(0, 4).flatMap((n) => [n, n, n, n]);
      } else if (normal) {
        initialImagesArray = fruits.slice(0, 16).flatMap((n) => [n, n, n, n]);
      } else if (hard) {
        initialImagesArray = fruits.flatMap((n) => [n, n, n, n]);
      }
      let copyImages = [...images];
      for (let i = 0; i < initialImagesArray.length; i++) {
        copyImages.push({ image: initialImagesArray[i], imageIndex: i });
      }
      setImages(copyImages);
    }
    if (e.target.value === "Movie Characters") {
      let initialImagesArray;
      if (easy) {
        initialImagesArray = characters
          .slice(0, 4)
          .flatMap((n) => [n, n, n, n]);
      } else if (normal) {
        initialImagesArray = characters
          .slice(0, 16)
          .flatMap((n) => [n, n, n, n]);
      } else if (hard) {
        initialImagesArray = characters.flatMap((n) => [n, n, n, n]);
      }
      let copyImages = [...images];
      for (let i = 0; i < initialImagesArray.length; i++) {
        copyImages.push({ image: initialImagesArray[i], imageIndex: i });
      }
      setImages(copyImages);
    }
    if (e.target.value === "Animals") {
      let initialImagesArray;
      if (easy) {
        initialImagesArray = animals.slice(0, 4).flatMap((n) => [n, n, n, n]);
      } else if (normal) {
        initialImagesArray = animals.slice(0, 16).flatMap((n) => [n, n, n, n]);
      } else if (hard) {
        initialImagesArray = animals.flatMap((n) => [n, n, n, n]);
      }
      let copyImages = [...images];
      for (let i = 0; i < initialImagesArray.length; i++) {
        copyImages.push({ image: initialImagesArray[i], imageIndex: i });
      }
      setImages(copyImages);
    }
    if (e.target.value === "Cars") {
      let initialImagesArray;
      if (easy) {
        initialImagesArray = cars.slice(0, 4).flatMap((n) => [n, n, n, n]);
      } else if (normal) {
        initialImagesArray = cars.slice(0, 16).flatMap((n) => [n, n, n, n]);
      } else if (hard) {
        initialImagesArray = cars.flatMap((n) => [n, n, n, n]);
      }
      let copyImages = [...images];
      for (let i = 0; i < initialImagesArray.length; i++) {
        copyImages.push({ image: initialImagesArray[i], imageIndex: i });
      }
      setImages(copyImages);
    }
    if (e.target.value === "Emojis") {
      let initialImagesArray;
      if (easy) {
        initialImagesArray = emojis.slice(0, 4).flatMap((n) => [n, n, n, n]);
      } else if (normal) {
        initialImagesArray = emojis.slice(0, 16).flatMap((n) => [n, n, n, n]);
      } else if (hard) {
        initialImagesArray = emojis.flatMap((n) => [n, n, n, n]);
      }
      let copyImages = [...images];
      for (let i = 0; i < initialImagesArray.length; i++) {
        copyImages.push({ image: initialImagesArray[i], imageIndex: i });
      }
      setImages(copyImages);
    }
    setIsImagesGroupChosen(true);
  };

  return (
    <div>
      {!isGameStarted && <button onClick={handleEasy}>Easy</button>}
      {!isGameStarted && <button onClick={handleNormal}>Normal</button>}
      {!isGameStarted && <button onClick={handleHard}>Hard</button>}
      {isGameStarted && (
        <div>
          {!isImagesGroupChosen && (
            <label htmlFor="images">Select the images Group</label>
          )}
          <select
            onChange={handleChangeImages}
            name="images"
            id="images"
            disabled={isImagesGroupChosen}
          >
            <option value="" disabled selected>
              Select the images Group
            </option>
            {imagesGroup.map((group) => (
              <option>{group}</option>
            ))}
          </select>
        </div>
      )}
      {isGameStarted && (
        <Board
          images={images}
          nrows={easy ? 4 : normal ? 8 : 10}
          ncols={easy ? 4 : normal ? 8 : 10}
          isImagesGroupChosen={isImagesGroupChosen}
          easy={easy}
          normal={normal}
        />
      )}
    </div>
  );
}
