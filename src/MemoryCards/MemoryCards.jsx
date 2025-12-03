import { useState, useEffect } from "react";
import Board from "./Board";
import ConfirmationBox from "../ConfirmationBox";
import ModeExplaination from "../ModeExplaination";
import { fruits, characters, animals, cars, emojis } from "./imagesGroup";

const imagesGroup = ["Emojis", "Animals", "Fruits", "Cars", "Movie Characters"];
export default function MemoryCards({
  setShowMemoryCards,
  setShowGameTitles,
  updateTotalPoint,
}) {
  const [images, setImages] = useState([]);
  const [isImagesGroupChosen, setIsImagesGroupChosen] = useState(false);
  const [board, setBoard] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [hardMode, setHardMode] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [pair, setPair] = useState(0);
  const [showBoard, setShowBoard] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [isWin, setIsWin] = useState("");
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [addSecondsChance, setAddSecondsChance] = useState(true);
  const [seeAllCardsChanceTemp, setSeeAllCardsChanceTemp] = useState(true);
  const [seeAllCardsChancePer, setSeeAllCardsChancePer] = useState(true);
  const [findMatchChance, setFindMatchChance] = useState(true);
  const [identicalIndexArray, setIdenticalIndexArray] = useState([]);
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
    if (normalMode) {
      setSeconds(180);
    } else if (hardMode) {
      setSeconds(270);
    }
    setIsTimerRunning(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setIsGameStarted(false);
    setShowMemoryCards(false);
    setShowGameTitles(true);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
    setShowBoard(false);
    setImages([]);
    setIsImagesGroupChosen(false);
    setEasyMode(false);
    setNormalMode(false);
    setHardMode(false);
    setIsTimerRunning(false);
    setSeconds(5);
    setPair(0);
    setIsWin("");
    handleResetTimer();
    setIsTogglingReset(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const add15Seconds = () => {
    setSeconds((seconds) => seconds + 15);
    setAddSecondsChance(false);
  };
  const seeAllCards = () => {
    setSeeAllCardsChanceTemp(false);
    setTimeout(() => {
      setSeeAllCardsChanceTemp(true);
    }, 3000);
    setSeeAllCardsChancePer(false);
  };
  const findMatch = () => {
    setIdenticalIndexArray([]);
    for (const row of board) {
      for (const card of row) {
        if (
          Math.floor(card[2] / 4) === Math.floor(visibleCards[0][2] / 4) &&
          card[3] === 0 &&
          [card[0], card[1]].toString() !==
            [visibleCards[0][0], visibleCards[0][1]].toString()
        ) {
          setIdenticalIndexArray((currIdenticalIndexArray) => [
            ...currIdenticalIndexArray,
            card,
          ]);
        }
      }
    }
    setFindMatchChance(false);
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
      if (normalMode) {
        updateTotalPoint(1);
      } else if (hardMode) {
        updateTotalPoint(2);
      }
      handleStopTimer();
    }
  }, [pair]);
  useEffect(() => {
    if (seconds < 1) {
      setIsWin(false);
      handleStopTimer();
    }
  }, [seconds]);
  useEffect(() => {
    if (identicalIndexArray.length !== 0) {
      setBoard((currBoard) =>
        currBoard.map((row) =>
          row.map((card) =>
            [card[0], card[1]].toString() ===
              [visibleCards[0][0], visibleCards[0][1]].toString() ||
            [card[0], card[1]].toString() ===
              [identicalIndexArray[0][0], identicalIndexArray[0][1]].toString()
              ? [...card.slice(0, -1), 2]
              : card
          )
        )
      );
      setVisibleCards([]);
    }
  }, [identicalIndexArray]);
  return (
    <div>
      <div>
        identicalIndexArray:{" "}
        {identicalIndexArray.map((i) => (
          <div>
            {i[0]} - {i[1]} - {i[2]} - {i[3]}
          </div>
        ))}
      </div>
      {!isGameStarted && !isTogglingHomePage && (
        <button onClick={handleEasyMode}>Easy</button>
      )}
      {!isGameStarted && !isTogglingHomePage && (
        <button onClick={handleNormalMode}>Normal</button>
      )}
      {!isGameStarted && !isTogglingHomePage && (
        <button onClick={handleHardMode}>Hard</button>
      )}
      {easyMode && isWin === "" && !isTogglingReset && !isTogglingHomePage && (
        <ModeExplaination message="Easy Mode: You won't get any stars if you win." />
      )}
      {normalMode &&
        isWin === "" &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <ModeExplaination message="Normal Mode: You'll get 1 star if you win." />
        )}
      {hardMode && isWin === "" && !isTogglingReset && !isTogglingHomePage && (
        <ModeExplaination message="Hard Mode: You'll get 2 stars if you win." />
      )}
      {isGameStarted &&
        !isTogglingHomePage &&
        !isTogglingReset &&
        !showBoard && (
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
      {isTimerRunning && (normalMode || hardMode) && isWin === "" && (
        <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
          {seconds}
        </h3>
      )}
      {!isTogglingHomePage && !isTogglingReset && (
        <h2>{isWin === true && "You Win!"}</h2>
      )}
      {!isTogglingHomePage && !isTogglingReset && (
        <h2>{isWin === false && "Time's Up!"}</h2>
      )}
      {isWin &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        (easyMode || normalMode || hardMode) && (
          <div>
            <button onClick={toggleResetYes}>Play Again</button>
          </div>
        )}
      {seconds < 1 &&
        (normalMode || hardMode) &&
        !isTogglingReset &&
        !isTogglingHomePage && (
          <div>
            <button onClick={toggleResetYes}>Try Again</button>
          </div>
        )}
      {showBoard &&
        isWin === "" &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        (easyMode || normalMode || hardMode) &&
        seconds > 0 && (
          <div>
            <button onClick={toggleReset}>Reset the Game</button>
          </div>
        )}
      {isTogglingReset && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to reset the game?"
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        </div>
      )}
      {!isTogglingHomePage && !isTogglingReset && (
        <div>
          <button onClick={() => toggleHomePage()}>
            Back to the home page
          </button>
        </div>
      )}
      {isTogglingHomePage && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to go back to Home Page?"
            toggleYes={toggleHomePageYes}
            toggleCancel={toggleHomePageCancel}
          />
        </div>
      )}
      {isGameStarted &&
        isWin === "" &&
        isTimerRunning &&
        !isTogglingHomePage &&
        !isTogglingReset && (
          <button onClick={add15Seconds} disabled={!addSecondsChance}>
            Add 15 seconds
          </button>
        )}
      {isGameStarted &&
        isWin === "" &&
        showBoard &&
        !isTogglingHomePage &&
        !isTogglingReset && (
          <button
            onClick={seeAllCards}
            disabled={!seeAllCardsChanceTemp || !seeAllCardsChancePer}
          >
            See all cards for 3 seconds
          </button>
        )}
      {isGameStarted &&
        isWin === "" &&
        showBoard &&
        !isTogglingHomePage &&
        !isTogglingReset && (
          <button
            onClick={findMatch}
            disabled={!findMatchChance || visibleCards.length !== 1}
          >
            Reveil the identical card
          </button>
        )}
      {isGameStarted && (
        <Board
          images={images}
          nrows={easyMode ? 4 : normalMode ? 8 : 10}
          ncols={easyMode ? 4 : normalMode ? 8 : 10}
          isImagesGroupChosen={isImagesGroupChosen}
          board={board}
          setBoard={setBoard}
          easyMode={easyMode}
          normalMode={normalMode}
          hardMode={hardMode}
          showBoard={showBoard}
          visibleCards={visibleCards}
          setVisibleCards={setVisibleCards}
          setShowBoard={setShowBoard}
          setIsWin={setIsWin}
          seconds={seconds}
          setSeconds={setSeconds}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
          pair={pair}
          setPair={setPair}
          isTogglingHomePage={isTogglingHomePage}
          isTogglingReset={isTogglingReset}
          updateTotalPoint={updateTotalPoint}
          seeAllCardsChanceTemp={seeAllCardsChanceTemp}
          seeAllCardsChancePer={seeAllCardsChancePer}
        />
      )}
    </div>
  );
}
