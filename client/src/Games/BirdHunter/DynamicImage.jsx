import A from "./images/A.jpg";
import B1 from "./images/B1.jpg";
import B2 from "./images/B2.jpg";
import C from "./images/C.jpg";

export default function DynamicImage({
  grounds,
  index,
  src,
  setImages,
  setIsRunning,
  stopRef,
  handleChooseGround,
  setChosenGround,
  setNumOfDoneGrounds,
  setUserScore,
  isTogglingHomePage
}) {
  // The function that is executed when the user clicks on the image:
  const handleClickImage = () => {
    setImages((currImages) =>
      currImages.map((img, idx) =>
        idx === index
          ? { imgSrc: C, status: "bingo" } // If the image is the image of the bird, it status changes to "bingo"
          : { imgSrc: A, status: "blank" }, // If the image is blank, it status doesn't change
      ),
    );
    setUserScore(currUserScore => currUserScore + 1); // Increase the user's score by 1
    setNumOfDoneGrounds(currNumOfDoneGrounds => currNumOfDoneGrounds + 1); // Increase the numOfDoneGrounds by 1
    stopRef.current = true; // Triggering stop
    setIsRunning(false); // No bird is flying
    if (grounds.length > 0) { // If there're hunting grounds that are not handled
      // choose one randomly:
      handleChooseGround();
    } else if (grounds.length === 0) { // If all the hunting grounds are handled
      // return the "chosenGround" state variable to 0 (its initial value)
      setChosenGround(0);
    }
  };
  return (
    <img
    className="product-birdHunter-image"
      onClick={handleClickImage}
      key={index}
      src={src}
      alt={`img-${index}`}
      style={{
        pointerEvents: src === B1 || src === B2 ? "" : "none",
      }}
    />
  );
}
