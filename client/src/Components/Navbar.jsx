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
  isAuthChecked
}) {
  const navigate = useNavigate();
  const location = useLocation();
  // "location.pathname" is the path of the current page
  const handleLogout = async () => {
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
  };
  return (
    <header>
      <h1>Pejman MERN Wonderland</h1>
      {currentUser && <div>Welcome, {currentUser.username}</div>}
      {location.pathname !== "/" && (
        <button onClick={() => navigate("/")} disabled={error}>Home Page</button>
      )}
      {currentUser && currentUser.role === "Admin" && location.pathname !== "/users" && (
        <button onClick={() => navigate("/users")} disabled={error}>All users</button>
      )}
      {currentUser && currentUser.role === "Admin" && location.pathname !== "/newAd" && (
        <button onClick={() => navigate("/newAd")} disabled={error}>Create new Ad</button>
      )}
      {!currentUser && location.pathname !== "/register" && (
        <button onClick={() => navigate("/register")} disabled={error}>Register</button>
      )}
      {!currentUser && location.pathname !== "/login" && (
        <button onClick={() => navigate("/login")} disabled={error}>Login</button>
      )}
      {currentUser && <button onClick={handleLogout} disabled={error}>Logout</button>}
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
