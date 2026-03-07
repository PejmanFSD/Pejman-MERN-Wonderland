import {useState} from "react";
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
  setIsLoggingOut
}) {
  
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    setIsLoggingOut(true);
  }
  const handleLogoutYes = async () => {
    try {
      await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });

      setCurrentUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setIsLoggingOut(false);
  };
  const handleLogoutNo = () => {
    setIsLoggingOut(false);
  }
  return (
    <header>
      <h1>Pejman MERN Wonderland</h1>
      {currentUser && !isLoggingOut && <div>Welcome, {currentUser.username}</div>}
      {/* "location.pathname" is the path of the current page */}
      {currentUser && location.pathname !== '/profile' && !isLoggingOut && !isDeleting && (
        <button onClick={() => navigate('/profile')} disabled={error}>My Profile</button>
      )}
      {location.pathname !== "/" && !isLoggingOut && !isDeleting && (
        <button onClick={() => navigate("/")} disabled={error}>Home Page</button>
      )}
      {currentUser && currentUser.role === "Admin" && location.pathname !== "/users" && !isLoggingOut && !isDeleting && (
        <button onClick={() => navigate("/users")} disabled={error}>All users</button>
      )}
      {currentUser && currentUser.role === "Admin" && location.pathname !== "/newAd" && !isLoggingOut && !isDeleting && (
        <button onClick={() => navigate("/newAd")} disabled={error}>Create new Ad</button>
      )}
      {!currentUser && location.pathname !== "/register" && !isLoggingOut && !isDeleting && (
        <button onClick={() => navigate("/register")} disabled={error}>Register</button>
      )}
      {!currentUser && location.pathname !== "/login" && !isLoggingOut && !isDeleting && (
        <button onClick={() => navigate("/login")} disabled={error}>Login</button>
      )}
      {currentUser && !isLoggingOut && !isDeleting && <button onClick={handleLogout} disabled={error}>Logout</button>}
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
      <hr />
    </header>
  );
}
