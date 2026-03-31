import {useState} from "react";
import Board from "./Board";

const initialTens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const array1To9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const array10To19 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const array20To29 = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
const array30To39 = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
const array40To49 = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
const array50To59 = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
const array60To69 = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69];
const array70To79 = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79];
const array80To89 = [80, 81, 82, 83, 84, 85, 86, 87, 88, 89];
const array90To99 = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

export default function Bingo() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [userColor, setUserColor] = useState("");
    const [userTens1, setUserTens1] = useState([]);
    const [userTens2, setUserTens2] = useState([]);
    const [userTens3, setUserTens3] = useState([]);
    const [pejmanTens1, setPejmanTens1] = useState([]);
    const [pejmanTens2, setPejmanTens2] = useState([]);
    const [pejmanTens3, setPejmanTens3] = useState([]);
    const [user1Nums, setUser1Nums] = useState([]);

  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor({ red: 240, green: 20, blue: 20 });
    } else if (e.target.value === "Green") {
      setUserColor({ red: 0, green: 200, blue: 0 });
    } else if (e.target.value === "Blue") {
      setUserColor({ red: 20, green: 20, blue: 240 });
    }
    handleUserTens1();
    handleUserTens2();
    handleUserTens3();
    handlePejmanTens1();
    handlePejmanTens2();
    handlePejmanTens3();
  };

  const handleUserTens1 = () => {
        const shuffled = [...initialTens].sort(() => Math.random() - 0.5);
        setUserTens1(shuffled.slice(0, 5).sort());
    }
    const handleUserTens2 = () => {
        const shuffled = [...initialTens].sort(() => Math.random() - 0.5);
        setUserTens2(shuffled.slice(0, 5).sort());
    }
    const handleUserTens3 = () => {
        const shuffled = [...initialTens].sort(() => Math.random() - 0.5);
        setUserTens3(shuffled.slice(0, 5).sort());
    }
    const handlePejmanTens1 = () => {
        const shuffled = [...initialTens].sort(() => Math.random() - 0.5);
        setPejmanTens1(shuffled.slice(0, 5).sort());
    }
    const handlePejmanTens2 = () => {
        const shuffled = [...initialTens].sort(() => Math.random() - 0.5);
        setPejmanTens2(shuffled.slice(0, 5).sort());
    }
    const handlePejmanTens3 = () => {
        const shuffled = [...initialTens].sort(() => Math.random() - 0.5);
        setPejmanTens3(shuffled.slice(0, 5).sort());
    }

    const handleStart = () => {
        setIsGameStarted(true);
        for (const ut1 of userTens1) {
            if (ut1 === 0) {
                const shuffled1To9 = [...array1To9].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled1To9[0], shuffled1To9[1], shuffled1To9[2], shuffled1To9[3], shuffled1To9[4]]);
            }
            if (ut1 === 1) {
                const shuffled10To19 = [...array10To19].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled10To19[0], shuffled10To19[1], shuffled10To19[2], shuffled10To19[3], shuffled10To19[4]]);
            }
            if (ut1 === 2) {
                const shuffled20To29 = [...array20To29].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled20To29[0], shuffled20To29[1], shuffled20To29[2], shuffled20To29[3], shuffled20To29[4]]);
            }
            if (ut1 === 3) {
                const shuffled30To39 = [...array30To39].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled30To39[0], shuffled30To39[1], shuffled30To39[2], shuffled30To39[3], shuffled30To39[4]]);
            }
            if (ut1 === 4) {
                const shuffled40To49 = [...array40To49].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled40To49[0], shuffled40To49[1], shuffled40To49[2], shuffled40To49[3], shuffled40To49[4]]);
            }
            if (ut1 === 5) {
                const shuffled50To59 = [...array50To59].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled50To59[0], shuffled50To59[1], shuffled50To59[2], shuffled50To59[3], shuffled50To59[4]]);
            }
            if (ut1 === 6) {
                const shuffled60To69 = [...array60To69].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled60To69[0], shuffled60To69[1], shuffled60To69[2], shuffled60To69[3], shuffled60To69[4]]);
            }
            if (ut1 === 7) {
                const shuffled70To79 = [...array70To79].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled70To79[0], shuffled70To79[1], shuffled70To79[2], shuffled70To79[3], shuffled70To79[4]]);
            }
            if (ut1 === 8) {
                const shuffled80To89 = [...array80To89].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled80To89[0], shuffled80To89[1], shuffled80To89[2], shuffled80To89[3], shuffled80To89[4]]);
            }
            if (ut1 === 9) {
                const shuffled90To99 = [...array90To99].sort(() => Math.random() - 0.5).slice(0, 5).sort();
                setUser1Nums(currUser1Nums => [...currUser1Nums, shuffled90To99[0], shuffled90To99[1], shuffled90To99[2], shuffled90To99[3], shuffled90To99[4]]);
            }
        }
    };
    
    return (
        <div>
        {!isGameStarted && userColor === "" && (
            <div>
              <label htmlFor="userColor">Select a Color</label>
              <br></br>
              <select
                onChange={handleUserColor}
                name="userColor"
                id="userColor"
              >
                <option value={userColor} disabled selected>
                  🔽🔽🔽
                </option>
                {["Red", "Green", "Blue"].map((c) => (
                  <option>{c}</option>
                ))}
              </select>
            </div>
        )}
            {!isGameStarted && userColor !== "" &&
                <button onClick={handleStart}>Start</button>
            }
            {isGameStarted && userTens1.map(n => <div style={{display: "inline", color: "red"}}>{n} -</div>)}
            {isGameStarted && user1Nums.map(n => <div style={{display: "inline"}}>{n} -</div>)}
            {isGameStarted && <Board nums={user1Nums} />}
        </div>
    )
}