import { useState, useEffect } from "react";
import Rock from "./Rok.png";
import Scissors from "./Scissors.png";
import Paper from "./Paper.png";
import { getRand } from "../utils";

export default function RokScissorsPaper({totalPoint, updateTotalPoint}) {
  const [userChoice, setUserChoice] = useState("");
  const [pejmanChoice, setPejmanChoice] = useState("");
  const [gameResult, setGameResult] = useState("");

  const announcingTheWinner = (user, pejman) => {
    if (user === "" || pejman === "") return;
    else if (user === pejman) {
      setGameResult("No winner, try again");
    } else if (user === 1 && pejman === 2) {
      setGameResult("You win!");
    } else if (user === 2 && pejman === 3) {
      setGameResult("You win!");
    } else if (user === 3 && pejman === 1) {
      setGameResult("You win!");
    } else {
      setGameResult("Pejman wins!");
    }
  };

  const handleUserChoice = (input) => {
    setUserChoice(input);
    setPejmanChoice(getRand(3));
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
        onClick={() => handleUserChoice(1)}
      />
      <img
        src={Scissors}
        width="150px"
        alt="Scissors"
        onClick={() => handleUserChoice(2)}
      />
      <img
        src={Paper}
        width="150px"
        alt="Paper"
        onClick={() => handleUserChoice(3)}
      />
      {userChoice} - {pejmanChoice}
      <h1>{gameResult}</h1>
    </div>
  );
}
