import { useState } from "react";
import White from "./images/White.jpg";
import Blue from "./images/Blue.jpg";
import Red from "./images/Red.jpg";
import Green from "./images/Green.jpg";
import Yellow from "./images/Yellow.jpg";
import ReviewSection from "../../Components/ReviewSection";
import Cell from "./Cell";

export default function Reversi({ updateTotalPoint, currentUser }) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userColor, setUserColor] = useState(null);
  const [pejmanColor, setPejmanColor] = useState(null);
  const [isIdenticalColor, setIsIdenticalColor] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [cells, setCells] = useState(
    new Array(49)
      .fill(null)
      .map((el, idx) => ({ id: idx, src: White, isSelected: false })),
  );
  const [selectedCellsNum, setSelectedCellsNum] = useState(0);
  const [selectionErrorMessage, setSelectionErrorMessage] = useState("");

  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor(Red);
    } else if (e.target.value === "Green") {
      setUserColor(Green);
    } else if (e.target.value === "Blue") {
      setUserColor(Blue);
    } else if (e.target.value === "Yellow") {
      setUserColor(Yellow);
    }
  };
  const handlePejmanColor = (e) => {
    if (e.target.value === "Red") {
      setPejmanColor(Red);
    } else if (e.target.value === "Green") {
      setPejmanColor(Green);
    } else if (e.target.value === "Blue") {
      setPejmanColor(Blue);
    } else if (e.target.value === "Yellow") {
      setPejmanColor(Yellow);
    }
  };
  const handleStart = () => {
    if (userColor === pejmanColor) {
      setIsIdenticalColor(true);
    } else {
      setIsGameStarted(true);
    }
    setIsUserTurn(true);
  };
  const handleOk = () => {
    setUserColor(null);
    setPejmanColor(null);
    setIsIdenticalColor(false);
  };
  const handleSelectionErrorMessage = () => {
    setSelectionErrorMessage("");
  }
  return (
    <div>
      <h2>Reversi</h2>
      {!isGameStarted && !isIdenticalColor && (
        <div>
          <div>
            <label htmlFor="userColor">Select a Color for yourself</label>
            <br></br>
            <select onChange={handleUserColor} name="userColor" id="userColor">
              <option value={userColor} disabled selected>
                🔽🔽🔽
              </option>
              {["Red", "Green", "Blue", "Yellow"].map((c) => (
                <option>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pejmanColor">Select a Color for Pejman</label>
            <br></br>
            <select
              onChange={handlePejmanColor}
              name="pejmanColor"
              id="pejmanColor"
            >
              <option value={pejmanColor} disabled selected>
                🔽🔽🔽
              </option>
              {["Red", "Green", "Blue", "Yellow"].map((c) => (
                <option>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {!isGameStarted && userColor && pejmanColor && (
        <button onClick={handleStart}>Start the Game</button>
      )}
      {isIdenticalColor && (
        <div>
          <div>You can't choose an identical color for both players</div>
          <button onClick={handleOk}>Ok</button>
        </div>
      )}
      {isGameStarted && selectionErrorMessage !== "" &&
        <div>
            <div>{selectionErrorMessage}</div>
            <button onClick={handleSelectionErrorMessage}>Ok</button>
        </div>
      }
      {isGameStarted &&
        cells.map((el, idx) =>
          (idx + 1) % 7 !== 0 ? (
            <div style={{ display: "inline" }}>
              <Cell
                id={el.id}
                src={el.src}
                isSelected={el.isSelected}
                style={{ display: "inline" }}
                userColor={userColor}
                cells={cells}
                setCells={setCells}
                selectedCellsNum={selectedCellsNum}
                setSelectedCellsNum={setSelectedCellsNum}
                selectionErrorMessage={selectionErrorMessage}
                setSelectionErrorMessage={setSelectionErrorMessage}
              />
            </div>
          ) : (
            <div style={{ display: "inline" }}>
              <Cell
                id={el.id}
                src={el.src}
                isSelected={el.isSelected}
                style={{ display: "inline" }}
                userColor={userColor}
                cells={cells}
                setCells={setCells}
                selectedCellsNum={selectedCellsNum}
                setSelectedCellsNum={setSelectedCellsNum}
                selectionErrorMessage={selectionErrorMessage}
                setSelectionErrorMessage={setSelectionErrorMessage}
              />
              <br />
            </div>
          ),
        )}
      {/* {isGameStarted && !isTogglingReset && !isTogglingHomePage && <ReviewSection game="Reversi" currentUser={currentUser} />} */}
    </div>
  );
}
