import "./App.css";
import { useState } from "react";
import Ads from './Components/ads/Ads';
import Star from "./Games/Star.png";
import RockScissorsPaper from "./Games/RockScissorsPaper/RockScissorsPaper";
import GuessNumber from "./Games/GuessNumber/GuessNumber";
import Capitals from "./Games/Capitals/Capitals";
import Cryptogram from "./Games/Cryptogram/Cryptogram";
import Crazy100 from "./Games/Crazy100/Crazy100";
import MemoryCards from "./Games/MemoryCards/MemoryCards";
import Nim from "./Games/Nim/Nim";
import HappyFlower from "./Games/HappyFlower/HappyFlower";
import XO from "./Games/XO/XO";
import KukuKube from "./Games/KukuKube/KukuKube";
import TripleEmojiMatch from "./Games/TripleEmojiMatch/TripleEmojiMatch";
import Pidoku from "./Games/Pidoku/Pidoku";

export default function Home({ads, setAds, currentUser, setCurrentUser, isLoggingOut, isAGameStarted, setIsAGameStarted}) {
  const [showGameTitles, setShowGameTitles] = useState(true);
  const [totalPoint, setTotalPoint] = useState(0);
  const [showAllStars, setShowAllStars] = useState(false);
  const [showRockScissorsPaper, setShowRockScissorsPaper] = useState(false);
  const [showGuessNumber, setShowGuessNumber] = useState(false);
  const [showCapitals, setShowCapitals] = useState(false);
  const [showCryptogram, setShowCryptogram] = useState(false);
  const [showCrazy100, setShowCrazy100] = useState(false);
  const [showMemoryCards, setShowMemoryCards] = useState(false);
  const [showNim, setShowNim] = useState(false);
  const [showHappyFlower, setShowHappyFlower] = useState(false);
  const [showXO, setShowXO] = useState(false);
  const [showKukuKube, setShowKukuKube] = useState(false);
  const [showTripleEmojiMatch, setShowTripleEmojiMatch] = useState(false);
  const [showPidoku, setShowPidoku] = useState(false);

  const updateTotalPoint = async (i) => {
  const newTotal = totalPoint + i;
  setTotalPoint(newTotal);
  try {
    const res = await fetch("/users/update-points", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ points: i }) // sending the increment value (i)
    });
    const updatedUser = await res.json();
    if (res.ok) {
      setCurrentUser(updatedUser);
    }
  } catch (err) {
    console.log(err);
  }
};
  const handleShowAllStars = () => {
    setShowAllStars(currAllStars => !currAllStars);
  }
  const toggleRockScissorsPaper = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowRockScissorsPaper(true);
  };
  const toggleGuessNumber = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowGuessNumber(true);
  };
  const toggleCapitals = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowCapitals(true);
  };
  const toggleCryptogram = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowCryptogram(true);
  };
  const toggleCrazy100 = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowCrazy100(true);
  };
  const toggleMemoryCards = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowMemoryCards(true);
  };
  const toggleNim = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowNim(true);
  };
  const toggleHappyFlower = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowHappyFlower(true);
  };
  const toggleXO = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowXO(true);
  };
  const toggleKukuKube = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowKukuKube(true);
  };
  const toggleTripleEmojiMatch = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowTripleEmojiMatch(true);
  };
  const togglePidoku = () => {
    setShowGameTitles(false);
    setIsAGameStarted(true);
    setShowPidoku(true);
  }
  return (
    <div>
      {!isAGameStarted && <Ads ads={ads} setAds={setAds} currentUser={currentUser} isLoggingOut={isLoggingOut} />}
      <hr />
      {!isAGameStarted &&
<div>
      <div>
        {currentUser && currentUser?.totalPoint === 0 &&
        "You don't have any stars, play the interesting games and win some!"
        }
      </div>
      <div>
        {currentUser && currentUser?.totalPoint > 0 &&
        `You have ${currentUser?.totalPoint} star${currentUser?.totalPoint > 1 ? "s" : ""}`
        }
      </div>
      {currentUser?.totalPoint <= 5 &&
      <div>
      {new Array(currentUser?.totalPoint).fill(null).map(i => (
        <img src={Star} width="18px" alt="Star" style={{margin: "2px"}} />
      ))}
      </div>
      }
      {!showAllStars && currentUser?.totalPoint > 5 &&
      <div>
      {new Array(5).fill(null).map(i => (
        <img src={Star} width="18px" alt="Star" style={{margin: "2px"}} />
      ))}
      <div style={{display:"inline", color: "red"}}>...</div>
      <br />
      <button onClick={handleShowAllStars}>Show all stars</button>
      </div>
      }
      {showAllStars && currentUser?.totalPoint > 5 &&
      <div>
      {new Array(currentUser?.totalPoint).fill(null).map(i => (
        <img src={Star} width="18px" alt="Star" style={{margin: "2px"}} />
      ))}
      <br />
      <button onClick={handleShowAllStars}>Minimize stars</button>
      </div>
      }
</div>
    }
      <hr />
      {!showGameTitles && showRockScissorsPaper && isAGameStarted ? (
        <RockScissorsPaper
          setShowGameTitles={setShowGameTitles}
          setShowRockScissorsPaper={setShowRockScissorsPaper}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showRockScissorsPaper && !isAGameStarted && (
          <button onClick={() => toggleRockScissorsPaper()}>
            Rock - Scissors - Paper
          </button>
        )
      )}
      {!showGameTitles && showGuessNumber && isAGameStarted ? (
        <GuessNumber
          setShowGameTitles={setShowGameTitles}
          setShowGuessNumber={setShowGuessNumber}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showGuessNumber && !isAGameStarted && (
          <button onClick={() => toggleGuessNumber()}>Guess Number</button>
        )
      )}
      {!showGameTitles && showCapitals && isAGameStarted ? (
        <Capitals
          setShowGameTitles={setShowGameTitles}
          setShowCapitals={setShowCapitals}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showCapitals && !isAGameStarted && (
          <button onClick={() => toggleCapitals()}>Capitals</button>
        )
      )}
      {!showGameTitles && showCryptogram && isAGameStarted ? (
        <Cryptogram
          setShowGameTitles={setShowGameTitles}
          setShowCryptogram={setShowCryptogram}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showCryptogram && !isAGameStarted && (
          <button onClick={() => toggleCryptogram()}>Cryptogram</button>
        )
      )}
      {!showGameTitles && showCrazy100 && isAGameStarted ? (
        <Crazy100
          setShowGameTitles={setShowGameTitles}
          setShowCrazy100={setShowCrazy100}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showCrazy100 && !isAGameStarted && (
          <button onClick={() => toggleCrazy100()}>Crazy-100</button>
        )
      )}
      {!showGameTitles && showMemoryCards && isAGameStarted ? (
        <MemoryCards
          setShowGameTitles={setShowGameTitles}
          setShowMemoryCards={setShowMemoryCards}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showMemoryCards && !isAGameStarted && (
          <button onClick={() => toggleMemoryCards()}>Memory Cards</button>
        )
      )}
      {!showGameTitles && showNim && isAGameStarted ? (
        <Nim
          setShowGameTitles={setShowGameTitles}
          setShowNim={setShowNim}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showNim && !isAGameStarted && <button onClick={() => toggleNim()}>Nim</button>
      )}
      {!showGameTitles && showHappyFlower && isAGameStarted ? (
        <HappyFlower
          setShowGameTitles={setShowGameTitles}
          setShowHappyFlower={setShowHappyFlower}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showHappyFlower && !isAGameStarted && (
          <button onClick={() => toggleHappyFlower()}>Happy Flower</button>
        )
      )}
      {!showGameTitles && showXO && isAGameStarted ? (
        <XO
          setShowGameTitles={setShowGameTitles}
          setShowXO={setShowXO}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showXO && !isAGameStarted && <button onClick={() => toggleXO()}>X-O</button>
      )}
      {!showGameTitles && showKukuKube && isAGameStarted ? (
        <KukuKube
          setShowGameTitles={setShowGameTitles}
          setShowKukuKube={setShowKukuKube}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showKukuKube && !isAGameStarted && (
          <button onClick={() => toggleKukuKube()}>Kuku Kube</button>
        )
      )}
      {!showGameTitles && showTripleEmojiMatch && isAGameStarted ? (
        <TripleEmojiMatch
          setShowGameTitles={setShowGameTitles}
          setShowTripleEmojiMatch={setShowTripleEmojiMatch}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showTripleEmojiMatch && !isAGameStarted && (
          <button onClick={() => toggleTripleEmojiMatch()}>
            Triple Emoji Match
          </button>
        )
      )}
      {!showGameTitles && showPidoku && isAGameStarted ? (
        <Pidoku
          setShowGameTitles={setShowGameTitles}
          setShowPidoku={setShowPidoku}
          updateTotalPoint={updateTotalPoint}
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
        />
      ) : (
        showGameTitles &&
        !showPidoku && !isAGameStarted && <button onClick={() => togglePidoku()}>Pidoku</button>
      )}
    </div>
  );
}
