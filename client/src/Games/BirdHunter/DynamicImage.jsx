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
  const handleClickImage = () => {
    setImages((currImages) =>
      currImages.map((img, idx) =>
        idx === index
          ? { imgSrc: C, status: "bingo" }
          : { imgSrc: A, status: "blank" },
      ),
    );
    setUserScore(currUserScore => currUserScore + 1);
    setNumOfDoneGrounds(currNumOfDoneGrounds => currNumOfDoneGrounds + 1);
    stopRef.current = true; // Triggering stop
    setIsRunning(false);
    if (grounds.length > 0) {
      handleChooseGround();
    } else if (grounds.length === 0) {
      setChosenGround(0);
    }
  };
  return (
    <img
      onClick={handleClickImage}
      key={index}
      src={src}
      alt={`img-${index}`}
      height={isTogglingHomePage ? "30px" : "55px"}
      style={{
        pointerEvents: src === B1 || src === B2 ? "" : "none",
      }}
    />
  );
}
