import { imagesArray } from "./imagesArray";

export default function Counter() {
    return (
        <div>
            {imagesArray.map((el, i) =>
                <img
                    src={imagesArray[i].image}
                    style={{width: "100px", border: "1px solid black"}}
                />
            )}
        </div>
    )
}