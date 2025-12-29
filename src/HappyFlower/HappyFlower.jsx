import { useState, useEffect } from "react";
import Form from "./Form";
import GuessTable from "./GuessTable";

export default function HappyFlower() {
    const [title, setTitle] = useState("");
    const [word, setWord] = useState("");
    const [wordWithNoSpace, setWordWithNoSpace] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [userGuess, setUserGuess] = useState([]);
    const [userMistakes, setUserMistakes] = useState([]);
    const [isWin, setIsWin] = useState("");

    const handleReset = () => {
        setTitle("");
        setWord("");
        setWordWithNoSpace([]);
        setIsGameStarted(false);
        setUserGuess([]);
        setUserMistakes([]);
        setIsWin("");
    }
    // Creatign a copy of "word", but with no space:
    useEffect(() => {
        setWordWithNoSpace(word.replace(/\s+/g, ""));
    }, [word]);
    useEffect(() => {
        if (userMistakes.length === 5) {
            setIsWin(false);
        }
    }, [userMistakes]);
    useEffect(() => {
        let mistakesNum = 0;
        for (let i = 0; i < wordWithNoSpace.length; i++) {
            if (!userGuess.includes(wordWithNoSpace[i].toLowerCase())) {
                mistakesNum++;
            }
        }
        if (mistakesNum === 0 && userGuess.length > 0) {
            setIsWin(true);
        }
    }, [userGuess]);
    return (
        <div>
            {!isGameStarted &&
                <Form
                    title={title}
                    setTitle={setTitle}
                    word={word}
                    setWord={setWord}
                    setWordWithNoSpace={setWordWithNoSpace}
                    setIsGameStarted={setIsGameStarted}
                />
            }
            <div style={{ color: "gray" }}>
                {title} - {word} - {word.length} - {wordWithNoSpace} - {userGuess} - {isWin ? "T" : "F"}
            </div>
            <div>
                {isWin === false &&
                    <div>
                        <h2>You loose!</h2><h3>{`The name of the ${title} is ${word}`}</h3>
                        <div>Try again?</div><button onClick={handleReset}>Ok</button>
                    </div>}
                {isWin === true &&
                    <div>
                        <h2>You Win!</h2>
                        <div>Play again?</div><button onClick={handleReset}>Ok</button>
                    </div>}
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