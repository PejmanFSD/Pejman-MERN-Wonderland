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

export default function Home({ads, setAds}) {
  const [showGameTitles, setShowGameTitles] = useState(true);
  const [totalPoint, setTotalPoint] = useState(0);
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

  const updateTotalPoint = (i) => {
    setTotalPoint((currTotalPoint) => currTotalPoint + i);
  };
  const toggleRockScissorsPaper = () => {
    setShowGameTitles(false);
    setShowRockScissorsPaper(true);
  };
  const toggleGuessNumber = () => {
    setShowGameTitles(false);
    setShowGuessNumber(true);
  };
  const toggleCapitals = () => {
    setShowGameTitles(false);
    setShowCapitals(true);
  };
  const toggleCryptogram = () => {
    setShowGameTitles(false);
    setShowCryptogram(true);
  };
  const toggleCrazy100 = () => {
    setShowGameTitles(false);
    setShowCrazy100(true);
  };
  const toggleMemoryCards = () => {
    setShowGameTitles(false);
    setShowMemoryCards(true);
  };
  const toggleNim = () => {
    setShowGameTitles(false);
    setShowNim(true);
  };
  const toggleHappyFlower = () => {
    setShowGameTitles(false);
    setShowHappyFlower(true);
  };
  const toggleXO = () => {
    setShowGameTitles(false);
    setShowXO(true);
  };
  const toggleKukuKube = () => {
    setShowGameTitles(false);
    setShowKukuKube(true);
  };
  const toggleTripleEmojiMatch = () => {
    setShowGameTitles(false);
    setShowTripleEmojiMatch(true);
  };
  const togglePidoku = () => {
    setShowGameTitles(false);
    setShowPidoku(true);
  }
  return (
    <div>
      <Ads ads={ads} setAds={setAds} />
      <hr />
      <div>
        {new Array(totalPoint).fill(null).map((t) => (
          <img src={Star} width="30px" alt="Star" />
        ))}
      </div>
      <div>
        {!totalPoint
          ? "You don't have any stars yet, play the interesting games and win some!"
          : `You have ${totalPoint} star${totalPoint > 1 ? "s" : ""}`}
      </div>
      <hr></hr>
      {!showGameTitles && showRockScissorsPaper ? (
        <RockScissorsPaper
          setShowGameTitles={setShowGameTitles}
          setShowRockScissorsPaper={setShowRockScissorsPaper}
          totalPoint={totalPoint}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showRockScissorsPaper && (
          <button onClick={() => toggleRockScissorsPaper()}>
            Rock - Scissors - Paper
          </button>
        )
      )}
      {!showGameTitles && showGuessNumber ? (
        <GuessNumber
          setShowGameTitles={setShowGameTitles}
          setShowGuessNumber={setShowGuessNumber}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showGuessNumber && (
          <button onClick={() => toggleGuessNumber()}>Guess Number</button>
        )
      )}
      {!showGameTitles && showCapitals ? (
        <Capitals
          setShowGameTitles={setShowGameTitles}
          setShowCapitals={setShowCapitals}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCapitals && (
          <button onClick={() => toggleCapitals()}>Capitals</button>
        )
      )}
      {!showGameTitles && showCryptogram ? (
        <Cryptogram
          setShowGameTitles={setShowGameTitles}
          setShowCryptogram={setShowCryptogram}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCryptogram && (
          <button onClick={() => toggleCryptogram()}>Cryptogram</button>
        )
      )}
      {!showGameTitles && showCrazy100 ? (
        <Crazy100
          setShowGameTitles={setShowGameTitles}
          setShowCrazy100={setShowCrazy100}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCrazy100 && (
          <button onClick={() => toggleCrazy100()}>Crazy-100</button>
        )
      )}
      {!showGameTitles && showMemoryCards ? (
        <MemoryCards
          setShowGameTitles={setShowGameTitles}
          setShowMemoryCards={setShowMemoryCards}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showMemoryCards && (
          <button onClick={() => toggleMemoryCards()}>Memory Cards</button>
        )
      )}
      {!showGameTitles && showNim ? (
        <Nim
          setShowGameTitles={setShowGameTitles}
          setShowNim={setShowNim}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showNim && <button onClick={() => toggleNim()}>Nim</button>
      )}
      {!showGameTitles && showHappyFlower ? (
        <HappyFlower
          setShowGameTitles={setShowGameTitles}
          setShowHappyFlower={setShowHappyFlower}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showHappyFlower && (
          <button onClick={() => toggleHappyFlower()}>Happy Flower</button>
        )
      )}
      {!showGameTitles && showXO ? (
        <XO
          setShowGameTitles={setShowGameTitles}
          setShowXO={setShowXO}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showXO && <button onClick={() => toggleXO()}>X-O</button>
      )}
      {!showGameTitles && showKukuKube ? (
        <KukuKube
          setShowGameTitles={setShowGameTitles}
          setShowKukuKube={setShowKukuKube}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showKukuKube && (
          <button onClick={() => toggleKukuKube()}>Kuku Kube</button>
        )
      )}
      {!showGameTitles && showTripleEmojiMatch ? (
        <TripleEmojiMatch
          setShowGameTitles={setShowGameTitles}
          setShowTripleEmojiMatch={setShowTripleEmojiMatch}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showTripleEmojiMatch && (
          <button onClick={() => toggleTripleEmojiMatch()}>
            Triple Emoji Match
          </button>
        )
      )}
      {!showGameTitles && showPidoku ? (
        <Pidoku
          setShowGameTitles={setShowGameTitles}
          setShowPidoku={setShowPidoku}
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showPidoku && <button onClick={() => togglePidoku()}>Pidoku</button>
      )}
    </div>
  );
}
