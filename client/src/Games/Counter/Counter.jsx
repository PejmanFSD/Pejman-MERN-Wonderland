import {useState, useEffect} from "react";
import { imagesArray } from "./imagesArray";
import {getRandNumInRange} from "../utils";

export default function Counter() {
    const [gameArray, setGameArray] = useState(imagesArray);
    const [finalGameArray, setFinalGameArray] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    // Variables for the timer:
    const [phase, setPhase] = useState("start"); // start -> 3 -> 2 -> 1 -> blank -> images -> ...
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showImage, setShowImage] = useState(false); // A boolean to show/hide images
    const [countdown, setCountdown] = useState(3); // Just for the first 3 numbers (3, 2, 1)

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
        if (isGameStarted) {
        let step = -1;
        const interval = setInterval(() => {
            step++;
            // First second (step === 0) -> nothing
            if (step === 0) setCountdown(3);
            if (step === 1) setCountdown(2);
            if (step === 2) setCountdown(1);
            if (step === 3) setCountdown(-1);
            if (step === 4) setCountdown(0);
            if (step >= 5) {
            setShowImage(prev => !prev); // Every other second, we see nothing
                // For even seconds we see the images:
            if (step % 2 === 0) {
                setCurrentIndex(prev => prev + 1);
            }
            }
        }, 1000);

        return () => clearInterval(interval);
}
    }, [isGameStarted]);
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
            <div>
                {countdown > 0 && <h1>{countdown}</h1>}
                {countdown === -1 && <h1>Go!</h1>}
                {countdown === 0 && showImage && finalGameArray[currentIndex] && (
                    <img src={finalGameArray[currentIndex].image} alt="" width="80px" />
                )}
            </div>
        </div>
    )
}