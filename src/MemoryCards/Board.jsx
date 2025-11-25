import { useState, useEffect } from "react";
import Card from "./Card";
import { getRandArr } from "../utils";
import A1 from "./images/A1.jpg";
import A2 from "./images/A2.jpg";
import A3 from "./images/A3.jpg";
import A4 from "./images/A4.jpg";
import A5 from "./images/A5.jpg";
import A6 from "./images/A6.jpg";
import A7 from "./images/A7.jpg";
import A8 from "./images/A8.jpg";
const images = [A1, A1, A2, A2, A3, A3, A4, A4, A5, A5, A6, A6, A7, A7, A8, A8];

export default function Board({ nrows, ncols }) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [board, setBoard] = useState([]);
  const [imageIndexes, setImageIndexes] = useState(
    Array.from({ length: images.length }, (_, i) => i)
  );
  const [shuffledIndexes, setShuffledIndexes] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const generateBoard = () => {
    setIsGameStarted(true);
    console.log(shuffledIndexes);
    let finalIndex = 0;
    for (let b = 0; b < nrows; b++) {
      let row = [];
      for (let a = 0; a < ncols; a++) {
        row.push([a, b, shuffledIndexes[finalIndex]]);
        finalIndex++;
      }
      setBoard((currBoard) => [...currBoard, row]);
    }
  };
  useEffect(
    function () {
      function pickIndexes() {
        let copyImageIndexes = [...imageIndexes];
        let copyShuffledIndexes = [...shuffledIndexes];
        for (let i = 0; i < images.length; i++) {
          const randomIndex = getRandArr(imageIndexes);
          const randomElement = copyImageIndexes.splice(
            copyImageIndexes.indexOf(randomIndex),
            1
          )[0];
          copyShuffledIndexes.push(randomElement);
        }
        setImageIndexes(copyImageIndexes);
        setShuffledIndexes(copyShuffledIndexes);
      }
      pickIndexes();
    },
    [isGameStarted]
  );
  return (
    <div>
      {board.map((row) =>
        row.map((card) =>
          visibleCards.some(
            (pair) => pair[0] === card[0] && pair[1] === card[1]
          ) ? (
            card[0] !== ncols - 1 ? (
              <div style={{ display: "inline" }}>
                {
                  <Card
                    visibleCards={visibleCards}
                    setVisibleCards={setVisibleCards}
                    x={card[0]}
                    y={card[1]}
                    images={images}
                    imageIndex={card[2]}
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
                    images={images}
                    imageIndex={card[2]}
                  />
                }
                <br></br>
              </div>
            )
          ) : card[0] !== ncols - 1 ? (
            <div style={{ display: "inline" }}>
              {
                <Card
                  visibleCards={visibleCards}
                  setVisibleCards={setVisibleCards}
                  x={card[0]}
                  y={card[1]}
                  images={images}
                  imageIndex=""
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
                  images={images}
                  imageIndex=""
                />
              }
              <br></br>
            </div>
          )
        )
      )}
      <button onClick={generateBoard}>generate Board</button>
      <div>
        images:
        {images.map((i) => (
          <div>{i}</div>
        ))}
      </div>
      <div>
        imageIndexes:
        {imageIndexes.map((i) => (
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
              {card[0]} - {card[1]} - {card[2]}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
