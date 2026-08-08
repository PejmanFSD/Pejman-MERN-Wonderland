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
  // There're 16 hunting grounds in the game:
  const [grounds, setGrounds] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);
  const [chosenGround, setChosenGround] = useState(0); // The randomly chosen ground that the bird flies in it
  const [isRunning, setIsRunning] = useState(false); // A boolean state variable that indicates if a bird is flying in a hunting ground
  const [delayMilliSec, setDelayMilliSec] = useState(1000); // The time between the appearance of the bird in 2 consecutive images
  const [numOfDoneGrounds, setNumOfDoneGrounds] = useState(0); // The number of the grounds that either the bird is killed or scaped
  const [userScore, setUserScore] = useState(0); // The number of the birds that have been killed by the user
  const [finalMessage, setFinalMessage] = useState("");
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  // The function that starts the game:
  const handleStart = () => {
    setIsGameStarted(true);
    handleChooseGround();
  };
  // The function that chooses a hunting ground randomly among the remaining grounds,
  // assigning it to the "chosenGround" state variable and removing it from the remaining grounds:
  const handleChooseGround = () => {
    const c = getRandArr(grounds);
    setChosenGround(c);// Assigning the randomly chosen ground to the "chosenGround" state variable
    setGrounds((currGrounds) => currGrounds.filter((g) => g !== c)); // Removing the randomly chosen ground from the remaining grounds
  };
  // The function that renders the final message on UI:
  const handleAnnouncingTheGameResult = () => {
    setIsGameStarted(false);
    // The user wins if they kill at least 14 birds:
    if (userScore > 13) {
      setFinalMessage("You Win!");
      updateTotalPoint(5); // If the user wins, they win 5 stars
    }
    // The user loses if they kill less than 14 birds:
    else {
      setFinalMessage("You Lose!");
    }
  };
  // The function that runs the game again when the game is over:
  const handlePlayAgain = () => {
    // Reseting the appropriate state variables:
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
  // The functions related to the "returning to the home page" functionality:
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  // The function for rendering the "About the game" page:
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  // The function for rendering the "reviews" section:
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  // Changing the title of the browser to the name of the game:
  useEffect(() => {
    document.title = "Bird Hunter";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutBirdHunter setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 d-flex justify-content-center">
                <h2 className="fasterOne" style={{ fontSize: "45px" }}>
                  Bird Hunter
                </h2>
              </div>
            </div>
          </div>
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
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 d-flex justify-content-center">
                <h2 className="fasterOne" style={{ fontSize: "40px" }}>
                  {finalMessage && !isTogglingHomePage && finalMessage}
                </h2>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 d-flex justify-content-center">
                {finalMessage && userScore === 16 && !isTogglingHomePage && (
                  <strong>Wow! You didn't miss a single bird!</strong>
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 d-flex justify-content-center">
                {finalMessage && userScore === 15 && !isTogglingHomePage && (
                  <strong>You missed a bird!</strong>
                )}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-10 offset-1 d-flex justify-content-center">
                {finalMessage && userScore < 15 && !isTogglingHomePage && (
                  <strong>{`You missed ${16 - userScore} birds!`}</strong>
                )}
              </div>
            </div>
          </div>
          {finalMessage === "You Win!" && !isTogglingHomePage && (
            <div className="my-3">
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
            <div className="my-3">
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
