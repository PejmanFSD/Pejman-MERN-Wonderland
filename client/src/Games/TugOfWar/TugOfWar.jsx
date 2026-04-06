import { useState } from "react";
import Dice1 from "./images/001.jpg";
import Dice2 from "./images/002.jpg";
import Dice3 from "./images/003.jpg";
import Dice4 from "./images/004.jpg";
import Dice5 from "./images/005.jpg";
import Dice6 from "./images/006.jpg";

export default function TugOfWar() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userColor, setUserColor] = useState("");
  const [pejmanColor, setPejmanColor] = useState("");
  const [dice, setDice] = useState(-1);
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
  setDice(0);
  setTimeout(() => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDice(randomNumber);
  }, 1000);
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
          <div style={{position: "relative", top: "5px"}}>
            {dice === 0 && <div>Rolling the Dice ...</div>}
            {dice === 1 && <img src={Dice1} width="50px" />}
            {dice === 2 && <img src={Dice2} width="50px" />}
            {dice === 3 && <img src={Dice3} width="50px" />}
            {dice === 4 && <img src={Dice4} width="50px" />}
            {dice === 5 && <img src={Dice5} width="50px" />}
            {dice === 6 && <img src={Dice6} width="50px" />}
          </div>
        </div>
      )}
    </div>
  );
}
