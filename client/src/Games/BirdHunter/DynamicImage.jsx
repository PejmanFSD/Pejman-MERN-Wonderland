import A from "./images/A.jpg";
import B from "./images/B.jpg";
import C from "./images/C.jpg";

export default function DynamicImage({ index, src, setImages, setIsRunning, stopRef }) {
    const handleClickImage = () => {
        setImages((currImages) => currImages.map((img, idx) => (idx === index ? C : A)));
        stopRef.current = true; // 👈 trigger stop
        setIsRunning(false);
    }
  return (
    <img
      onClick={handleClickImage}
      key={index}
      src={src}
      alt={`img-${index}`}
      width="50px"
      style={{
        position: "relative",
        top: "15px",
        margin: "2px",
        pointerEvents: src === B ? "" : "none"
      }}
    />
  );
}
