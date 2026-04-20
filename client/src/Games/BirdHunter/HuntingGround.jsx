import { useState } from "react";
import DynamicImage from "./DynamicImage";
import A from "./images/A.jpg";
import B from "./images/B.jpg";

export default function HuntingGround() {
  const [images, setImages] = useState(Array(8).fill(A));
  const [isRunning, setIsRunning] = useState(false);
  
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  // setTimeout(res, ms) -> waits ms milliseconds, then calls res()
  // res is provided automatically by JavaScript when we create a Promise,
  // so when we create a Promise, JavaScript calls our function immediately
  // and passes in a function as the first argument.
  const handleClick = async () => {
    if (isRunning) return; // Preventing double clicks
    setIsRunning(true);
    for (let i = 0; i < images.length; i++) {
      // Turn current image to B
      setImages((currImages) => currImages.map((img, idx) => (idx === i ? B : img)));
      await delay(1000);
      // Turn it back to A
      setImages((currImages) => currImages.map((img, idx) => (idx === i ? A : img)));
    }
    setIsRunning(false);
  };

  return (
    <div>
      <button style={{position: "relative", top: "10px"}} onClick={handleClick} disabled={isRunning}>
        Start
      </button>

      <div>
        {images.map((src, index) => (
        <DynamicImage index={index} src={src} />
        ))}
      </div>
    </div>
  );
}
