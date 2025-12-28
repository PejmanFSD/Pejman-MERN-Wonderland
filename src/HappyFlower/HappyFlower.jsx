import { useState, useEffect } from "react";
import Form from "./Form";
import GuessTable from "./GuessTable";

export default function HappyFlower() {
    const [title, setTitle] = useState("");
    const [word, setWord] = useState("");
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [userGuess, setUserGuess] = useState([]);
    const [userMistakes, setUserMistakes] = useState([]);
    const [isWin, setIsWin] = useState("");
    useEffect(() => {
        if (userMistakes.length === 5) {
            setIsWin(false);
        }
    }, [userMistakes]);
    useEffect(() => {
        let mistakesNum = 0;
        for (let i = 0; i < word.length; i++) {
            if (!userGuess.includes(word[i])) {
                mistakesNum++;
            }
        }
        if (mistakesNum === 0 && userGuess.length > 0) {
            setIsWin(true);
        }
    }, [userGuess]);
    return (
        <div>
            {!isGameStarted && <Form title={title} setTitle={setTitle} setWord={setWord} setIsGameStarted={setIsGameStarted} />}
            {title} - {word} - {word.length} - {userGuess} - {isWin ? "T" : "F"}
            <div>
                {isWin === false && <div><h2>You loose!</h2><h3>{`The name of the ${title} is ${word}`}</h3></div>}
                {isWin === true && <h2>You Win!</h2>}
            </div>
            {isGameStarted &&
                <div>
                    {isWin === "" && <div>{`Guess the name of the ${title}`}</div>}
                    <GuessTable
                        word={word}
                        userGuess={userGuess}
                        setUserGuess={setUserGuess}
                        userMistakes={userMistakes}
                        setUserMistakes={setUserMistakes}
                        isWin={isWin}
                    />
                </div>
            }
        </div>
    )
}