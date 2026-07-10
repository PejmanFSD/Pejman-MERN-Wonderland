import { useState, useEffect } from "react";
import Board from "./Board";
import ConfirmationBox from "../ConfirmationBox";
import {
  fruits,
  characters,
  animals,
  cars,
  emojis,
  animations,
} from "./imagesGroup";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutMemoryCards from "./AboutMemoryCards";

const imagesGroup = [
  "Animals",
  "Fruits",
  "Animation Characters",
  "Cars",
  "Movie Characters",
  "Emojis",
];
export default function MemoryCards({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
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
  const [findMatchChance1, setFindMatchChance1] = useState(true);
  const [findMatchChance2, setFindMatchChance2] = useState(true);
  const [identicalIndexArray, setIdenticalIndexArray] = useState([]);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
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
    if (e.target.value === "Animation Characters") {
      let initialImagesArray;
      if (easyMode) {
        initialImagesArray = animations
          .slice(0, 4)
          .flatMap((n) => [n, n, n, n]);
      } else if (normalMode) {
        initialImagesArray = animations
          .slice(0, 16)
          .flatMap((n) => [n, n, n, n]);
      } else if (hardMode) {
        initialImagesArray = animations.flatMap((n) => [n, n, n, n]);
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
    navigate("/");
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
    setBoard([]);
    setVisibleCards([]);
    setImages([]);
    setIsImagesGroupChosen(false);
    setEasyMode(false);
    setNormalMode(false);
    setHardMode(false);
    setIsTimerRunning(false);
    setSeconds(5);
    setPair(0);
    setIsWin("");
    setIdenticalIndexArray([]);
    setSeeAllCardsChancePer(true);
    setFindMatchChance1(true);
    setFindMatchChance2(true);
    setAddSecondsChance(true);
    handleResetTimer();
    setIsTogglingReset(false);
    setShowReviews(true);
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
  };
  const findMatch1 = () => {
    findMatch();
    setFindMatchChance1(false);
  };
  const findMatch2 = () => {
    findMatch();
    setFindMatchChance2(false);
  };
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
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
        updateTotalPoint(4);
      } else if (hardMode) {
        updateTotalPoint(8);
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
              : card,
          ),
        ),
      );
      setPair((pair) => pair + 2);
      setVisibleCards([]);
    }
  }, [identicalIndexArray]);
  useEffect(() => {
    document.title = "Memory Cards";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutMemoryCards setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Memory Cards
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-md-4 align-self-center">
                {!isTogglingHomePage && !isTogglingReset && (
                  <button
                    className="btn3 my-1"
                    style={{ width: "200px" }}
                    onClick={handleAboutPage}
                  >
                    About Memory Cards
                  </button>
                )}
              </div>
              <div className="col-md-4 align-self-center">
                {!isTogglingReset && !isTogglingHomePage && (
                  <button
                    className="btn3 my-1"
                    style={{ width: "200px" }}
                    onClick={toggleReset}
                    disabled={
                      !showBoard ||
                      isWin !== "" ||
                      (!easyMode && !normalMode && !hardMode) ||
                      seconds < 1
                    }
                  >
                    Reset the Game
                  </button>
                )}
              </div>
              <div className="col-md-4 align-self-center">
                {!isTogglingHomePage && !isTogglingReset && (
                  <button
                    className="btn3 my-1"
                    style={{ width: "200px" }}
                    onClick={() => toggleHomePage()}
                  >
                    Back to home page
                  </button>
                )}
              </div>
            </div>
          </div>
          {isTogglingReset && (
            <div>
              <ConfirmationBox
                question="Are you sure you want to reset the game?"
                toggleYes={toggleResetYes}
                toggleCancel={toggleResetCancel}
              />
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
          <div className="four-buttons-container" style={{ marginTop: "15px" }}>
            {!isGameStarted && !isTogglingHomePage && (
              <button className="btn1" onClick={handleEasyMode}>
                Easy
              </button>
            )}
            {!isGameStarted && !isTogglingHomePage && (
              <button className="btn1" onClick={handleNormalMode}>
                Normal
              </button>
            )}
            {!isGameStarted && !isTogglingHomePage && (
              <button className="btn1" onClick={handleHardMode}>
                Hard
              </button>
            )}
          </div>
          {isGameStarted &&
            !isTogglingHomePage &&
            !isTogglingReset &&
            !showBoard && (
              <div>
                {!isImagesGroupChosen && (
                  <label htmlFor="images">Select the images Group</label>
                )}
                <br />
                <select
                  onChange={handleChangeImages}
                  name="images"
                  id="images"
                  disabled={isImagesGroupChosen}
                  style={{
                    borderRadius: "8px",
                    margin: "10px",
                    width: "200px",
                    height: "30px",
                    textAlign: "center",
                  }}
                >
                  <option value="" disabled selected>
                    Select the images Group
                  </option>
                  {imagesGroup.map((group, i) => (
                    <option key={i}>{group}</option>
                  ))}
                </select>
              </div>
            )}
          {isTimerRunning && (normalMode || hardMode) && isWin === "" && (
            <h3
              className="my-2"
              style={seconds > 9 ? { color: "green" } : { color: "red" }}
            >
              {seconds}
            </h3>
          )}
          {!isTogglingHomePage &&
            !isTogglingReset &&
            isWin === true &&
            easyMode && (
              <h2
                className="fasterOne"
                style={{ fontSize: "40px" }}
                style={{ fontSize: "40px" }}
              >
                You Win but you don't get any stars!
              </h2>
            )}
          {!isTogglingHomePage &&
            !isTogglingReset &&
            isWin === true &&
            (normalMode || hardMode) && (
              <h2 className="fasterOne" style={{ fontSize: "40px" }}>
                You Win!
              </h2>
            )}
          {!isTogglingHomePage && !isTogglingReset && (
            <h2
              className="fasterOne"
              style={{ fontSize: "40px" }}
              style={{ fontSize: "40px" }}
            >
              {isWin === false && "Time's Up!"}
            </h2>
          )}
          {isWin &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            (easyMode || normalMode || hardMode) && (
              <div>
                <button className="btn1" onClick={toggleResetYes}>
                  Play Again
                </button>
              </div>
            )}
          {seconds < 1 &&
            (normalMode || hardMode) &&
            !isTogglingReset &&
            !isTogglingHomePage && (
              <div>
                <button className="btn1" onClick={toggleResetYes}>
                  Try Again
                </button>
              </div>
            )}
          {isGameStarted &&
            isWin === "" &&
            isTimerRunning &&
            !isTogglingHomePage &&
            !isTogglingReset && (
              <button
                className="btn1 my-1"
                onClick={add15Seconds}
                disabled={!addSecondsChance}
                style={{ position: "relative", top: "10px" }}
              >
                Add 15 seconds
              </button>
            )}
          <div className="four-buttons-container">
            <div className="four-buttons-container">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 align-self-center">
                    {isGameStarted &&
                      isWin === "" &&
                      showBoard &&
                      !isTogglingHomePage &&
                      !isTogglingReset && (
                        <button
                          className="btn1 my-1"
                          onClick={seeAllCards}
                          disabled={
                            !seeAllCardsChanceTemp || !seeAllCardsChancePer
                          }
                        >
                          See all cards for 3 seconds
                        </button>
                      )}
                  </div>
                  <div className="col-md-4 align-self-center">
                    {isGameStarted &&
                      isWin === "" &&
                      showBoard &&
                      !isTogglingHomePage &&
                      !isTogglingReset && (
                        <button
                          className="btn1 my-1"
                          onClick={findMatch1}
                          disabled={
                            !findMatchChance1 || visibleCards.length !== 1
                          }
                        >
                          Reveal the identical card
                        </button>
                      )}
                  </div>
                  <div className="col-md-4 align-self-center">
                    {isGameStarted &&
                      isWin === "" &&
                      showBoard &&
                      !isTogglingHomePage &&
                      !isTogglingReset && (
                        <button
                          className="btn1 my-1"
                          onClick={findMatch2}
                          disabled={
                            !findMatchChance2 || visibleCards.length !== 1
                          }
                        >
                          Reveal the identical card
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <br />
          {!isTogglingReset && !isTogglingHomePage && isGameStarted && (
            <button className="btn1" onClick={handleReviewSection}>
              {showReviews
                ? "Hide the Reviews Section"
                : "Show the Reviews Section"}
            </button>
          )}
          {!isTogglingHomePage &&
            !isTogglingReset &&
            isGameStarted &&
            showReviews && (
              <ReviewSection game="MemoryCards" currentUser={currentUser} />
            )}
        </div>
      )}
      <div style={{ marginTop: "50px" }}></div>
    </div>
  );
}
