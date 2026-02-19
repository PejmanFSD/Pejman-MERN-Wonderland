import E00 from "./images/000.jpg";
import Skull from "./images/Skull.jpg";

export default function Emoji({
  imgId,
  imgSrc,
  emojis,
  setEmojis,
  selectedEmojis,
  setSelectedEmojis,
  tripleMatch,
  isWin
}) {
  const handleClickEmoji = () => {
    setEmojis((currEmojis) =>
      currEmojis.map((emoji) =>
        emoji.id === imgId ? { ...emoji, image: E00, isSelected: true } : emoji,
      ),
    );
    for (const selectedEmoji of selectedEmojis) {
      if (selectedEmoji.isFilled === false) {
        setSelectedEmojis((currSelectedEmojis) =>
          currSelectedEmojis.map((emoji) =>
            emoji.id === selectedEmoji.id
              ? {
                  ...emoji,
                  image: emojis.find((currEmoji) => currEmoji.id === imgId)
                    .image,
                  isFilled: true,
                }
              : emoji,
          ),
        );
        break;
      }
    }
  };
  return (
    <div>
      <img
        src={imgSrc}
        style={{
          width: "30px",
          border: "1px solid black",
          marginLeft: "4px",
          pointerEvents: imgSrc === E00 || tripleMatch || isWin !== "" ? "none" : "",
          opacity: tripleMatch || isWin !== "" ? 0.5 : 1
        }}
        onClick={handleClickEmoji}
      />
    </div>
  );
}
