import { useState, useEffect } from "react";
import ReviewSection from "../../Components/ReviewSection";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";
import { deckArray, chips, clubs, diamonds, hearts, spades } from "./images";
import { useNavigate } from "react-router-dom";
import Back from "./images/Back.jpg";
import StartDeck from "./images/Start-Deck.png";
import AboutBlackJack from "./AboutBlackJack";

export default function BlackJack({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
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
  const [isDeckFinished, setIsDeckFinished] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
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
  const normalModeRiskManagement = (distance) => {
    let goodRisk = 0;
    let badRisk = 0;
    for (const card of deck) {
      if (Number(card.point) <= distance) {
        goodRisk++;
      } else {
        badRisk++;
      }
    }
    if (goodRisk >= badRisk) {
      return true;
    } else {
      return false;
    }
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
  const handleAce = (i) => {
    setDeck((prevDeck) =>
      prevDeck.map((card) =>
        prevDeck.indexOf(card) === 0 ? { ...card, point: Number(i) } : card,
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
    if (easyMode) {
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
    } else if (normalMode) {
      if (normalModeRiskManagement(21 - pejmanPoint)) {
        setPejmanHand((currPejmanHand) => [...currPejmanHand, deck[0]]);
        setPejmanPoint((currPejmanPoint) => currPejmanPoint + deck[0].point);
        setDeck((currDeck) =>
          currDeck.filter((c) => currDeck.indexOf(c) !== 0),
        );
        setUsedCards((currUsedCards) => [...currUsedCards, deck[0]]);
      } else {
        setIsRoundOver(true);
      }
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
  const ShuffleCardsAndContinue = () => {
    let newDeck = [];
    for (const card of usedCards) {
      if (!userHand.includes(card) && !pejmanHand.includes(card)) {
        newDeck.push(card);
      }
    }
    setDeck(shuffleArray(newDeck));
    setUsedCards([]);
    setIsDeckFinished(false);
  };
  const handlePlayAgain = () => {
    setDeck(shuffleArray(deckArray));
    setIsUserTurn(true);
    setUsedCards([]);
    setUserChipsNum(7);
    setPejmanChipsNum(7);
    setUserHand([]);
    setPejmanHand([]);
    setUserPoint(0);
    setPejmanPoint(0);
    setBet(0);
    setIsBetMade(false);
    setRoundNum(1);
    setIsRoundOver(false);
    setIsRaising(false);
    setAllowStand(true);
    setRaise(0);
    setRoundMessage("");
    setFinalMessage("");
    setIsAce(false);
    setIsDeckFinished(false);
    setIsTogglingReset(false);
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
    if (easyMode && pejmanPoint >= 17) {
      setIsRoundOver(true);
    }
  }, [pejmanPoint]);
  useEffect(() => {
    if (normalMode && !normalModeRiskManagement(21 - pejmanPoint)) {
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
      if (easyMode) {
        updateTotalPoint(1);
      } else {
        updateTotalPoint(3);
      }
    }
  }, [userChipsNum, pejmanChipsNum]);
  useEffect(() => {
    if (deck.length === 0) {
      setUsedCards((currUsedCards) =>
        currUsedCards.map((card) =>
          card.point === 1 || card.point === 11 ? { ...card, point: 0 } : card,
        ),
      );
      setIsDeckFinished(true);
    }
  }, [deck]);
  useEffect(() => {
    if (deck.length + usedCards.length !== 52) {
      let currUsedCards = [];
      for (const card of deckArray) {
        if (!deck.map((c) => c.imgSrc).includes(card.imgSrc)) {
          currUsedCards.push(card);
        }
      }
      setUsedCards(currUsedCards);
    }
  }, [deck, usedCards]);
  return (
    <div>
      {isAboutPage && <AboutBlackJack setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          {!isTogglingHomePage && !isTogglingLevel && !isTogglingReset && (
            <button onClick={handleAboutPage}>About BlackJack</button>
          )}
          <h2>BlackJack</h2>
          {easyMode && !normalMode && finalMessage === ""
            ? !isTogglingReset &&
              !isTogglingLevel &&
              !isTogglingHomePage && (
                <ModeExplaination message="Easy Mode: Pejman doesn't memorize the cards and if both hands have the same value, you win the round. You get one star if you win." />
              )
            : !easyMode &&
              normalMode &&
              finalMessage === "" &&
              !isTogglingReset &&
              !isTogglingLevel &&
              !isTogglingHomePage && (
                <ModeExplaination message="Normal Mode: Pejman memorizes the cards and if both hands have the same value, Pejman wins the round. You get three stars if you win." />
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
          {isGameStarted &&
            (easyMode || normalMode) &&
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
          {!isGameStarted &&
            !easyMode &&
            !normalMode &&
            !isTogglingHomePage && (
              <div>
                <button onClick={handleEasyMode}>Easy Mode</button>
                <button onClick={handleNormalMode}>Normal Mode</button>
              </div>
            )}
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                <button onClick={handleStart}>Start the Game</button>
                <br />
                <img src={StartDeck} height="400px" alt="" />
              </div>
            )}
          {/* {!isTogglingReset && !isTogglingLevel && !isTogglingHomePage && (
        <div>Deck:</div>
      )} */}
          {/* {isGameStarted &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage &&
        deck.map((c, i) => <img src={deck[i].imgSrc} height="65px" />)} */}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            deck.map((c, i) =>
              (i + 1) % 13 !== 0 ? (
                <div style={{ display: "inline" }}>
                  <img src={Back} height="55px" style={{ margin: "2px" }} alt="" />
                </div>
              ) : (
                <div style={{ display: "inline" }}>
                  <img src={Back} height="55px" style={{ margin: "2px" }} alt="" />
                  <br />
                </div>
              ),
            )}
          <br />
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            deck.map((c, i) => (
              <div style={{ display: "inline" }}>{deck[i].point} - </div>
            ))}
          <br />
          {!isTogglingReset && !isTogglingLevel && !isTogglingHomePage && (
            <div>Used Cards:</div>
          )}
          {/* {isGameStarted &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage &&
        usedCards.map((c, i) => (
          <img src={usedCards[i].imgSrc} height="65px" />
        ))} */}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            usedCards.map((c, i) =>
              !userHand.includes(c) &&
              !pejmanHand.includes(c) &&
              (i + 1) % 13 !== 0 ? (
                <div style={{ display: "inline" }}>
                  <img src={Back} height="55px" style={{ margin: "2px" }} alt="" />
                </div>
              ) : (
                !userHand.includes(c) &&
                !pejmanHand.includes(c) && (
                  <div style={{ display: "inline" }}>
                    <img src={Back} height="55px" style={{ margin: "2px" }} alt="" />
                    <br />
                  </div>
                )
              ),
            )}
          <br />
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            usedCards.map((c, i) => (
              <div style={{ display: "inline" }}>{usedCards[i].point} - </div>
            ))}
          {isGameStarted &&
            finalMessage === "" &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && <div>Round: {roundNum}</div>}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                <div style={{ color: "red" }}>bet: {bet}</div>
              </div>
            )}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div style={{ color: "red" }}>raise: {raise}</div>
            )}
          {/* Pejman's chips */}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                {new Array(pejmanChipsNum).fill(null).map((c) => (
                  <img src={chips[1]} height="50px" style={{ margin: "2px" }} alt="" />
                ))}
              </div>
            )}
          {isGameStarted &&
            pejmanHand.length > 0 &&
            finalMessage === "" &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div style={{ color: "red" }}>
                The value of Pejman's hand: {pejmanPoint}
              </div>
            )}
          {/* Pejman's hand */}
          {isGameStarted &&
            finalMessage === "" &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            new Array(pejmanHand.length)
              .fill(null)
              .map((c, i) => (
                <img
                  src={pejmanHand[i].imgSrc}
                  height="120px"
                  style={{ margin: "2px" }}
                  alt=""
                />
              ))}
          <br />
          {/* Bet */}
          {isGameStarted &&
            isBetMade &&
            finalMessage === "" &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                {new Array(2 * bet).fill(null).map((c) => (
                  <img src={chips[0]} height="50px" alt="" />
                ))}
              </div>
            )}
          {/* Round Message */}
          {finalMessage !== "" &&
          roundMessage &&
          roundNum > 2 &&
          !isTogglingReset &&
          !isTogglingLevel &&
          !isTogglingHomePage ? (
            <h4>The result of the final round:</h4>
          ) : (
            finalMessage !== "" &&
            roundMessage &&
            roundNum === 2 &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <h4>The game had only one round with the following result:</h4>
            )
          )}
          {roundMessage &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && <h4>{roundMessage}</h4>}
          {finalMessage !== "" && !isTogglingHomePage && (
            <h3>{finalMessage}</h3>
          )}
          {finalMessage &&
            finalMessage === "You win the game!" &&
            !isTogglingHomePage && (
              <div>
                <div>Play Again?</div>
                <button onClick={handlePlayAgain}>Ok</button>
              </div>
            )}
          {finalMessage &&
            finalMessage === "Pejman wins the game!" &&
            !isTogglingHomePage && (
              <div>
                <div>Try Again?</div>
                <button onClick={handlePlayAgain}>Ok</button>
              </div>
            )}
          {/* User's hand */}
          {isGameStarted &&
            finalMessage === "" &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            new Array(userHand.length)
              .fill(null)
              .map((c, i) => (
                <img
                  src={userHand[i].imgSrc}
                  height="120px"
                  style={{ margin: "2px" }}
                  alt=""
                />
              ))}
          <br />
          {isGameStarted &&
            userHand.length > 0 &&
            finalMessage === "" &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div style={{ color: "red" }}>
                The value of your hand: {userPoint}
              </div>
            )}
          {/* User's chips */}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                {new Array(userChipsNum).fill(null).map((c) => (
                  <img src={chips[1]} height="50px" style={{ margin: "2px" }} alt="" />
                ))}
              </div>
            )}
          {/* New round's button / Final button */}
          {isGameStarted &&
            isUserTurn &&
            userHand.length === 0 &&
            finalMessage === "" &&
            !isAce &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <button onClick={getNewCardForUser}>
                {userChipsNum === 0 || pejmanChipsNum === 0
                  ? "Show the final result of the game"
                  : `Start round ${roundNum}`}
              </button>
            )}
          {/* First bet form */}
          {isGameStarted &&
            isUserTurn &&
            userHand.length === 1 &&
            !isBetMade &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
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
            !isAce &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <button onClick={getNewCardForUser}>Hit</button>
            )}
          {isGameStarted &&
            isUserTurn &&
            !isRoundOver &&
            userHand.length >= 1 &&
            isBetMade &&
            !isRaising &&
            finalMessage === "" &&
            !isAce &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
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
            !isAce &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <button onClick={handleStand} disabled={!allowStand}>
                Stand
              </button>
            )}
          {isAce &&
            isUserTurn &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                <div>
                  {`${userPoint === 0 ? "You're first card" : "You're next card"} is an Ace, do you want it to have the value of 1 or 11?`}
                </div>
                <button onClick={() => handleAce(1)}>1</button>
                <button onClick={() => handleAce(11)}>11</button>
              </div>
            )}
          {isAce &&
            !isUserTurn &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
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
            pejmanChipsNum > 0 &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div style={{ color: "gray", fontSize: "15px" }}>
                You can't raise anymore because you don't have any gambling
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
            userChipsNum > 0 &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
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
            userChipsNum === 0 &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div style={{ color: "gray", fontSize: "15px" }}>
                You can't raise anymore because neither you nor Pejman don't
                have any gambling chips!
              </div>
            )}
          {!allowStand &&
            finalMessage === "" &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div style={{ color: "gray", fontSize: "15px" }}>
                You can't stand right after raising!
              </div>
            )}
          {/* Raising form */}
          {isRaising &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                <form onSubmit={submitRaise}>
                  <div>
                    <label htmlFor="raise">
                      How much do you want to raise?
                    </label>
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
            !isAce &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
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
          (userChipsNum === 0 || pejmanChipsNum === 0) &&
          !isDeckFinished &&
          !isTogglingReset &&
          !isTogglingLevel &&
          !isTogglingHomePage ? (
            <div>Pejman is done hitting.</div>
          ) : isRoundOver &&
            userPoint < 21 &&
            pejmanPoint < 21 &&
            finalMessage === "" &&
            (userHand.length > 0 || pejmanHand.length > 0) &&
            userChipsNum > 0 &&
            pejmanChipsNum > 0 &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage ? (
            <div>
              Pejman is done hitting. let's see who is the winner of this round.
            </div>
          ) : isRoundOver &&
            userPoint > 21 &&
            pejmanPoint < 21 &&
            finalMessage === "" &&
            userHand.length > 2 &&
            (userHand.length > 0 || pejmanHand.length > 0) &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage ? (
            <div>You busted!</div>
          ) : ((isRoundOver &&
              userPoint === 21 &&
              pejmanPoint < 21 &&
              finalMessage === "" &&
              (userHand.length > 0 || pejmanHand.length > 0)) ||
              (isRoundOver &&
                userPoint === 22 &&
                userHand.length === 2 &&
                finalMessage === "" &&
                (userHand.length > 0 || pejmanHand.length > 0) &&
                !isDeckFinished)) &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage ? (
            <div>Well done! BlackJack! &#128512;</div>
          ) : isRoundOver &&
            pejmanPoint > 21 &&
            userPoint < 21 &&
            finalMessage === "" &&
            pejmanHand.length > 2 &&
            (userHand.length > 0 || pejmanHand.length > 0) &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage ? (
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
                (userHand.length > 0 || pejmanHand.length > 0))) &&
            !isDeckFinished &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && <div>Pejman is BlackJack!</div>
          )}
          {((userChipsNum === 0 &&
            userPoint < pejmanPoint &&
            pejmanPoint < 22) ||
            (userChipsNum === 0 && userPoint > 21) ||
            (pejmanChipsNum === 0 &&
              pejmanPoint < userPoint &&
              userPoint < 22) ||
            (pejmanChipsNum === 0 && pejmanPoint > 21) ||
            (userChipsNum === 0 && userPoint === pejmanPoint && normalMode) ||
            (pejmanChipsNum === 0 && pejmanPoint === userPoint && easyMode)) &&
            isRoundOver &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>And the game is over, let's see who is the winner.</div>
            )}
          {isRoundOver &&
            (userHand.length > 0 || pejmanHand.length > 0) &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <button onClick={handleRoundOver}>Ok</button>
            )}
          {isDeckFinished &&
            userChipsNum > 0 &&
            pejmanChipsNum > 0 &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                <div>There's no card left!</div>
                <button onClick={ShuffleCardsAndContinue}>
                  Shuffle the cards and continue the game
                </button>
              </div>
            )}
          <br />
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button onClick={handleReviewSection}>
                {showReviews
                  ? "Hide the Reviews Section"
                  : "Show the Reviews Section"}
              </button>
            )}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            showReviews && (
              <ReviewSection game="Snake" currentUser={currentUser} />
            )}
        </div>
      )}
    </div>
  );
}
