import { useState, useEffect } from "react";
import Cell from "./Cell";
import {
  balloonsPicsArray,
  ghostPicsArray,
  lionPicsArray,
  mansionPicsArray,
  numbersPicsArray,
  pencilsPicsArray,
} from "./imagesArray";
import E00 from "./images/E00.jpg";
import Balloons from "./images/Balloons/Balloons.jpg";
import Ghost from "./images/Ghost/Ghost.jpg";
import Lion from "./images/Lion/Lion.jpg";
import Mansion from "./images/Mansion/Mansion.jpg";
import Numbers from "./images/Numbers/Numbers.jpg";
import Pencils from "./images/Pencils/Pencils.jpg";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";

export default function Puzzle({
  updateTotalPoint,
  setShowGameTitles,
  setShowPuzzle,
  isAGameStarted,
  setIsAGameStarted,
}) {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [imageGroup, setImageGroup] = useState([]);
  const [isImageGroupChosen, setIsImageGroupChosen] = useState(false);
  const [isActiveUpButton, setIsActiveUpButton] = useState(false);
  const [isActiveLeftButton, setIsActiveLeftButton] = useState(false);
  const [isActiveDownButton, setIsActiveDownButton] = useState(false);
  const [isActiveRightButton, setIsActiveRightButton] = useState(false);
  const [isAnImageClicked, setIsAnImageClicked] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [seconds, setSeconds] = useState(400);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStart = () => {
    setIsGameStarted(true);
    setImageGroup((currImage) =>
      currImage.map((image) => ({
        ...image,
        currentLocation: currImage.indexOf(image),
      })),
    );
    handleResetTimer();
    if (normalMode) {
      handleStartTimer();
    }
  };
  const handleImageGroup = (e) => {
    if (e.target.value === "Balloons") {
      setImageGroup(balloonsPicsArray.sort(() => Math.random() - 0.5));
      setMainImage(Balloons);
    } else if (e.target.value === "Ghost") {
      setImageGroup(ghostPicsArray.sort(() => Math.random() - 0.5));
      setMainImage(Ghost);
    } else if (e.target.value === "Lion") {
      setImageGroup(lionPicsArray.sort(() => Math.random() - 0.5));
      setMainImage(Lion);
    } else if (e.target.value === "Mansion") {
      setImageGroup(mansionPicsArray.sort(() => Math.random() - 0.5));
      setMainImage(Mansion);
    } else if (e.target.value === "Numbers") {
      setImageGroup(numbersPicsArray.sort(() => Math.random() - 0.5));
      setMainImage(Numbers);
    } else if (e.target.value === "Pencils") {
      setImageGroup(pencilsPicsArray.sort(() => Math.random() - 0.5));
      setMainImage(Pencils);
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
  const handlePlayAgain = () => {
    setIsGameStarted(false);
    setFinalMessage("");
    setIsTogglingReset(false);
    setImageGroup([]);
    setMainImage(null);
    setIsImageGroupChosen(false);
    setIsActiveUpButton(false);
    setIsActiveLeftButton(false);
    setIsActiveDownButton(false);
    setIsActiveRightButton(false);
    setIsAnImageClicked(false);
    setSeconds(400);
    setIsTimerRunning(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    handlePlayAgain();
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    handlePlayAgain();
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setIsGameStarted(false);
    setShowPuzzle(false);
    setShowGameTitles(true);
    setIsAGameStarted(false);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  const handleStartTimer = () => setIsTimerRunning(true);
  const handleStopTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setSeconds(400);
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
    if (seconds < 1) {
      setFinalMessage("Time's Up!");
    }
  }, [seconds]);
  useEffect(() => {
    if (
      isImageGroupChosen &&
      imageGroup[0].currentLocation === imageGroup[0].correctLocation &&
      imageGroup[1].currentLocation === imageGroup[1].correctLocation &&
      imageGroup[2].currentLocation === imageGroup[2].correctLocation &&
      imageGroup[3].currentLocation === imageGroup[3].correctLocation &&
      imageGroup[4].currentLocation === imageGroup[4].correctLocation &&
      imageGroup[5].currentLocation === imageGroup[5].correctLocation &&
      imageGroup[6].currentLocation === imageGroup[6].correctLocation &&
      imageGroup[7].currentLocation === imageGroup[7].correctLocation &&
      imageGroup[8].currentLocation === imageGroup[8].correctLocation &&
      imageGroup[9].currentLocation === imageGroup[9].correctLocation &&
      imageGroup[10].currentLocation === imageGroup[10].correctLocation &&
      imageGroup[11].currentLocation === imageGroup[11].correctLocation &&
      imageGroup[12].currentLocation === imageGroup[12].correctLocation &&
      imageGroup[13].currentLocation === imageGroup[13].correctLocation &&
      imageGroup[14].currentLocation === imageGroup[14].correctLocation &&
      imageGroup[15].currentLocation === imageGroup[15].correctLocation &&
      imageGroup[16].currentLocation === imageGroup[16].correctLocation &&
      imageGroup[17].currentLocation === imageGroup[17].correctLocation &&
      imageGroup[18].currentLocation === imageGroup[18].correctLocation &&
      imageGroup[19].currentLocation === imageGroup[19].correctLocation &&
      imageGroup[20].currentLocation === imageGroup[20].correctLocation &&
      imageGroup[21].currentLocation === imageGroup[21].correctLocation &&
      imageGroup[22].currentLocation === imageGroup[22].correctLocation &&
      imageGroup[23].currentLocation === imageGroup[23].correctLocation &&
      imageGroup[24].currentLocation === imageGroup[24].correctLocation
    ) {
      if (easyMode) {
        handleStopTimer();
        setFinalMessage("You Win, but you don't get any stars!");
      } else if (normalMode) {
        handleStopTimer();
        setFinalMessage("You Win!");
        updateTotalPoint(1);
      }
    }
  }, [imageGroup]);
  return (
    <div>
      <h2>Puzzle</h2>
      {!isGameStarted && !easyMode && !normalMode && !isTogglingHomePage && (
        <div>
          <button onClick={handleEasyMode}>Easy Mode</button>
          <button onClick={handleNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode && !normalMode
        ? !isTogglingReset &&
          !isTogglingHomePage &&
          !isTogglingLevel && (
            <ModeExplaination message="Easy Mode: You won't get any stars if you win." />
          )
        : !easyMode &&
          normalMode &&
          !isTogglingReset &&
          !isTogglingHomePage &&
          !isTogglingLevel && (
            <ModeExplaination message="Normal Mode: You will get one star if you win." />
          )}
      {isGameStarted &&
        !isTogglingReset &&
        finalMessage === "" &&
        !isTogglingHomePage &&
        !isTogglingLevel &&
        (easyMode || normalMode) && (
          <div>
            <button onClick={toggleReset}>Reset the Game</button>
          </div>
        )}
      {isTogglingReset && finalMessage === "" && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to reset the game?"
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        </div>
      )}
      {(easyMode || normalMode) &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        !isTogglingLevel &&
        finalMessage === "" && (
          <div>
            <button
              style={{
                display: "inline",
              }}
              onClick={() => toggleLevel()}
            >{`Switch to ${easyMode ? "Normal Mode" : "Easy Mode"}`}</button>
          </div>
        )}
      {isTogglingLevel && finalMessage === "" && (
        <div>
          <ConfirmationBox
            question={`Are you sure you want to switch to ${
              easyMode ? "Normal Mode" : "Easy Mode"
            }?`}
            toggleYes={toggleLevelYes}
            toggleCancel={toggleLevelCancel}
            easyMode={easyMode}
          />
        </div>
      )}
      {!isTogglingHomePage &&
        !isTogglingReset &&
        !isTogglingLevel &&
        finalMessage === "" && (
          <div>
            <button onClick={() => toggleHomePage()}>
              Back to the home page
            </button>
          </div>
        )}
      {isTogglingHomePage && finalMessage === "" && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to go back to Home Page?"
            toggleYes={toggleHomePageYes}
            toggleCancel={toggleHomePageCancel}
          />
        </div>
      )}
      {finalMessage && <h2>{finalMessage}</h2>}
      {isGameStarted && normalMode && (
        <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
          {seconds}
        </h3>
      )}
      {!isGameStarted &&
        (easyMode || normalMode) &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage && (
          <div>
            <label htmlFor="imageGroup"></label>
            <select
              onChange={handleImageGroup}
              name="imageGroup"
              id="imageGroup"
            >
              <option value={imageGroup} disabled selected>
                Select an image group
              </option>
              {[
                "Balloons",
                "Ghost",
                "Lion",
                "Mansion",
                "Numbers",
                "Pencils",
              ].map((c) => (
                <option>{c}</option>
              ))}
            </select>
          </div>
        )}
      {!isGameStarted &&
        imageGroup.length !== 0 &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage && (
          <button onClick={handleStart}>Start the Game</button>
        )}
      {isGameStarted &&
        isImageGroupChosen &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage && (
          <img
            src={mainImage}
            style={{
              width: "150px",
              border: "1px solid black",
              position: "relative",
              top: "5px",
              display: "inline",
            }}
          />
        )}
      {isGameStarted &&
        isImageGroupChosen &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage && (
          <div
            style={{
              position: "relative",
              top: "5px",
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
                finalMessage={finalMessage}
              />
            ))}
          </div>
        )}
      {isGameStarted &&
        finalMessage === "" &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage && (
          <div>
            <button
              onClick={handleUp}
              style={{ position: "relative", top: "20px" }}
              disabled={
                isActiveUpButton === false || isAnImageClicked === false
              }
            >
              &#8593;
            </button>
            <br />
            <button
              onClick={handleLeft}
              style={{ position: "relative", top: "20px" }}
              disabled={
                isActiveLeftButton === false || isAnImageClicked === false
              }
            >
              &#8592;
            </button>
            <button
              onClick={handleDown}
              style={{ position: "relative", top: "20px" }}
              disabled={
                isActiveDownButton === false || isAnImageClicked === false
              }
            >
              &#8595;
            </button>
            <button
              onClick={handleRight}
              style={{ position: "relative", top: "20px" }}
              disabled={
                isActiveRightButton === false || isAnImageClicked === false
              }
            >
              &#8594;
            </button>
          </div>
        )}
      {/* <div
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
      </div> */}
    </div>
  );
}
