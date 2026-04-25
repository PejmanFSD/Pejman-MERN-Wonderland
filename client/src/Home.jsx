import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ads from "./Components/ads/Ads";
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
import Counter from "./Games/Counter/Counter";
import Puzzle from "./Games/Puzzle/Puzzle";
import Bingo from "./Games/Bingo/Bingo";
import TugOfWar from "./Games/TugOfWar/TugOfWar";
import Maze from "./Games/Maze/Maze";
import BirdHunter from "./Games/BirdHunter/BirdHunter";

export default function Home({
  ads,
  setAds,
  currentUser,
  setCurrentUser,
  isLoggingOut,
  youShouldLoginMessage,
  setYouShouldLoginMessage,
  setError,
  setFlash
}) {
  const [showGameTitles, setShowGameTitles] = useState(true);
  const [rankedUsers, setRankedUsers] = useState([]);
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
        body: JSON.stringify({ points: i }), // sending the increment value (i)
      });
      const updatedUser = await res.json();
      setFlash(updatedUser.message);
      if (res.ok) {
        setCurrentUser(updatedUser.user);
      }
      const res2 = await fetch("/users/topUsers");
      const topUsers = await res2.json();
      setRankedUsers(topUsers);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowAllStars = () => {
    setShowAllStars((currAllStars) => !currAllStars);
  };
  const toggleRockScissorsPaper = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowRockScissorsPaper(true);
    navigate("/rock-scissors-paper");
  };
  const toggleGuessNumber = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowGuessNumber(true);
    navigate("/guess-number");
  };
  const toggleCapitals = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowCapitals(true);
    navigate("/capitals");
  };
  const toggleCryptogram = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowCryptogram(true);
    navigate("/cryptogram");
  };
  const toggleCrazy100 = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowCrazy100(true);
    navigate("/crazy-100");
  };
  const toggleMemoryCards = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowMemoryCards(true);
    navigate("/memory-cards");
  };
  const toggleNim = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowNim(true);
    navigate("/nim");
  };
  const toggleHappyFlower = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowHappyFlower(true);
    navigate("/happy-flower");
  };
  const toggleXO = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowXO(true);
    navigate("/xo");
  };
  const toggleKukuKube = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowKukuKube(true);
    navigate("/kuku-kube");
  };
  const toggleTripleEmojiMatch = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowTripleEmojiMatch(true);
    navigate("/triple-emoji-match");
  };
  const togglePidoku = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowPidoku(true);
    navigate("/pidoku");
  };
  const toggleCounter = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowCounter(true);
    navigate("/counter");
  };
  const togglePuzzle = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowPuzzle(true);
    navigate("/puzzle");
  };
  const toggleBingo = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowBingo(true);
    navigate("/bingo");
  };
  const toggleTugOfWar = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowTugOfWar(true);
    navigate("/tug-of-war");
  };
  const toggleMaze = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowMaze(true);
    navigate("/maze");
  };
  const toggleBirdHunter = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    setShowGameTitles(false);
    setShowBirdHunter(true);
    navigate("/bird-hunter");
  };
  return (
    <div>
      {/* <Ads
        ads={ads}
        setAds={setAds}
        currentUser={currentUser}
        isLoggingOut={isLoggingOut}
      /> */}
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
      {!showGameTitles && showRockScissorsPaper ? (
        <RockScissorsPaper
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showRockScissorsPaper &&
        (
          <button onClick={() => toggleRockScissorsPaper()} style={{position: "relative", top: "5px"}}>
            R - S - P
          </button>
        )
      )}
      {!showGameTitles && showGuessNumber ? (
        <GuessNumber
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showGuessNumber &&
        (
          <button onClick={() => toggleGuessNumber()} style={{position: "relative", top: "5px"}}>Guess Number</button>
        )
      )}
      {!showGameTitles && showCapitals ? (
        <Capitals
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCapitals &&
        (
          <button onClick={() => toggleCapitals()} style={{position: "relative", top: "5px"}}>Capitals</button>
        )
      )}
      {!showGameTitles && showCryptogram ? (
        <Cryptogram
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCryptogram &&
        (
          <button onClick={() => toggleCryptogram()} style={{position: "relative", top: "5px"}}>Cryptogram</button>
        )
      )}
      {!showGameTitles && showCrazy100 ? (
        <Crazy100
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCrazy100 &&
        (
          <button onClick={() => toggleCrazy100()} style={{position: "relative", top: "5px"}}>Crazy-100</button>
        )
      )}
      {!showGameTitles && showMemoryCards ? (
        <MemoryCards
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showMemoryCards &&
        (
          <button onClick={() => toggleMemoryCards()} style={{position: "relative", top: "5px"}}>Memory Cards</button>
        )
      )}
      {!showGameTitles && showNim ? (
        <Nim
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showNim &&
        <button onClick={() => toggleNim()} style={{position: "relative", top: "5px"}}>Nim</button>
      )}
      {!showGameTitles && showHappyFlower ? (
        <HappyFlower
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showHappyFlower &&
        (
          <button onClick={() => toggleHappyFlower()} style={{position: "relative", top: "5px"}}>Happy Flower</button>
        )
      )}
      {!showGameTitles && showXO ? (
        <XO
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showXO &&
        <button onClick={() => toggleXO()} style={{position: "relative", top: "5px"}}>X-O</button>
      )}
      {!showGameTitles && showKukuKube ? (
        <KukuKube
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showKukuKube &&
        (
          <button onClick={() => toggleKukuKube()} style={{position: "relative", top: "5px"}}>Kuku Kube</button>
        )
      )}
      {!showGameTitles && showTripleEmojiMatch ? (
        <TripleEmojiMatch
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showTripleEmojiMatch &&
        (
          <button onClick={() => toggleTripleEmojiMatch()} style={{position: "relative", top: "5px"}}>
            Triple Emoji Match
          </button>
        )
      )}
      {!showGameTitles && showPidoku ? (
        <Pidoku
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showPidoku &&
        (
          <button onClick={() => togglePidoku()} style={{position: "relative", top: "5px"}}>Pidoku</button>
        )
      )}
      {!showGameTitles && showCounter ? (
        <Counter
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showCounter &&
        (
          <button onClick={() => toggleCounter()} style={{position: "relative", top: "5px"}}>Counter</button>
        )
      )}
      {!showGameTitles && showPuzzle ? (
        <Puzzle
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showPuzzle &&
        (
          <button onClick={() => togglePuzzle()} style={{position: "relative", top: "5px"}}>Puzzle</button>
        )
      )}
      {!showGameTitles && showBingo ? (
        <Bingo
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showBingo &&
        (
          <button onClick={() => toggleBingo()} style={{position: "relative", top: "5px"}}>Bingo</button>
        )
      )}
      {!showGameTitles && showTugOfWar ? (
        <TugOfWar
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showTugOfWar &&
        (
          <button onClick={() => toggleTugOfWar()} style={{position: "relative", top: "5px"}}>Tug of War</button>
        )
      )}
      {!showGameTitles && showMaze ? (
        <Maze
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showMaze &&
        (
          <button onClick={() => toggleMaze()} style={{position: "relative", top: "5px"}}>Maze</button>
        )
      )}
      {!showGameTitles && showBirdHunter ? (
        <BirdHunter
          updateTotalPoint={updateTotalPoint}
        />
      ) : (
        showGameTitles &&
        !showBirdHunter &&
        (
          <button onClick={() => toggleBirdHunter()} style={{position: "relative", top: "5px"}}>Bird Hunter</button>
        )
      )}
    </div>
  );
}
