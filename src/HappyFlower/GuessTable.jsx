import Flower1 from "./Images/Flower-01.jpg";
import Flower2 from "./Images/Flower-02.jpg";
import Flower3 from "./Images/Flower-03.jpg";
import Flower4 from "./Images/Flower-04.jpg";
import Flower5 from "./Images/Flower-05.jpg";
import Flower6 from "./Images/Flower-06.jpg";
import Flower7 from "./Images/Flower-07.jpg";

export default function GuessTable({ word, userGuess, setUserGuess, userMistakes, setUserMistakes, isWin }) {
    const addChar = (e) => {
        if (!word.includes(e.target.value) && !word.includes(e.target.value.toUpperCase())) {
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
                            style={{ position: "relative", top: "50px", width: "30px", height: "30px" }}
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b)) || isWin !== ""}
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
                            style={{ position: "relative", top: "50px", width: "30px", height: "30px" }}
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b)) || isWin !== ""}
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
                            style={{ position: "relative", top: "50px", width: "30px", height: "30px" }}
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b)) || isWin !== ""}
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
                            style={{ position: "relative", top: "50px", width: "30px", height: "30px" }}
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b)) || isWin !== ""}
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
                            style={{ position: "relative", top: "50px", width: "30px", height: "30px" }}
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b)) || isWin !== ""}
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
                            style={{ position: "relative", top: "50px", width: "30px", height: "30px" }}
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b)) || isWin !== ""}
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
                            style={{ position: "relative", top: "50px", width: "30px", height: "30px" }}
                            disabled={userGuess.includes(String.fromCharCode(b)) || userMistakes.includes(String.fromCharCode(b)) || isWin !== ""}
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
            <div>
                <img
                    style={{
                        position: "relative",
                        top: "110px",
                        width: "300px"
                    }}
                    src={
                        isWin === true ?
                            Flower7 :
                            userMistakes.length === 0 ?
                                Flower1 :
                                userMistakes.length === 1 ?
                                    Flower2 :
                                    userMistakes.length === 2 ?
                                        Flower3 :
                                        userMistakes.length === 3 ?
                                            Flower4 :
                                            userMistakes.length === 4 ?
                                                Flower5 :
                                                userMistakes.length === 5 &&
                                                Flower6
                    }
                />
            </div>
        </div>

    )
}