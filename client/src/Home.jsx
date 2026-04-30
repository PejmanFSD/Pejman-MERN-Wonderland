import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Star from "./Games/Star.png";
import RockScissorsPaperPage from "./Games/RockScissorsPaper/RockScissorsPaper";
import GuessNumberPage from "./Games/GuessNumber/GuessNumber";
import CapitalsPage from "./Games/Capitals/Capitals";
import CryptogramPage from "./Games/Cryptogram/Cryptogram";
import Crazy100Page from "./Games/Crazy100/Crazy100";
import MemoryCardsPage from "./Games/MemoryCards/MemoryCards";
import NimPage from "./Games/Nim/Nim";
import HappyFlowerPage from "./Games/HappyFlower/HappyFlower";
import XOPage from "./Games/XO/XO";
import KukuKubePage from "./Games/KukuKube/KukuKube";
import TripleEmojiMatchPage from "./Games/TripleEmojiMatch/TripleEmojiMatch";
import PidokuPage from "./Games/Pidoku/Pidoku";
import CounterPage from "./Games/Counter/Counter";
import PuzzlePage from "./Games/Puzzle/Puzzle";
import BingoPage from "./Games/Bingo/Bingo";
import TugOfWarPage from "./Games/TugOfWar/TugOfWar";
import MazePage from "./Games/Maze/Maze";
import BirdHunterPage from "./Games/BirdHunter/BirdHunter";

