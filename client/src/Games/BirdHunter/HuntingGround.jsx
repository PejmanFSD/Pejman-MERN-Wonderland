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
  isTogglingHomePage
}) {
  // Creating the 7 blank images of each hunting ground:
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
      // Checking if the chosen hunting ground is the current hunting ground
      // groundNum = el -> el = the number of the hunting ground from
      // either the [1, 2, 3, 4, 5, 6, 7, 8] array or the [9, 10, 11, 12, 13, 14, 15, 16] array:
      if (chosenGround === groundNum) {
        if (isRunning) return; // Preventing double clicks
        setIsRunning(true);
        // Updating the "delayMilliSec" state variable the moment the bird starts flying in the hunting ground:
        setDelayMilliSec((currDelayMilliSec) => currDelayMilliSec - 55);
        // Updating each of the images of the hunting ground:
        for (let i = 0; i < images.length; i++) {
          if (stopRef.current) break; // Stop checking
          // Turn current image to B1 or B2
          setImages((currImages) =>
            currImages.map((img, idx) =>
              // The image of the bird in even images and in odd images are different:
              idx === i && i % 2 === 0
                ? { imgSrc: B1, status: "blank" }
                : idx === i && i % 2 !== 0
                  ? { imgSrc: B2, status: "blank" }
                  : img,
            ),
          );
          await delay(delayMilliSec);
          if (stopRef.current) break; // Stop checking again
          // The last image of the hunting ground:
          if (i === images.length - 1) {
            // For the last image of the hunting ground, the "numOfDoneGrounds" increases by 1:
            setNumOfDoneGrounds(
              (currNumOfDoneGrounds) => currNumOfDoneGrounds + 1,
            );
            // When the last image of the hunting ground is handled, another hunting ground will be chosen randomly:
            handleChooseGround();
          }
          // For the new randomly chosen hunting ground, turn all the images back to A:
          setImages((currImages) =>
            currImages.map((img, idx) =>
              idx === i ? { imgSrc: A, status: "blank" } : img,
            ),
          );
        }
        setIsRunning(false); // No bird is flying
      }
    };
    runningTheChosenGround();
  }, [chosenGround]); // Whenever a new hunting ground for rendering the bird to fly is chosen, execute the "runningTheChosenGround" function

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
          isTogglingHomePage={isTogglingHomePage}
          key={index}
        />
      ))}
    </div>
  );
}
