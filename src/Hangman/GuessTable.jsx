export default function GuessTable({ word, userGuess, setUserGuess, userMistakes, setUserMistakes }) {
    const addChar = (e) => {
        if (!word.includes(e.target.value)) {
            setUserMistakes(currUserMistakes => [...currUserMistakes, e.target.value]);
        } else {
            setUserGuess(currUserGuess => [...currUserGuess, e.target.value]);
        }
    }
    return (
        <div>
            <div>
                {new Array(word.length).fill(null).map((letter, idx) =>
                    <div
                        style={{
                            width: "25px",
                            display: "inline",
                            border: word[idx] !== " " && "1px solid black",
                            padding: "15px",
                            position: "relative",
                            top: "25px"
                        }}
                    >
                        {(userGuess.includes(word[idx]) || userGuess.includes(word[idx].toLowerCase())) && word[idx]}
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
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b))}
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
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b))}
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
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b))}
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
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b))}
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
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b))}
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
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b))}
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
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b))}
                        >
                            {String.fromCharCode(b)}
                        </button>
                    )
                }
            </div>
            <div>
                {new Array(5).fill(null).map((letter, idx) =>
                    <div
                        style={{
                            width: "25px",
                            display: "inline",
                            border: "1px solid black",
                            padding: "20px",
                            position: "relative",
                            top: "80px",
                            color: "red"
                        }}
                    >
                        {userMistakes && userMistakes[idx]}
                    </div>)
                }
            </div>
        </div>

    )
}