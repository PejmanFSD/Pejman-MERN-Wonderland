import { useState, useEffect } from "react";
import Emoji from "./Emoji";
import ModeExplaination from "../ModeExplaination";
import { emojisArray, selectedEmojisArray } from "./emojisArray";
import E00 from "./images/000.jpg";
import Skull from "./images/Skull.jpg";

export default function TripleEmojiMatch() {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [emojis, setEmojis] = useState(emojisArray);
  const [selectedEmojis, setSelectedEmojis] = useState(selectedEmojisArray);
  const [tripleMatch, setTripleMatch] = useState(false);
  const [isWin, setIsWin] = useState("");
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setIsGameStarted(true);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
    setIsGameStarted(true);
  };
  const handleTripleMatch = () => {
    setSelectedEmojis((currSelectedEmojis) =>
      currSelectedEmojis.map((emoji) =>
        emoji.repetitionNum === 3
          ? { ...emoji, image: E00, isFilled: false, repetitionNum: 0 }
          : emoji,
      ),
    );
    setTripleMatch(false);
  };
  const hanldePlayAgain = () => {
    setEmojis(emojisArray);
    setSelectedEmojis(selectedEmojisArray);
    setTripleMatch(false);
    setIsWin("");
  }
  useEffect(() => {
    setSelectedEmojis((currSelectedEmojis) =>
      currSelectedEmojis.map((emoji) => ({ ...emoji, repetitionNum: 0 })),
    );
    for (const i of selectedEmojis) {
      for (const j of selectedEmojis) {
        if (i.image === j.image && j.image !== E00) {
          setSelectedEmojis((currSelectedEmojis) =>
            currSelectedEmojis.map((emoji) =>
              emoji.id === i.id
                ? { ...emoji, repetitionNum: emoji.repetitionNum + 1 }
                : emoji,
            ),
          );
        }
      }
    }
  }, [emojis]);
  useEffect(() => {
    for (const selectedEmoji of selectedEmojis) {
      if (selectedEmoji.repetitionNum === 3) {
        setTripleMatch(true);
        break;
      }
    }
  }, [selectedEmojis]);
  useEffect(() => {
    let freeSquares = 0;
    for (const selectedEmoji of selectedEmojis) {
      if (selectedEmoji.image === E00 || selectedEmoji.image === Skull) {
        freeSquares ++;
      }
    }
    if (freeSquares === 0) {
        setIsWin(false);
    }
  }, [selectedEmojis]);
  return (
    <div>
      <h2>Triple Emoji Match</h2>
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={runEasyMode}>Easy Mode</button>
          <button onClick={runNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode && !normalMode ? (
        <ModeExplaination message="Easy Mode: There's no timer. You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode && (
          <ModeExplaination message="Normal Mode: Find all the matches in *** seconds. You will get one star if you win." />
        )
      )}
      {isWin === false &&
      <div>
        <h2>You loose!</h2>
        <div>Try Again?</div>
        <button onClick={hanldePlayAgain}>Ok</button>
      </div>
      }
      {selectedEmojis.map((s) => (
        <div style={{ display: "inline" }}>{s.repetitionNum} - </div>
      ))}
      {isGameStarted && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, auto)",
            justifyContent: "center",
          }}
        >
          {selectedEmojis.map((selectedEmoji) => (
            <Emoji
              key={selectedEmojis.indexOf(selectedEmoji)}
              imgId={selectedEmojis.indexOf(selectedEmoji)}
              imgSrc={selectedEmoji.image}
              emojis={emojis}
              setEmojis={setEmojis}
              selectedEmojis={selectedEmojis}
              setSelectedEmojis={setSelectedEmojis}
              tripleMatch={tripleMatch}
              isWin={isWin}
            />
          ))}
        </div>
      )}
      {tripleMatch === true && (
        <div>
          <div>Well Done! You found a tripleMatch</div>
          <div>
            {selectedEmojis.map(
              (s) =>
                s.repetitionNum === 3 && (
                  <img
                    src={s.image}
                    style={{
                      position: "relative",
                      top: "7px",
                      width: "60px",
                      margin: "3px",
                      border: "1px solid red",
                    }}
                  />
                ),
            )}
          </div>
          <button
            onClick={handleTripleMatch}
            style={{ position: "relative", top: "7px" }}
          >
            Ok
          </button>
        </div>
      )}
      {isGameStarted && (
        <div
          style={{
            position: "relative",
            top: "15px",
            display: "grid",
            gridTemplateColumns: "repeat(20, auto)",
            justifyContent: "center",
          }}
        >
          {emojis.map((emoji) => (
            <Emoji
              key={emoji.id}
              imgId={emoji.id}
              imgSrc={emoji.image}
              emojis={emojis}
              setEmojis={setEmojis}
              selectedEmojis={selectedEmojis}
              setSelectedEmojis={setSelectedEmojis}
              tripleMatch={tripleMatch}
              isWin={isWin}
            />
          ))}
        </div>
      )}
    </div>
  );
}
