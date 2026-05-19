import { useState, useEffect } from "react";
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
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [isRaising, setIsRaising] = useState(false);
  const [allowStand, setAllowStand] = useState(true);
  const [raise, setRaise] = useState(0);
  const [roundMessage, setRoundMessage] = useState("");

  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStart = () => {
    setDeck(deckArray);
    setUsedCards([]);
    setPejmanHand([]);
    setIsUserTurn(true);
    setDeck((currDeck) => shuffleArray(currDeck));
    setIsGameStarted(true);
    setPejmanPoint(0);
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
    setRoundMessage("");
    setUserHand((currUserHand) => [...currUserHand, deck[0]]);
    setUserPoint((currUserPoint) => currUserPoint + deck[0].point);
    setDeck((currDeck) => currDeck.filter((c) => currDeck.indexOf(c) !== 0));
    setUsedCards((currUsedCards) => [...currUsedCards, deck[0]]);
    setAllowStand(true);
  };
  const handleBet = (e) => {
    setBet(Number(e.target.value));
  };
  const submitBet = (e) => {
    e.preventDefault();
    setIsBetMade(true);
    setUserChipsNum((currUserChipsNum) => currUserChipsNum - bet);
    setPejmanChipsNum((currPejmanChipsNum) => currPejmanChipsNum - bet);
  };
  const renderRaisingForm = () => {
    setIsRaising(true);
  };
  const handleRaise = (e) => {
    setRaise(Number(e.target.value));
  };
  const submitRaise = (e) => {
    e.preventDefault();
    setIsRaising(false);
    setBet((currBet) => currBet + raise);
    setUserChipsNum((currUserChipsNum) => currUserChipsNum - raise);
    setPejmanChipsNum((currPejmanChipsNum) => currPejmanChipsNum - raise);
    setAllowStand(false);
  };
  const cancelRaising = () => {
    setIsRaising(false);
  };
  const handleStand = () => {
    setIsUserTurn(false);
    setAllowStand(true);
  };
  const handleAllowPejman = () => {
      if (pejmanPoint < 18) {
        setPejmanHand((currPejmanHand) => [...currPejmanHand, deck[0]]);
        setPejmanPoint((currPejmanPoint) => currPejmanPoint + deck[0].point);
        setDeck((currDeck) =>
          currDeck.filter((c) => currDeck.indexOf(c) !== 0),
        );
        setUsedCards((currUsedCards) => [...currUsedCards, deck[0]]);
      } else {
        setIsRoundOver(true);
      }
  };
  const handleRoundOver = () => {
    let tempUserChipsNum = userChipsNum;
    let tempPejmanChipsNum = pejmanChipsNum;
    const tempBet = bet;
    let tempRoundMessage;
    if (userPoint === 21 && pejmanPoint !== 21) {
      tempUserChipsNum = userChipsNum + 2 * tempBet;
      tempRoundMessage = `The value of your hand is ${userPoint} (BlackJack). You Win this round!`;
    } else if (pejmanPoint === 21 && userPoint !== 21) {
      tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
      tempRoundMessage = `The value of Pejman's hand is ${pejmanPoint} (BlackJack). Pejman Wins this round!`;
    } else if (userPoint > 21 && pejmanPoint <= 21) {
      tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
      tempRoundMessage = `The value of your hand is ${userPoint} (Busted). Pejman Wins this round!`;
    } else if (pejmanPoint > 21 && userPoint <= 21) {
      tempUserChipsNum = userChipsNum + 2 * tempBet;
      tempRoundMessage = `The value of Pejman's hand is ${pejmanPoint} (Busted). You Win this round!`;
    } else if (userPoint < 21 && pejmanPoint < 21) {
      if (userPoint > pejmanPoint) {
        tempUserChipsNum = userChipsNum + 2 * tempBet;
        tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint}. You Win this round!`;
      } else if (userPoint < pejmanPoint) {
        tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
        tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint}. Pejman Wins this round!`;
      } else if (userPoint === pejmanPoint) {
        if (easyMode) {
          tempUserChipsNum = userChipsNum + 2 * tempBet;
          tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint} too. It's "Easy Mode", so you Win this round!`;
        } else {
          tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
          tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint} too. It's "Normal Mode", so Pejman Wins this round!`;
        }
      }
    }
    setUserChipsNum(tempUserChipsNum);
    setPejmanChipsNum(tempPejmanChipsNum);
    setBet(0);
    setIsRoundOver(false);
    setUserHand([]);
    setPejmanHand([]);
    setUserPoint(0);
    setPejmanPoint(0);
    setRaise(0);
    setRoundNum((currRoundNum) => currRoundNum + 1);
    setIsUserTurn(true);
    setIsBetMade(false);
    setIsRaising(false);
    setRoundMessage(tempRoundMessage);
  };
