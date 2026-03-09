import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditProfile({ setCurrentUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/users/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setUsername(data.username);
      setMessage(data.message);
    };
    fetchProfile();
  }, []);
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch("/users/edit-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, message }),
    });
    if (currentPassword || newPassword || confirmNewPassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        setPasswordError("Please either fill all password fields or leave all of the empty");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setPasswordError("New passwords do not match");
        return;
      }
      const passwordResponse = await fetch("/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const passwordData = await passwordResponse.json();
      if (!passwordResponse.ok) {
        setPasswordError(passwordData.message);
        return;
      }
    }
    const updatedUser = await response.json();
    if (!response.ok) {
      setError(updatedUser.message);
      return;
    }
    setCurrentUser(updatedUser);
    navigate("/profile");
  };
  const checkPasswordMatch = (password, confirmPassword) => {
    if (!password && !confirmPassword) {
      setPasswordMatch(null);
      return;
    }
    if (password === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  const cancelSubmit = () => {
    navigate("/profile");
  };
  return (
    <div>
      <form onSubmit={handleProfileUpdate}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
        ></textarea>
        </div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => {
            const value = e.target.value;
            setNewPassword(value);
            checkPasswordMatch(value, confirmNewPassword);
          }}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmNewPassword(value);
            checkPasswordMatch(newPassword, value);
          }}
        />
        <button type="submit">Save Changes</button>
        {newPassword && confirmNewPassword && passwordMatch === true && (
          <p style={{ color: "green" }}>✔ New passwords match</p>
        )}
        {newPassword && confirmNewPassword && passwordMatch === false && (
          <p style={{ color: "pink" }}>✖ New passwords do not match</p>
        )}
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      </form>
      <button type="submit" onClick={cancelSubmit}>
        Cancel Changes
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
