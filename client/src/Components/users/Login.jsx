import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({
  onLogin,
  youShouldLoginMessage,
  setYouShouldLoginMessage,
  setFlash,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // For navigating to the appropriate page after logging in
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
          password,
        }),
      });
      const json = await response.json();
      if (!response.ok) {
        setFlash(json.error);
        return;
      }
      onLogin(json.user);
      setUsername("");
      setPassword("");
      setFlash(json.message);
      const from = location.state?.from?.pathname || "/"; // Either navigate to "/" or
      // the page that required login and the user was trying to reach
      navigate(from, { replace: true });
      setYouShouldLoginMessage(false);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="cause" style={{ fontSize: "15px" }}>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form className="card p-4 shadow mt-3 mb-3" style={{backgroundColor: "var(--background)"}} onSubmit={handleSubmit}>
              <h1 className="eater" style={{ fontSize: "40px" }}>
                Login
              </h1>
              <div class="form-group" style={{ marginTop: "15px" }}>
                <label htmlFor="username">
                  <strong>Username:</strong>
                </label>
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
                    width: "250px",
                    height: "40px",
                    marginTop: "10px",
                  }}
                />
              </div>
              <div class="form-group" style={{ marginTop: "15px" }}>
                <label htmlFor="password">
                  <strong>Password:</strong>
                </label>
                <div>
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
                      width: "250px",
                      height: "40px",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </div>
              <br />
              <button className="btn1 align-self-center mb-3 mt-3" disabled={!username || !password}>
                Login
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
