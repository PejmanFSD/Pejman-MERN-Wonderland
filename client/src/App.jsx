import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Ads from "./Components/ads/Ads";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import Register from "./Components/users/Register";
import Login from "./Components/users/Login";
import AdDetails from "./Components/ads/AdDetails";
import AdEdit from "./Components/ads/AdEdit";
import Users from "./Components/users/Users";
import Profile from "./Components/users/Profile";
import EditProfile from "./Components/users/EditProfile";
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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreatingAd, setIsCreatingAd] = useState(false);
  const [isAdEditing, setIsAdEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [youShouldLoginMessage, setYouShouldLoginMessage] = useState(false);
  const [userCount, setUserCount] = useState(null);
  const [flash, setFlash] = useState(null);
  const [rankedUsers, setRankedUsers] = useState([]);
  const [totalPoint, setTotalPoint] = useState(0);

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
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await fetch("/current-user", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        if (data.user) {
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.error("Failed to restore user");
      } finally {
        setIsAuthChecked(true);
      }
    };
    restoreUser();
  }, []);
  useEffect(() => {
  if (flash) {
    const timer = setTimeout(() => {
      setFlash(null);
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [flash]);
  return (
    <div className="App">
      {flash && (
        <div>
          {flash}
        </div>
      )}
      <BrowserRouter>
        <Navbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          ads={ads}
          setAds={setAds}
          users={users}
          setUsers={setUsers}
          error={error}
          setError={setError}
          isAuthChecked={isAuthChecked}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          isLoggingOut={isLoggingOut}
          setIsLoggingOut={setIsLoggingOut}
          userCount={userCount}
          setUserCount={setUserCount}
          setFlash={setFlash}
          isProfileEditing={isProfileEditing}
          isAdEditing={isAdEditing}
          isCreatingAd={isCreatingAd}
          setIsCreatingAd={setIsCreatingAd}
        />
        <Ads
          ads={ads}
          setAds={setAds}
          currentUser={currentUser}
          isLoggingOut={isLoggingOut}
        />
        <Routes>
          {!isLoggingOut && (
            <Route
              path="/"
              element={
                <Home
                  ads={ads}
                  setAds={setAds}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  isLoggingOut={isLoggingOut}
                  youShouldLoginMessage={youShouldLoginMessage}
                  setYouShouldLoginMessage={setYouShouldLoginMessage}
                  setError={setError}
                  setFlash={setFlash}
                  rankedUsers={rankedUsers}
                  setRankedUsers={setRankedUsers}
                  totalPoint={totalPoint}
                  setTotalPoint={setTotalPoint}
                  updateTotalPoint={updateTotalPoint}
                />
              }
            />
          )}
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                currentUser={currentUser}
                isAuthChecked={isAuthChecked}
              >
                <Profile
                  currentUser={currentUser}
                  error={error}
                  setError={setError}
                  setIsProfileEditing={setIsProfileEditing}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute
                currentUser={currentUser}
                isAuthChecked={isAuthChecked}
              >
                <EditProfile
                  setCurrentUser={setCurrentUser}
                  setFlash={setFlash}
                  setIsProfileEditing={setIsProfileEditing}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <Register
                currentUser={currentUser}
                error={error}
                setError={setError}
                onRegister={(user) => setCurrentUser(user)}
                setUserCount={setUserCount}
                setFlash={setFlash}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                currentUser={currentUser}
                error={error}
                setError={setError}
                onLogin={(user) => setCurrentUser(user)}
                youShouldLoginMessage={youShouldLoginMessage}
                setYouShouldLoginMessage={setYouShouldLoginMessage}
                setFlash={setFlash}
              />
            }
          />
          <Route
            path="/ads/:id"
            element={
              <ProtectedRoute
                currentUser={currentUser}
                isAuthChecked={isAuthChecked}
              >
                <AdDetails
                  error={error}
                  setError={setError}
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  currentUser={currentUser}
                  setFlash={setFlash}
                  setIsAdEditing={setIsAdEditing}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ads/:id/edit"
            element={<AdEdit error={error} setError={setError} setFlash={setFlash} setIsAdEditing={setIsAdEditing}/>}
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute
                currentUser={currentUser}
                isAuthChecked={isAuthChecked}
              >
                <Users
                  users={users}
                  setUsers={setUsers}
                  error={error}
                  setError={setError}
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  currentUser={currentUser}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/rock-scissors-paper" element={<RockScissorsPaperPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/guess-number" element={<GuessNumberPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/capitals" element={<CapitalsPage updateTotalPoint={updateTotalPoint} currentUser={currentUser}/>} />
          <Route path="/cryptogram" element={<CryptogramPage updateTotalPoint={updateTotalPoint} currentUser={currentUser}/>} />
          <Route path="/crazy-100" element={<Crazy100Page updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/memory-cards" element={<MemoryCardsPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/nim" element={<NimPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/happy-flower" element={<HappyFlowerPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/xo" element={<XOPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/kuku-kube" element={<KukuKubePage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/triple-emoji-match" element={<TripleEmojiMatchPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/pidoku" element={<PidokuPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/counter" element={<CounterPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/puzzle" element={<PuzzlePage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/bingo" element={<BingoPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/tug-of-war" element={<TugOfWarPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/maze" element={<MazePage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
          <Route path="/bird-hunter" element={<BirdHunterPage updateTotalPoint={updateTotalPoint} currentUser={currentUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
