import { useState } from "react";
import { faker } from "@faker-js/faker";
import Form from "./Form";

export default function Hangman() {
    const [title, setTitle] = useState("");
    return (
        <div>
            <Form setTitle={setTitle} />
            {title}
        </div>
    )
}