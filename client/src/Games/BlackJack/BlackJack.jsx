import { useState } from "react";
import ReviewSection from "../../Components/ReviewSection";
import ModeExplaination from "../ModeExplaination";
import { deckArray, chips, clubs, diamonds, hearts, spades } from "./images";

export default function BlackJack({ updateTotalPoint, currentUser }) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [deck, setDeck] = useState(deckArray);
  const [usedCards, setUsedCards] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [userChipsNum, setUserChipsNum] = useState(7);
  const [pejmanChipsNum, setPejmanChipsNum] = useState(7);
  const [userHand, setUserHand] = useState([]);
  const [pejmanHand, setPejmanHand] = useState([]);
  const [userPoint, setUserPoint] = useState(0);
  const [pejmanPoint, setPejmanPoint] = useState(0);
  const [bet, setBet] = useState(0);
  const [isBetMade, setIsBetMade] = useState(false);
  const [roundNum, setRoundNum] = useState(1);

  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStart = () => {
    setIsUserTurn(true);
    setDeck((currDeck) => shuffleArray(currDeck));
    setIsGameStarted(true);
  };
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const getNewCardForUser = () => {
    setUserHand(currUserHand => [...currUserHand, deck[0]]);
    setDeck(currDeck => currDeck.filter(c => currDeck.indexOf(c) !== 0));
  };
  const handleBet = (e) => {
    setBet(e.target.value);
  };
  const submitBet = (e) => {
    e.preventDefault();
    setIsBetMade(true);
    setUserChipsNum(currUserChipsNum => currUserChipsNum - bet);
    setPejmanChipsNum(currPejmanChipsNum => currPejmanChipsNum - bet);
  };
  const handleRaise = () => {

  };
  const handleStand = () => {

  };
  return (
    <div>
      <h2>BlackJack</h2>
      {easyMode && !normalMode ? (
        // !isTogglingReset &&
        // !isTogglingLevel &&
        // !isTogglingHomePage &&
        <ModeExplaination message="Easy Mode: Pejman doesn't memorize the cards and if both hands have the same value, you win the round. You get one star if you win." />
      ) : (
        !easyMode &&
        normalMode && (
          //   !isTogglingReset &&
          //   !isTogglingLevel &&
          //   !isTogglingHomePage &&
          <ModeExplaination message="Normal Mode: Pejman memorizes the cards and if both hands have the same value, Pejman wins the round. You get three star if you win." />
        )
      )}
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={handleEasyMode}>Easy Mode</button>
          <button onClick={handleNormalMode}>Normal Mode</button>
        </div>
      )}
      {!isGameStarted && (easyMode || normalMode) && (
        // !isTogglingLevel &&
        // !isTogglingHomePage &&
        <button onClick={handleStart}>Start the Game</button>
      )}
      {isGameStarted && deck.map((c, i) => <img src={deck[i].imgSrc} height="45px" />)}
      {isGameStarted && <h3>Round: {roundNum}</h3>}
      {isGameStarted && isBetMade && <h4 style={{color: "red"}}>bet: {bet}</h4>}
      {isGameStarted &&
        <div>
            {new Array(pejmanChipsNum).fill(null).map(c => <img src={chips[1]} height="50px" />)}
        </div>
      }
      {isGameStarted && isBetMade &&
        <div>
            {new Array(2 * bet).fill(null).map(c => <img src={chips[0]} height="50px" />)}
        </div>
      }
      {isGameStarted && isUserTurn && new Array(userHand.length).fill(null).map((c, i) => <img src={userHand[i].imgSrc} height="50px" />)}<br />
      {isGameStarted && isUserTurn && userHand.length === 0 && <button onClick={getNewCardForUser}>Start the round</button>}
      {isGameStarted && isUserTurn && userHand.length === 1 && !isBetMade &&
        
<form onSubmit={submitBet}>
            <div>
              <label htmlFor="bet">Make your bets</label>
              <select
                onChange={handleBet}
                name="bet"
                id="bet"
              >
                <option value={bet} disabled selected>
                  🔽
                </option>
                {Array.from({ length: userChipsNum }, (_, i) => i + 1).map((i) => (
                  <option>{i}</option>
                ))}
              </select>
            </div>
            <button>Submit your bet</button>
          </form>





      }
      {isGameStarted && isUserTurn && userHand.length >= 1 && isBetMade && <button onClick={getNewCardForUser}>Hit</button>}
      {isGameStarted && isUserTurn && userHand.length >= 1 && isBetMade && <button onClick={handleRaise}>Raise</button>}
      {isGameStarted && isUserTurn && userHand.length >= 1 && isBetMade && <button onClick={handleStand}>Stand</button>}
      {isGameStarted &&
        <div>
            {new Array(userChipsNum).fill(null).map(c => <img src={chips[1]} height="50px" />)}
        </div>
      }
      {/* {isGameStarted &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage &&
        (
          <ReviewSection game="Snake" currentUser={currentUser} />
        )} */}
    </div>
  );
}
