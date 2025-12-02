import { useState, useEffect } from "react";
import Card from "./Card";
import { getRandArr } from "../utils";

export default function Board({
  images,
  nrows,
  ncols,
  isImagesGroupChosen,
  easyMode,
  normalMode,
  hardMode,
  setIsWin,
  seconds,
  setSeconds,
  handleStartTimer,
  handleStopTimer,
  pair,
  setPair,
  isTogglingHomePage,
}) {
  const [board, setBoard] = useState([]);
  const [shuffledIndexes, setShuffledIndexes] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [showBoard, setShowBoard] = useState(false);
  const generateBoard = () => {
    let finalIndex = 0;
    for (let b = 0; b < nrows; b++) {
      let row = [];
      for (let a = 0; a < ncols; a++) {
        row.push([a, b, shuffledIndexes[finalIndex], 0]);
        finalIndex++;
      }
      setBoard((currBoard) => [...currBoard, row]);
    }
    if (normalMode) {
      setSeconds(180); // 180
      handleStartTimer();
    }
    if (hardMode) {
      setSeconds(4); // 270
      handleStartTimer();
    }
    setShowBoard(true);
  };
  useEffect(
    function () {
      function pickIndexes() {
        let copyImageIndexes = images.map((item) => item.imageIndex);
        let copyShuffledIndexes = [...shuffledIndexes];
        for (let i = 0; i < images.length; i++) {
          const randomIndex = getRandArr(copyImageIndexes);
          const randomElement = copyImageIndexes.splice(
            copyImageIndexes.indexOf(randomIndex),
            1
          )[0];
          copyShuffledIndexes.push(randomElement);
        }
        setShuffledIndexes(copyShuffledIndexes);
      }
      pickIndexes();
    },
    [images]
  );
  return (
    <div>
      {!isTogglingHomePage &&
        board.map((row) =>
          row.map((card) =>
            card[0] !== ncols - 1 ? (
              <div style={{ display: "inline" }}>
                {
                  <Card
                    visibleCards={visibleCards}
                    setVisibleCards={setVisibleCards}
                    x={card[0]}
                    y={card[1]}
                    images={images.map((item) => item.image)}
                    imageIndex={card[2]}
                    status={card[3]}
                    board={board}
                    setBoard={setBoard}
                    setIsWin={setIsWin}
                    seconds={seconds}
                    easyMode={easyMode}
                    normalMode={normalMode}
                    nrows={nrows}
                    ncols={ncols}
                    pair={pair}
                    setPair={setPair}
                    handleStopTimer={handleStopTimer}
                  />
                }
              </div>
            ) : (
              <div style={{ display: "inline" }}>
                {
                  <Card
                    visibleCards={visibleCards}
                    setVisibleCards={setVisibleCards}
                    x={card[0]}
                    y={card[1]}
                    images={images.map((item) => item.image)}
                    imageIndex={card[2]}
                    status={card[3]}
                    board={board}
                    setBoard={setBoard}
                    setIsWin={setIsWin}
                    seconds={seconds}
                    easyMode={easyMode}
                    normalMode={normalMode}
                    nrows={nrows}
                    ncols={ncols}
                    pair={pair}
                    setPair={setPair}
                    handleStopTimer={handleStopTimer}
                  />
                }
                <br></br>
              </div>
            )
          )
        )}
      {isImagesGroupChosen && !showBoard && !isTogglingHomePage && (
        <button onClick={generateBoard}>Start</button>
      )}
      <div>
        images:
        {images
          .map((item) => item.image)
          .map((i) => (
            <div>{i}</div>
          ))}
      </div>
      <div>
        imageIndexes:
        {images
          .map((item) => item.imageIndex)
          .map((i) => (
            <div>{i}</div>
          ))}
      </div>
      <div>
        shuffledIndexes:
        {shuffledIndexes.map((i) => (
          <div>{i}</div>
        ))}
      </div>
      <div>
        Board:
        {board.map((row) =>
          row.map((card) => (
            <div>
              {card[0]} - {card[1]} - {card[2]} - {card[3]}
            </div>
          ))
        )}
      </div>
      <div>
        visible Cards:
        {visibleCards.map((card) => (
          <div>
            {card[0]} - {card[1]} - {card[2]} - {card[3]}
          </div>
        ))}
      </div>
    </div>
  );
}
