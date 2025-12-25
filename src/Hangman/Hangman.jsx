import { useState } from "react";
import { faker } from "@faker-js/faker";

export default function Hangman() {
    const [data, setData] = useState(faker.animal.type());
    return (
        <div>{data}</div>
    )
}