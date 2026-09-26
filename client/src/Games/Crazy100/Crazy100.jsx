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
  // The 4 numbers that are the answers
  // Each answer is an object; the value of the "number" key is the actual number
  // the value of the "blockNum" key is the index of the block that contains the number:
  const [nums, setNums] = useState([
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
  ]);
  // An array whose elements are all the numbers from 1 to 33;
  // The first 3 numbers of the final answer will be chosen from this array:
  const [allNums, setAllNums] = useState(
    Array.from({ length: 33 }, (_, i) => i + 1),
  );
  // An array whose elements are all the numbers from 1 to 99;
  // The other 12 numbers will be chosen from this array:
  const [extraNums, setExtraNums] = useState(
    Array.from({ length: 99 }, (_, i) => i + 1),
  );
  // The array that stores the other 12 numbers:
  const [chosenExtraNums, setChosenExtraNums] = useState([]);
  // An array whose elements are all the numbers from 1 to 16
  // Each element of this array will be assigned to one of the
  // blocks that will be rendered on UI:
  const [blockNums, setBlockNums] = useState(
    Array.from({ length: 16 }, (_, i) => i),
  );
  // The array that stores the numbers that the user will choose as their answer
  // after clicking on the submit button:
  const [answer, setAnswer] = useState([]);
  // The state variable that indicates the final status of the game:
  const [isWin, setIsWin] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [seconds, setSeconds] = useState(120); // In normal mode, the user should guess the 4 numbers in 120 seconds
  // The state variable that indicates if the timer is running:
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The user should choose only 4 numbers, no more no less.
  // The "is4Blocks" boolean state variable indicates if 4 numbers are chosen by the user or not
  const [is4Blocks, setIs4Blocks] = useState(true);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  // The function that is executed when the game starts:
  const generateNums = () => {
    setIsGameStarted(true);
    // Creating copies of the appropriate state variables:
    let copyAllNums = [...allNums];
    let copyblockNums = [...blockNums];
    let copyExtraNums = [...extraNums];
    let pickedNums = [];
    // Creating the 4 random number
    for (let i = 0; i < 4; i++) {
      let newNum;
      // Each of the first 3 numbers is a randomly chosen number from 1 to 33:
      if (i !== 3) {
        newNum = copyAllNums[Math.floor(Math.random() * copyAllNums.length)];
      }
      // Creating the fourth number:
      if (i === 3) {
        // If the fourth number is going to be equal to one of the first randomly
        // chosen three numbers, it's a bad error!
        if (
          // The fourth number is going to be equal to the first randomly chosen number:
          100 -
            pickedNums[0].number -
            pickedNums[1].number -
            pickedNums[2].number ===
            pickedNums[0].number ||
          // The fourth number is going to be equal to the second randomly chosen number:
          100 -
            pickedNums[0].number -
            pickedNums[1].number -
            pickedNums[2].number ===
            pickedNums[1].number ||
          // The fourth number is going to be equal to the third randomly chosen number:
          100 -
            pickedNums[0].number -
            pickedNums[1].number -
            pickedNums[2].number ===
            pickedNums[2].number
        ) {
          console.log(
            "Bad Error: ",
            pickedNums[0].number,
            pickedNums[1].number,
            pickedNums[2].number,
          );
          // If the bad error happens, there will be four pre-defined numbers:
          pickedNums[0].number = 23;
          pickedNums[1].number = 24;
          pickedNums[2].number = 25;
        }
        // In any case, the fourth number is "100 - first number - second number - third number":
        newNum =
          100 -
          pickedNums[0].number -
          pickedNums[1].number -
          pickedNums[2].number;
      }
      // Choosing a random number from 1 to 16 for the number of the block of the number:
      const newBlockNums =
        copyblockNums[Math.floor(Math.random() * copyblockNums.length)];
      // Pushing the new created object into the "pickedNums" array
      // (This object has 2 pairs: the value of the "number" is the created number and the value of
      // the "blockNum" is the number of the block that shows the number)
      pickedNums.push({ number: newNum, blockNum: newBlockNums });
      // Removing the new randomly chosen number form the array that contains all the numbers from 1 to 99
      // because we don't want the numbers to be repetitive
      copyAllNums = copyAllNums.filter((n) => n !== newNum);
      // Removing the new randomly chosen block number from the list that contains the numbers from 1 tp 16
      // because each number should be assigned to the unique block
      copyblockNums = copyblockNums.filter((r) => r !== newBlockNums);
      // Removing the new randomly chosen number form the array that contains all the numbers from 1 to 99
      // that contains the numbers for the other 12 numbers
      // The 4 chosen numbers shouldn't be among the other 12 numbers
      copyExtraNums = copyExtraNums.filter((e) => e !== newNum);
    }
    // Looping through the 4 randomly chosen numbers and assigning each to the "nums" state variable:
    for (let i = 0; i < 4; i++) {
      // Pushing the 4 randomly chosen numbers into the "nums" state variable
      setNums((currNums) => {
        const copyNums = [...currNums]; // De-structuring the "nums" state variable
        copyNums[i] = {
          ...copyNums[i], // De-structuring the "copyNums" variable
          number: pickedNums[i].number, // Assigning the randomly chosen number to the value of the "number" key
          blockNum: pickedNums[i].blockNum, // Assigning the randomly chosen block number to the value of the "blockNum" key
          clicked: false, // Assigning the false boolean value to the value of the "clicked" key (At first none of the blocks are clicked)
        };
        return copyNums; // Since we're still inside the "setNums" function, returning everything we just created will be
        // assigned to the "nums" state variable
      });
    }
    // Creating the array that contains the other 12 numbers
    // (that are not the correct answers of the game) in a new random format:
    let pickedChosenExtraNums = [];
    for (let i = 0; i < 16; i++) {
      // Choosing a random number from the array that contains the other 12 numbers:
      let newNum = getRandArr(copyExtraNums);
      // Pushing the randomly chosen number from the array that contains the other 12 numbers into
      // the array that will have them in a new random format:
      pickedChosenExtraNums.push(newNum);
      // Removing the randomly chosen number from the extraNums array:
      copyExtraNums = copyExtraNums.filter((e) => e !== newNum);
    }
    // Assigning the temporary array that contains the other 12 numbers
    // to the "chosenExtraNums" state variable:
    for (let i = 0; i < 16; i++) {
      setChosenExtraNums((currChosenExtraNums) => {
        const copyChosenExtraNums = [...currChosenExtraNums]; // De-structuring the "copyChosenExtraNums" array
        copyChosenExtraNums[i] = {
          number: pickedChosenExtraNums[i], // Assigning the randomly chosen number to the value of the "number" key
          clicked: false, // Assigning the false boolean value to the value of the "clicked" key
        };
        return copyChosenExtraNums; // Since we're still inside the "setChosenExtraNums" function, returning everything
        // we just created will be assigned to the "chosenExtraNums" state variable
      });
    }
    // Updating the appropriate state variables:
    setAllNums(copyAllNums);
    setBlockNums(copyblockNums);
    setExtraNums(copyExtraNums);
    // If the game is on "normalMode", start the timer:
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
        updateTotalPoint(10);
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
      {/* {nums?.map(n => <div>{n.number} - {n.blockNum}</div>)} */}
      {isAboutPage && <AboutCrazy100 setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Crazy-100
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isTogglingReset && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={handleAboutPage}
                    >
                      About Crazy-100
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleLevel()}
                      disabled={
                        !isGameStarted ||
                        (!easyMode && !normalMode) ||
                        !is4Blocks
                      }
                    >{`${easyMode ? "Switch to Normal Mode" : normalMode ? "Switch to Easy Mode" : "Switch level"}`}</button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={toggleReset}
                      disabled={
                        !isGameStarted ||
                        !is4Blocks ||
                        seconds < 1 ||
                        (!easyMode && !normalMode) ||
                        isWin !== ""
                      }
                    >
                      Reset the Game
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleHomePage()}
                      disabled={!is4Blocks}
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>
          {isGameStarted && (easyMode || normalMode) && isTogglingLevel && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question={`Are you sure you want to switch to ${
                      easyMode ? "Normal Mode" : "Easy Mode"
                    }?`}
                    toggleYes={toggleLevelYes}
                    toggleCancel={toggleLevelCancel}
                    easyMode={easyMode}
                  />
                </div>
              </div>
            </div>
          )}
          {isTogglingReset && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question="Are you sure you want to reset the game?"
                    toggleYes={toggleResetYes}
                    toggleCancel={toggleResetCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {isTogglingHomePage && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question="Are you sure you want to go back to Home Page?"
                    toggleYes={toggleHomePageYes}
                    toggleCancel={toggleHomePageCancel}
                  />
                </div>
              </div>
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
              <div className="container">
                <div className="row">
                  <div className="col-10 offset-1 d-flex justify-content-center mt-3">
                    <h3>
                      Among the 16 numbers, choose 4 of them whose sum equals
                      100.
                    </h3>
                  </div>
                </div>
              </div>
            )}
          {isGameStarted &&
            normalMode &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <h3
                className="mt-3"
                style={seconds > 9 ? { color: "green" } : { color: "red" }}
              >
                {seconds}
              </h3>
            )}
          {isWin === true &&
            seconds > 0 &&
            !isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel && (
              <div className="container">
                <div className="row">
                  <div className="col-10 offset-1 d-flex justify-content-center mt-3">
                    <h1
                      className="fasterOne"
                      style={{ fontSize: "40px" }}
                    >{`You Win${normalMode ? "!" : ", but you don't get any stars!"}`}</h1>
                  </div>
                </div>
              </div>
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
              <div className="container">
                <div className="row">
                  <div className="col-8 offset-2 d-flex justify-content-center">
                    <Blocks
                      nums={nums}
                      chosenExtraNums={chosenExtraNums}
                      blockNums={blockNums}
                      isWin={isWin}
                      seconds={seconds}
                      handleClickNum={handleClickNum}
                      handleClickChosenExtraNum={handleClickChosenExtraNum}
                    />
                  </div>
                </div>
              </div>
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
            <div>
              <div className="container">
                <div className="row">
                  <div className="col-10 offset-1 d-flex justify-content-center mt-4">
                    {`You chose ${answer.length} number${
                      answer.length > 1 ? "s" : ""
                    }, you should choose only 4 numbers, no more no less!`}
                  </div>
                </div>
              </div>
              <div>
                <button className="btn2 mt-2" onClick={handle4Blocks}>
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
                style={{ position: "relative", top: "30px" }}
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
      <br />
    </div>
  );
}
