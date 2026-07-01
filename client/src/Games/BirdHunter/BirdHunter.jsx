import { useState, useEffect } from "react";
import HuntingGround from "./HuntingGround";
import { getRandArr } from "../utils";
import T1 from "./images/T1.jpg";
import T2 from "./images/T2.jpg";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutBirdHunter from "./AboutBirdHunter";

export default function BirdHunter({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [grounds, setGrounds] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [chosenGround, setChosenGround] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delayMilliSec, setDelayMilliSec] = useState(1000);
  const [numOfDoneGrounds, setNumOfDoneGrounds] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  const handleStart = () => {
    setIsGameStarted(true);
    handleChooseGround();
  };
  const handleChooseGround = () => {
    const c = getRandArr(grounds);
    setChosenGround(c);
    setGrounds((currGrounds) => currGrounds.filter((g) => g !== c));
  };
  const handleAnnouncingTheGameResult = () => {
    setIsGameStarted(false);
    if (userScore > 13) {
      setFinalMessage("You Win!");
      updateTotalPoint(2);
    } else {
      setFinalMessage("You Lose!");
    }
  };
  const handlePlayAgain = () => {
    setGrounds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    setChosenGround(0);
    setIsRunning(false);
    setDelayMilliSec(1000);
    setNumOfDoneGrounds(0);
    setUserScore(0);
    setFinalMessage("");
    setIsTogglingHomePage(false);
    setShowReviews(true);
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
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  useEffect(() => {
    document.title = "Bird Hunter";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutBirdHunter setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Bird Hunter
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 offset-lg-3 align-self-center">
                {!isTogglingHomePage && (
                  <button
                    className="btn3 my-1"
                    style={{ width: "200px" }}
                    onClick={handleAboutPage}
                    disabled={isGameStarted}
                  >
                    About Bird Hunter
                  </button>
                )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage && (
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
          {isTogglingHomePage && (
            <div>
              <ConfirmationBox
                question="Are you sure you want to go back to Home Page?"
                toggleYes={toggleHomePageYes}
                toggleCancel={toggleHomePageCancel}
              />
            </div>
          )}
          {isGameStarted && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: "50px" }}>
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-xl-6 d-flex justify-content-center">
                      <div style={{ display: "inline" }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((el, idx) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid black",
                              margin: "5px",
                              padding: "7px",
                            }}
                            key={idx}
                          >
                            <img
                              src={T1}
                              height={isTogglingHomePage ? "30px" : "40px"}
                              alt=""
                            />
                            <HuntingGround
                              grounds={grounds}
                              groundNum={el}
                              chosenGround={chosenGround}
                              isRunning={isRunning}
                              setIsRunning={setIsRunning}
                              delayMilliSec={delayMilliSec}
                              setDelayMilliSec={setDelayMilliSec}
                              handleChooseGround={handleChooseGround}
                              setChosenGround={setChosenGround}
                              setNumOfDoneGrounds={setNumOfDoneGrounds}
                              setUserScore={setUserScore}
                              isTogglingHomePage={isTogglingHomePage}
                            />
                            <img
                              src={T2}
                              height={isTogglingHomePage ? "30px" : "40px"}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-12 col-xl-6 d-flex justify-content-center">
                      <div style={{ display: "inline" }}>
                        {[9, 10, 11, 12, 13, 14, 15, 16].map((el, idx) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid black",
                              margin: "5px",
                              padding: "7px",
                            }}
                            key={idx}
                          >
                            <img
                              src={T1}
                              height={isTogglingHomePage ? "30px" : "40px"}
                              alt=""
                            />
                            <HuntingGround
                              grounds={grounds}
                              groundNum={el}
                              chosenGround={chosenGround}
                              isRunning={isRunning}
                              setIsRunning={setIsRunning}
                              delayMilliSec={delayMilliSec}
                              setDelayMilliSec={setDelayMilliSec}
                              handleChooseGround={handleChooseGround}
                              setChosenGround={setChosenGround}
                              setNumOfDoneGrounds={setNumOfDoneGrounds}
                              setUserScore={setUserScore}
                              isTogglingHomePage={isTogglingHomePage}
                            />
                            <img
                              src={T2}
                              height={isTogglingHomePage ? "30px" : "40px"}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {grounds.length === 16 && !isTogglingHomePage && (
            <button
              className="btn1"
              style={{ position: "relative", top: "5px" }}
              onClick={handleStart}
              disabled={isRunning}
            >
              Start the Game
            </button>
          )}
          {numOfDoneGrounds === 16 &&
            finalMessage === "" &&
            !isTogglingHomePage && (
              <button
                className="btn1"
                style={{ position: "relative", top: "5px", marginTop: "20px" }}
                onClick={handleAnnouncingTheGameResult}
              >
                See the Game Result
              </button>
            )}
          <h2 className="fasterOne" style={{ fontSize: "40px" }}>
            {finalMessage && !isTogglingHomePage && finalMessage}
          </h2>
          <div>
            {finalMessage && userScore === 16 && !isTogglingHomePage && (
              <strong>Wow! You didn't miss a single bird!</strong>
            )}
          </div>
          <div>
            {finalMessage && userScore === 15 && !isTogglingHomePage && (
              <strong>You missed a bird!</strong>
            )}
          </div>
          <div>
            {finalMessage && userScore < 15 && !isTogglingHomePage && (
              <strong>{`You missed ${16 - userScore} birds!`}</strong>
            )}
          </div>
          {finalMessage === "You Win!" && !isTogglingHomePage && (
            <div>
              <div>Play Again!</div>
              <button
                onClick={handlePlayAgain}
                className="btn2"
                style={{ marginTop: "10px" }}
              >
                Ok
              </button>
            </div>
          )}
          {finalMessage === "You Lose!" && !isTogglingHomePage && (
            <div>
              <div>Try Again!</div>
              <button
                onClick={handlePlayAgain}
                className="btn2"
                style={{ marginTop: "10px" }}
              >
                Ok
              </button>
            </div>
          )}
          {!isTogglingHomePage && isGameStarted && (
            <button
              className="btn1"
              style={{ marginTop: "20px", marginBottom: "30px" }}
              onClick={handleReviewSection}
            >
              {showReviews
                ? "Hide the Reviews Section"
                : "Show the Reviews Section"}
            </button>
          )}
          {!isTogglingHomePage && isGameStarted && showReviews && (
            <ReviewSection game="BirdHunter" currentUser={currentUser} />
          )}
        </div>
      )}
    </div>
  );
}
