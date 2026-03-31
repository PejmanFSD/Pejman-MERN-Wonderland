import {useState} from "react";
import Board from "./Board";
import { getRandArr } from "../utils";

export default function Bingo() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [initialUserTens, setInitialUserTens] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [initialPejmanTens, setInitialPejmanTens] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [userTens, setUserTens] = useState([]);
    const [pejmanTens, setPejmanTens] = useState([]);

    const handleStart = () => {
        setIsGameStarted(true);
        const shuffled = [...initialUserTens].sort(() => Math.random() - 0.5);
        setUserTens(shuffled.slice(0, 8));
    };
    return (
        <div>
            {!isGameStarted &&
                <button onClick={handleStart}>Start</button>
            }
            userTens:
            {isGameStarted &&
                userTens.map(u => <div>{u}</div>)
            }
            initialUserTens:
            {isGameStarted &&
                initialUserTens.map(u => <div>{u}</div>)
            }
        </div>
    )
}