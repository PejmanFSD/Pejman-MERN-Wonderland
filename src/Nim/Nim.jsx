import { useState } from "react";
import Bowls from "./Bowls";

export default function Nim() {
  const [isFillingTheBowlsStarted, setIsFillingTheBowlsStarted] =
    useState(false);
  const startFillingBowls = () => {
    setIsFillingTheBowlsStarted(true);
  };
  return (
    <div>
      {!isFillingTheBowlsStarted && (
        <button onClick={startFillingBowls}>
          Start Filling the Bowls with balls
        </button>
      )}
      {isFillingTheBowlsStarted && <Bowls />}
    </div>
  );
}
