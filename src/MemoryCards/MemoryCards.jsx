import { useState, useEffect } from "react";
import Board from "./Board";
import { fruits, characters, animals, cars, emojis } from "./imagesGroup";

const imagesGroup = ["Emojis", "Animals", "Fruits", "Cars", "Movie Characters"];
export default function MemoryCards() {
  const [images, setImages] = useState([]);
  const [isImagesGroupChosen, setIsImagesGroupChosen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [hardMode, setHardMode] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [pair, setPair] = useState(0);
  const [isWin, setIsWin] = useState("");
  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setHardMode(false);
    setIsGameStarted(true);
  };
  const handleNormalMode = () => {
    setEasyMode(false);
    setNormalMode(true);
    setHardMode(false);
    setIsGameStarted(true);
  };
  const handleHardMode = () => {
    setEasyMode(false);
    setNormalMode(false);
    setHardMode(true);
    setIsGameStarted(true);
  };
  const handleChangeImages = (e) => {
    if (e.target.value === "Fruits") {
      let initialImagesArray;
      if (easyMode) {
        initialImagesArray = fruits.slice(0, 4).flatMap((n) => [n, n, n, n]);
      } else if (normalMode) {
        initialImagesArray = fruits.slice(0, 16).flatMap((n) => [n, n, n, n]);
      } else if (hardMode) {
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
      if (easyMode) {
        initialImagesArray = characters
          .slice(0, 4)
          .flatMap((n) => [n, n, n, n]);
      } else if (normalMode) {
        initialImagesArray = characters
          .slice(0, 16)
          .flatMap((n) => [n, n, n, n]);
      } else if (hardMode) {
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
      if (easyMode) {
        initialImagesArray = animals.slice(0, 4).flatMap((n) => [n, n, n, n]);
      } else if (normalMode) {
        initialImagesArray = animals.slice(0, 16).flatMap((n) => [n, n, n, n]);
      } else if (hardMode) {
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
      if (easyMode) {
        initialImagesArray = cars.slice(0, 4).flatMap((n) => [n, n, n, n]);
      } else if (normalMode) {
        initialImagesArray = cars.slice(0, 16).flatMap((n) => [n, n, n, n]);
      } else if (hardMode) {
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
      if (easyMode) {
        initialImagesArray = emojis.slice(0, 4).flatMap((n) => [n, n, n, n]);
      } else if (normalMode) {
        initialImagesArray = emojis.slice(0, 16).flatMap((n) => [n, n, n, n]);
      } else if (hardMode) {
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
  const handleStartTimer = () => setIsTimerRunning(true);
  const handleStopTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setSeconds(50);
    setIsTimerRunning(false);
  };
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev > 1 && prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);
  useEffect(() => {
    if (pair === images.length && seconds > 0 && pair !== 0) {
      setIsWin(true);
    }
  }, [pair]);
  useEffect(() => {
    if (seconds < 1) {
      setIsWin(false);
    }
  }, [seconds]);
  return (
    <div>
      {!isGameStarted && <button onClick={handleEasyMode}>Easy</button>}
      {!isGameStarted && <button onClick={handleNormalMode}>Normal</button>}
      {!isGameStarted && <button onClick={handleHardMode}>Hard</button>}
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
      {isTimerRunning && (normalMode || hardMode) && (
        <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
          {seconds}
        </h3>
      )}
      <h2>{isWin === true && "You Win!"}</h2>
      <h2>{isWin === false && "Time's Up!"}</h2>
      {isGameStarted && (
        <Board
          images={images}
          nrows={easyMode ? 4 : normalMode ? 8 : 10}
          ncols={easyMode ? 4 : normalMode ? 8 : 10}
          isImagesGroupChosen={isImagesGroupChosen}
          easyMode={easyMode}
          normalMode={normalMode}
          hardMode={hardMode}
          setIsWin={setIsWin}
          seconds={seconds}
          setSeconds={setSeconds}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
          handleResetTimer={handleResetTimer}
          pair={pair}
          setPair={setPair}
        />
      )}
    </div>
  );
}