export default function Home({
  currentUser,
  setCurrentUser,
  isLoggingOut,
  youShouldLoginMessage,
  setYouShouldLoginMessage,
  setError,
  setFlash,
  rankedUsers,
  setRankedUsers,
  totalPoint,
  setTotalPoint,
  updateTotalPoint
}) {
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
  const [showCounter, setShowCounter] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [showBingo, setShowBingo] = useState(false);
  const [showTugOfWar, setShowTugOfWar] = useState(false);
  const [showMaze, setShowMaze] = useState(false);
  const [showBirdHunter, setShowBirdHunter] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/users/topUsers");
      const topUsers = await res.json();
      setRankedUsers(topUsers);
    };
    fetchUsers(); // Refetching when "page" changes
  }, []);
  const navigate = useNavigate();
  const handleShowAllStars = () => {
    setShowAllStars((currAllStars) => !currAllStars);
  };
  const toggleRockScissorsPaper = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/rock-scissors-paper");
  };
  const toggleGuessNumber = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/guess-number");
  };
  const toggleCapitals = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/capitals");
  };
  const toggleCryptogram = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/cryptogram");
  };
  const toggleCrazy100 = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/crazy-100");
  };
  const toggleMemoryCards = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/memory-cards");
  };
  const toggleNim = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/nim");
  };
  const toggleHappyFlower = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/happy-flower");
  };
  const toggleXO = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/xo");
  };
  const toggleKukuKube = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/kuku-kube");
  };
  const toggleTripleEmojiMatch = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/triple-emoji-match");
  };
  const togglePidoku = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/pidoku");
  };
  const toggleCounter = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/counter");
  };
  const togglePuzzle = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/puzzle");
  };
  const toggleBingo = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/bingo");
  };
  const toggleTugOfWar = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/tug-of-war");
  };
  const toggleMaze = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/maze");
  };
  const toggleBirdHunter = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/bird-hunter");
  };
  return (
    <div>
      <div>
        <div>The top 10 users with highest stars</div>
      <table border="2" cellPadding="5" style={{position: "relative", top: "5px"}}>
        <thead style={{height: "5px"}}>
          <tr>
            <th style={{ width: "5%", fontSize: "13px" }}>Ranking</th>
            <th style={{ width: "10%", fontSize: "13px" }}>Username</th>
            <th style={{ width: "10%", fontSize: "13px" }}>Number of Stars</th>
            <th style={{ width: "45%", fontSize: "13px" }}>Message</th>
          </tr>
        </thead>
        <tbody>
        {rankedUsers.map((user, i) => (
          <tr key={user._id}>
            <td style={{fontSize: "13px"}}>{i + 1}</td>
            <td style={{fontSize: "13px"}}>{user.username}</td>
            <td style={{fontSize: "13px"}}>{user.totalPoint}</td>
            <td style={{fontSize: "13px"}}>{user.message}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
      <div>
        <div>
          {currentUser &&
            currentUser?.totalPoint === 0 &&
            "You don't have any stars, play the interesting games and win some!"}
        </div>
        <div style={{position: "relative", top: "5px"}}>
          {currentUser &&
            currentUser?.totalPoint > 0 &&
            `You have ${currentUser?.totalPoint} star${currentUser?.totalPoint > 1 ? "s" : ""}`}
        </div>
        {currentUser?.totalPoint <= 5 && (
          <div style={{position: "relative", top: "5px"}}>
            {new Array(currentUser?.totalPoint).fill(null).map((i) => (
              <img
                src={Star}
                width="18px"
                alt="Star"
                style={{ margin: "2px" }}
              />
            ))}
          </div>
        )}
        {!showAllStars && currentUser?.totalPoint > 5 && (
          <div style={{position: "relative", top: "5px"}}>
            {new Array(5).fill(null).map((i) => (
              <img
                src={Star}
                width="18px"
                alt="Star"
                style={{ margin: "2px" }}
              />
            ))}
            <div style={{ display: "inline", color: "red" }}>...</div>
            <br />
            <button onClick={handleShowAllStars}>Show all stars</button>
          </div>
        )}
        {showAllStars && currentUser?.totalPoint > 5 && (
          <div style={{position: "relative", top: "5px"}}>
            {new Array(currentUser?.totalPoint).fill(null).map((i) => (
              <img
                src={Star}
                width="18px"
                alt="Star"
                style={{ margin: "2px" }}
              />
            ))}
            <br />
            <button onClick={handleShowAllStars}>Minimize stars</button>
          </div>
        )}
      </div>
      {showRockScissorsPaper ? (
        <RockScissorsPaperPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showRockScissorsPaper &&
        (
          <button onClick={() => toggleRockScissorsPaper()} style={{position: "relative", top: "5px"}}>
            R - S - P
          </button>
        )
      )}
      {showGuessNumber ? (
        <GuessNumberPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showGuessNumber &&
        (
          <button onClick={() => toggleGuessNumber()} style={{position: "relative", top: "5px"}}>Guess Number</button>
        )
      )}
      {showCapitals ? (
        <CapitalsPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showCapitals &&
        (
          <button onClick={() => toggleCapitals()} style={{position: "relative", top: "5px"}}>Capitals</button>
        )
      )}
      {showCryptogram ? (
        <CryptogramPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showCryptogram &&
        (
          <button onClick={() => toggleCryptogram()} style={{position: "relative", top: "5px"}}>Cryptogram</button>
        )
      )}
      {showCrazy100 ? (
        <Crazy100Page
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showCrazy100 &&
        (
          <button onClick={() => toggleCrazy100()} style={{position: "relative", top: "5px"}}>Crazy-100</button>
        )
      )}
      {showMemoryCards ? (
        <MemoryCardsPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showMemoryCards &&
        (
          <button onClick={() => toggleMemoryCards()} style={{position: "relative", top: "5px"}}>Memory Cards</button>
        )
      )}
      {showNim ? (
        <NimPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showNim &&
        <button onClick={() => toggleNim()} style={{position: "relative", top: "5px"}}>Nim</button>
      )}
      {showHappyFlower ? (
        <HappyFlowerPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showHappyFlower &&
        (
          <button onClick={() => toggleHappyFlower()} style={{position: "relative", top: "5px"}}>Happy Flower</button>
        )
      )}
      {showXO ? (
        <XOPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showXO &&
        <button onClick={() => toggleXO()} style={{position: "relative", top: "5px"}}>X-O</button>
      )}
      {showKukuKube ? (
        <KukuKubePage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showKukuKube &&
        (
          <button onClick={() => toggleKukuKube()} style={{position: "relative", top: "5px"}}>Kuku Kube</button>
        )
      )}
      {showTripleEmojiMatch ? (
        <TripleEmojiMatchPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showTripleEmojiMatch &&
        (
          <button onClick={() => toggleTripleEmojiMatch()} style={{position: "relative", top: "5px"}}>
            Triple Emoji Match
          </button>
        )
      )}
      {showPidoku ? (
        <PidokuPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showPidoku &&
        (
          <button onClick={() => togglePidoku()} style={{position: "relative", top: "5px"}}>Pidoku</button>
        )
      )}
      {showCounter ? (
        <CounterPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showCounter &&
        (
          <button onClick={() => toggleCounter()} style={{position: "relative", top: "5px"}}>Counter</button>
        )
      )}
      {showPuzzle ? (
        <PuzzlePage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showPuzzle &&
        (
          <button onClick={() => togglePuzzle()} style={{position: "relative", top: "5px"}}>Puzzle</button>
        )
      )}
      {showBingo ? (
        <BingoPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showBingo &&
        (
          <button onClick={() => toggleBingo()} style={{position: "relative", top: "5px"}}>Bingo</button>
        )
      )}
      {showTugOfWar ? (
        <TugOfWarPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showTugOfWar &&
        (
          <button onClick={() => toggleTugOfWar()} style={{position: "relative", top: "5px"}}>Tug of War</button>
        )
      )}
      {showMaze ? (
        <MazePage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showMaze &&
        (
          <button onClick={() => toggleMaze()} style={{position: "relative", top: "5px"}}>Maze</button>
        )
      )}
      {showBirdHunter ? (
        <BirdHunterPage
          updateTotalPoint={updateTotalPoint}
          currentUser={currentUser}
        />
      ) : (
        !showBirdHunter &&
        (
          <button onClick={() => toggleBirdHunter()} style={{position: "relative", top: "5px"}}>Bird Hunter</button>
        )
      )}
    </div>
  );
}
