import { useState, useEffect } from "react";
import ReviewSection from "../../Components/ReviewSection";
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
  const [deck, setDeck] = useState(deckArray); // The array represemting the deck of cards, containing 52 cards
  const [usedCards, setUsedCards] = useState([]); // The cards that have been revealed (used by one of the players)
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [userChipsNum, setUserChipsNum] = useState(7); // The number of the user's gambling chips
  const [pejmanChipsNum, setPejmanChipsNum] = useState(7); // The number of Pejman's gambling chips
  const [userHand, setUserHand] = useState([]); // The cards in the user's hand while the game is proceeding
  const [pejmanHand, setPejmanHand] = useState([]); // The cards in Pejman's hand while the game is proceeding
  const [userPoint, setUserPoint] = useState(0); // The sum of the values of all the cards in the user's hand 
  const [pejmanPoint, setPejmanPoint] = useState(0); // The sum of the values of all the cards in Pejman's hand 
  const [bet, setBet] = useState(0); // The number of gambling chips that the user has assigned for the bet
  const [isBetMade, setIsBetMade] = useState(false); // The boolean that shows if the bet is made by the user, so that the game can begin
  const [roundNum, setRoundNum] = useState(1); // The number representing the round of the game
  const [isRoundOver, setIsRoundOver] = useState(false); // The boolean that shows if the round is over, so that the final message could appear
  const [isRaising, setIsRaising] = useState(false); // The boolean that shows if the user is raising the bet
  const [allowStand, setAllowStand] = useState(true); // The boolean that shows if the user is allowed to stand (the user can't stand right after raising)
  const [raise, setRaise] = useState(0); // The number of the gambling chips as the raise
  const [roundMessage, setRoundMessage] = useState(""); // The message that indicates who wins the round
  const [finalMessage, setFinalMessage] = useState(""); // The final message of the game, indicating who is the winner of the game
  const [isAce, setIsAce] = useState(false); // The boolean that shows if the last picked card by either the user or Pejman is an Ace
  const [isDeckFinished, setIsDeckFinished] = useState(false); // The boolean that shows if the deck of the cards is finished and should be shuffled
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  // The function for assigning the game to easy mode
  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  // The function for assigning the game to normal mode
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  // The function for starting the game
  const handleStart = () => {
    // Reseting some of the appropriate state variables:
    setDeck(deckArray);
    setUsedCards([]);
    setPejmanHand([]);
    setIsUserTurn(true);
    setDeck((currDeck) => shuffleArray(currDeck));
    setIsGameStarted(true);
    setPejmanPoint(0);
  };
  // The function for shuffling an array (the array would be the deck of the cards)
  const shuffleArray = (array) => {
    const arr = [...array]; // Creating a copy of the input array
    for (let i = arr.length - 1; i > 0; i--) { // Looping through the elements of the input array
      const j = Math.floor(Math.random() * (i + 1)); // Choosing randomly a number from 0 to i
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Exchanging the index of the current index (i) and the randomly chosen number (j)
    }
    return arr;
  };
  // The function with which Pejman evaluates the risk of hitting (asking for the next card)
  const normalModeRiskManagement = (distance) => { // distance = 21 - the value of Pejman's hand
    let goodRisk = 0; // The indicator number that represents the chance that Pejman will not get busted
    let badRisk = 0; // The indicator number that represents the chance that Pejman will get busted
    for (const card of deck) { // Evaluating each card of the remaining of the deck (the cards that haven't been revealed)
      if (Number(card.point) <= distance) { // If the point of the current card + the value of Pejman's hand is less than 22
        goodRisk++;
      } else { // If the point of the current card + the value of Pejman's hand is greater than 21
        badRisk++;
      }
    }
    if (goodRisk >= badRisk) { // Comparing the "goodRisk" and the "badRisk"
      return true;
    } else {
      return false;
    }
  };
  // The function for the moment the user hits (asks for a new card)
  const getNewCardForUser = () => {
    setRoundMessage("");
    // The next card for the user is the first element of the shuffled deck, which is "deck[0]"
    if (deck[0].point === 0) { // If the next card for the user is an Ace, the user should chose its value (1 or 11)
      setIsAce(true); // set the "isAce" state variable to true (for rendering the question: is the ace has the value of 1 or 11?)
      return; // Exit this function; though we'll return to this function when the user chooses either 1 or 11
    }
    setUserHand((currUserHand) => [...currUserHand, deck[0]]); // Updating the user's hand state variable by adding the next card to it
    setUserPoint((currUserPoint) => currUserPoint + deck[0].point); // Updating the value of the user's hand state variable by adding the next card's point to its value
    setDeck((currDeck) => currDeck.filter((c) => currDeck.indexOf(c) !== 0)); // Updating the deck state variable by removing the next card from it
    setUsedCards((currUsedCards) => [...currUsedCards, deck[0]]); // Updating the used cards state variable by adding the next card to it
    setAllowStand(true); // After hitting, the user can stand
  };
  const handleAce = (i) => { // i = the value that the user has chosen for the Ace, either 1 or 11
    setDeck((prevDeck) =>
      prevDeck.map((card) => // Mapping through the deck
        prevDeck.indexOf(card) === 0 ? { ...card, point: Number(i) } : card, // Updating the point of only the first card (which is the ace)
      ),
    );
    setIsAce(false); // return the "isAce" state variable to false
    getNewCardForUser(); // Returning to the "" function -> this time we won't hit the return of the "if (deck[0].point === 0)" condition
    // because deck[0].point isn't 0 anymore; it's either 1 or 11
  };
  // The function for handling the dropdown of the bet form:
  const handleBet = (e) => {
    setBet(Number(e.target.value)); // Assigning the value of the input to the bet
  };
  // The function for finalizing the selected value as the bet of the game:
  const submitBet = (e) => {
    e.preventDefault();
    setIsBetMade(true); // Assuring that the bet is confirmed
    setUserChipsNum((currUserChipsNum) => currUserChipsNum - bet); // Picking from the user's gambling chips as the amount of the bet
    setPejmanChipsNum((currPejmanChipsNum) => currPejmanChipsNum - bet); // Picking from Pejman's gambling chips as the amount of the bet
  };
  // The function for rendering(showing) the raising form:
  const renderRaisingForm = () => {
    setIsRaising(true);
  };
  // The function for handling the dropdown of the raise form:
  const handleRaise = (e) => {
    setRaise(Number(e.target.value));
  };
  // The function for finalizing the selected value as the raise:
  const submitRaise = (e) => {
    e.preventDefault();
    setIsRaising(false); // The raising process is going to finish, so we should return the state variable to false
    setBet((currBet) => currBet + raise); // Updating the bet based on the new raise:
    setUserChipsNum((currUserChipsNum) => currUserChipsNum - raise); // Updating the user's gambling chips based on the amount of the raise
    setPejmanChipsNum((currPejmanChipsNum) => currPejmanChipsNum - raise); // Updating Pejman's gambling chips based on the amount of the raise
    setAllowStand(false); // The user is not allowed to stand right after raising!
  };
  // The function for cancling the raise (for the "cancel" button):
  const cancelRaising = () => {
    setIsRaising(false);
  };
  // The function for handling stand:
  const handleStand = () => {
    setIsUserTurn(false); // When the user stands, it's not their turn anymore
    setAllowStand(true); // Returning the "allowStand" state variable to its default
  };
  // The function for Pejman to have his move:
  const handleAllowPejman = () => {
    // Returning the "isAce" variable to its default value (in case if his last card from the last turn was an ace)
    setIsAce(false);
    // If Pejman's new card is an ace, he should choose its value; either 1 or 11:
    if (deck[0].point === 0) {
      setIsAce(true); // First update the "isAce" variable to true
      // Handling the special "Double-Aces-BlackJack" situation;
      // if Pejman has only an ace in his hand and the next card is another ace, Pejman is "BlackJack"
      if (pejmanHand.length === 1 && pejmanPoint + 11 === 22) {
        setDeck((prevDeck) =>
          // Updating the deck:
          prevDeck.map((card) =>
            // Updating the point of the fisrt card of the deck (which is the ace) to 11
            deck.indexOf(card) === 0 ? { ...card, point: 11 } : card,
          ),
        );
      }
      // If assigning the value of 11 doesn't have the result of busting for Pejman -> choose 11 as the value of the ace:
      else if (pejmanPoint + 11 < 22) {
        // Updating the deck:
        setDeck((prevDeck) =>
          prevDeck.map((card) =>
            // Updating the point of the fisrt card of the deck (which is the ace) to 11
            deck.indexOf(card) === 0 ? { ...card, point: 11 } : card,
          ),
        );
      }
      // If assigning the value of 11 has the result of busting for Pejman -> choose 1 as the value of the ace:
      else {
        // Updating the deck:
        setDeck((prevDeck) =>
          prevDeck.map((card) =>
            // Updating the point of the fisrt card of the deck (which is the ace) to 1
            deck.indexOf(card) === 0 ? { ...card, point: 1 } : card,
          ),
        );
      }
      return;
    }
    // If the game is on "Easy" mode, Pejman's strategy is to hit if the value of his hand is less than 18
    // and to stand if it's more than 17:
    if (easyMode) {
      if (pejmanPoint < 18) { // If the value of Pejman's hand is less than 18 -> hit
        // Updating the "pejmanHand" variable by adding the next card to it (hitting):
        setPejmanHand((currPejmanHand) => [...currPejmanHand, deck[0]]);
        // Updating the "pejmanPoint" variable by adding the point of the next card to it (hitting):
        setPejmanPoint((currPejmanPoint) => currPejmanPoint + deck[0].point);
        // Updating the deck:
        setDeck((currDeck) =>
          // Removing the first card of the deck 
          currDeck.filter((c) => currDeck.indexOf(c) !== 0),
        );
        // Updating the "usedCards" variable by adding the first card of the deck to it:
        setUsedCards((currUsedCards) => [...currUsedCards, deck[0]]);
      }
      // If the value of Pejman's hand is more than 17 -> stand
      else {
        setIsRoundOver(true);
      }
      // If the game is on "Normal" mode, Pejman's strategy is to evaluate the risk of the point of the next card:
    } else if (normalMode) {
      // Evaluating the risk of the point of the next card is done by the "normalModeRiskManagement" function that
      // has been already created. This function returns a boolean.
      if (normalModeRiskManagement(21 - pejmanPoint)) { // If the "normalModeRiskManagement" function returns true
        setPejmanHand((currPejmanHand) => [...currPejmanHand, deck[0]]); // Pejman gets the next card
        setPejmanPoint((currPejmanPoint) => currPejmanPoint + deck[0].point); // The value of Pejman's hand increases by the value of the next card
        // Updating the deck by removing the next card from it:
        setDeck((currDeck) =>
          currDeck.filter((c) => currDeck.indexOf(c) !== 0),
        );
        // Updating the "usedCards" state variable by adding the next card to it:
        setUsedCards((currUsedCards) => [...currUsedCards, deck[0]]);
      } else { // If the "normalModeRiskManagement" function returns false
        setIsRoundOver(true); // Pejman doesn't get the next card
      }
    }
  };
  // The function that handles everything when the round is finished:
  const handleRoundOver = () => {
    let tempUserChipsNum = userChipsNum; // The temporary variable for the "userChipsNum" state variable
    let tempPejmanChipsNum = pejmanChipsNum; // The temporary variable for the "pejmanChipsNum" state variable
    const tempBet = bet; // The temporary variable for the "bet" state variable
    let tempRoundMessage; // The temporary variable for the "roundMessage" state variable
    // The condition of the "Double-Aces-BlackJack" situation for the user:
    if (userPoint === 22 && userHand.length === 2) {
      tempUserChipsNum = userChipsNum + 2 * tempBet; // Increasing the number of the user's gambling chips number
      if (tempPejmanChipsNum !== 0) { // If the game isn't going to finish
        tempRoundMessage =
          "Your hand is double-Aces! The value of your hand is NOT 22, it's 21 :) (BlackJack). You win this round!";
      } else { // If the game is going to finish
        tempRoundMessage = `Your hand is double-Aces! The value of your hand is NOT 22, it's 21 :) (BlackJack). You won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    }
    // The condition of the "Double-Aces-BlackJack" situation for Pejman:
    else if (pejmanPoint === 22 && pejmanHand.length === 2) {
      tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet; // Increasing the number of Pejman's gambling chips number
      if (tempUserChipsNum !== 0) { // If the game isn't going to finish
        tempRoundMessage =
          "Pejman's hand is double-Aces! The value of his hand is NOT 22, it's 21 :) (BlackJack). Pejman wins this round!";
      } else { // If the game is going to finish
        tempRoundMessage = `Pejman's hand is double-Aces! The value of his hand is NOT 22, it's 21 :) (BlackJack). Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    }
    // The condition of the "BlackJack" situation for the user:
    else if (userPoint === 21 && pejmanPoint !== 21) {
      tempUserChipsNum = userChipsNum + 2 * tempBet; // Increasing the number of the user's gambling chips number
      if (tempPejmanChipsNum !== 0) { // If the game isn't going to finish
        tempRoundMessage = `The value of your hand is ${userPoint} (BlackJack). You win this round!`;
      } else { // If the game is going to finish
        tempRoundMessage = `The value of your hand was ${userPoint} (BlackJack). You won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    }
    // The condition of the "BlackJack" situation for Pejman:
    else if (pejmanPoint === 21 && userPoint !== 21) {
      tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet; // Increasing the number of Pejman's gambling chips number
      if (tempUserChipsNum !== 0) { // If the game isn't going to finish
        tempRoundMessage = `The value of Pejman's hand is ${pejmanPoint} (BlackJack). Pejman wins this round!`;
      } else { // If the game is going to finish
        tempRoundMessage = `The value of Pejman's hand was ${pejmanPoint} (BlackJack). Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    }
    // The condition where the user is busted:
    else if (userPoint > 21 && pejmanPoint <= 21) {
      tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet; // Increasing the number of Pejman's gambling chips number
      if (tempUserChipsNum !== 0) { // If the game isn't going to finish
        tempRoundMessage = `The value of your hand is ${userPoint} (Busted). Pejman wins this round!`;
      } else { // If the game is going to finish
        tempRoundMessage = `The value of your hand was ${userPoint} (Busted). Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    }
    // The condition where Pejman is busted:
    else if (pejmanPoint > 21 && userPoint <= 21) {
      tempUserChipsNum = userChipsNum + 2 * tempBet; // Increasing the number of the user's gambling chips number
      if (tempPejmanChipsNum !== 0) { // If the game isn't going to finish
        tempRoundMessage = `The value of Pejman's hand is ${pejmanPoint} (Busted). You win this round!`;
      } else { // If the game is going to finish
        tempRoundMessage = `The value of Pejman's hand was ${pejmanPoint} (Busted). You won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
      }
    }
    // The condition where the user and Pejman are neither busted nor BlackJack:
    else if (userPoint < 21 && pejmanPoint < 21) {
      if (userPoint > pejmanPoint) { // If the user's point is greater than Pejman's
        tempUserChipsNum = userChipsNum + 2 * tempBet; // Increasing the number of the user's gambling chips number
        if (tempPejmanChipsNum !== 0) { // If the game isn't going to finish
          tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint}. You win this round!`;
        } else { // If the game is going to finish
          tempRoundMessage = `The value of your hand was ${userPoint} and the value of Pejman's hand was ${pejmanPoint}. You won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
        }
      } else if (userPoint < pejmanPoint) { // If the user's point is less than Pejman's
        tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet; // Increasing the number of Pejman's gambling chips number
        if (tempUserChipsNum !== 0) { // If the game isn't going to finish
          tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint}. Pejman wins this round!`;
        } else { // If the game is going to finish
          tempRoundMessage = `The value of your hand was ${userPoint} and the value of Pejman's hand was ${pejmanPoint}. Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
        }
      } else if (userPoint === pejmanPoint) { // If the user's point and Pejman's point are the same
        if (easyMode) { // If the game is on "Easy" mode, the user wins
          tempUserChipsNum = userChipsNum + 2 * tempBet; // Increasing the number of the user's gambling chips number
          if (tempPejmanChipsNum !== 0) { // If the game isn't going to finish
            tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint} too. It's "Easy Mode", so you win this round!`;
          } else { // If the game is going to finish
            tempRoundMessage = `The value of your hand was ${userPoint} and the value of Pejman's hand was ${pejmanPoint} too. It was "Easy Mode", so you won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
          }
        } else { // If the game is on "Normal" mode, Pejman wins
          tempPejmanChipsNum = pejmanChipsNum + 2 * tempBet; // Increasing the number of Pejman's gambling chips number
          if (tempUserChipsNum !== 0) { // If the game isn't going to finish
            tempRoundMessage = `The value of your hand is ${userPoint} and the value of Pejman's hand is ${pejmanPoint} too. It's "Normal Mode", so Pejman wins this round!`;
          } else { // If the game is going to finish
            tempRoundMessage = `The value of your hand was ${userPoint} and the value of Pejman's hand was ${pejmanPoint} too. It was "Normal Mode", so Pejman won the ${roundNum > 2 ? "last" : ""} round, and in conclusion:`;
          }
        }
      }
    }
    // Since the round is over, some of the state variables will reset and some will be updated:
    setUserChipsNum(tempUserChipsNum); // Updating the number of the user's gambling chips 
    setPejmanChipsNum(tempPejmanChipsNum); // Updating the number of Pejman's gambling chips 
    setBet(0); // Reseting the "bet" state variable
    setIsRoundOver(false); // Reseting the "IsRoundOver" state variable
    setUserHand([]); // Reseting the "UserHand" state variable
    setPejmanHand([]); // Reseting the "PejmanHand" state variable
    setUserPoint(0); // Reseting the "UserPoint" state variable
    setPejmanPoint(0); // Reseting the "PejmanPoint" state variable
    setRaise(0); // Reseting the "Raise" state variable
    setRoundNum((currRoundNum) => currRoundNum + 1); // Updating the "roundNum" state variable
    setIsUserTurn(true); // Reseting the "IsUserTurn" state variable
    setIsBetMade(false); // Reseting the "IsBetMade" state variable
    setIsRaising(false); // Reseting the "IsRaising" state variable
    setRoundMessage(tempRoundMessage); // Updating the "roundMessage" state variable
  };
  // The function that shuffles the cards when they're all used
  // (except the ones that are in the hands of the players) for continuing the game:
  const ShuffleCardsAndContinue = () => {
    let newDeck = []; // The temporary variable for the "deck" state variable
    for (const card of usedCards) { // Looping through all the cards
      if (!userHand.includes(card) && !pejmanHand.includes(card)) { // if the card is not in the hand of any of the players
        newDeck.push(card); // add it to the deck that is going to be shuffled
      }
    }
    setDeck(shuffleArray(newDeck)); // Use the "shuffleArray" function and shuffle the new created deck
    setUsedCards([]); // Reset the "usedCards" state variable -> because all the used cards are shuufled and are going to be used again
    setIsDeckFinished(false); // Reset the "isDeckFinished" state variable
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
    setShowReviews(true);
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
        updateTotalPoint(32);
      } else {
        updateTotalPoint(45);
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
  useEffect(() => {
    document.title = "BlackJack";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutBlackJack setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            BlackJack
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
                      About BlackJack
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
                        finalMessage !== ""
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
                  !isTogglingLevel && (
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
          {!isGameStarted &&
            !easyMode &&
            !normalMode &&
            !isTogglingHomePage && (
              <div
                className="four-buttons-container"
                style={{ marginTop: "15px" }}
              >
                <button className="btn1" onClick={handleEasyMode}>
                  Easy Mode
                </button>
                <button className="btn1" onClick={handleNormalMode}>
                  Normal Mode
                </button>
              </div>
            )}
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div>
                <button
                  className="btn1"
                  onClick={handleStart}
                  style={{ marginTop: "15px" }}
                >
                  Start the Game
                </button>
                <br />
                <img
                  src={StartDeck}
                  className="product-blackJack-deckImage"
                  style={{ marginTop: "15px" }}
                  alt=""
                />
              </div>
            )}
          {isGameStarted &&
            finalMessage === "" &&
            roundMessage === "" &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <div style={{ fontSize: "25px" }}>
                <strong>Round {roundNum}</strong>
              </div>
            )}
          <div className="container">
            <div className="row">
              <div className="col-lg-3 d-none d-lg-block">
                {/* Deck */}
                {isGameStarted &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage &&
                  deck.map((c, i) =>
                    (i + 1) % 6 !== 0 ? (
                      <div style={{ display: "inline" }} key={i}>
                        <img
                          src={Back}
                          height="55px"
                          style={{ margin: "2px" }}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div style={{ display: "inline" }}>
                        <img
                          src={Back}
                          height="55px"
                          style={{ margin: "2px" }}
                          alt=""
                        />
                        <br />
                      </div>
                    ),
                  )}
              </div>
              <div className="col-lg-6">
                {/* Pejman's chips */}
                {isGameStarted &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div style={{ marginBottom: "10px" }}>
                      {new Array(pejmanChipsNum).fill(null).map((c, i) => (
                        <img
                          src={chips[1]}
                          className="product-blackJack-chipsImage"
                          style={{ margin: "2px" }}
                          alt=""
                          key={i}
                        />
                      ))}
                    </div>
                  )}
                {isGameStarted &&
                  pejmanHand.length > 0 &&
                  finalMessage === "" &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div className="container">
                      <div className="row">
                        <div className="col-10 offset-1 d-flex justify-content-center my-2">
                          The value of Pejman's hand:{" "}
                          <strong>{pejmanPoint}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                {/* Pejman's hand */}
                {isGameStarted &&
                  finalMessage === "" &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div>
                      {new Array(pejmanHand.length).fill(null).map((c, i) => (
                        <img
                          src={pejmanHand[i].imgSrc}
                          className="product-blackJack-hand"
                          style={{ margin: "2px" }}
                          alt=""
                          key={i}
                        />
                      ))}
                    </div>
                  )}
                {/* Bet */}
                {isGameStarted &&
                  isBetMade &&
                  finalMessage === "" &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div
                      className="product-blackJack-table my-1"
                      style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        backgroundColor: "var(--background)",
                        border: "1px solid black",
                      }}
                    >
                      {new Array(2 * bet).fill(null).map((c, i) => (
                        <img
                          src={chips[0]}
                          className="product-blackJack-chipsImage"
                          style={{ paddingLeft: "2px", paddingRight: "2px" }}
                          alt=""
                          key={i}
                        />
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
                  <div className="container">
                    <div className="row">
                      <div className="col-10 offset-1 d-flex justify-content-center">
                        <h4>The result of the final round:</h4>
                      </div>
                    </div>
                  </div>
                ) : (
                  finalMessage !== "" &&
                  roundMessage &&
                  roundNum === 2 &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div className="container">
                      <div className="row">
                        <div className="col-10 offset-1 d-flex justify-content-center">
                          <h4>
                            The game had only one round with the following
                            result:
                          </h4>
                        </div>
                      </div>
                    </div>
                  )
                )}
                {roundMessage &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div className="container">
                      <div className="row">
                        <div className="col-10 offset-1 d-flex justify-content-center">
                          <h4>{roundMessage}</h4>
                        </div>
                      </div>
                    </div>
                  )}
                {finalMessage !== "" && !isTogglingHomePage && (
                  <div className="container">
                    <div className="row">
                      <div className="col-10 offset-1 d-flex justify-content-center">
                        <h3 className="fasterOne" style={{ fontSize: "40px" }}>
                          {finalMessage}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
                {finalMessage &&
                  finalMessage === "You win the game!" &&
                  !isTogglingHomePage && (
                    <div>
                      <div>Play Again?</div>
                      <button
                        className="btn2 my-1"
                        onClick={handlePlayAgain}
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        Ok
                      </button>
                    </div>
                  )}
                {finalMessage &&
                  finalMessage === "Pejman wins the game!" &&
                  !isTogglingHomePage && (
                    <div>
                      <div>Try Again?</div>
                      <button
                        className="btn2 my-1"
                        onClick={handlePlayAgain}
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        Ok
                      </button>
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
                        className="product-blackJack-hand"
                        style={{ margin: "2px" }}
                        alt=""
                        key={i}
                      />
                    ))}
                {isGameStarted &&
                  userHand.length > 0 &&
                  finalMessage === "" &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div className="container">
                      <div className="row">
                        <div className="col-10 offset-1 d-flex justify-content-center my-2">
                          The value of your hand: <strong>{userPoint}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                {/* User's chips */}
                {isGameStarted &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div>
                      {new Array(userChipsNum).fill(null).map((c, i) => (
                        <img
                          src={chips[1]}
                          className="product-blackJack-chipsImage"
                          style={{ margin: "2px" }}
                          alt=""
                          key={i}
                        />
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
                    <button
                      className="btn1"
                      onClick={getNewCardForUser}
                      style={{ marginTop: "15px" }}
                    >
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
                        <label htmlFor="bet">{`Make your bet `}</label>
                        <select
                          onChange={handleBet}
                          style={{
                            textAlign: "center",
                            width: "40px",
                            borderRadius: "8px",
                            height: "25px",
                            marginLeft: "5px",
                            marginTop: "5px",
                            position: "relative",
                            top: "3px",
                            backgroundColor: "var(--background)"
                          }}
                          name="bet"
                          id="bet"
                        >
                          <option value={bet} disabled selected></option>
                          {Array.from(
                            { length: Math.min(userChipsNum, pejmanChipsNum) },
                            (_, i) => i + 1,
                          ).map((i, idx) => (
                            <option style={{ fontSize: "13px" }} key={idx}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </div>
                      {bet > 0 && (
                        <button className="btn1" style={{ marginTop: "10px" }}>
                          Submit your bet
                        </button>
                      )}
                    </form>
                  )}
                {/* The 3 buttons */}
                <div className="four-buttons-container">
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
                      <button className="btn1" onClick={getNewCardForUser}>
                        Hit
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
                      <button
                        className="btn1"
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
                      <button
                        className="btn1"
                        onClick={handleStand}
                        disabled={!allowStand}
                      >
                        Stand
                      </button>
                    )}
                </div>
                {isAce &&
                  isUserTurn &&
                  !isDeckFinished &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div>
                      <div className="container">
                        <div className="row">
                          <div className="col-10 offset-1 d-flex justify-content-center">
                            {`${userPoint === 0 ? "You're first card" : "You're next card"} is an Ace, do you want it to have the value of 1 or 11?`}
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn2"
                        style={{ width: "40px", marginRight: "5px" }}
                        onClick={() => handleAce(1)}
                      >
                        1
                      </button>
                      <button
                        className="btn2"
                        style={{ width: "40px", marginLeft: "5px" }}
                        onClick={() => handleAce(11)}
                      >
                        11
                      </button>
                    </div>
                  )}
                {isAce &&
                  !isUserTurn &&
                  !isDeckFinished &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div>
                      <div className="container">
                        <div className="row">
                          <div className="col-10 offset-1 d-flex justify-content-center">
                            {`${pejmanPoint === 0 ? "Pejman's first card" : "Pejman's next card"} is an Ace, and he wants it to have the value of ${deck[0].point}`}
                          </div>
                        </div>
                      </div>
                      <button className="btn2 my-1" onClick={handleAllowPejman}>
                        Ok
                      </button>
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
                    <div className="container">
                      <div className="row">
                        <div
                          className="col-10 offset-1 d-flex justify-content-center"
                          style={{ fontSize: "15px" }}
                        >
                          <strong>
                            - You can't raise anymore because you don't have any
                            gambling chips!
                          </strong>
                        </div>
                      </div>
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
                    <div className="container">
                      <div className="row">
                        <div
                          className="col-10 offset-1 d-flex justify-content-center"
                          style={{ fontSize: "15px" }}
                        >
                          <strong>
                            - You can't raise anymore because Pejman doesn't have
                            any gambling chips!
                          </strong>
                        </div>
                      </div>
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
                    <div className="container">
                      <div className="row">
                        <div
                          className="col-10 offset-1 d-flex justify-content-center"
                          style={{ fontSize: "15px" }}
                        >
                          <strong>
                            - You can't raise anymore because neither you nor
                            Pejman don't have any gambling chips!
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}
                {!allowStand &&
                  finalMessage === "" &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div className="container">
                      <div className="row">
                        <div
                          className="col-10 offset-1 d-flex justify-content-center"
                          style={{ fontSize: "15px" }}
                        >
                          <strong>- You can't stand right after raising!</strong>
                        </div>
                      </div>
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
                            {`How much do you want to raise? `}
                          </label>
                          <select
                            onChange={handleRaise}
                            style={{
                              textAlign: "center",
                              width: "40px",
                              borderRadius: "8px",
                              height: "25px",
                              marginLeft: "5px",
                              marginTop: "5px",
                              position: "relative",
                              top: "3px",
                              backgroundColor: "var(--background)"
                            }}
                            name="raise"
                            id="raise"
                          >
                            <option value={raise} disabled selected></option>
                            {Array.from(
                              {
                                length: Math.min(userChipsNum, pejmanChipsNum),
                              },
                              (_, i) => i + 1,
                            ).map((i, idx) => (
                              <option style={{ fontSize: "13px" }} key={idx}>
                                {i}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          className="btn1"
                          disabled={raise === 0}
                          style={{ margin: "5px" }}
                        >
                          Update the raise
                        </button>
                      </form>
                      <button
                        className="btn1"
                        onClick={cancelRaising}
                        style={{ margin: "5px" }}
                      >
                        Cancel the raise
                      </button>
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
                      <button
                        className="btn2 my-1"
                        onClick={handleAllowPejman}
                        style={{ marginTop: "15px" }}
                      >
                        Ok
                      </button>
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
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10 offset-md-1 d-flex justify-content-center">
                        Pejman is done hitting.
                      </div>
                    </div>
                  </div>
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
                  <div className="container">
                    <div className="row">
                      <div className="col-10 offset-1 d-flex justify-content-center">
                        Pejman is done hitting. let's see who is the winner of
                        this round.
                      </div>
                    </div>
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
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10 offset-md-1 d-flex justify-content-center">
                        You busted!
                      </div>
                    </div>
                  </div>
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
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10 offset-md-1 d-flex justify-content-center">
                        Well done! BlackJack! &#128512;
                      </div>
                    </div>
                  </div>
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
                  <div className="container">
                    <div className="row">
                      <div className="col-md-10 offset-md-1 d-flex justify-content-center">
                        Pejman is busted!
                      </div>
                    </div>
                  </div>
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
                  !isTogglingHomePage && (
                    <div className="container">
                      <div className="row">
                        <div className="col-md-10 offset-md-1 d-flex justify-content-center">
                          Pejman is BlackJack!
                        </div>
                      </div>
                    </div>
                  )
                )}
                {((userChipsNum === 0 &&
                  userPoint < pejmanPoint &&
                  pejmanPoint < 22) ||
                  (userChipsNum === 0 && userPoint > 21) ||
                  (pejmanChipsNum === 0 &&
                    pejmanPoint < userPoint &&
                    userPoint < 22) ||
                  (pejmanChipsNum === 0 && pejmanPoint > 21) ||
                  (userChipsNum === 0 &&
                    userPoint === pejmanPoint &&
                    normalMode) ||
                  (pejmanChipsNum === 0 &&
                    pejmanPoint === userPoint &&
                    easyMode)) &&
                  isRoundOver &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div className="container">
                      <div className="row">
                        <div className="col-10 offset-1 d-flex justify-content-center">
                          And the game is over, let's see who is the winner.
                        </div>
                      </div>
                    </div>
                  )}
                {isRoundOver &&
                  (userHand.length > 0 || pejmanHand.length > 0) &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <button
                      className="btn2 my-1"
                      onClick={handleRoundOver}
                      style={{ marginTop: "10px" }}
                    >
                      Ok
                    </button>
                  )}
                {isDeckFinished &&
                  userChipsNum > 0 &&
                  pejmanChipsNum > 0 &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage && (
                    <div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-10 offset-md-1 d-flex justify-content-center">
                            There's no card left!
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn1 my-2"
                        onClick={ShuffleCardsAndContinue}
                      >
                        Shuffle the cards and continue the game
                      </button>
                    </div>
                  )}
              </div>
              <div className="col-lg-3 d-none d-lg-block">
                {/* Used Cards */}
                {isGameStarted &&
                  !isTogglingReset &&
                  !isTogglingLevel &&
                  !isTogglingHomePage &&
                  usedCards.map((c, i) =>
                    !userHand.includes(c) &&
                    !pejmanHand.includes(c) &&
                    (i + 1) % 6 !== 0 ? (
                      <div style={{ display: "inline" }} key={i}>
                        <img
                          src={Back}
                          height="55px"
                          style={{ margin: "2px" }}
                          alt=""
                        />
                      </div>
                    ) : (
                      !userHand.includes(c) &&
                      !pejmanHand.includes(c) && (
                        <div style={{ display: "inline" }}>
                          <img
                            src={Back}
                            height="55px"
                            style={{ margin: "2px" }}
                            alt=""
                          />
                          <br />
                        </div>
                      )
                    ),
                  )}
              </div>
            </div>
          </div>
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button
                className="btn1"
                style={{ marginBottom: "30px", marginTop: "20px" }}
                onClick={handleReviewSection}
              >
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
