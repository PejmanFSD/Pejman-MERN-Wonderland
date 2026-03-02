import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ currentUser, children }) {
  const location = useLocation();
  if (!currentUser) {
    return (
      <Navigate
        to="/login" // If the user clicks on the "Login" button
        replace
        state={{ from: location }} // If the user was trying to reach a
        // page that required login.
      />
    );
  }
  return children;
}