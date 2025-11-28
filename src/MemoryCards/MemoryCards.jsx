import { useState } from "react";
import Board from "./Board";
import { fruits } from "./imagesGroup";

const imagesGroup = ["Cars", "Fruits", "Flowers", "Movie Characters"];
export default function MemoryCards() {
  const [images, setImages] = useState([]);
  const [isImagesGroupChosen, setIsImagesGroupChosen] = useState(false);
  const handleChangeImages = (e) => {
    if (e.target.value === "Fruits") {
      const initialImagesArray = fruits
        .slice(0, 4)
        .flatMap((n) => [n, n, n, n]);
      let copyImages = [...images];
      for (let i = 0; i < initialImagesArray.length; i++) {
        copyImages.push({ image: initialImagesArray[i], imageIndex: i });
      }
      setImages(copyImages);
    }
    setIsImagesGroupChosen(true);
  };

  return (
    <div>
      <label htmlFor="images">Select the images Group</label>
      <select onChange={handleChangeImages} name="images" id="images">
        <option value="" disabled selected>
          Select the images Group
        </option>
        {imagesGroup.map((group) => (
          <option>{group}</option>
        ))}
      </select>
      <Board
        images={images}
        nrows={4}
        ncols={4}
        isImagesGroupChosen={isImagesGroupChosen}
      />
    </div>
  );
}
