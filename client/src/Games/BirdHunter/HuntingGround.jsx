import { useState, useEffect, useRef } from "react";
import DynamicImage from "./DynamicImage";
import A from "./images/A.jpg";
import B from "./images/B.jpg";

export default function HuntingGround({
  grounds,
  groundNum,
  chosenGround,
  isRunning,
  setIsRunning,
  delayMilliSec,
  handleChooseGround,
  setChosenGround,
  setNumOfDoneGrounds,
  setUserScore,
}) {
  const [images, setImages] = useState(
    Array(8).fill({ imgSrc: A, status: "blank" }),
  );
  const stopRef = useRef(false); // control flag

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  // setTimeout(res, ms) -> waits ms milliseconds, then calls res()
  // res is provided automatically by JavaScript when we create a Promise,
  // so when we create a Promise, JavaScript calls our function immediately
  // and passes in a function as the first argument.
  //   const handleClick = async () => {
  useEffect(() => {
    const runningTheChosenGround = async () => {
      if (chosenGround === groundNum) {
        if (isRunning) return; // Preventing double clicks
        setIsRunning(true);
        for (let i = 0; i < images.length; i++) {
          if (stopRef.current) break; // 👈 stop check
          // Turn current image to B
          setImages((currImages) =>
            currImages.map((img, idx) =>
              idx === i ? { imgSrc: B, status: "blank" } : img,
            ),
          );
          await delay(delayMilliSec);
          if (stopRef.current) break; // 👈 stop check again
          if (i === images.length - 1) {
            setNumOfDoneGrounds(currNumOfDoneGrounds => currNumOfDoneGrounds + 1);
            handleChooseGround();
          }
        //   else {
            // Turn it back to A
            setImages((currImages) =>
              currImages.map((img, idx) =>
                idx === i ? { imgSrc: A, status: "blank" } : img,
              ),
            );
            // setNumOfDoneGrounds(currNumOfDoneGrounds => currNumOfDoneGrounds + 1);
        //   }
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