useEffect(() => {
    if (pejmanPoint >= 17) {
        setIsRoundOver(true);
    }
}, [pejmanPoint]);
  useEffect(() => {
    if (userPoint >= 21) {
      setIsRoundOver(true);
    }
  }, [userHand]);
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
      {isGameStarted &&
        deck.map((c, i) => <img src={deck[i].imgSrc} height="45px" />)}{" "}
      <br />
      {isGameStarted &&
        usedCards.map((c, i) => (
          <img src={usedCards[i].imgSrc} height="45px" />
        ))}
      {isGameStarted && <div>Round: {roundNum}</div>}
      {isGameStarted && (
        //   isBetMade &&
        <div style={{ color: "red" }}>bet: {bet}</div>
      )}
      {isGameStarted && <div style={{ color: "red" }}>raise: {raise}</div>}
      {isGameStarted && userHand.length > 0 && (
        <div style={{ color: "red" }}>User's Point: {userPoint}</div>
      )}
      {isGameStarted && pejmanHand.length > 0 && (
        <div style={{ color: "red" }}>Pejman's Point: {pejmanPoint}</div>
      )}
      {isGameStarted && (
        <div>
          {new Array(pejmanChipsNum).fill(null).map((c) => (
            <img src={chips[1]} height="50px" style={{ margin: "2px" }} />
          ))}
        </div>
      )}
      {isGameStarted &&
        // isUserTurn &&
        new Array(pejmanHand.length)
          .fill(null)
          .map((c, i) => (
            <img
              src={pejmanHand[i].imgSrc}
              height="120px"
              style={{ margin: "2px" }}
            />
          ))}
      <br />
      {isGameStarted && isBetMade && (
        <div>
          {new Array(2 * bet).fill(null).map((c) => (
            <img src={chips[0]} height="50px" />
          ))}
        </div>
      )}
      {roundMessage && <h3>{roundMessage}</h3>}
      {isGameStarted &&
        // isUserTurn &&
        new Array(userHand.length)
          .fill(null)
          .map((c, i) => (
            <img
              src={userHand[i].imgSrc}
              height="120px"
              style={{ margin: "2px" }}
            />
          ))}
      <br />
      {isGameStarted && (
        <div>
          {new Array(userChipsNum).fill(null).map((c) => (
            <img src={chips[1]} height="50px" style={{ margin: "2px" }} />
          ))}
        </div>
      )}
      {isGameStarted && isUserTurn && userHand.length === 0 && (
        <button onClick={getNewCardForUser}>{`Start round ${roundNum}`}</button>
      )}
      {isGameStarted && isUserTurn && userHand.length === 1 && !isBetMade && (
        <form onSubmit={submitBet}>
          <div>
            <label htmlFor="bet">Make your bets</label>
            <select onChange={handleBet} name="bet" id="bet">
              <option value={bet} disabled selected>
                🔽
              </option>
              {Array.from(
                { length: Math.min(userChipsNum, pejmanChipsNum) },
                (_, i) => i + 1,
              ).map((i) => (
                <option>{i}</option>
              ))}
            </select>
          </div>
          {bet > 0 && <button>Submit your bet</button>}
        </form>
      )}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising && <button onClick={getNewCardForUser}>Hit</button>}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising && (
          <button onClick={renderRaisingForm}>
            Raise
          </button>
        )}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising && (
          <button onClick={handleStand} disabled={!allowStand}>
            Stand
          </button>
        )}
        {!allowStand && <div style={{color: "gray", fontSize: "15px"}}>You can't stand right after raising!</div>}
      {isRaising && (
        <div>
          <form onSubmit={submitRaise}>
            <div>
              <label htmlFor="raise">How much do you want to raise?</label>
              <select onChange={handleRaise} name="raise" id="raise">
                <option value={raise} disabled selected>
                  🔽
                </option>
                {Array.from(
                  { length: Math.min(userChipsNum, pejmanChipsNum) },
                  (_, i) => i + 1,
                ).map((i) => (
                  <option>{i}</option>
                ))}
              </select>
            </div>
            <button disabled={raise === 0}>Update the raise</button>
          </form>
          <button onClick={cancelRaising}>Cancel the raise</button>
        </div>
      )}
      {isGameStarted && !isUserTurn && !isRoundOver && (
        <div>
          <div>
            {pejmanHand.length === 0
              ? "Allow Pejman to start his turn"
              : "Allow Pejman To make his next move"}
          </div>
          <button onClick={handleAllowPejman}>Ok</button>
        </div>
      )}
      {isRoundOver &&
      userPoint < 21 &&
      pejmanPoint < 21 &&
      (userHand.length > 0 || pejmanHand.length > 0) ? (
        <div>
          Pejman is done hitting. let's see who is the winner of this round
        </div>
      ) : isRoundOver &&
        userPoint > 21 &&
        pejmanPoint < 21 &&
        (userHand.length > 0 || pejmanHand.length > 0) ? (
        <div>You busted!</div>
      ) : isRoundOver &&
        userPoint === 21 &&
        pejmanPoint < 21 &&
        (userHand.length > 0 || pejmanHand.length > 0) ? (
        <div>Well done! BlackJack! &#128512;</div>
      ) : isRoundOver &&
        pejmanPoint > 21 &&
        userPoint < 21 &&
        (userHand.length > 0 || pejmanHand.length > 0) ? (
        <div>Pejman is busted!</div>
      ) : (
        isRoundOver &&
        pejmanPoint === 21 &&
        userPoint < 21 &&
        (userHand.length > 0 || pejmanHand.length > 0) && (
          <div>Pejman is BlackJack!</div>
        )
      )}
      {isRoundOver && (userHand.length > 0 || pejmanHand.length > 0) && (
        <button onClick={handleRoundOver}>Ok</button>
      )}
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
