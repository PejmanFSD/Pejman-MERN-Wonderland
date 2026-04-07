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
  const [matches, setMatches] = useState([
    {matchName: "match1", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]},
    {matchName: "match2", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]},
    {matchName: "match3", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]}
  ]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [finalMessage, setFinalMessage] = useState("");

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
  const replaceElement = (firstEl, secondEl) => {
    setMatches(currMatches =>
    currMatches.map(match =>
        match.matchName === selectedMatch
        ? {
            ...match,
            matchValue: match.matchValue.map(value =>
                value === firstEl ? secondEl : value
            )
            }
        : match
    )
    );
  };
  const swapElements = (indexl, index2) => {
    setMatches(currMatches =>
    currMatches.map(match => {
            if (match.matchName !== selectedMatch) return match;
            const values = [...match.matchValue];
            [values[indexl], values[index2]] = [values[index2], values[indexl]];
            return {
                ...match,
                matchValue: values
            };
        })
    );
  };
  const updateRopes = () => {
    replaceElement(V1, V3);
    replaceElement(V2, V3);
  }
  const userAct = () => {
    const match = (matches.find(m => m.matchName === selectedMatch)).matchValue;
    if (userColor === "Blue") {
        if (match.indexOf(V2) - dice < 1) {
            replaceElement(match[0], Blue4);
            replaceElement(match[14], Red5);
            updateRopes();
            swapElements(match.indexOf(V2), match.indexOf(V2) + 1);
            setFinalMessage("You Win!");
        } else {
            replaceElement(match[0], Blue2);
            replaceElement(match[14], Red3);
            swapElements(match.indexOf(V2), match.indexOf(V2) - dice);
        }
    } else if (userColor === "Red") {
        if (match.indexOf(V2) + dice > 13) {
            replaceElement(match[14], Red4);
            replaceElement(match[0], Blue5);
            updateRopes();
            swapElements(match.indexOf(V2), match.indexOf(V2) - 1);
            setFinalMessage("You Win!");
        } else {
            replaceElement(match[14], Red2);
            replaceElement(match[0], Blue3);
            swapElements(match.indexOf(V2), match.indexOf(V2) + dice);
        }
    }
    setIsDiceUpdated(false);
    setIsUserTurn(false);
  };
  const pejmanAct = () => {
    const match = (matches.find(m => m.matchName === selectedMatch)).matchValue;
    if (userColor === "Blue") {
        if (match.indexOf(V2) + dice > 13) {
            replaceElement(match[0], Blue5);
            replaceElement(match[14], Red4);
            updateRopes();
            swapElements(match.indexOf(V2), match.indexOf(V2) - 1);
            setFinalMessage("Pejman Wins!");
        } else {   
            replaceElement(match[0], Blue3);
            replaceElement(match[14], Red2);
            swapElements(match.indexOf(V2), match.indexOf(V2) + dice);
        }
    } else if (userColor === "Red") {
        if (match.indexOf(V2) - dice < 1) {
            replaceElement(match[14], Red5);
            replaceElement(match[0], Blue4);
            updateRopes();
            swapElements(match.indexOf(V2), match.indexOf(V2) + 1);
            setFinalMessage("Pejman Wins!");
        } else {
            replaceElement(match[14], Red3);
            replaceElement(match[0], Blue2);
            swapElements(match.indexOf(V2), match.indexOf(V2) - dice);
        }
    }
    setIsDiceUpdated(false);
    setIsUserTurn(true);
  };
  return (
    <div>
      <h2>Tug of War</h2>
      {isGameStarted && (
        <div>
            <Match matchImages={matches[0]} matchName={matches[0].matchName} userColor={userColor} isUserTurn={isUserTurn} isDiceUpdated={isDiceUpdated} dice={dice} setMatches={setMatches} selectedMatch={selectedMatch} setSelectedMatch={setSelectedMatch} />
            <Match matchImages={matches[1]} matchName={matches[1].matchName} userColor={userColor} isUserTurn={isUserTurn} isDiceUpdated={isDiceUpdated} dice={dice} setMatches={setMatches} selectedMatch={selectedMatch} setSelectedMatch={setSelectedMatch} />
            <Match matchImages={matches[2]} matchName={matches[2].matchName} userColor={userColor} isUserTurn={isUserTurn} isDiceUpdated={isDiceUpdated} dice={dice} setMatches={setMatches} selectedMatch={selectedMatch} setSelectedMatch={setSelectedMatch} />
        </div>
      )}
      {finalMessage && finalMessage === "You Win!" && <h3>You Win!</h3>}
      {finalMessage && finalMessage === "Pejman Wins!" && <h3>Pejman Wins!</h3>}
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
      {isGameStarted && isUserTurn && !isDiceUpdated && finalMessage === "" &&
        <button style={{position: "relative", top: "15px"}} onClick={rollDice}>Roll the Dice</button>
      }
      {isGameStarted && !isUserTurn && !isDiceUpdated && finalMessage === "" &&
        <div style={{position: "relative", top: "15px"}}>
            <div>Allow Pejman to roll the dice</div>
            <button onClick={rollDice}>Ok</button>
        </div>
      }
      {isGameStarted && isDiceUpdated && (
          <div style={{position: "relative", top: "20px"}}>
            {dice === 0 && <div>Rolling the Dice ...</div>}
            {dice === 1 && <img src={Dice1} width="50px" />}
            {dice === 2 && <img src={Dice2} width="50px" />}
            {dice === 3 && <img src={Dice3} width="50px" />}
            {dice === 4 && <img src={Dice4} width="50px" />}
            {dice === 5 && <img src={Dice5} width="50px" />}
            {dice === 6 && <img src={Dice6} width="50px" />}
          </div>
      )}
      {isGameStarted && isUserTurn && isDiceUpdated && dice > 0 && finalMessage === "" && selectedMatch === "" &&
        <div style={{position: "relative", top: "20px"}}>Choose a match</div>
      }
      {isGameStarted && isUserTurn && isDiceUpdated && dice > 0 && finalMessage === "" &&selectedMatch !== "" &&
        <button onClick={userAct} style={{position: "relative", top: "20px"}}>Act</button>
      }
      {isGameStarted && !isUserTurn && isDiceUpdated && dice > 0 && finalMessage === "" &&
        <div style={{position: "relative", top: "20px"}}>
            <div>Allow Pejman to make his move</div>
            <button onClick={pejmanAct} style={{position: "relative", top: "5px"}}>Ok</button>
        </div>
      }
    </div>
  );
}
