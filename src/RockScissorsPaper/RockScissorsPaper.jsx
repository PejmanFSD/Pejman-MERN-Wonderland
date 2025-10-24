import { useState, useEffect } from "react";
import Rock from "./Rok.png";
import Scissors from "./Scissors.png";
import Paper from "./Paper.png";
import { getRand } from "../utils";
const optionsArray = ["Rock", "Scissors", "Paper"];

export default function RockScissorsPaper({totalPoint, updateTotalPoint}) {
  const [userChoice, setUserChoice] = useState("");
  const [pejmanChoice, setPejmanChoice] = useState("");
  const [gameResult, setGameResult] = useState("");

  const announcingTheWinner = (user, pejman) => {
    if (user === "" || pejman === "") return;
    else if (user === pejman) {
      setGameResult("No winner, try again");
    } else if (user === "Rock" && pejman === "Scissors") {
      setGameResult("You win!");
    } else if (user === "Scissors" && pejman === "Paper") {
      setGameResult("You win!");
    } else if (user === "Paper" && pejman === "Rock") {
      setGameResult("You win!");
    } else {
      setGameResult("Pejman wins!");
    }
  };

  const handleUserChoice = (input) => {
    setUserChoice(input);
    setPejmanChoice(optionsArray[getRand(3)-1]);
  };

  useEffect(
    function () {
      announcingTheWinner(userChoice, pejmanChoice);
    },
    [userChoice, pejmanChoice]
  );
  return (
    <div>
      <img
        src={Rock}
        width="150px"
        alt="Rock"
        onClick={() => handleUserChoice("Rock")}
      />
      <img
        src={Scissors}
        width="150px"
        alt="Scissors"
        onClick={() => handleUserChoice("Scissors")}
      />
      <img
        src={Paper}
        width="150px"
        alt="Paper"
        onClick={() => handleUserChoice("Paper")}
      />
      <div>{userChoice && <p>Your choice: {userChoice}</p>}</div>
      <div>{pejmanChoice && <p>Pejman's choice: {pejmanChoice}</p>}</div>
      <h1>{gameResult}</h1>
    </div>
  );
}
