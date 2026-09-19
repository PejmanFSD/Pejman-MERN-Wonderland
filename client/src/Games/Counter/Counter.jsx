import { useState, useEffect } from "react";
import { imagesArray } from "./imagesArray";
import { getRandNumInRange } from "../utils";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutCounter from "./AboutCounter";

export default function Counter({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [gameArray, setGameArray] = useState([]); // The array that contains all the images in order
  const [finalGameArray, setFinalGameArray] = useState([]); // The array that contains some of / all the "shuffled" images of the movie
  const [quizArray, setQuizArray] = useState([]); // The array that contains the names of the 3 randomly selected images of the "finalGameArray" variable
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSlideShowStarted, setIsSlideShowStarted] = useState(false); // The boolean variable that defines if the movie is started or not
  const [isResult, setIsResult] = useState(false); // The boolean variable that defines if the result of the game is revealed or not
  // Variables for the timer:
  const [currentIndex, setCurrentIndex] = useState(0); // The variable that represents the index of the currently revealed image of the movie
  const [showImage, setShowImage] = useState(false); // A boolean to show/hide images
  const [countdown, setCountdown] = useState(3); // Just for the first 3 numbers (3, 2, 1)
  // The object that containes the 3 answers of the user
  const [userAnswers, setUserAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
  });
  const [finalMessage, setFinalMessage] = useState("");
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  // The function that assignes the game mode to easy:
  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  // The function that assignes the game mode to normal:
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  // The function for reseting the game:
  const handleStart = () => {
    setIsGameStarted(true);
    // expanding the gameArray based on the repetition value
    // and store it into a temporary variable (expandedArray):
    const expandedArray = gameArray.flatMap((item) =>
      Array.from({ length: item.repetition }, (_, i) => ({
        ...item,
        instanceId: `${item.id}-${i}`,
      })),
    );
    // Shuffling the new temporary variable (expandedArray):
    const shuffled = expandedArray.sort(() => Math.random() - 0.5);
    // Assigning the new temporary variable (expandedArray) to a
    // permanent variable(finalGameArray):
    setFinalGameArray(shuffled);
    // Announcing that the movie is started:
    setIsSlideShowStarted(true);
  };
  // The function for storing the user's first answer:
  const handleQuestion1 = (e) => {
    const value = e.target.value;
    setUserAnswers((currUserAnswers) => ({
      ...currUserAnswers,
      answer1: value,
    }));
  };
  // The function for storing the user's second answer:
  const handleQuestion2 = (e) => {
    const value = e.target.value;
    setUserAnswers((currUserAnswers) => ({
      ...currUserAnswers,
      answer2: value,
    }));
  };
  // The function for storing the user's third answer:
  const handleQuestion3 = (e) => {
    const value = e.target.value;
    setUserAnswers((currUserAnswers) => ({
      ...currUserAnswers,
      answer3: value,
    }));
  };
  // Evaluating if the user has answered correctly or not:
  const handleSubmit = (e) => {
    e.preventDefault();
    // If all the 3 questions have been answered correctly:
    if (
      parseInt(userAnswers.answer1) === quizArray[0].repetition &&
      parseInt(userAnswers.answer2) === quizArray[1].repetition &&
      parseInt(userAnswers.answer3) === quizArray[2].repetition
    ) {
      // Then the user wins the game (and the final message will become "You Win!"):
      setFinalMessage("You Win!");
      // And they earn ...
      if (normalMode) {
        // 17 stars if the game is on normal mode
        updateTotalPoint(17);
      } else if (easyMode) {
        // and 8 stars if the game is on easy mode
        updateTotalPoint(8);
      }
    }
    // Otherwise, if even one of the 3 answers is wrong
    else {
      // Then the user loses the game (and the final message will become "You Lose!"):
      setFinalMessage("You Lose!");
    }
    setIsResult(true); // Toggling the "isResult" state variable
  };
  // The function for restarting the game (the onClick function of the "play again" / "try again")
  const handlePlayAgain = () => {
    // Resetting the appropriate state variables for the new game:
    setGameArray([]);
    setFinalGameArray([]);
    setQuizArray([]);
    setIsGameStarted(false);
    setIsSlideShowStarted(false);
    setIsResult(false);
    setCurrentIndex(0);
    setShowImage(false);
    setCountdown(3);
    setUserAnswers({
      answer1: "",
      answer2: "",
      answer3: "",
    });
    setFinalMessage("");
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
    setShowReviews(true);
  };
  // The functions for reseting the game:
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    handlePlayAgain();
    setIsTogglingReset(false);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  // The functions for toggling the game modes:
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
    setIsTogglingLevel(false);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  // The functions for returning to the home page:
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  // The function of the "About the game" page:
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  // The function of the "reviews" page:
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  // The useEffect hook for implementing the features of the game based on the chosen game mode:
  useEffect(() => {
    if (easyMode) { // If the game is on easy mode:
      setGameArray(
        imagesArray.slice(0, 5).map((arr) => ({ // only use the first 5 images for the movie
          ...arr,
          repetition: getRandNumInRange(1, 3), // And assign a number among 1, 2 and 3 for the number of the repetition of the image
        })),
      );
    } else if (normalMode) { // If the game is on normal mode:
      setGameArray(
        imagesArray.map((arr) => ({ // use all the images for the movie
          ...arr,
          repetition: getRandNumInRange(1, 3), // And assign a number among 1, 2 and 3 for the number of the repetition of the image
        })),
      );
    }
  }, [easyMode, normalMode, isGameStarted]);
  // The useEffect hook for the movie:
  useEffect(() => {
    if (isGameStarted && isSlideShowStarted) { // Play the movie if the game is started and the "isSlideShowStarted" variable is true
      let step = -1;
      // Implementing the interval:
      const interval = setInterval(() => {
        step++;
        if (step === 0) setCountdown(3); // The first image of the movie is the number 3
        if (step === 1) setCountdown(2); // The second image of the movie is the number 2
        if (step === 2) setCountdown(1); // The third image of the movie is the number 1
        if (step === 3) setCountdown(-1);
        if (step === 4) setCountdown(0);
        // After the initial fixed images of the movie, the images of the shuffled array reveal one by one:
        if (step >= 5) {
          setShowImage((prev) => !prev); // Every other second, we see nothing
          // For even seconds we see the images:
          if (step % 2 === 0) {
            setCurrentIndex((prev) => prev + 1);
          }
        }
        // Stop when last image reached
        if (step === 6 + 2 * finalGameArray.length) {
          clearInterval(interval);
          setIsSlideShowStarted(false); // resetting the "isSlideShowStarted" variable to false
          return;
        }
      }, 1000);
      // Shuffling again for the questions
      // (We don't want the 3 images of the final quiz of the game to be always the first 3 images of the movie):
      const shuffled = [...gameArray].sort(() => Math.random() - 0.5);
      // Slicing the first 3 images of the newly shuffled images:
      const selected = shuffled.slice(0, 3);
      setQuizArray(selected); // Assigning the 3 images to the "quizArray" state variable
      return () => clearInterval(interval);
    }
  }, [isGameStarted]);
  // Changing the title of the browser when the user enters the game:
  useEffect(() => {
    document.title = "Counter";
  }, []);
  return (
    <div>
      {/* Rendering the "About the game" section */}
      {isAboutPage && <AboutCounter setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          {/* Game title */}
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Counter
          </h2>
          {/* The fix buttons of the game: "About The game", "Switch the Game mode" and "Back to home page" in one container: */}
          <div className="container">
            <div className="row">
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isTogglingReset &&
                  !isSlideShowStarted && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={handleAboutPage}
                    >
                      About Counter
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isSlideShowStarted && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleLevel()}
                      disabled={
                        (!easyMode && !normalMode) || finalMessage !== ""
                      }
                    >{`${easyMode ? "Switch to Normal Mode" : normalMode ? "Switch to Easy Mode" : "Switch level"}`}</button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isSlideShowStarted && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={toggleReset}
                      disabled={
                        !isGameStarted ||
                        finalMessage !== "" ||
                        (!easyMode && !normalMode)
                      }
                    >
                      Reset the Game
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isSlideShowStarted && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleHomePage()}
                      disabled={finalMessage !== ""}
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>
          {/* Confirming the "Switch the game mode" functionality */}
          {isTogglingLevel && finalMessage === "" && (
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
          {/* Confirming the "Reset the game" functionality */}
          {isTogglingReset && finalMessage === "" && (
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
          {/* Confirming the "Back to Home page" functionality */}
          {isTogglingHomePage && finalMessage === "" && (
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
          {/* The Game mode buttons */}
          {!isGameStarted &&
            !easyMode &&
            !normalMode &&
            !isTogglingHomePage && (
              <div
                className="four-buttons-container"
                style={{ marginTop: "15px" }}
              >
                <button className="btn1 mx-1 my-2" onClick={handleEasyMode}>
                  Easy Mode
                </button>
                <button className="btn1 mx-1 my-2" onClick={handleNormalMode}>
                  Normal Mode
                </button>
              </div>
            )}
          {/* The "Start the Game" button */}
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <button
                className="btn1"
                onClick={handleStart}
                style={{ marginTop: "10px" }}
              >
                Start the Game
              </button>
            )}
          {/* Rendering the Movie */}
          <div>
            {/* If the "countdown" state variable is a positive number, render it */}
            {isGameStarted && isSlideShowStarted && countdown > 0 && (
              <h1>{countdown}</h1>
            )}
            {/* If the "countdown" state variable is -1, render "Go" */}
            {isGameStarted && isSlideShowStarted && countdown === -1 && (
              <h1>Go!</h1>
            )}
            {/* If the "countdown" state variable is 0 and the "isSlideShowStarted" and "showImage" state variables are true
            Render the image whose index is "currentIndex" (the "currentIndex" state variable changes every second) */}
            {isGameStarted &&
              isSlideShowStarted &&
              countdown === 0 &&
              showImage &&
              finalGameArray[currentIndex] && (
                <img
                  src={finalGameArray[currentIndex].image}
                  className="product-counter-image1"
                  alt=""
                />
              )}
          </div>
          {/* Rendering the 3 randomly selected images for the quiz of the game */}
          <div style={{ marginTop: "20px" }}>
            {isGameStarted &&
              !isSlideShowStarted &&
              !isTogglingReset &&
              !isTogglingLevel &&
              !isTogglingHomePage &&
              quizArray.map((i, idx) => (
                <div style={{ display: "inline" }}>
                  <img
                    src={i.image}
                    className="product-counter-image2"
                    alt=""
                    key={idx}
                  />
                </div>
              ))}
          </div>
          {/* Rendering the form of the quiz, where the user should choose the answers */}
          {isGameStarted &&
            !isSlideShowStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <form onSubmit={handleSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 offset-md-1 d-flex justify-content-center my-1">
                      {/* The first question */}
                      <label
                        htmlFor="question1"
                        style={{ marginRight: "7px" }}
                      >{`How many ${quizArray[0].name} did you see? `}</label>
                      {/* The dropdown of the first quiz */}
                      <select
                        onChange={handleQuestion1}
                        name="question1"
                        id="question1"
                        disabled={isResult} // If the "isResult" state variable is true (the form is submitted)
                        // the dropdown should be disabled
                        style={{
                          borderRadius: "8px",
                          textAlign: "center",
                          width: "50px",
                          height: "25px",
                          backgroundColor: "var(--background)"
                        }}
                      >
                        <option
                          value={userAnswers.answer1}
                          disabled
                          selected
                        >
                        {/* The options of the first dropdown, containing 1, 2 and 3 */}
                        </option>
                        {[1, 2, 3].map((i, idx) => (
                          <option key={idx}>{i}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 offset-md-1 d-flex justify-content-center my-1">
                      {/* The second question */}
                      <label
                        htmlFor="question2"
                        style={{ marginRight: "7px" }}
                      >{`How many ${quizArray[1].name} did you see? `}</label>
                      {/* The dropdown of the second quiz */}
                      <select
                        onChange={handleQuestion2}
                        name="question2"
                        id="question2"
                        disabled={isResult} // If the "isResult" state variable is true (the form is submitted)
                        // the dropdown should be disabled
                        style={{
                          borderRadius: "8px",
                          textAlign: "center",
                          width: "50px",
                          height: "25px",
                          backgroundColor: "var(--background)"
                        }}
                      >
                        <option
                          value={userAnswers.answer2}
                          disabled
                          selected
                        ></option>
                        {/* The options of the second dropdown, containing 1, 2 and 3 */}
                        {[1, 2, 3].map((i, idx) => (
                          <option key={idx}>{i}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 offset-md-1 d-flex justify-content-center my-1">
                      {/* The third question */}
                      <label
                        htmlFor="question3"
                        style={{ marginRight: "7px" }}
                      >{`How many ${quizArray[2].name} did you see? `}</label>
                      {/* The dropdown of the third quiz */}
                      <select
                        onChange={handleQuestion3}
                        name="question3"
                        id="question3"
                        disabled={isResult} // If the "isResult" state variable is true (the form is submitted)
                        // the dropdown should be disabled
                        style={{
                          borderRadius: "8px",
                          textAlign: "center",
                          width: "50px",
                          height: "25px",
                          backgroundColor: "var(--background)"
                        }}
                      >
                        <option
                          value={userAnswers.answer3}
                          disabled
                          selected
                        ></option>
                        {/* The options of the third dropdown, containing 1, 2 and 3 */}
                        {[1, 2, 3].map((i, idx) => (
                          <option key={idx}>{i}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Rendering the "Submit" button of the form */}
                {!isResult && (
                  <button className="btn1" style={{ marginTop: "10px" }}>
                    Submit
                  </button>
                )}
              </form>
            )}
          {/* Rendering the results of the user's each answer */}
          {isResult &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div style={{ marginTop: "30px" }}>
                <div className="container">
                  <div className="row">
                    {/* Rendering the result of the user's first answer */}
                    <div className="col-10 offset-1 d-flex justify-content-center my-1">
                      <strong>
                        {parseInt(userAnswers.answer1) ===
                        quizArray[0].repetition
                          ? `The nember of ${quizArray[0].name}: ${quizArray[0].repetition} ➜ You guessed correctly! ✔`
                          : `The nember of ${quizArray[0].name}: ${quizArray[0].repetition} ➜ You guessed wrong! ✖`}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    {/* Rendering the result of the user's second answer */}
                    <div className="col-10 offset-1 d-flex justify-content-center my-1">
                      <strong>
                        {parseInt(userAnswers.answer2) ===
                        quizArray[1].repetition
                          ? `The nember of ${quizArray[1].name}: ${quizArray[1].repetition} ➜ You guessed correctly! ✔`
                          : `The nember of ${quizArray[1].name}: ${quizArray[1].repetition} ➜ You guessed wrong! ✖`}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    {/* Rendering the result of the user's third answer */}
                    <div className="col-10 offset-1 d-flex justify-content-center my-1">
                      <strong>
                        {parseInt(userAnswers.answer3) ===
                        quizArray[2].repetition
                          ? `The nember of ${quizArray[2].name}: ${quizArray[2].repetition} ➜ You guessed correctly! ✔`
                          : `The nember of ${quizArray[2].name}: ${quizArray[2].repetition} ➜ You guessed wrong! ✖`}
                      </strong>
                    </div>
                  </div>
                </div>
                {/* Rendering the final message of the game */}
                <div className="container">
                  <div className="row">
                    <div className="col-10 offset-1 d-flex justify-content-center">
                      <h2 className="fasterOne" style={{ fontSize: "40px" }}>
                        {finalMessage}
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Rendering the "Try Again?" message if the user loses the game */}
                {finalMessage === "You Lose!" && (
                  <div>
                    <div>Try Again?</div>
                    <button
                      className="btn2"
                      onClick={handlePlayAgain}
                      style={{ marginTop: "10px" }}
                    >
                      Ok
                    </button>
                  </div>
                )}
                {/* Rendering the "Play Again?" message if the user wins the game */}
                {finalMessage && finalMessage === "You Win!" && (
                  <div>
                    <div>Play Again?</div>
                    <button
                      className="btn2"
                      onClick={handlePlayAgain}
                      style={{ marginTop: "10px" }}
                    >
                      Ok
                    </button>
                  </div>
                )}
              </div>
            )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted &&
            !isSlideShowStarted && (
              // The button for showing/hiding the "Reviews Section"
              <button className="btn1 my-3" onClick={handleReviewSection}>
                {showReviews
                  ? "Hide the Reviews Section"
                  : "Show the Reviews Section"}
              </button>
            )}
          {!isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            isGameStarted &&
            showReviews &&
            !isSlideShowStarted && (
              // Rendering the <ReviewSection /> component
              <ReviewSection game="Counter" currentUser={currentUser} />
            )}
        </div>
      )}
    </div>
  );
}
