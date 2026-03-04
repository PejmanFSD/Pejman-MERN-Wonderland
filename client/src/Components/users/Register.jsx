import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ currentUser, error, setError, onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [totalPoint, setTotalPoint] = useState(0);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("Player");
  const [adminSecret, setAdminSecret] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loadPage = async () => {
      if (!currentUser) {
        setError("You're already logged-in. To register as a different user, you should first logout!");
        return;
      }
    };
    loadPage(); // Refetching when "page" changes
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
          totalPoint,
          message,
          role,
          adminSecret
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Registration failed");
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
  const handleOk = () => {
  navigate(-1);
  setError(null);
  }
  // Specifically for the "isAuthor" and "isAdmin" middlewares:
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleOk}>Ok</button>
      </div>
    );
  }
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
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          name="message"
          value={message}
          required
        />
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
      <button>Sign Up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
