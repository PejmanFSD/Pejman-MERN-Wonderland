import { useState, useEffect, useRef } from "react";
import DynamicImage from "./DynamicImage";
import A from "./images/A.jpg";
import B1 from "./images/B1.jpg";
import B2 from "./images/B2.jpg";

export default function HuntingGround({
  grounds,
  groundNum,
  chosenGround,
  isRunning,
  setIsRunning,
  delayMilliSec,
  setDelayMilliSec,
  handleChooseGround,
  setChosenGround,
  setNumOfDoneGrounds,
  setUserScore,
}) {
  const [images, setImages] = useState(
    Array(7).fill({ imgSrc: A, status: "blank" }),
  );
  const stopRef = useRef(false); // control flag

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  // setTimeout(res, ms) -> waits ms milliseconds, then calls res()
  // res is provided automatically by JavaScript when we create a Promise,
  // so when we create a Promise, JavaScript calls our function immediately
  // and passes in a function as the first argument.
  useEffect(() => {
    const runningTheChosenGround = async () => {
      if (chosenGround === groundNum) {
        if (isRunning) return; // Preventing double clicks
        setIsRunning(true);
        setDelayMilliSec((currDelayMilliSec) => currDelayMilliSec - 55);
        for (let i = 0; i < images.length; i++) {
          if (stopRef.current) break; // Stop checking
          // Turn current image to B
          setImages((currImages) =>
            currImages.map((img, idx) =>
              idx === i && i % 2 === 0
                ? { imgSrc: B1, status: "blank" }
                : idx === i && i % 2 !== 0
                  ? { imgSrc: B2, status: "blank" }
                  : img,
            ),
          );
          await delay(delayMilliSec);
          if (stopRef.current) break; // Stop checking again
          if (i === images.length - 1) {
            setNumOfDoneGrounds(
              (currNumOfDoneGrounds) => currNumOfDoneGrounds + 1,
            );
            handleChooseGround();
          }
          // Turn it back to A
          setImages((currImages) =>
            currImages.map((img, idx) =>
              idx === i ? { imgSrc: A, status: "blank" } : img,
            ),
          );
        }
        setIsRunning(false);
      }
    };
    runningTheChosenGround();
  }, [chosenGround]);

  return (
    <div>
      {images.map((img, index) => (
        <DynamicImage
          grounds={grounds}
          index={index}
          src={img.imgSrc}
          setImages={setImages}
          setIsRunning={setIsRunning}
          stopRef={stopRef}
          handleChooseGround={handleChooseGround}
          setChosenGround={setChosenGround}
          setNumOfDoneGrounds={setNumOfDoneGrounds}
          setUserScore={setUserScore}
        />
      ))}
    </div>
  );
}
