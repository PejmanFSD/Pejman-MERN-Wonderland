import Flower1 from "./Images/Flower-01.jpg";
import Flower2 from "./Images/Flower-02.jpg";
import Flower3 from "./Images/Flower-03.jpg";
import Flower4 from "./Images/Flower-04.jpg";
import Flower5 from "./Images/Flower-05.jpg";
import Flower6 from "./Images/Flower-06.jpg";
import Flower7 from "./Images/Flower-07.jpg";
import Clock from "./Images/Clock.jpg";

export default function GuessTable({
  word,
  userGuess,
  setUserGuess,
  userMistakes,
  setUserMistakes,
  isWin,
  seconds,
  normalMode,
  isTogglingReset,
  isTogglingHomePage,
  isTogglingLevel,
  title,
  handleReset,
}) {
  const addChar = (e) => {
    if (
      !word.includes(e.target.value) &&
      !word.includes(e.target.value.toUpperCase())
    ) {
      setUserMistakes((currUserMistakes) => [
        ...currUserMistakes,
        e.target.value,
      ]);
    } else {
      setUserGuess((currUserGuess) => [...currUserGuess, e.target.value]);
    }
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-5 offset-md-2 align-self-center">
            <div>
              {new Array(word.length).fill(null).map((letter, idx) =>
                word[idx] !== " " ? (
                  <div
                    className="product-happyFlower-image py-2"
                    style={{
                      backgroundColor:  word[idx] !== " " && "var(--background)",
                      borderRadius: "10px",
                      display: "inline",
                      border: word[idx] !== " " && "2px solid black",
                      position: "relative",
                      top: "-15px",
                    }}
                    key={idx}
                  >
                    {(userGuess.includes(word[idx]) ||
                      userGuess.includes(word[idx].toLowerCase())) &&
                      word[idx]}
                  </div>
                ) : (
                  <div>
                    <div
                      className="product-happyFlower-image py-2"
                      style={{
                        backgroundColor:  word[idx] !== " " && "var(--background)",
                        borderRadius: "10px",
                        display: "inline",
                        border: word[idx] !== " " && "2px solid black",
                        position: "relative",
                        top: "-15px",
                      }}
                      key={idx}
                    >
                      {(userGuess.includes(word[idx]) ||
                        userGuess.includes(word[idx].toLowerCase())) &&
                        word[idx]}
                    </div>
                    <br />
                  </div>
                ),
              )}
            </div>
            <div>
              {Array.from(
                { length: 109 - 97 + 1 },
                (_, index) => index + 97,
              ).map((b, i) => (
                <button
                  onClick={addChar}
                  name={String.fromCharCode(b)}
                  value={String.fromCharCode(b)}
                  style={{
                    borderRadius: isWin === "" ? "6px" : "4px",
                    textAlign: "center",
                    fontSize: isWin === "" ? "15px" : "12px",
                    width: isWin === "" ? "30px" : "25px",
                    height: isWin === "" ? "30px" : "25px",
                    margin: "3px",
                  }}
                  disabled={
                    userGuess.includes(String.fromCharCode(b)) ||
                    userMistakes.includes(String.fromCharCode(b)) ||
                    isWin !== ""
                  }
                  key={i}
                >
                  {String.fromCharCode(b)}
                </button>
              ))}
            </div>
            <div>
              {Array.from(
                { length: 122 - 110 + 1 },
                (_, index) => index + 110,
              ).map((b, i) => (
                <button
                  onClick={addChar}
                  name={String.fromCharCode(b)}
                  value={String.fromCharCode(b)}
                  style={{
                    borderRadius: isWin === "" ? "6px" : "4px",
                    textAlign: "center",
                    fontSize: isWin === "" ? "15px" : "12px",
                    width: isWin === "" ? "30px" : "25px",
                    height: isWin === "" ? "30px" : "25px",
                    margin: "3px",
                  }}
                  disabled={
                    userGuess.includes(String.fromCharCode(b)) ||
                    userMistakes.includes(String.fromCharCode(b)) ||
                    isWin !== ""
                  }
                  key={i}
                >
                  {String.fromCharCode(b)}
                </button>
              ))}
            </div>
            <div>
              {Array.from(
                { length: 57 - 48 + 1 },
                (_, index) => index + 48,
              ).map((b, i) => (
                <button
                  onClick={addChar}
                  name={String.fromCharCode(b)}
                  value={String.fromCharCode(b)}
                  style={{
                    borderRadius: isWin === "" ? "6px" : "4px",
                    textAlign: "center",
                    fontSize: isWin === "" ? "15px" : "12px",
                    width: isWin === "" ? "30px" : "25px",
                    height: isWin === "" ? "30px" : "25px",
                    margin: "3px",
                  }}
                  disabled={
                    userGuess.includes(String.fromCharCode(b)) ||
                    userMistakes.includes(String.fromCharCode(b)) ||
                    isWin !== ""
                  }
                  key={i}
                >
                  {String.fromCharCode(b)}
                </button>
              ))}
            </div>
            <div>
              {Array.from(
                { length: 47 - 33 + 1 },
                (_, index) => index + 33,
              ).map((b, i) => (
                <button
                  onClick={addChar}
                  name={String.fromCharCode(b)}
                  value={String.fromCharCode(b)}
                  style={{
                    borderRadius: isWin === "" ? "6px" : "4px",
                    textAlign: "center",
                    fontSize: isWin === "" ? "15px" : "12px",
                    width: isWin === "" ? "30px" : "25px",
                    height: isWin === "" ? "30px" : "25px",
                    margin: "3px",
                  }}
                  disabled={
                    userGuess.includes(String.fromCharCode(b)) ||
                    userMistakes.includes(String.fromCharCode(b)) ||
                    isWin !== ""
                  }
                  key={i}
                >
                  {String.fromCharCode(b)}
                </button>
              ))}
            </div>
            <div>
              {Array.from(
                { length: 126 - 123 + 1 },
                (_, index) => index + 123,
              ).map((b, i) => (
                <button
                  onClick={addChar}
                  name={String.fromCharCode(b)}
                  value={String.fromCharCode(b)}
                  style={{
                    borderRadius: isWin === "" ? "6px" : "4px",
                    textAlign: "center",
                    fontSize: isWin === "" ? "15px" : "12px",
                    width: isWin === "" ? "30px" : "25px",
                    height: isWin === "" ? "30px" : "25px",
                    margin: "3px",
                  }}
                  disabled={
                    userGuess.includes(String.fromCharCode(b)) ||
                    userMistakes.includes(String.fromCharCode(b)) ||
                    isWin !== ""
                  }
                  key={i}
                >
                  {String.fromCharCode(b)}
                </button>
              ))}
            </div>
            <div>
              {Array.from(
                { length: 64 - 58 + 1 },
                (_, index) => index + 58,
              ).map((b, i) => (
                <button
                  onClick={addChar}
                  name={String.fromCharCode(b)}
                  value={String.fromCharCode(b)}
                  style={{
                    borderRadius: isWin === "" ? "6px" : "4px",
                    textAlign: "center",
                    fontSize: isWin === "" ? "15px" : "12px",
                    width: isWin === "" ? "30px" : "25px",
                    height: isWin === "" ? "30px" : "25px",
                    margin: "3px",
                  }}
                  disabled={
                    userGuess.includes(String.fromCharCode(b)) ||
                    userMistakes.includes(String.fromCharCode(b)) ||
                    isWin !== ""
                  }
                  key={i}
                >
                  {String.fromCharCode(b)}
                </button>
              ))}
            </div>
            <div>
              {Array.from(
                { length: 96 - 91 + 1 },
                (_, index) => index + 91,
              ).map((b, i) => (
                <button
                  onClick={addChar}
                  name={String.fromCharCode(b)}
                  value={String.fromCharCode(b)}
                  style={{
                    borderRadius: isWin === "" ? "6px" : "4px",
                    textAlign: "center",
                    fontSize: isWin === "" ? "15px" : "12px",
                    width: isWin === "" ? "30px" : "25px",
                    height: isWin === "" ? "30px" : "25px",
                    margin: "3px",
                  }}
                  disabled={
                    userGuess.includes(String.fromCharCode(b)) ||
                    userMistakes.includes(String.fromCharCode(b)) ||
                    isWin !== ""
                  }
                  key={i}
                >
                  {String.fromCharCode(b)}
                </button>
              ))}
            </div>
            <div>
              {new Array(5).fill(null).map((letter, idx) => (
                <div
                  className="px-4 py-2"
                  style={{
                    borderRadius: "10px",
                    width: "35px",
                    margin: "5px",
                    display: "inline",
                    border: "1px solid black",
                    position: "relative",
                    top: "15px",
                    color: "red",
                  }}
                  key={idx}
                >
                  {userMistakes && userMistakes[idx]}
                </div>
              ))}
            </div>
          </div>
          <div
            className="col-md-4 align-self-center"
            style={{ position: "relative", top: "30px" }}
          >
            <div>
              {normalMode &&
                seconds < 1 &&
                !isTogglingReset &&
                !isTogglingHomePage &&
                !isTogglingLevel && (
                  <h2 className="fasterOne" style={{ fontSize: "25px" }}>
                    Time's Up!
                  </h2>
                )}
              {isWin === false && !isTogglingHomePage && (
                <div>
                  <h2 className="fasterOne" style={{ fontSize: "30px" }}>
                    You Lose!
                  </h2>
                  <h4>{`The name of the ${title} is "${word}"`}</h4>
                  <div>Try again?</div>
                  <button
                    className="btn2"
                    onClick={handleReset}
                    style={{ margin: "5px" }}
                  >
                    Ok
                  </button>
                </div>
              )}
              {isWin === true && !isTogglingHomePage && (
                <div>
                  <h2 className="fasterOne" style={{ fontSize: "30px" }}>
                    You Win!
                  </h2>
                  <div>Play again?</div>
                  <button
                    className="btn2"
                    onClick={handleReset}
                    style={{ margin: "5px" }}
                  >
                    Ok
                  </button>
                </div>
              )}
            </div>
            <img
              style={{
                width: isWin === "" ? "250px" : "200px",
              }}
              src={
                isWin === true
                  ? Flower7
                  : seconds < 1
                    ? Clock
                    : userMistakes.length === 0
                      ? Flower1
                      : userMistakes.length === 1
                        ? Flower2
                        : userMistakes.length === 2
                          ? Flower3
                          : userMistakes.length === 3
                            ? Flower4
                            : userMistakes.length === 4
                              ? Flower5
                              : userMistakes.length === 5 && Flower6
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
