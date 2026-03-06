import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditProfile({setCurrentUser}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
    if (currentPassword && newPassword) {
      await fetch("/users/change-password", {
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
    }
    if (response.ok) {
      const updatedUser = await response.json();
      setCurrentUser(updatedUser);
      navigate("/profile");
    }
  };

  return (
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
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
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
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}