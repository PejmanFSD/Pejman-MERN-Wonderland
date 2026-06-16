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
      <h1 className="eater">{`Pejman-MERN-Wonderland`}</h1>
      <div
        className="four-buttons-container justify-content-around"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        {!gameUrls.includes(location.pathname) &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && (
            <div className="cause d-none d-md-block">
              Number of registered users: <strong>{userCount}</strong>
            </div>
          )}
        {currentUser && !isLoggingOut && !error && (
          <div className="cause" style={{ fontSize: "20px" }}>
            Welcome, <strong>{currentUser.username}</strong>!
          </div>
        )}
        {!gameUrls.includes(location.pathname) &&
          !isLoggingOut &&
          !isDeleting &&
          !isProfileEditing &&
          !isAdEditing &&
          !isCreatingAd &&
          !error && (
            <div className="cause d-none d-md-block">
              {`Theme: `}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                  textAlign: "center",
                  width: "180px",
                  height: "25px",
                  borderRadius: "5px",
                }}
              >
                <option disabled selected style={{ fontSize: "13px" }}>
                  Select a theme
                </option>
                <option value="Blue" style={{ fontSize: "13px" }}>
                  Blue
                </option>
                <option value="Red" style={{ fontSize: "13px" }}>
                  Red
                </option>
                <option value="Green" style={{ fontSize: "13px" }}>
                  Green
                </option>
              </select>
            </div>
          )}
      </div>
      {/* "location.pathname" is the path of the current page */}
      <nav className="navbar navbar-expand-md navbar-light navbar-light">
        <div className="container-fluid justify-content-center">
          <div className="d-none d-md-flex flex-fill"></div>
          <div className="d-flex flex-row align-items-center justify-content-center gap-2 flex-wrap">
            {location.pathname !== "/" &&
              !gameUrls.includes(location.pathname) &&
              !isLoggingOut &&
              !isDeleting &&
              !isProfileEditing &&
              !isAdEditing &&
              !isCreatingAd &&
              !error && (
                <button onClick={() => navigate("/")} className="cause btn1">
                  Home Page
                </button>
              )}
            {currentUser &&
              location.pathname !== "/profile" &&
              !gameUrls.includes(location.pathname) &&
              !isLoggingOut &&
              !isDeleting &&
              !isProfileEditing &&
              !isAdEditing &&
              !isCreatingAd &&
              !error && (
                <button
                  onClick={() => navigate("/profile")}
                  className="cause btn1"
                >
                  My Profile
                </button>
              )}
            {location.pathname !== "/about-wonderland" &&
              !gameUrls.includes(location.pathname) &&
              !isLoggingOut &&
              !isDeleting &&
              !isProfileEditing &&
              !isAdEditing &&
              !isCreatingAd &&
              !error && (
                <button
                  onClick={() => navigate("/about-wonderland")}
                  className="cause btn1"
                >
                  About Wonderland
                </button>
              )}
            <button
              className="navbar-toggler mx-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
            >
              <span
                className="navbar-toggler-icon"
                style={{ fontSize: "12px" }}
              ></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-center"
              id="mainNavbar"
            >
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-2">
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
                    <button
                      onClick={() => navigate("/users")}
                      className="cause btn1"
                    >
                      All users
                    </button>
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
                  !error && (
                    <button onClick={renderCreateAdPage} className="cause btn1">
                      Create new Ad
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
                    <button
                      onClick={() => navigate("/register")}
                      className="cause btn1"
                    >
                      Register
                    </button>
                  )}
                {!currentUser &&
                  !gameUrls.includes(location.pathname) &&
                  location.pathname !== "/login" &&
                  !isLoggingOut &&
                  !isDeleting &&
                  !isProfileEditing &&
                  !isAdEditing &&
                  !isCreatingAd &&
                  !error && (
                    <button
                      onClick={() => navigate("/login")}
                      className="cause btn1"
                    >
                      Login
                    </button>
                  )}
                {currentUser &&
                  !gameUrls.includes(location.pathname) &&
                  !isLoggingOut &&
                  !isDeleting &&
                  !isProfileEditing &&
                  !isAdEditing &&
                  !isCreatingAd &&
                  !error && (
                    <button onClick={handleLogout} className="cause btn1">
                      Logout
                    </button>
                  )}
              </div>
            </div>
          </div>
          <div className="d-none d-md-flex flex-fill"></div>
        </div>
      </nav>
      {isLoggingOut && !gameUrls.includes(location.pathname) && (
        <div>
          <div>Are you sure you want to logout?</div>
          <div>
            <button
              onClick={handleLogoutYes}
              style={{ margin: "3px" }}
              className="cause btn2"
            >
              Yes
            </button>
            <button
              onClick={handleLogoutNo}
              style={{ margin: "3px" }}
              className="cause btn2"
            >
              No
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
