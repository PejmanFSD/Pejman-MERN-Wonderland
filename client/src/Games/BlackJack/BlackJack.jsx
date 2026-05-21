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
  const [finalMessage, setFinalMessage] = useState("");
  const [isAce, setIsAce] = useState(false);

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
    if (deck[0].point === 0) {
      setIsAce(true);
      return;
    }
    setUserHand((currUserHand) => [...currUserHand, deck[0]]);
    setUserPoint((currUserPoint) => currUserPoint + deck[0].point);
    setDeck((currDeck) => currDeck.filter((c) => currDeck.indexOf(c) !== 0));
    setUsedCards((currUsedCards) => [...currUsedCards, deck[0]]);
    setAllowStand(true);
  };
  const handleOne = () => {
    setDeck((prevDeck) =>
      prevDeck.map((card) =>
        deck.indexOf(card) === 0 ? { ...card, point: 1 } : card,
      ),
    );
    setIsAce(false);
    getNewCardForUser();
  };
  const handleEleven = () => {
    setDeck((prevDeck) =>
      prevDeck.map((card) =>
        deck.indexOf(card) === 0 ? { ...card, point: 11 } : card,
      ),
    );
    setIsAce(false);
    getNewCardForUser();
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
    setIsAce(false);
    if (deck[0].point === 0) {
      setIsAce(true);
      if (pejmanHand.length === 1 && pejmanPoint + 11 === 22) {
        setDeck((prevDeck) =>
          prevDeck.map((card) =>
            deck.indexOf(card) === 0 ? { ...card, point: 11 } : card,
          ),
        );
      } else if (pejmanPoint + 11 < 22) {
        setDeck((prevDeck) =>
          prevDeck.map((card) =>
            deck.indexOf(card) === 0 ? { ...card, point: 11 } : card,
          ),
        );
      } else {
        setDeck((prevDeck) =>
          prevDeck.map((card) =>
            deck.indexOf(card) === 0 ? { ...card, point: 1 } : card,
          ),
        );
      }
      return;
    }
    if (pejmanPoint < 18) {
      setPejmanHand((currPejmanHand) => [...currPejmanHand, deck[0]]);
      setPejmanPoint((currPejmanPoint) => currPejmanPoint + deck[0].point);
      setDeck((currDeck) => currDeck.filter((c) => currDeck.indexOf(c) !== 0));
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

    if (userPoint === 22 && userHand.length === 2) {
      tempUserChipsNum = userChipsNum + 2 * tempBet;
      if (tempPejmanChipsNum !== 0) {
        tempRoundMessage =
          "Your hand is double-Aces! The value of your hand is NOT 22, it's 21 :) (BlackJack). You win this round!";
      } else {
        tempRoundMessage = `Your hand is double-Aces! The value of your hand is NOT 22, it's 21 :) (BlackJack). You won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    } else if (pejmanPoint === 22 && pejmanHand.length === 2) {
      tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
      if (tempUserChipsNum !== 0) {
        tempRoundMessage =
          "Pejman's hand is double-Aces! The value of his hand is NOT 22, it's 21 :) (BlackJack). Pejman wins this round!";
      } else {
        tempRoundMessage = `Pejman's hand is double-Aces! The value of his hand is NOT 22, it's 21 :) (BlackJack). Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    } else if (userPoint === 21 && pejmanPoint !== 21) {
      tempUserChipsNum = userChipsNum + 2 * tempBet;
      if (tempPejmanChipsNum !== 0) {
        tempRoundMessage = `The value of your hand is ${userPoint} (BlackJack). You win this round!`;
      } else {
        tempRoundMessage = `The value of your hand was ${userPoint} (BlackJack). You won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    } else if (pejmanPoint === 21 && userPoint !== 21) {
      tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
      if (tempUserChipsNum !== 0) {
        tempRoundMessage = `The value of Pejman's hand is ${pejmanPoint} (BlackJack). Pejman wins this round!`;
      } else {
        tempRoundMessage = `The value of Pejman's hand was ${pejmanPoint} (BlackJack). Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    } else if (userPoint > 21 && pejmanPoint <= 21) {
      tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
      if (tempUserChipsNum !== 0) {
        tempRoundMessage = `The value of your hand is ${userPoint} (Busted). Pejman wins this round!`;
      } else {
        tempRoundMessage = `The value of your hand was ${userPoint} (Busted). Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    } else if (pejmanPoint > 21 && userPoint <= 21) {
      tempUserChipsNum = userChipsNum + 2 * tempBet;
      if (tempPejmanChipsNum !== 0) {
        tempRoundMessage = `The value of Pejman's hand is ${pejmanPoint} (Busted). You win this round!`;
      } else {
        tempRoundMessage = `The value of Pejman's hand was ${pejmanPoint} (Busted). You won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    } else if (userPoint < 21 && pejmanPoint < 21) {
      if (userPoint > pejmanPoint) {
        tempUserChipsNum = userChipsNum + 2 * tempBet;
        if (tempPejmanChipsNum !== 0) {
          tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint}. You win this round!`;
        } else {
          tempRoundMessage = `The value of your hand was ${userPoint} and the value of Pejman's hand was ${pejmanPoint}. You won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
        }
      } else if (userPoint < pejmanPoint) {
        tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
        if (tempUserChipsNum !== 0) {
          tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint}. Pejman wins this round!`;
        } else {
          tempRoundMessage = `The value of your hand was ${userPoint} and the value of Pejman's hand was ${pejmanPoint}. Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
        }
      } else if (userPoint === pejmanPoint) {
        if (easyMode) {
          tempUserChipsNum = userChipsNum + 2 * tempBet;
          if (tempPejmanChipsNum !== 0) {
            tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint} too. It's "Easy Mode", so you win this round!`;
          } else {
            tempRoundMessage = `The value of your hand was ${userPoint} and the value of Pejman's hand was ${pejmanPoint} too. It was "Easy Mode", so you won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
          }
        } else {
          tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet;
          if (tempUserChipsNum !== 0) {
            tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint} too. It's "Normal Mode", so Pejman wins this round!`;
          } else {
            tempRoundMessage = `The value of your hand was ${userPoint} and the value of Pejman's hand was ${pejmanPoint} too. It was "Normal Mode", so Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
          }
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
  useEffect(() => {
    if (userChipsNum === 0 && !isBetMade) {
      setFinalMessage("Pejman wins the game!");
    } else if (pejmanChipsNum === 0 && !isBetMade) {
      setFinalMessage("You win the game!");
    }
  }, [userChipsNum, pejmanChipsNum]);
  return (
    <div>
        <div>userHand.length: {userHand.length}</div>
        <div>pejmanHand.length: {pejmanHand.length}</div>
      <h2>BlackJack</h2>
      {easyMode && !normalMode && finalMessage === "" ? (
        // !isTogglingReset &&
        // !isTogglingLevel &&
        // !isTogglingHomePage &&
        <ModeExplaination message="Easy Mode: Pejman doesn't memorize the cards and if both hands have the same value, you win the round. You get one star if you win." />
      ) : (
        !easyMode &&
        normalMode &&
        finalMessage === "" && (
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
      {isGameStarted && finalMessage === "" && <div>Round: {roundNum}</div>}
      {isGameStarted && (
        <div>
          <div style={{ color: "red" }}>bet: {bet}</div>
        </div>
      )}
      {isGameStarted && <div style={{ color: "red" }}>raise: {raise}</div>}
      {isGameStarted && userHand.length > 0 && finalMessage === "" && (
        <div style={{ color: "red" }}>The value of your hand: {userPoint}</div>
      )}
      {isGameStarted && pejmanHand.length > 0 && finalMessage === "" && (
        <div style={{ color: "red" }}>
          The value of Pejman's hand: {pejmanPoint}
        </div>
      )}
      {/* Pejman's chips */}
      {isGameStarted && (
        <div>
          {new Array(pejmanChipsNum).fill(null).map((c) => (
            <img src={chips[1]} height="50px" style={{ margin: "2px" }} />
          ))}
        </div>
      )}
      {/* Pejman's hand */}
      {isGameStarted &&
        finalMessage === "" &&
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
      {/* Bet */}
      {isGameStarted && isBetMade && finalMessage === "" && (
        <div>
          {new Array(2 * bet).fill(null).map((c) => (
            <img src={chips[0]} height="50px" />
          ))}
        </div>
      )}
      {/* Round Message */}
      {finalMessage !== "" && roundMessage && roundNum > 2 ? (
        <h4>The result of the final round:</h4>
      ) : (
        finalMessage !== "" &&
        roundMessage &&
        roundNum === 2 && (
          <h4>The game had only one round with the following result:</h4>
        )
      )}
      {roundMessage && <h4>{roundMessage}</h4>}
      {finalMessage !== "" && <h3>{finalMessage}</h3>}
      {/* User's hand */}
      {isGameStarted &&
        finalMessage === "" &&
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
      {/* User's chips */}
      {isGameStarted && (
        <div>
          {new Array(userChipsNum).fill(null).map((c) => (
            <img src={chips[1]} height="50px" style={{ margin: "2px" }} />
          ))}
        </div>
      )}
      {/* New round's button / Final button */}
      {isGameStarted &&
        isUserTurn &&
        userHand.length === 0 &&
        finalMessage === "" && !isAce && (
          <button onClick={getNewCardForUser}>
            {userChipsNum === 0 || pejmanChipsNum === 0
              ? "Show the final result of the game"
              : `Start round ${roundNum}`}
          </button>
        )}
      {/* First bet form */}
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
      {/* The 3 buttons */}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising &&
        finalMessage === "" &&
        !isAce && <button onClick={getNewCardForUser}>Hit</button>}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising &&
        finalMessage === "" &&
        !isAce && (
          <button
            onClick={renderRaisingForm}
            disabled={userChipsNum === 0 || pejmanChipsNum === 0}
          >
            Raise
          </button>
        )}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising &&
        finalMessage === "" &&
        !isAce && (
          <button onClick={handleStand} disabled={!allowStand}>
            Stand
          </button>
        )}
      {isAce && isUserTurn && (
        <div>
          <div>
            {`${userPoint === 0 ? "You're first card" : "You're next card"} is an Ace, do you want it to have the value of 1 or 11?`}
          </div>
          <button onClick={handleOne}>1</button>
          <button onClick={handleEleven}>11</button>
        </div>
      )}
      {isAce && !isUserTurn && (
        <div>
          <div>
            {`${pejmanPoint === 0 ? "Pejman's first card" : "Pejman's next card"} is an Ace, and he wants it to have the value of ${deck[0].point}`}
          </div>
          <button onClick={handleAllowPejman}>Ok</button>
        </div>
      )}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising &&
        finalMessage === "" &&
        userChipsNum === 0 &&
        pejmanChipsNum > 0 && (
          <div style={{ color: "gray", fontSize: "15px" }}>
            You can't raise anymore because you don't have any gambling chips!
          </div>
        )}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising &&
        finalMessage === "" &&
        pejmanChipsNum === 0 &&
        userChipsNum > 0 && (
          <div style={{ color: "gray", fontSize: "15px" }}>
            You can't raise anymore because Pejman doesn't have any gambling
            chips!
          </div>
        )}
      {isGameStarted &&
        isUserTurn &&
        !isRoundOver &&
        userHand.length >= 1 &&
        isBetMade &&
        !isRaising &&
        finalMessage === "" &&
        pejmanChipsNum === 0 &&
        userChipsNum === 0 && (
          <div style={{ color: "gray", fontSize: "15px" }}>
            You can't raise anymore because neither you nor Pejman don't have
            any gambling chips!
          </div>
        )}
      {!allowStand && finalMessage === "" && (
        <div style={{ color: "gray", fontSize: "15px" }}>
          You can't stand right after raising!
        </div>
      )}
      {/* Raising form */}
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
      {/* Allow Pejman button */}
      {isGameStarted &&
        !isUserTurn &&
        !isRoundOver &&
        finalMessage === "" &&
        !isAce && (
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
      finalMessage === "" &&
      (userHand.length > 0 || pejmanHand.length > 0) &&
      (userChipsNum === 0 || pejmanChipsNum === 0) ? (
        <div>Pejman is done hitting.</div>
      ) : isRoundOver &&
        userPoint < 21 &&
        pejmanPoint < 21 &&
        finalMessage === "" &&
        (userHand.length > 0 || pejmanHand.length > 0) &&
        userChipsNum > 0 &&
        pejmanChipsNum > 0 ? (
        <div>
          Pejman is done hitting. let's see who is the winner of this round.
        </div>
      ) : isRoundOver &&
        userPoint > 21 &&
        pejmanPoint < 21 &&
        finalMessage === "" &&
        userHand.length > 2 &&
        (userHand.length > 0 || pejmanHand.length > 0) ? (
        <div>You busted!</div>
      ) : (isRoundOver &&
          userPoint === 21 &&
          pejmanPoint < 21 &&
          finalMessage === "" &&
          (userHand.length > 0 || pejmanHand.length > 0)) ||
        (isRoundOver &&
          userPoint === 22 &&
          userHand.length === 2 &&
          finalMessage === "" &&
          (userHand.length > 0 || pejmanHand.length > 0)) ? (
        <div>Well done! BlackJack! &#128512;</div>
      ) : isRoundOver &&
        pejmanPoint > 21 &&
        userPoint < 21 &&
        finalMessage === "" &&
        pejmanHand.length > 2 &&
        (userHand.length > 0 || pejmanHand.length > 0) ? (
        <div>Pejman is busted!</div>
      ) : (
        ((isRoundOver &&
          pejmanPoint === 21 &&
          userPoint < 21 &&
          finalMessage === "" &&
          (userHand.length > 0 || pejmanHand.length > 0)) ||
          (isRoundOver &&
            pejmanPoint === 22 &&
            pejmanHand.length === 2 &&
            finalMessage === "" &&
            (userHand.length > 0 || pejmanHand.length > 0))) && (
          <div>Pejman is BlackJack!</div>
        )
      )}
      {((userChipsNum === 0 && userPoint < pejmanPoint && pejmanPoint < 22) ||
        (userChipsNum === 0 && userPoint > 21) ||
        (pejmanChipsNum === 0 && pejmanPoint < userPoint && userPoint < 22) ||
        (pejmanChipsNum === 0 && pejmanPoint > 21) ||
        (userChipsNum === 0 && userPoint === pejmanPoint && normalMode) ||
        (pejmanChipsNum === 0 && pejmanPoint === userPoint && easyMode)) &&
        isRoundOver && (
          <div>And the game is over, let's see who is the winner.</div>
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
