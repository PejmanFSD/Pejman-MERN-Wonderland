import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import Register from "./Components/users/Register";
import Login from "./Components/users/Login";
import AdDetails from "./Components/ads/AdDetails";
import AdEdit from "./Components/ads/AdEdit";
import Users from "./Components/users/Users";
import Profile from "./Components/users/Profile";
import EditProfile from "./Components/users/EditProfile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAGameStarted, setIsAGameStarted] = useState(false);
  const [youShouldLoginMessage, setYouShouldLoginMessage] = useState(false);
  const [userCount, setUserCount] = useState(null);

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
  return (
    <div className="App">
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
          isAGameStarted={isAGameStarted}
          setIsAGameStarted={setIsAGameStarted}
          userCount={userCount}
          setUserCount={setUserCount}
        />
        <Routes>
          {!isLoggingOut &&
          <Route
            path="/"
            element={
              <Home
                ads={ads}
                setAds={setAds}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                isLoggingOut={isLoggingOut}
                isAGameStarted={isAGameStarted}
                setIsAGameStarted={setIsAGameStarted}
                youShouldLoginMessage={youShouldLoginMessage}
                setYouShouldLoginMessage={setYouShouldLoginMessage}
                setError={setError}
              />
            }
          />
}
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
                  // error={error}
                  // setError={setError}
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
                />
              </ProtectedRoute>
            }
          />
          <Route path="/ads/:id/edit" element={<AdEdit error={error} setError={setError} />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
