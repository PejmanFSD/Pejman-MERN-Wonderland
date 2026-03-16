import {
  useNavigate,
  useLocation // For hiding the button of the current page
} from "react-router-dom";

export default function Profile({ currentUser, setIsProfileEditing }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleEditMyProfile = () => {
    navigate("/edit-profile");
    setIsProfileEditing(true);
  }
  return (
    <div>
      {currentUser && (
        <div>
          <div>Username: {currentUser.username}</div>
          <div>Role: {currentUser.role}</div>
          <div>Message: {currentUser.message}</div>
          <div>Number of stars: {currentUser.totalPoint}</div>
          <button onClick={handleEditMyProfile}>
            Edit My Profile
          </button>
        </div>
      )}
    </div>
  );
}
