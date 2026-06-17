import { useState, useEffect } from "react";
import { getRandArr } from "../utils";
import ConfirmationBox from "../ConfirmationBox";
import GameLevel from "../GameLevel";
import Blocks from "./Blocks";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutCrazy100 from "./AboutCrazy100";

export default function Crazy100({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [nums, setNums] = useState([
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
  ]);
  const [allNums, setAllNums] = useState(
    Array.from({ length: 33 }, (_, i) => i + 1),
  );
  const [extraNums, setExtraNums] = useState(
    Array.from({ length: 99 }, (_, i) => i + 1),
  );
  const [chosenExtraNums, setChosenExtraNums] = useState([]);
  const [blockNums, setBlockNums] = useState(
    Array.from({ length: 16 }, (_, i) => i),
  );
  const [answer, setAnswer] = useState([]);
  const [isWin, setIsWin] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [is4Blocks, setIs4Blocks] = useState(true);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  const generateNums = () => {
    setIsGameStarted(true);
    let copyAllNums = [...allNums];
    let copyblockNums = [...blockNums];
    let copyExtraNums = [...extraNums];
    let pickedNums = [];
    for (let i = 0; i < 4; i++) {
      let newNum;
      if (i !== 3) {
        newNum = copyAllNums[Math.floor(Math.random() * copyAllNums.length)];
      }
      if (i === 3) {
        newNum =
          100 -
          pickedNums[0].number -
          pickedNums[1].number -
          pickedNums[2].number;
      }
      const newBlockNums =
        copyblockNums[Math.floor(Math.random() * copyblockNums.length)];
      pickedNums.push({ number: newNum, blockNum: newBlockNums });
      copyAllNums = copyAllNums.filter((n) => n !== newNum);
      copyblockNums = copyblockNums.filter((r) => r !== newBlockNums);
      copyExtraNums = copyExtraNums.filter((e) => e !== newNum);
    }
    for (let i = 0; i < 4; i++) {
      setNums((currNums) => {
        const copyNums = [...currNums];
        copyNums[i] = {
          ...copyNums[i],
          number: pickedNums[i].number,
          blockNum: pickedNums[i].blockNum,
          clicked: false,
        };
        return copyNums;
      });
    }
    let pickedChosenExtraNums = [];
    for (let i = 0; i < 16; i++) {
      let newNum = getRandArr(copyExtraNums);
      pickedChosenExtraNums.push(newNum);
      copyExtraNums = copyExtraNums.filter((e) => e !== newNum);
    }
    for (let i = 0; i < 16; i++) {
      setChosenExtraNums((currChosenExtraNums) => {
        const copyChosenExtraNums = [...currChosenExtraNums];
        copyChosenExtraNums[i] = {
          number: pickedChosenExtraNums[i],
          clicked: false,
        };
        return copyChosenExtraNums;
      });
    }
    setAllNums(copyAllNums);
    setBlockNums(copyblockNums);
    setExtraNums(copyExtraNums);
    if (normalMode) {
      handleStartTimer();
    }
  };
  const toggleClicked = (el) => {
    if (el.clicked) {
      return false;
    } else {
      return true;
    }
  };
  const handleClickChosenExtraNum = (e) => {
    if (!answer.includes(e.target.innerText)) {
      setAnswer((currAnswer) => [...currAnswer, e.target.innerText]);
    } else {
      setAnswer(answer.filter((num) => num !== e.target.innerText));
    }
    for (let chosenExtraNum of chosenExtraNums) {
      if (e.target.innerText.toString() === chosenExtraNum.number.toString()) {
        setChosenExtraNums((currChosenExtraNum) =>
          currChosenExtraNum.map(
            (chosenNum) =>
              chosenNum.number.toString() === e.target.innerText.toString()
                ? { ...chosenNum, clicked: toggleClicked(chosenExtraNum) } // update only this object
                : chosenNum, // leave the other objects unchanged
          ),
        );
      }
    }
  };
  const handleClickNum = (e) => {
    if (!answer.includes(e.target.innerText)) {
      setAnswer((currAnswer) => [...currAnswer, e.target.innerText]);
    } else {
      setAnswer(answer.filter((num) => num !== e.target.innerText));
    }
    for (let num of nums) {
      if (e.target.innerText.toString() === num.number.toString()) {
        setNums((currNum) =>
          currNum.map(
            (num) =>
              num.number.toString() === e.target.innerText.toString()
                ? { ...num, clicked: toggleClicked(num) } // update only this object
                : num, // leave the other objects unchanged
          ),
        );
      }
    }
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
    setNums([
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
    ]);
    setAllNums(Array.from({ length: 33 }, (_, i) => i + 1));
    setExtraNums(Array.from({ length: 99 }, (_, i) => i + 1));
    setChosenExtraNums([]);
    setBlockNums(Array.from({ length: 16 }, (_, i) => i));
    setAnswer([]);
    setIsWin("");
    handleResetTimer();
    setIsTogglingReset(false);
    setShowReviews(true);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
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
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleSubmit = () => {
    if (answer.length !== 4) {
      setIs4Blocks(false);
      return;
    }
    let sum = 0;
    for (let i = 0; i < answer.length; i++) {
      sum += Number(answer[i]);
    }
    if (sum === 100) {
      setIsWin(true);
      if (normalMode) {
        updateTotalPoint(4);
      }
    }
    if (sum !== 100) {
      setIsWin(false);
    }
    handleStopTimer();
  };
  const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    setIsGameStarted(false);
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    setNums([
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
      { number: "", blockNum: "" },
    ]);
    setAllNums(Array.from({ length: 33 }, (_, i) => i + 1));
    setExtraNums(Array.from({ length: 99 }, (_, i) => i + 1));
    setChosenExtraNums([]);
    setBlockNums(Array.from({ length: 16 }, (_, i) => i));
    setAnswer([]);
    setIsWin("");
    handleResetTimer();
    setIsTogglingLevel(false);
    setShowReviews(true);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  const handleStartTimer = () => setIsTimerRunning(true);
  const handleStopTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setSeconds(120);
    setIsTimerRunning(false);
  };
  const handle4Blocks = () => {
    setIs4Blocks(true);
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
    document.title = "Crazy-100";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutCrazy100 setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Crazy-100
          </h2>
          <div className="four-buttons-container">
            {!isTogglingHomePage && !isTogglingLevel && !isTogglingReset && (
              <button className="btn1" onClick={handleAboutPage}>
                About Crazy-100
              </button>
            )}
            {isGameStarted &&
              (easyMode || normalMode) &&
              !isTogglingReset &&
              !isTogglingHomePage &&
              !isTogglingLevel &&
              is4Blocks && (
                <button
                  className="btn1"
                  onClick={() => toggleLevel()}
                >{`Switch to ${easyMode ? "Normal Mode" : "Easy Mode"}`}</button>
              )}
            {isGameStarted &&
              isWin === "" &&
              !isTogglingReset &&
              !isTogglingHomePage &&
              (easyMode || normalMode) &&
              !isTogglingLevel &&
              seconds > 0 &&
              is4Blocks && (
                <button className="btn1" onClick={toggleReset}>
                  Reset the Game
                </button>
              )}
            {!isTogglingReset &&
              !isTogglingHomePage &&
              !isTogglingLevel &&
              is4Blocks && (
                <button className="btn1" onClick={() => toggleHomePage()}>
                  Back to home page
                </button>
              )}
          </div>
          {isGameStarted && (easyMode || normalMode) && isTogglingLevel && (
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
          {!easyMode && !normalMode && !isTogglingHomePage && (
            <GameLevel
              mode1="Easy"
              mode1Function={runEasyMode}
              mode2="Normal"
              mode2Function={runNormalMode}
              runEasyMode={runEasyMode}
              runNormalMode={runNormalMode}
            />
          )}
          {isGameStarted &&
            isWin === "" &&
            (easyMode || normalMode) &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h3>
                Among the 16 numbers, choose 4 of them whose sum equals 100.
              </h3>
            )}
          {isGameStarted &&
            normalMode &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
                {seconds}
              </h3>
            )}
          {isWin === true &&
            seconds > 0 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h1
                className="fasterOne"
                style={{ fontSize: "40px" }}
              >{`You Win${normalMode ? "!" : ", but you don't get any stars!"}`}</h1>
            )}
          {isWin === false &&
            seconds > 0 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h1 className="fasterOne" style={{ fontSize: "40px" }}>
                You Lose
              </h1>
            )}
          {seconds < 1 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h1 className="fasterOne" style={{ fontSize: "40px" }}>
                Time's up!
              </h1>
            )}
          {!isGameStarted &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            (easyMode || normalMode) &&
            !isTogglingLevel && (
              <div>
                <button className="btn1 my-3" onClick={() => generateNums()}>
                  Start
                </button>
              </div>
            )}
          {isGameStarted &&
            !isTogglingLevel &&
            !isTogglingReset &&
            !isTogglingHomePage && (
              <Blocks
                nums={nums}
                chosenExtraNums={chosenExtraNums}
                blockNums={blockNums}
                isWin={isWin}
                seconds={seconds}
                handleClickNum={handleClickNum}
                handleClickChosenExtraNum={handleClickChosenExtraNum}
              />
            )}
          {isGameStarted &&
            isWin === "" &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            seconds > 0 &&
            is4Blocks && (
              <div>
                <button
                  onClick={handleSubmit}
                  className="btn1 my-2"
                  style={{ position: "relative", top: "30px" }}
                  disabled={answer.length === 0}
                >
                  Done
                </button>
              </div>
            )}
          {isWin !== "" &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            (easyMode || normalMode) &&
            !isTogglingLevel && (
              <div>
                <button
                  onClick={toggleResetYes}
                  className="btn1"
                  style={{ position: "relative", top: "30px" }}
                >
                  {isWin ? "Play Again" : "Try Again"}
                </button>
              </div>
            )}
          {seconds < 1 &&
            normalMode &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div>
                <button
                  onClick={toggleResetYes}
                  className="btn1"
                  style={{ position: "relative", top: "30px" }}
                >
                  Try Again
                </button>
              </div>
            )}
          {!is4Blocks && (
            <div
              style={{
                position: "relative",
                top: "30px",
              }}
            >
              {`You chose ${answer.length} number${
                answer.length > 1 ? "s" : ""
              }, you should choose only 4 numbers, no more no less!`}
              <div>
                <button className="btn2" onClick={handle4Blocks}>
                  Ok
                </button>
              </div>
            </div>
          )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button
                onClick={handleReviewSection}
                className="btn1 my-3"
                style={{ position: "relative", top: "40px" }}
              >
                {showReviews
                  ? "Hide the Reviews Section"
                  : "Show the Reviews Section"}
              </button>
            )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted &&
            showReviews && (
              <div style={{ position: "relative", top: "15px" }}>
                <ReviewSection game="Crazy100" currentUser={currentUser} />
              </div>
            )}
        </div>
      )}
    </div>
  );
}
