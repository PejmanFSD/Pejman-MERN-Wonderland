import { useState } from "react";
import Match from "./Match";
import Dice1 from "./images/001.jpg";
import Dice2 from "./images/002.jpg";
import Dice3 from "./images/003.jpg";
import Dice4 from "./images/004.jpg";
import Dice5 from "./images/005.jpg";
import Dice6 from "./images/006.jpg";
import Blue1 from "./images/Blue-1.jpg";
import Blue2 from "./images/Blue-2.jpg";
import Blue3 from "./images/Blue-3.jpg";
import Blue4 from "./images/Blue-4.jpg";
import Blue5 from "./images/Blue-5.jpg";
import Red1 from "./images/Red-1.jpg";
import Red2 from "./images/Red-2.jpg";
import Red3 from "./images/Red-3.jpg";
import Red4 from "./images/Red-4.jpg";
import Red5 from "./images/Red-5.jpg";
import V1 from "./images/V-1.jpg";
import V2 from "./images/V-2.jpg";
import V3 from "./images/V-3.jpg";

export default function TugOfWar() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userColor, setUserColor] = useState("");
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [dice, setDice] = useState(-1);
  const [isDiceUpdated, setIsDiceUpdated] = useState(false);
  const [match1, setMatch1] = useState([Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]);

  const handleStart = () => {
    setIsGameStarted(true);
    setIsUserTurn(true);
  };
  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor("Red");
    } else if (e.target.value === "Blue") {
      setUserColor("Blue");
    }
  };
  const rollDice = () => {
    setDice(0);
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setDice(randomNumber);
    }, 1000);
    setIsDiceUpdated(true);
  };
  const replaceElement = (arrFunc, firstEl, secEl) => {
    arrFunc((currArr) => currArr.map(el => el === firstEl ? secEl : el));
  }
  const swapElements = (arrFunc, indexl, index2) => {
    arrFunc(currArr => {
        const newArr = [...currArr];
        [newArr[indexl], newArr[index2]] = [newArr[index2], newArr[indexl]];
        return newArr;
    });
  }
  const userAct = () => {
    if (userColor === "Blue") {
        replaceElement(setMatch1, match1[0], Blue2);
        replaceElement(setMatch1, match1[14], Red3);
        swapElements(setMatch1, match1.indexOf(V2), match1.indexOf(V2) - dice);
    } else if (userColor === "Red") {
        replaceElement(setMatch1, match1[14], Red2);
        replaceElement(setMatch1, match1[0], Blue3);
        swapElements(setMatch1, match1.indexOf(V2), match1.indexOf(V2) + dice);
    }
    setIsDiceUpdated(false);
    setIsUserTurn(false);
  }
  const pejmanAct = () => {
    if (userColor === "Blue") {
        replaceElement(setMatch1, match1[0], Blue3);
        replaceElement(setMatch1, match1[14], Red2);
        swapElements(setMatch1, match1.indexOf(V2), match1.indexOf(V2) + dice);
    } else if (userColor === "Red") {
        replaceElement(setMatch1, match1[14], Red3);
        replaceElement(setMatch1, match1[0], Blue2);
        swapElements(setMatch1, match1.indexOf(V2), match1.indexOf(V2) - dice);
    }
    setIsDiceUpdated(false);
    setIsUserTurn(true);
  }
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
      {isGameStarted &&
        <div>
            {userColor && userColor === "Blue" && <div>You are <span style={{color: "blue"}}>Blue</span></div>}
            {userColor && userColor === "Red" && <div>You are <span style={{color: "red"}}>Red</span></div>}
        </div>
      }


      {isGameStarted && isUserTurn && !isDiceUpdated && 
        <button onClick={rollDice}>Roll the Dice</button>
      }
      {isGameStarted && !isUserTurn && !isDiceUpdated &&
        <div>
            <div>Allow Pejman to roll the dice</div>
            <button onClick={rollDice}>Ok</button>
        </div>
      }
      {isGameStarted && isDiceUpdated && (
          <div style={{position: "relative", top: "5px"}}>
            {dice === 0 && <div>Rolling the Dice ...</div>}
            {dice === 1 && <img src={Dice1} width="50px" />}
            {dice === 2 && <img src={Dice2} width="50px" />}
            {dice === 3 && <img src={Dice3} width="50px" />}
            {dice === 4 && <img src={Dice4} width="50px" />}
            {dice === 5 && <img src={Dice5} width="50px" />}
            {dice === 6 && <img src={Dice6} width="50px" />}
          </div>
      )}
      {isGameStarted && isUserTurn && isDiceUpdated && dice > 0 &&
        <button onClick={userAct} style={{position: "relative", top: "5px"}}>Act</button>
      }
      {isGameStarted && !isUserTurn && isDiceUpdated && dice > 0 &&
        <div>
            <div>Allow Pejman to make his move</div>
            <button onClick={pejmanAct} style={{position: "relative", top: "5px"}}>Ok</button>
        </div>
      }
      {isGameStarted && (
        <Match matchImages={match1} userColor={userColor} />
      )}
    </div>
  );
}
