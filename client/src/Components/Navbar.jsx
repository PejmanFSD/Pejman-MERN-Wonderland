import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation, // For hiding the button of the current page
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// import AdForm from "./ads/AdForm";

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
  userCount,
  setUserCount,
  setFlash,
  isProfileEditing,
  isAdEditing,
  isCreatingAd,
  setIsCreatingAd,
  theme,
  setTheme,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const gameUrls = [
    "/rock-scissors-paper",
    "/guess-number",
    "/capitals",
    "/cryptogram",
    "/crazy-100",
    "/memory-cards",
    "/nim",
    "/happy-flower",
    "/xo",
    "/maze",
    "/kuku-kube",
    "/triple-emoji-match",
    "/pidoku",
    "/counter",
    "/puzzle",
    "/bingo",
    "/tug-of-war",
    "/bird-hunter",
    "/reversi",
    "/snake",
    "/blackJack",
  ];
  const handleLogout = () => {
    setIsLoggingOut(true);
  };
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
  };
  const renderCreateAdPage = () => {
    setIsCreatingAd(true);
    navigate("/newAd");
  };
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
      <div>
        <strong>Pejman MERN Wonderland</strong>
      </div>
      <div
        className="four-buttons-container"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        {currentUser && !isLoggingOut && (
          <div>Welcome, {currentUser.username}!</div>
        )}
        <div>Number of registered users: {userCount}</div>
        {!gameUrls.includes(location.pathname) &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && (
            <div>
              {`Theme: `}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                  textAlign: "center",
                  width: "80px",
                  height: "20px",
                }}
              >
                <option disabled selected></option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Green">Green</option>
              </select>
            </div>
          )}
      </div>
      {/* "location.pathname" is the path of the current page */}
      <div className="four-buttons-container">
        {location.pathname !== "/" &&
          !gameUrls.includes(location.pathname) &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && <button onClick={() => navigate("/")}>Home Page</button>}
        {/* {!gameUrls.includes(location.pathname) &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error &&
          <div>
        {`Theme: `}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            marginTop: "10px",
            textAlign: "center",
            width: "80px",
            height: "25px",
          }}
        >
          <option value="Blue">Blue</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
        </select>
      </div>
        } */}

        {currentUser &&
          location.pathname !== "/profile" &&
          !gameUrls.includes(location.pathname) &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && (
            <button onClick={() => navigate("/profile")}>My Profile</button>
          )}
        {currentUser &&
          !gameUrls.includes(location.pathname) &&
          currentUser.role === "Admin" &&
          location.pathname !== "/users" &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && (
            <button onClick={() => navigate("/users")}>All users</button>
          )}
        {currentUser &&
          !gameUrls.includes(location.pathname) &&
          currentUser.role === "Admin" &&
          location.pathname !== "/newAd" &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && <button onClick={renderCreateAdPage}>Create new Ad</button>}
        {location.pathname !== "/about-wonderland" &&
          !gameUrls.includes(location.pathname) &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && (
            <button onClick={() => navigate("/about-wonderland")}>
              About Wonderland
            </button>
          )}
        {!currentUser &&
          !gameUrls.includes(location.pathname) &&
          location.pathname !== "/register" &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && (
            <button onClick={() => navigate("/register")}>Register</button>
          )}
        {!currentUser &&
          !gameUrls.includes(location.pathname) &&
          location.pathname !== "/login" &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && <button onClick={() => navigate("/login")}>Login</button>}
        {currentUser &&
          !gameUrls.includes(location.pathname) &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && <button onClick={handleLogout}>Logout</button>}
      </div>
      {isLoggingOut && !gameUrls.includes(location.pathname) && (
        <div>
          <div>Are you sure you want to logout?</div>
          <div>
            <button onClick={handleLogoutYes}>Yes</button>
            <button onClick={handleLogoutNo}>No</button>
          </div>
        </div>
      )}
    </header>
  );
}
