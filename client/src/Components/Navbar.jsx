import {useEffect} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation // For hiding the button of the current page
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdForm from "./ads/AdForm";

export default function Navbar({
  currentUser,
  setCurrentUser,
  users,
  setUsers,
  ads,
  setAds,
  error,
  setError,
  isAuthChecked,
  isDeleting,
  isLoggingOut,
  setIsLoggingOut,
  isAGameStarted,
  setIsAGameStarted,
  userCount,
  setUserCount,
  setFlash
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    setIsLoggingOut(true);
  }
  const handleLogoutYes = async () => {
    try {
      const response = await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });
      const json = await response.json();
      if (!response.ok) {
        setFlash(json.error || "Logout failed");
      }
      setCurrentUser(null);
      setFlash(json.message);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      setFlash("Network error during logout");
    }
    setIsLoggingOut(false);
  };
  const handleLogoutNo = () => {
    setIsLoggingOut(false);
  }
  // Fetching the total number of the registered users:
  useEffect(() => {
  const fetchUserCount = async () => {
    const res = await fetch("/users/count");
    const data = await res.json();
    setUserCount(data.count);
  };
  fetchUserCount();
}, []);
  return (
    <header>
      <div><strong>Pejman MERN Wonderland</strong></div>
      <div>Total users: {userCount}</div>
      {currentUser && !isLoggingOut && !isAGameStarted && <div>Welcome, {currentUser.username}!</div>}
      {/* "location.pathname" is the path of the current page */}
      {currentUser && location.pathname !== '/profile' && !isLoggingOut && !isDeleting && !isAGameStarted && (
        <button onClick={() => navigate('/profile')} disabled={error}>My Profile</button>
      )}
      {location.pathname !== "/" && !isLoggingOut && !isDeleting && !isAGameStarted && (
        <button onClick={() => navigate("/")} disabled={error}>Home Page</button>
      )}
      {currentUser && currentUser.role === "Admin" && location.pathname !== "/users" && !isLoggingOut && !isDeleting && !isAGameStarted && (
        <button onClick={() => navigate("/users")} disabled={error}>All users</button>
      )}
      {currentUser && currentUser.role === "Admin" && location.pathname !== "/newAd" && !isLoggingOut && !isDeleting && !isAGameStarted && (
        <button onClick={() => navigate("/newAd")} disabled={error}>Create new Ad</button>
      )}
      {!currentUser && location.pathname !== "/register" && !isLoggingOut && !isDeleting && !isAGameStarted && (
        <button onClick={() => navigate("/register")} disabled={error}>Register</button>
      )}
      {!currentUser && location.pathname !== "/login" && !isLoggingOut && !isDeleting && !isAGameStarted && (
        <button onClick={() => navigate("/login")} disabled={error}>Login</button>
      )}
      {currentUser && !isLoggingOut && !isDeleting && !isAGameStarted && <button onClick={handleLogout} disabled={error}>Logout</button>}
      {isLoggingOut &&
        <div>
          <div>Are you sure you want to logout?</div>
          <div>
            <button onClick={handleLogoutYes}>Yes</button>
            <button onClick={handleLogoutNo}>No</button>
          </div>
        </div>
      }
      <Routes>
        <Route
          path="/newAd"
          element={
            <ProtectedRoute currentUser={currentUser} isAuthChecked={isAuthChecked}>
              <AdForm
                error={error}
                setError={setError}
                currentUser={currentUser}
                onAdCreated={(newAd) => {
                  setAds((currAds) => [newAd, ...currAds]);
                }}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </header>
  );
}
