import { useState } from "react";
import { faker } from "@faker-js/faker";
import Form from "./Form";

export default function Hangman() {
    const [title, setTitle] = useState("");
    const [word, setWord] = useState("");
    return (
        <div>
            <Form faker={faker} title={title} setTitle={setTitle} setWord={setWord} />
            {title} - {word}
        </div>
    )
}