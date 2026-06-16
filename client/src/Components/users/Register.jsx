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
    <div className="cause" style={{ fontSize: "15px" }}>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <form className="card p-4 shadow mt-3" onSubmit={handleSubmit}>
              <h1 className="eater" style={{ fontSize: "40px" }}>
                Sign Up!
              </h1>
              <div class="form-group" style={{ marginTop: "5px" }}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  name="username"
                  value={username}
                  required
                  class="form-control"
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    width: "150px",
                    height: "25px",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div class="form-group" style={{ marginTop: "10px" }}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  value={password}
                  required
                  class="form-control"
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    width: "150px",
                    height: "25px",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div style={{ marginTop: "5px" }}>
                <div
                  style={{
                    color: passwordStrenghtStatus.length ? "black" : "gray",
                  }}
                >
                  {passwordStrenghtStatus.length ? "✔" : "✖"} at least 8
                  characters
                </div>
                <div
                  style={{
                    color: passwordStrenghtStatus.upper ? "black" : "gray",
                  }}
                >
                  {passwordStrenghtStatus.upper ? "✔" : "✖"} one uppercase
                  letter
                </div>
                <div
                  style={{
                    color: passwordStrenghtStatus.lower ? "black" : "gray",
                  }}
                >
                  {passwordStrenghtStatus.lower ? "✔" : "✖"} one lowercase
                  letter
                </div>
                <div
                  style={{
                    color: passwordStrenghtStatus.number ? "black" : "gray",
                  }}
                >
                  {passwordStrenghtStatus.number ? "✔" : "✖"} one number
                </div>
              </div>
              <div class="form-group" style={{ marginTop: "10px" }}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                  class="form-control"
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    width: "150px",
                    height: "25px",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div class="form-group" style={{ marginTop: "10px" }}>
                <label htmlFor="message">Message:</label>
                <div>
                  <textarea
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    name="message"
                    value={message}
                    required
                    class="form-control"
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      width: "150px",
                      height: "75px",
                      marginTop: "7px",
                    }}
                  ></textarea>
                </div>
              </div>
              <div style={{ marginTop: "5px" }}>
                If you're an employer, please:
              </div>
              <div>
                - Signup as an "admin" (the Admin secret is{" "}
                <strong>PejmanFSD</strong>).
              </div>
              <div style={{ marginTop: "8px" }}>
                <div>Signup as:</div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    borderRadius: "5px",
                    marginTop: "5px",
                    textAlign: "center",
                    width: "80px",
                    height: "25px",
                  }}
                >
                  <option value="Player" style={{ fontSize: "13px" }}>
                    Player
                  </option>
                  <option value="Admin" style={{ fontSize: "13px" }}>
                    Admin
                  </option>
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
              <button
                disabled={
                  password !== confirmPassword ||
                  username === "" ||
                  password === "" ||
                  message === ""
                }
                className="btn1 align-self-center mb-3"
                style={{ marginTop: "15px" }}
              >
                Sign Up
              </button>
              {password && confirmPassword && password !== confirmPassword && (
                <p style={{ color: "gray" }}>✖ Passwords do not match</p>
              )}
              {password && confirmPassword && password === confirmPassword && (
                <p style={{ color: "black" }}>✔ Passwords match</p>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
