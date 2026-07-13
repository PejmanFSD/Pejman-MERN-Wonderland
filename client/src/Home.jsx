import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Star from "./Games/Star.png";
import GameCard from "./Components/GameCard";
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
import ReversiPage from "./Games/Reversi/Reversi";
import SnakePage from "./Games/Snake/Snake";
import BlackJackPage from "./Games/BlackJack/BlackJack";
import BingoImg from "./Images/Bingo.jpg";
import BirdHunterImg from "./Images/BirdHunter.jpg";
import BlackJackImg from "./Images/BlackJack.jpg";
import CapitalsImg from "./Images/Capitals.jpg";
import CounterImg from "./Images/Counter.jpg";
import Crazy100Img from "./Images/Crazy100.jpg";
import CryptogramImg from "./Images/Cryptogram.jpg";
import GuessNumberImg from "./Images/GuessNumber.jpg";
import HappyFlowerImg from "./Images/HappyFlower.jpg";
import KukuKubeImg from "./Images/KukuKube.jpg";
import MazeImg from "./Images/Maze.jpg";
import MemoryImg from "./Images/Memory.jpg";
import NimImg from "./Images/Nim.jpg";
import PidokuImg from "./Images/Pidoku.jpg";
import PuzzleImg from "./Images/Puzzle.jpg";
import ReversiImg from "./Images/Reversi.jpg";
import RSPImg from "./Images/RSP.jpg";
import SnakeImg from "./Images/Snake.jpg";
import TripleEmojiMatchImg from "./Images/TripleEmojiMatch.jpg";
import TugOfWarImg from "./Images/TugOfWar.jpg";
import XOImg from "./Images/XO.jpg";

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
  updateTotalPoint,
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
  const [showReversi, setShowReversi] = useState(false);
  const [showSnake, setShowSnake] = useState(false);
  const [showBlackJack, setShowBlackJack] = useState(false);

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
  const toggleReversi = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/reversi");
  };
  const toggleSnake = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/snake");
  };
  const toggleBlackJack = () => {
    if (!currentUser) {
      setYouShouldLoginMessage(true);
      navigate("/login");
      return;
    }
    navigate("/blackJack");
  };
  useEffect(() => {
    document.title = "Pejman MERN Wonderland";
  }, []);
  return (
    <div>
      <div>
        <div className="mt-2" style={{ fontSize: "20px" }}>
          <strong>The top 10 users with highest stars</strong>
        </div>
        <table
          border="2"
          cellPadding="5"
          style={{
            // position: "relative",
            // top: "5px",
            border: "2px solid black",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "var(--primary)" }}>
              <th
                style={{
                  width: "5%",
                  fontSize: "13px",
                  border: "1px solid black",
                }}
              >
                Ranking
              </th>
              <th
                style={{
                  width: "10%",
                  fontSize: "13px",
                  border: "1px solid black",
                }}
              >
                Username
              </th>
              <th
                style={{
                  width: "10%",
                  fontSize: "13px",
                  border: "1px solid black",
                }}
              >
                Number of Stars
              </th>
              <th
                style={{
                  width: "45%",
                  fontSize: "13px",
                  border: "1px solid black",
                }}
              >
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {rankedUsers.map((user, i) => (
              <tr
                key={user._id}
                style={{ backgroundColor: "var(--background)" }}
              >
                <td style={{ fontSize: "13px", border: "1px solid black" }}>
                  {i + 1}
                </td>
                <td style={{ fontSize: "13px", border: "1px solid black" }}>
                  {user.username}
                </td>
                <td style={{ fontSize: "13px", border: "1px solid black" }}>
                  {user.totalPoint}
                </td>
                <td style={{ fontSize: "13px", border: "1px solid black" }}>
                  {user.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div style={{ margin: "20px" }}>
          <strong>
            {currentUser &&
              currentUser?.totalPoint === 0 &&
              "You don't have any stars, play the interesting games and win some!"}
          </strong>
        </div>
        <div style={{ position: "relative", top: "5px" }}>
          <strong>
            {currentUser &&
              currentUser?.totalPoint > 0 &&
              `You have ${currentUser?.totalPoint} star${currentUser?.totalPoint > 1 ? "s" : ""}`}
          </strong>
        </div>
        {currentUser?.totalPoint <= 5 && (
          <div style={{ position: "relative", top: "5px" }}>
            {new Array(currentUser?.totalPoint).fill(null).map((i) => (
              <img
                src={Star}
                width="18px"
                alt="Star"
                style={{ margin: "2px" }}
                key={i}
              />
            ))}
          </div>
        )}
        {!showAllStars && currentUser?.totalPoint > 5 && (
          <div style={{ position: "relative", top: "5px" }}>
            {new Array(5).fill(null).map((i) => (
              <img
                src={Star}
                width="18px"
                alt="Star"
                style={{ margin: "2px" }}
                key={i}
              />
            ))}
            <div style={{ display: "inline" }}>...</div>
            <br />
            <button
              onClick={handleShowAllStars}
              className="cause btn1"
              style={{ marginTop: "7px" }}
            >
              Show all stars
            </button>
          </div>
        )}
        {showAllStars && currentUser?.totalPoint > 5 && (
          <div style={{ position: "relative", top: "5px" }}>
            {new Array(currentUser?.totalPoint).fill(null).map((i) => (
              <img
                src={Star}
                width="18px"
                alt="Star"
                style={{ margin: "2px" }}
                key={i}
              />
            ))}
            <br />
            <button
              onClick={handleShowAllStars}
              className="cause btn1"
              style={{ marginTop: "7px" }}
            >
              Minimize stars
            </button>
          </div>
        )}
      </div>
      <div className="container">
        <div className="row">
          <div
            className="fasterOne col-10 offset-1 d-flex justify-content-center mt-3"
            style={{ fontSize: "30px" }}
          >
            The 21 fascinating games of Pejman MERN Wonderland
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showNim ? (
              <NimPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showNim && (
                <GameCard
                  imageSrc={NimImg}
                  title="Nim"
                  onClickFunction={() => toggleNim()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showMemoryCards ? (
              <MemoryCardsPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showMemoryCards && (
                <GameCard
                  imageSrc={MemoryImg}
                  title="Memory Cards"
                  onClickFunction={() => toggleMemoryCards()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showSnake ? (
              <SnakePage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showSnake && (
                <GameCard
                  imageSrc={SnakeImg}
                  title="Snake"
                  onClickFunction={() => toggleSnake()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showKukuKube ? (
              <KukuKubePage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showKukuKube && (
                <GameCard
                  imageSrc={KukuKubeImg}
                  title="Kuku Kube"
                  onClickFunction={() => toggleKukuKube()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showPuzzle ? (
              <PuzzlePage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showPuzzle && (
                <GameCard
                  imageSrc={PuzzleImg}
                  title="Puzzle"
                  onClickFunction={() => togglePuzzle()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-none d-sm-flex justify-content-center">
            {showMaze ? (
              <MazePage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showMaze && (
                <GameCard
                  imageSrc={MazeImg}
                  title="Maze"
                  onClickFunction={() => toggleMaze()}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showReversi ? (
              <ReversiPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showReversi && (
                <GameCard
                  imageSrc={ReversiImg}
                  title="Reversi"
                  onClickFunction={() => toggleReversi()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showCrazy100 ? (
              <Crazy100Page
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showCrazy100 && (
                <GameCard
                  imageSrc={Crazy100Img}
                  title="Crazy-100"
                  onClickFunction={() => toggleCrazy100()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showCapitals ? (
              <CapitalsPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showCapitals && (
                <GameCard
                  imageSrc={CapitalsImg}
                  title="Capitals"
                  onClickFunction={() => toggleCapitals()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showGuessNumber ? (
              <GuessNumberPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showGuessNumber && (
                <GameCard
                  imageSrc={GuessNumberImg}
                  title="Guess Number"
                  onClickFunction={() => toggleGuessNumber()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showTripleEmojiMatch ? (
              <TripleEmojiMatchPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showTripleEmojiMatch && (
                <GameCard
                  imageSrc={TripleEmojiMatchImg}
                  title="Triple Emoji Match"
                  onClickFunction={() => toggleTripleEmojiMatch()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showHappyFlower ? (
              <HappyFlowerPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showHappyFlower && (
                <GameCard
                  imageSrc={HappyFlowerImg}
                  title="Happy Flower"
                  onClickFunction={() => toggleHappyFlower()}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showBirdHunter ? (
              <BirdHunterPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showBirdHunter && (
                <GameCard
                  imageSrc={BirdHunterImg}
                  title="Bird Hunter"
                  onClickFunction={() => toggleBirdHunter()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showCryptogram ? (
              <CryptogramPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showCryptogram && (
                <GameCard
                  imageSrc={CryptogramImg}
                  title="Cryptogram"
                  onClickFunction={() => toggleCryptogram()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showTugOfWar ? (
              <TugOfWarPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showTugOfWar && (
                <GameCard
                  imageSrc={TugOfWarImg}
                  title="Tug of War"
                  onClickFunction={() => toggleTugOfWar()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showBingo ? (
              <BingoPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showBingo && (
                <GameCard
                  imageSrc={BingoImg}
                  title="Bingo"
                  onClickFunction={() => toggleBingo()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showCounter ? (
              <CounterPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showCounter && (
                <GameCard
                  imageSrc={CounterImg}
                  title="Counter"
                  onClickFunction={() => toggleCounter()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showXO ? (
              <XOPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showXO && (
                <GameCard
                  imageSrc={XOImg}
                  title="X-O"
                  onClickFunction={() => toggleXO()}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center offset-xl-3">
            {showPidoku ? (
              <PidokuPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showPidoku && (
                <GameCard
                  imageSrc={PidokuImg}
                  title="Pidoku"
                  onClickFunction={() => togglePidoku()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showBlackJack ? (
              <BlackJackPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showBlackJack && (
                <GameCard
                  imageSrc={BlackJackImg}
                  title="BlackJack"
                  onClickFunction={() => toggleBlackJack()}
                />
              )
            )}
          </div>
          <div className="col-12 col-md-4 col-xl-2 d-flex justify-content-center">
            {showRockScissorsPaper ? (
              <RockScissorsPaperPage
                updateTotalPoint={updateTotalPoint}
                currentUser={currentUser}
              />
            ) : (
              !showRockScissorsPaper && (
                <GameCard
                  imageSrc={RSPImg}
                  title="R - S - P"
                  onClickFunction={() => toggleRockScissorsPaper()}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
