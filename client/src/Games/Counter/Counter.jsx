import {useState, useEffect} from "react";
import { imagesArray } from "./imagesArray";
import {getRandNumInRange} from "../utils";

export default function Counter() {
    const [gameArray, setGameArray] = useState(imagesArray);
    const [finalGameArray, setFinalGameArray] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const handleStart = () => {
        setIsGameStarted(true);
        // expanding the gameArray based on the repetition value
        // and store it into a temporary variable (expandedArray):
        const expandedArray = gameArray.flatMap(item =>
            Array.from({ length: item.repetition }, (_, i) => ({
            ...item,
            instanceId: `${item.id}-${i}`
            }))
        );
        // Shuffling the new temporary variable (expandedArray):
        const shuffled = expandedArray.sort(() => Math.random() - 0.5);
        // Assigning the new temporary variable (expandedArray) to a
        // permanent variable(finalGameArray):
        setFinalGameArray(shuffled);
    }
    useEffect(() => {
        setGameArray((currGameArray) => currGameArray.map(arr => (
            {...arr, repetition: getRandNumInRange(1,3)}
        )))
    }, []);
    return (
        <div>
            <button onClick={handleStart}>Start the Game</button>
            <br />
            {gameArray.map((el) =>
                <div style={{display: "inline"}}>{el.repetition} - </div>
            )}
            <br />
            {finalGameArray.map((el, i) =>
                <img
                    src={finalGameArray[i].image}
                    style={{
                        width: "80px",
                        border: "1px solid black",
                        margin: "5px"
                    }}
                />
            )}
        </div>
    )
}