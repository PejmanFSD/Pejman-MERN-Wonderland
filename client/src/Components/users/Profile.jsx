import {
  useNavigate,
  useLocation // For hiding the button of the current page
} from "react-router-dom";

export default function Profile({ currentUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      {currentUser && (
        <div>
          <div>Username: {currentUser.username}</div>
          <div>Role: {currentUser.role}</div>
          <div>Message: {currentUser.message}</div>
          <div>Number of stars: {currentUser.totalPoint}</div>
          <button onClick={() => navigate("/edit-profile")}>
            Edit My Profile
          </button>
        </div>
      )}
    </div>
  );
}
