import "./App.css";
import { useState } from "react";
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
      <RockScissorsPaper
        score={score}
        updateScore={updateScore}
        totalPoint={totalPoint}
        updateTotalPoint={updateTotalPoint}
      />
    </div>
  );
}

export default App;
