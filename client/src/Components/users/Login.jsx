import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/login", {
        method: "POST",
        credentials: "include", // We're using sessions, so we need this line
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Login failed");
      }
      onLogin(json.user);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
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
      <button>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
