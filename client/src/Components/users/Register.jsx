import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [totalPoint, setTotalPoint] = useState(0);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("Player");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // We're using sessions, so we need this line
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
          totalPoint,
          message,
          role,
          adminSecret
        }),
      });
      const json = await response.json();
      // Error handling
      // If the fetching user process fails:
      if (!response.ok) {
        // If the issue is with the userSchema limitations:
        if (json.errors) {
          const firstError = Object.values(json.errors)[0];
          setError(firstError);
        }
        // If the issue is for something else (like the internet breakdown):
        else {
          setError(json.message || json.error || "Registration failed");
        }
        return;
      }
      onRegister(json.user);
      setUsername("");
      setPassword("");
      setTotalPoint(0);
      setMessage("");
      setRole("Player");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up!</h3>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="username"
          value={username}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          value={password}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          name="message"
          value={message}
          required
        ></textarea>
      </div>
      <div>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Player">Player</option>
          <option value="Admin">Admin</option>
        </select>
        {role === "Admin" && (
          <input
            type="password"
            placeholder="Enter Admin Secret"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
        )}
      </div>
      <button disabled={password !== confirmPassword}>Sign Up</button>
      {password && confirmPassword && password !== confirmPassword && (
        <p style={{ color: "pink" }}>✖ Passwords do not match</p>
      )}
      {password && confirmPassword && password === confirmPassword && (
        <p style={{ color: "green" }}>✔ Passwords match</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
