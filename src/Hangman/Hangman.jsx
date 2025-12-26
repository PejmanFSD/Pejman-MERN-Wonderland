import { useState } from "react";
import Form from "./Form";
import GuessTable from "./GuessTable";

export default function Hangman() {
    const [title, setTitle] = useState("");
    const [word, setWord] = useState("");
    const [isGameStarted, setIsGameStarted] = useState(false);
    return (
        <div>
            {!isGameStarted && <Form title={title} setTitle={setTitle} setWord={setWord} setIsGameStarted={setIsGameStarted} />}
            {title} - {word} - {word.length}
            {}
            {isGameStarted &&
            <div>
                <div>{`Guess the name of the ${title}`}</div>
                <GuessTable word={word} />
            </div>
            }
        </div>
    )
}