import "./App.css";
import { useState } from "react";
import Star from "./Star.png";
import RockScissorsPaper from "./RockScissorsPaper/RockScissorsPaper";

function App() {
  const [totalPoint, setTotalPoint] = useState(0);
  const [score, setScore] = useState(0);
  const updateScore = (i) => {
    setScore((currScore) => currScore + i);
  };
  const updateTotalPoint = (i) => {
    setTotalPoint((currTotalPoint) => currTotalPoint + i);
  };
  return (
    <div className="App">
      <h1>Pejman MERN Wonderland</h1>
      {new Array(totalPoint).fill(null).map((t) => (
        <img src={Star} width="30px" alt="Star" />
      ))}
      <RockScissorsPaper
        score={score}
        setScore={setScore}
        updateScore={updateScore}
        totalPoint={totalPoint}
        updateTotalPoint={updateTotalPoint}
      />
    </div>
  );
}

export default App;
