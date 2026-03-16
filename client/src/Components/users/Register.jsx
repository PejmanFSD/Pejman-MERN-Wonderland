import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ onRegister, setUserCount, setFlash }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [totalPoint, setTotalPoint] = useState(0);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("Player");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState(null);
  const [passwordStrenghtStatus, setPasswordStrenghtStatus] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
  });
  const navigate = useNavigate();
  // We check if the password is strong or not, both in Back-End and Front-End:
  const isStrongPassword = (password) => {
    if (password.length < 8) return false;
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    for (let char of password) {
      if (char >= "A" && char <= "Z") hasUpper = true;
      else if (char >= "a" && char <= "z") hasLower = true;
      else if (char >= "0" && char <= "9") hasNumber = true;
    }
    return hasUpper && hasLower && hasNumber;
  };
  // Checking if each character of the password has one of the
  // conditions of a strong password:
  const checkPassword = (password) => {
    setPasswordStrenghtStatus({
      length: false,
      upper: false,
      lower: false,
      number: false,
    });
    for (let char of password) {
      if (char >= "A" && char <= "Z")
        setPasswordStrenghtStatus((currPasswordStrenghtStatus) => ({
          ...currPasswordStrenghtStatus,
          upper: true,
        }));
      else if (char >= "a" && char <= "z")
        setPasswordStrenghtStatus((currPasswordStrenghtStatus) => ({
          ...currPasswordStrenghtStatus,
          lower: true,
        }));
      else if (char >= "0" && char <= "9")
        setPasswordStrenghtStatus((currPasswordStrenghtStatus) => ({
          ...currPasswordStrenghtStatus,
          number: true,
        }));
    }
    if (password.length >= 8)
      setPasswordStrenghtStatus((currPasswordStrenghtStatus) => ({
        ...currPasswordStrenghtStatus,
        length: true,
      }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!isStrongPassword(password)) {
      setError("You should enter a strong password");
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
          adminSecret,
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
      setUserCount((currUserCount) => currUserCount + 1);
      onRegister(json.user);
      setUsername("");
      setPassword("");
      setTotalPoint(0);
      setMessage("");
      setRole("Player");
      setFlash(json.message);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    checkPassword(password);
  }, [password]);
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
        <div style={{ color: passwordStrenghtStatus.length ? "green" : "pink" }}>
          {passwordStrenghtStatus.length ? "✔" : "✖"} at least 8 characters
        </div>
        <div style={{ color: passwordStrenghtStatus.upper ? "green" : "pink" }}>
          {passwordStrenghtStatus.upper ? "✔" : "✖"} one uppercase letter
        </div>
        <div style={{ color: passwordStrenghtStatus.lower ? "green" : "pink" }}>
          {passwordStrenghtStatus.lower ? "✔" : "✖"} one lowercase letter
        </div>
        <div style={{ color: passwordStrenghtStatus.number ? "green" : "pink" }}>
          {passwordStrenghtStatus.number ? "✔" : "✖"} one number
        </div>
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
