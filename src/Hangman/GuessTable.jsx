export default function GuessTable({ word, userGuess, setUserGuess }) {
    const addChar = (e) => {
        setUserGuess(currUserGuess => [...currUserGuess, e.target.value]);
    }
    return (
        <div>
            <div>
                {new Array(word.length).fill(null).map((letter, idx) =>
                    <div style={{ width: "15px", display: "inline", border: word[idx] !== " " && "1px solid black", padding: "15px", position: "relative", top: "25px" }}>
                        {word[idx]}
                    </div>)
                }
            </div>
            <div>
                {
                    Array.from({ length: 109 - 97 + 1 }, (_, index) => index + 97).map((b) =>
                        <button
                            onClick={addChar}
                            name={String.fromCharCode(b)}
                            value={String.fromCharCode(b)}
                            style={{ position: "relative", top: "50px", width: "40px", height: "40px" }}
                            disabled={userGuess.includes(String.fromCharCode(b))}
                        >
                            {String.fromCharCode(b)}
                        </button>
                    )
                }
            </div>
            <div>
                {
                    Array.from({ length: 122 - 110 + 1 }, (_, index) => index + 110).map((b) =>
                        <button
                            onClick={addChar}
                            name={String.fromCharCode(b)}
                            value={String.fromCharCode(b)}
                            style={{ position: "relative", top: "50px", width: "40px", height: "40px" }}
                            disabled={userGuess.includes(String.fromCharCode(b))}
                        >
                            {String.fromCharCode(b)}
                        </button>
                    )
                }
            </div>
            <div>
                {
                    Array.from({ length: 57 - 48 + 1 }, (_, index) => index + 48).map((b) =>
                        <button
                            onClick={addChar}
                            name={String.fromCharCode(b)}
                            value={String.fromCharCode(b)}
                            style={{ position: "relative", top: "50px", width: "40px", height: "40px" }}
                            disabled={userGuess.includes(String.fromCharCode(b))}
                        >
                            {String.fromCharCode(b)}
                        </button>
                    )
                }
            </div>
            <div>
                {
                    Array.from({ length: 47 - 33 + 1 }, (_, index) => index + 33).map((b) =>
                        <button
                            onClick={addChar}
                            name={String.fromCharCode(b)}
                            value={String.fromCharCode(b)}
                            style={{ position: "relative", top: "50px", width: "40px", height: "40px" }}
                            disabled={userGuess.includes(String.fromCharCode(b))}
                        >
                            {String.fromCharCode(b)}
                        </button>
                    )
                }
            </div>
            <div>
                {
                    Array.from({ length: 126 - 123 + 1 }, (_, index) => index + 123).map((b) =>
                        <button
                            onClick={addChar}
                            name={String.fromCharCode(b)}
                            value={String.fromCharCode(b)}
                            style={{ position: "relative", top: "50px", width: "40px", height: "40px" }}
                            disabled={userGuess.includes(String.fromCharCode(b))}
                        >
                            {String.fromCharCode(b)}
                        </button>
                    )
                }
            </div>
            <div>
                {
                    Array.from({ length: 64 - 58 + 1 }, (_, index) => index + 58).map((b) =>
                        <button
                            onClick={addChar}
                            name={String.fromCharCode(b)}
                            value={String.fromCharCode(b)}
                            style={{ position: "relative", top: "50px", width: "40px", height: "40px" }}
                            disabled={userGuess.includes(String.fromCharCode(b))}
                        >
                            {String.fromCharCode(b)}
                        </button>
                    )
                }
            </div>
            <div>
                {
                    Array.from({ length: 96 - 91 + 1 }, (_, index) => index + 91).map((b) =>
                        <button
                            onClick={addChar}
                            name={String.fromCharCode(b)}
                            value={String.fromCharCode(b)}
                            style={{ position: "relative", top: "50px", width: "40px", height: "40px" }}
                            disabled={userGuess.includes(String.fromCharCode(b))}
                        >
                            {String.fromCharCode(b)}
                        </button>
                    )
                }
            </div>
        </div>

    )
}