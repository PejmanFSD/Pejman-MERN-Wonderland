import { useState } from "react";

export default function TugOfWar() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userColor, setUserColor] = useState("");
  const [pejmanColor, setPejmanColor] = useState("");
  const [dice, setDice] = useState(0);
  const handleStart = () => {
    setIsGameStarted(true);
  };
  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor("red");
      setPejmanColor("blue");
    } else if (e.target.value === "Blue") {
      setUserColor("blue");
      setPejmanColor("red");
    }
  };
  const rollDice = () => {
    setDice(Math.floor(Math.random() * 6) + 1);
  };
  return (
    <div>
      <h2>Tug of War</h2>
      {!isGameStarted && userColor === "" && (
        <div>
          <label htmlFor="userColor">Select a Color</label>
          <br></br>
          <select onChange={handleUserColor} name="userColor" id="userColor">
            <option value={userColor} disabled selected>
              🔽🔽🔽
            </option>
            {["Red", "Blue"].map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </div>
      )}
      {!isGameStarted && userColor !== "" && (
        <button onClick={handleStart}>Start</button>
      )}
      {isGameStarted && (
        <div>
          <div>{userColor}</div>
          <button onClick={rollDice}>Roll the Dice</button>
          {dice > 0 && <div>{dice}</div>}
        </div>
      )}
    </div>
  );
}
