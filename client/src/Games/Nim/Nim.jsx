import { useState, useEffect } from "react";
import Bowls from "./Bowls";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutNim from "./AboutNim";

export default function Nim({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [standard, setStandard] = useState(false);
  const [misere, setMisere] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isFillingTheBowlsByUserStarted, setIsFillingTheBowlsByUserStarted] =
    useState(false);
  const [isFillingTheBowlsByUserFinished, setIsFillingTheBowlsByUserFinished] =
    useState(false);
  const [
    isFillingTheBowlsByPejmanStarted,
    setIsFillingTheBowlsByPejmanStarted,
  ] = useState(false);
  const [
    isFillingTheBowlsByPejmanFinished,
    setIsFillingTheBowlsByPejmanFinished,
  ] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [bowls, setBowls] = useState([
    { bowlId: 1, bowlName: "bowl1", ballsNum: 0, isBowlSelected: false },
    { bowlId: 2, bowlName: "bowl2", ballsNum: 0, isBowlSelected: false },
    { bowlId: 3, bowlName: "bowl3", ballsNum: 0, isBowlSelected: false },
    { bowlId: 4, bowlName: "bowl4", ballsNum: 0, isBowlSelected: false },
    { bowlId: 5, bowlName: "bowl5", ballsNum: 0, isBowlSelected: false },
    { bowlId: 6, bowlName: "bowl6", ballsNum: 0, isBowlSelected: false },
    { bowlId: 7, bowlName: "bowl7", ballsNum: 0, isBowlSelected: false },
    { bowlId: 8, bowlName: "bowl8", ballsNum: 0, isBowlSelected: false },
    { bowlId: 9, bowlName: "bowl9", ballsNum: 0, isBowlSelected: false },
    { bowlId: 10, bowlName: "bowl10", ballsNum: 0, isBowlSelected: false },
  ]);
  const [unEmptyBowlsIndexes, setUnEmptyBowlsIndexes] = useState([]);
  const [selectedUserBowl, setSelectedUserBowl] = useState(0);
  const [userPickNum, setUserPickNum] = useState(0);
  const [selectedPejmanBowl, setSelectedPejmanBowl] = useState(-1);
  const [pejmanPickNum, setPejmanPickNum] = useState(0);
  const [pejmanNormalModeCondition, setPejmanNormalModeCondition] = useState(0);
  const [allTurns, setAllTurns] = useState([]);
  const [allBallsNum, setAllBallsNum] = useState(0);
  const [isWin, setIsWin] = useState("");
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  const handleStandeardNim = () => {
    setStandard(true);
    setMisere(false);
  };
  const handleMisereNim = () => {
    setMisere(true);
    setStandard(false);
  };
  const handleEasy = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormal = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const toggleUserTurn = () => {
    setIsUserTurn((currIsUserTurn) => !currIsUserTurn);
  };
  const startFillingUserBowls = () => {
    setIsFillingTheBowlsByUserStarted(true);
  };
  const startTheGame = () => {
    setIsGameStarted(true);
    toggleUserTurn();
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
  const handleReset = () => {
    setStandard(false);
    setMisere(false);
    setEasyMode(false);
    setNormalMode(false);
    setIsFillingTheBowlsByUserStarted(false);
    setIsFillingTheBowlsByUserFinished(false);
    setIsFillingTheBowlsByPejmanStarted(false);
    setIsFillingTheBowlsByPejmanFinished(false);
    setIsGameStarted(false);
    setIsUserTurn(false);
    setBowls([
      { bowlId: 1, bowlName: "bowl1", ballsNum: 0, isBowlSelected: false },
      { bowlId: 2, bowlName: "bowl2", ballsNum: 0, isBowlSelected: false },
      { bowlId: 3, bowlName: "bowl3", ballsNum: 0, isBowlSelected: false },
      { bowlId: 4, bowlName: "bowl4", ballsNum: 0, isBowlSelected: false },
      { bowlId: 5, bowlName: "bowl5", ballsNum: 0, isBowlSelected: false },
      { bowlId: 6, bowlName: "bowl6", ballsNum: 0, isBowlSelected: false },
      { bowlId: 7, bowlName: "bowl7", ballsNum: 0, isBowlSelected: false },
      { bowlId: 8, bowlName: "bowl8", ballsNum: 0, isBowlSelected: false },
      { bowlId: 9, bowlName: "bowl9", ballsNum: 0, isBowlSelected: false },
      { bowlId: 10, bowlName: "bowl10", ballsNum: 0, isBowlSelected: false },
    ]);
    setUnEmptyBowlsIndexes([]);
    setSelectedUserBowl(0);
    setUserPickNum(0);
    setSelectedPejmanBowl(-1);
    setPejmanPickNum(0);
    setPejmanNormalModeCondition(0);
    setIsTogglingReset(false);
    setAllTurns([]);
    setAllBallsNum(0);
    setIsWin("");
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    handleReset();
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  useEffect(() => {
          document.title = "Nim";
      }, []);
  return (
    <div>
      {isAboutPage && <AboutNim setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          {!isTogglingHomePage && !isTogglingReset && (
            <button onClick={handleAboutPage}>About Nim</button>
          )}
          <h2>Nim</h2>
          {standard && !isTogglingHomePage && (
            <ModeExplaination message="Standard Nim: Get the last ball and win the game!" />
          )}
          {misere && !isTogglingHomePage && (
            <ModeExplaination message="Misere Nim: Get the last ball and loose!" />
          )}
          {easyMode && !isTogglingHomePage && (
            <ModeExplaination message="Easy Mode: In his turn, Pejman chooses the bowl and the number of balls randomly. You'll get 1 star if you win." />
          )}
          {normalMode && !isTogglingHomePage && (
            <ModeExplaination message="Normal Mode: In his turn, Pejman chooses the bowl and the number of balls with a strategy! You'll get 4 stars if you win." />
          )}
          {!isTogglingReset && !isTogglingHomePage && (
            <button onClick={() => toggleHomePage()}>
              Back to the home page
            </button>
          )}
          {isFillingTheBowlsByUserFinished &&
            (easyMode || normalMode) &&
            (standard || misere) &&
            isWin === "" &&
            !isTogglingReset &&
            !isTogglingHomePage && (
              <div>
                <button onClick={() => toggleReset()}>Reset the Game</button>
              </div>
            )}
          {isTogglingReset && (
            <ConfirmationBox
              question="Are you sure you want to reset the game?"
              toggleYes={toggleResetYes}
              toggleCancel={toggleResetCancel}
            />
          )}
          {(isGameStarted || (!isGameStarted && (!easyMode || !normalMode))) &&
            isTogglingHomePage && (
              <ConfirmationBox
                question="Are you sure you want to go back to Home Page?"
                toggleYes={toggleHomePageYes}
                toggleCancel={toggleHomePageCancel}
              />
            )}
          {!standard && !misere && !isTogglingHomePage && (
            <div>
              <button onClick={handleStandeardNim}>Standeard Nim</button>
              <button onClick={handleMisereNim}>Misère Nim</button>
            </div>
          )}
          {(standard || misere) &&
            !easyMode &&
            !normalMode &&
            !isTogglingHomePage && (
              <div>
                <button onClick={handleEasy}>Easy</button>
                <button onClick={handleNormal}>Normal</button>
              </div>
            )}
          {!isFillingTheBowlsByUserStarted &&
            (easyMode || normalMode) &&
            !isTogglingHomePage && (
              <button onClick={startFillingUserBowls}>
                Start Filling your Bowls with Balls
              </button>
            )}
          {isFillingTheBowlsByPejmanFinished &&
            !isGameStarted &&
            !isTogglingReset &&
            !isTogglingHomePage && (
              <button onClick={startTheGame}>Start the Game</button>
            )}
          {isFillingTheBowlsByUserStarted && (
            <Bowls
              isFillingTheBowlsByUserFinished={isFillingTheBowlsByUserFinished}
              setIsFillingTheBowlsByUserFinished={
                setIsFillingTheBowlsByUserFinished
              }
              isFillingTheBowlsByPejmanFinished={
                isFillingTheBowlsByPejmanFinished
              }
              setIsFillingTheBowlsByPejmanFinished={
                setIsFillingTheBowlsByPejmanFinished
              }
              setIsFillingTheBowlsByUserStarted={
                setIsFillingTheBowlsByUserStarted
              }
              setIsFillingTheBowlsByPejmanStarted={
                setIsFillingTheBowlsByPejmanStarted
              }
              isGameStarted={isGameStarted}
              setIsGameStarted={setIsGameStarted}
              easyMode={easyMode}
              setEasyMode={setEasyMode}
              normalMode={normalMode}
              setNormalMode={setNormalMode}
              standard={standard}
              setStandard={setStandard}
              misere={misere}
              setMisere={setMisere}
              isUserTurn={isUserTurn}
              setIsUserTurn={setIsUserTurn}
              toggleUserTurn={toggleUserTurn}
              updateTotalPoint={updateTotalPoint}
              isTogglingReset={isTogglingReset}
              setIsTogglingReset={setIsTogglingReset}
              isTogglingHomePage={isTogglingHomePage}
              setIsTogglingHomePage={setIsTogglingHomePage}
              bowls={bowls}
              setBowls={setBowls}
              unEmptyBowlsIndexes={unEmptyBowlsIndexes}
              setUnEmptyBowlsIndexes={setUnEmptyBowlsIndexes}
              selectedUserBowl={selectedUserBowl}
              setSelectedUserBowl={setSelectedUserBowl}
              userPickNum={userPickNum}
              setUserPickNum={setUserPickNum}
              selectedPejmanBowl={selectedPejmanBowl}
              setSelectedPejmanBowl={setSelectedPejmanBowl}
              pejmanPickNum={pejmanPickNum}
              setPejmanPickNum={setPejmanPickNum}
              pejmanNormalModeCondition={pejmanNormalModeCondition}
              setPejmanNormalModeCondition={setPejmanNormalModeCondition}
              allTurns={allTurns}
              setAllTurns={setAllTurns}
              allBallsNum={allBallsNum}
              setAllBallsNum={setAllBallsNum}
              isWin={isWin}
              setIsWin={setIsWin}
            />
          )}
          {isWin === true && !isTogglingHomePage && (
            <div>
              <h2>You Win!</h2>
              <h3>{`Because ${standard ? "you" : "Pejman"} picked the last ball`}</h3>
            </div>
          )}
          {isWin === false && !isTogglingHomePage && (
            <div>
              <h2>You Loose!</h2>
              <h3>{`Because ${standard ? "Pejman" : "you"} picked the last ball`}</h3>
            </div>
          )}
          {isWin === true && !isTogglingHomePage && (
            <div>
              <div>Play again?</div>
              <button onClick={handleReset}>Ok</button>
            </div>
          )}
          {isWin === false && !isTogglingHomePage && (
            <div>
              <div>Try again?</div>
              <button onClick={handleReset}>Ok</button>
            </div>
          )}
          {!isTogglingReset && !isTogglingHomePage && isGameStarted && (
            <button onClick={handleReviewSection}>
              {showReviews
                ? "Hide the Reviews Section"
                : "Show the Reviews Section"}
            </button>
          )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            isGameStarted &&
            showReviews && (
              <ReviewSection game="Nim" currentUser={currentUser} />
            )}
        </div>
      )}
    </div>
  );
}
