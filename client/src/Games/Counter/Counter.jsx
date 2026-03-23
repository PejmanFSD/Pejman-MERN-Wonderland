import {useState, useEffect} from "react";
import { imagesArray } from "./imagesArray";
import {getRandNumInRange} from "../utils";

export default function Counter() {
    const [gameArray, setGameArray] = useState(imagesArray);
    const [finalGameArray, setFinalGameArray] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    // Variables for the timer:
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showImage, setShowImage] = useState(true); // A boolean to show/hide images

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
    useEffect(() => {
        let step = 0;

        const interval = setInterval(() => {
            if (step % 2 === 0) {
            setShowImage(true);
            } else {
            setShowImage(false);
            setCurrentIndex(prev => prev + 1);
            }

            step++;
        }, 1000);

        return () => clearInterval(interval);
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
            <br />
            {showImage && finalGameArray[currentIndex] && (
            <img
                src={finalGameArray[currentIndex].image}
                alt=""
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