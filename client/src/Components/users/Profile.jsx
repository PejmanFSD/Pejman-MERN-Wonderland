import {
  useNavigate,
  useLocation, // For hiding the button of the current page
} from "react-router-dom";

export default function Profile({
  currentUser,
  setIsProfileEditing,
  isLoggingOut,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleEditMyProfile = () => {
    navigate("/edit-profile");
    setIsProfileEditing(true);
  };
  return (
    <div className="cause" style={{ fontSize: "20px", marginTop: "25px" }}>
      <h1 className="eater" style={{ fontSize: "40px" }}>
        My Profile
      </h1>
      {currentUser && !isLoggingOut && (
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card mx-1 p-3 shadow mt-3" style={{backgroundColor: "var(--background)"}}>
                <div class="form-group" style={{ marginTop: "15px" }}>
                  <strong>Username: </strong>
                  {currentUser.username}
                </div>
                <div class="form-group" style={{ marginTop: "15px" }}>
                  <strong>Role: </strong>
                  {currentUser.role}
                </div>
                <div class="form-group" style={{ marginTop: "15px" }}>
                  <strong>Message: </strong>
                  {currentUser.message}
                </div>
                <div class="form-group" style={{ marginTop: "15px" }}>
                  <strong>Number of stars: </strong>
                  {currentUser.totalPoint}
                </div>
                <button
                  onClick={handleEditMyProfile}
                  className="btn1 align-self-center mb-4 mt-4"
                  style={{ marginTop: "7px", fontSize: "17px" }}
                >
                  Edit My Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
