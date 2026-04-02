import {useState, useEffect} from "react";
import UserBoard from "./UserBoard";
import PejmanBoard from "./PejmanBoard";

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
const allNumsArray = Array.from({ length: 99 }, (_, i) => i + 1);

export default function Bingo() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [userColor, setUserColor] = useState("");
    const [allNums, setAllNums] = useState(allNumsArray);
    const [selectedNums, setSelectedNums] = useState([]);
    const [numCounter, setNumCounter] = useState(1);
    const [userTens1, setUserTens1] = useState([]);
    const [userTens2, setUserTens2] = useState([]);
    const [userTens3, setUserTens3] = useState([]);
    const [pejmanTens1, setPejmanTens1] = useState([]);
    const [pejmanTens2, setPejmanTens2] = useState([]);
    const [pejmanTens3, setPejmanTens3] = useState([]);
    const [user1Nums, setUser1Nums] = useState([]);
    const [user2Nums, setUser2Nums] = useState([]);
    const [user3Nums, setUser3Nums] = useState([]);
    const [pejman1Nums, setPejman1Nums] = useState([]);
    const [pejman2Nums, setPejman2Nums] = useState([]);
    const [pejman3Nums, setPejman3Nums] = useState([]);
    const [youMissedMessage, setYouMissedMessage] = useState(false);

  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor("red");
    } else if (e.target.value === "Green") {
      setUserColor("green");
    } else if (e.target.value === "Blue") {
      setUserColor("blue");
    }
    updateTensArray(setUserTens1);
    updateTensArray(setUserTens2);
    updateTensArray(setUserTens3);
    updateTensArray(setPejmanTens1);
    updateTensArray(setPejmanTens2);
    updateTensArray(setPejmanTens3);
  };
  const updateTensArray = (arr) => {
    const shuffled = [...initialTens].sort(() => Math.random() - 0.5);
    arr(shuffled.slice(0, 5).sort());
  }
    const updateNumsArray = (arr, updateFunc, player) => {
        const shuffledArr = [...arr].sort(() => Math.random() - 0.5).slice(0, 5).sort();
        updateFunc(curr => [...curr,
            {num: shuffledArr[0], isSelected: false, isClicked: false, owner: player},
            {num: shuffledArr[1], isSelected: false, isClicked: false, owner: player},
            {num: shuffledArr[2], isSelected: false, isClicked: false, owner: player},
            {num: shuffledArr[3], isSelected: false, isClicked: false, owner: player},
            {num: shuffledArr[4], isSelected: false, isClicked: false, owner: player}
        ]);
    }
    const handleStart = () => {
        setIsGameStarted(true);
        for (const ut1 of userTens1) {
            if (ut1 === 0) {updateNumsArray(array1To9, setUser1Nums, "User")}
            if (ut1 === 1) {updateNumsArray(array10To19, setUser1Nums, "User")}
            if (ut1 === 2) {updateNumsArray(array20To29, setUser1Nums, "User")}
            if (ut1 === 3) {updateNumsArray(array30To39, setUser1Nums, "User")}
            if (ut1 === 4) {updateNumsArray(array40To49, setUser1Nums, "User")}
            if (ut1 === 5) {updateNumsArray(array50To59, setUser1Nums, "User")}
            if (ut1 === 6) {updateNumsArray(array60To69, setUser1Nums, "User")}
            if (ut1 === 7) {updateNumsArray(array70To79, setUser1Nums, "User")}
            if (ut1 === 8) {updateNumsArray(array80To89, setUser1Nums, "User")}
            if (ut1 === 9) {updateNumsArray(array90To99, setUser1Nums, "User")}
        }
        for (const ut2 of userTens2) {
            if (ut2 === 0) {updateNumsArray(array1To9, setUser2Nums, "User")}
            if (ut2 === 1) {updateNumsArray(array10To19, setUser2Nums, "User")}
            if (ut2 === 2) {updateNumsArray(array20To29, setUser2Nums, "User")}
            if (ut2 === 3) {updateNumsArray(array30To39, setUser2Nums, "User")}
            if (ut2 === 4) {updateNumsArray(array40To49, setUser2Nums, "User")}
            if (ut2 === 5) {updateNumsArray(array50To59, setUser2Nums, "User")}
            if (ut2 === 6) {updateNumsArray(array60To69, setUser2Nums, "User")}
            if (ut2 === 7) {updateNumsArray(array70To79, setUser2Nums, "User")}
            if (ut2 === 8) {updateNumsArray(array80To89, setUser2Nums, "User")}
            if (ut2 === 9) {updateNumsArray(array90To99, setUser2Nums, "User")}
        }
        for (const ut3 of userTens3) {
            if (ut3 === 0) {updateNumsArray(array1To9, setUser3Nums, "User")}
            if (ut3 === 1) {updateNumsArray(array10To19, setUser3Nums, "User")}
            if (ut3 === 2) {updateNumsArray(array20To29, setUser3Nums, "User")}
            if (ut3 === 3) {updateNumsArray(array30To39, setUser3Nums, "User")}
            if (ut3 === 4) {updateNumsArray(array40To49, setUser3Nums, "User")}
            if (ut3 === 5) {updateNumsArray(array50To59, setUser3Nums, "User")}
            if (ut3 === 6) {updateNumsArray(array60To69, setUser3Nums, "User")}
            if (ut3 === 7) {updateNumsArray(array70To79, setUser3Nums, "User")}
            if (ut3 === 8) {updateNumsArray(array80To89, setUser3Nums, "User")}
            if (ut3 === 9) {updateNumsArray(array90To99, setUser3Nums, "User")}
        }

        for (const pt1 of pejmanTens1) {
            if (pt1 === 0) {updateNumsArray(array1To9, setPejman1Nums, "Pejman")}
            if (pt1 === 1) {updateNumsArray(array10To19, setPejman1Nums, "Pejman")}
            if (pt1 === 2) {updateNumsArray(array20To29, setPejman1Nums, "Pejman")}
            if (pt1 === 3) {updateNumsArray(array30To39, setPejman1Nums, "Pejman")}
            if (pt1 === 4) {updateNumsArray(array40To49, setPejman1Nums, "Pejman")}
            if (pt1 === 5) {updateNumsArray(array50To59, setPejman1Nums, "Pejman")}
            if (pt1 === 6) {updateNumsArray(array60To69, setPejman1Nums, "Pejman")}
            if (pt1 === 7) {updateNumsArray(array70To79, setPejman1Nums, "Pejman")}
            if (pt1 === 8) {updateNumsArray(array80To89, setPejman1Nums, "Pejman")}
            if (pt1 === 9) {updateNumsArray(array90To99, setPejman1Nums, "Pejman")}
        }
        for (const pt2 of pejmanTens2) {
            if (pt2 === 0) {updateNumsArray(array1To9, setPejman2Nums, "Pejman")}
            if (pt2 === 1) {updateNumsArray(array10To19, setPejman2Nums, "Pejman")}
            if (pt2 === 2) {updateNumsArray(array20To29, setPejman2Nums, "Pejman")}
            if (pt2 === 3) {updateNumsArray(array30To39, setPejman2Nums, "Pejman")}
            if (pt2 === 4) {updateNumsArray(array40To49, setPejman2Nums, "Pejman")}
            if (pt2 === 5) {updateNumsArray(array50To59, setPejman2Nums, "Pejman")}
            if (pt2 === 6) {updateNumsArray(array60To69, setPejman2Nums, "Pejman")}
            if (pt2 === 7) {updateNumsArray(array70To79, setPejman2Nums, "Pejman")}
            if (pt2 === 8) {updateNumsArray(array80To89, setPejman2Nums, "Pejman")}
            if (pt2 === 9) {updateNumsArray(array90To99, setPejman2Nums, "Pejman")}
        }
        for (const pt3 of pejmanTens3) {
            if (pt3 === 0) {updateNumsArray(array1To9, setPejman3Nums, "Pejman")}
            if (pt3 === 1) {updateNumsArray(array10To19, setPejman3Nums, "Pejman")}
            if (pt3 === 2) {updateNumsArray(array20To29, setPejman3Nums, "Pejman")}
            if (pt3 === 3) {updateNumsArray(array30To39, setPejman3Nums, "Pejman")}
            if (pt3 === 4) {updateNumsArray(array40To49, setPejman3Nums, "Pejman")}
            if (pt3 === 5) {updateNumsArray(array50To59, setPejman3Nums, "Pejman")}
            if (pt3 === 6) {updateNumsArray(array60To69, setPejman3Nums, "Pejman")}
            if (pt3 === 7) {updateNumsArray(array70To79, setPejman3Nums, "Pejman")}
            if (pt3 === 8) {updateNumsArray(array80To89, setPejman3Nums, "Pejman")}
            if (pt3 === 9) {updateNumsArray(array90To99, setPejman3Nums, "Pejman")}
        }
    };
    const pickRandomNumber = () => {
        setYouMissedMessage(false);
        setUser1Nums((currUser1Nums) => currUser1Nums.map((n) =>
            selectedNums.includes(n.num) ? {...n, isSelected: true} : n
        ));
        setUser2Nums((currUser2Nums) => currUser2Nums.map((n) =>
            selectedNums.includes(n.num) ? {...n, isSelected: true} : n
        ));
        setUser3Nums((currUser3Nums) => currUser3Nums.map((n) =>
            selectedNums.includes(n.num) ? {...n, isSelected: true} : n
        ));
        if (allNums.length === 0) return;
        const randomIndex = Math.floor(Math.random() * allNums.length);
        const selectedNumber = allNums[randomIndex];
        // Remove number from allNums:
        const newAllNums = allNums.filter((_, i) => i !== randomIndex);
        // Add number to selectedNums:
        setAllNums(newAllNums);
        setSelectedNums(prev => [...prev, selectedNumber]);
        setNumCounter(currNumCounter => currNumCounter + 1);
    };
    useEffect(() => {
        setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((n) =>
            selectedNums.includes(n.num) ? {...n, isSelected: true} : n
        ));
        setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((n) =>
            selectedNums.includes(n.num) ? {...n, isSelected: true} : n
        ));
        setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((n) =>
            selectedNums.includes(n.num) ? {...n, isSelected: true} : n
        ));
    }, [allNums, selectedNums]);
    useEffect(() => {
        for (const un1 of user1Nums) {
            if (un1.isSelected && !un1.isClicked && selectedNums.indexOf(un1.num) === selectedNums.length - 2) {
                setYouMissedMessage(true);
            }
        }
        for (const un2 of user2Nums) {
            if (un2.isSelected && !un2.isClicked && selectedNums.indexOf(un2.num) === selectedNums.length - 2) {
                setYouMissedMessage(true);
            }
        }
        for (const un3 of user3Nums) {
            if (un3.isSelected && !un3.isClicked && selectedNums.indexOf(un3.num) === selectedNums.length - 2) {
                setYouMissedMessage(true);
            }
        }
    }, [user1Nums, user2Nums, user3Nums]);
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
            {isGameStarted &&
                <div>
                    <div>{selectedNums[selectedNums.length - 1]}</div>
                    <button onClick={pickRandomNumber}>{`Choose number ${numCounter}`}</button>
                </div>
            }
            {isGameStarted &&
                <div>
                    <div style={{color: "gray"}}>All Nums:</div>
                    {allNums.map(a => <div style={{display: "inline", color: "gray"}}>{a} -</div>)}
                </div>
            }
            {isGameStarted &&
                <div>
                    <div style={{color: "gray"}}>Selected Nums:</div>
                    {selectedNums.map(a => <div style={{display: "inline", color: "gray"}}>{a} -</div>)}
                </div>
            }
            {isGameStarted &&
            <div>
                <div>Pejman's boards:</div>
                <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
                    {isGameStarted && <PejmanBoard nums={pejman1Nums} selectedNums={selectedNums} />}
                    {isGameStarted && <PejmanBoard nums={pejman2Nums} selectedNums={selectedNums} />}
                    {isGameStarted && <PejmanBoard nums={pejman3Nums} selectedNums={selectedNums} />}
                </div>
            <br />
                <div>Your boards:</div>
                <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
                    {isGameStarted &&
                        <UserBoard
                            nums={user1Nums}
                            color={userColor}
                            selectedNums={selectedNums}
                            user1Nums={user1Nums}
                            user2Nums={user2Nums}
                            user3Nums={user3Nums}
                            setUser1Nums={setUser1Nums}
                            setUser2Nums={setUser2Nums}
                            setUser3Nums={setUser3Nums}
                            setYouMissedMessage={setYouMissedMessage}
                        />
                    }
                    {isGameStarted &&
                        <UserBoard
                            nums={user2Nums}
                            color={userColor}
                            selectedNums={selectedNums}
                            user1Nums={user1Nums}
                            user2Nums={user2Nums}
                            user3Nums={user3Nums}
                            setUser1Nums={setUser1Nums}
                            setUser2Nums={setUser2Nums}
                            setUser3Nums={setUser3Nums}
                            setYouMissedMessage={setYouMissedMessage}
                        />
                    }
                    {isGameStarted &&
                        <UserBoard
                            nums={user3Nums}
                            color={userColor}
                            selectedNums={selectedNums}
                            user1Nums={user1Nums}
                            user2Nums={user2Nums}
                            user3Nums={user3Nums}
                            setUser1Nums={setUser1Nums}
                            setUser2Nums={setUser2Nums}
                            setUser3Nums={setUser3Nums}
                            setYouMissedMessage={setYouMissedMessage}
                        />
                    }
                    {youMissedMessage === true && <div>{`You missed ${selectedNums[selectedNums.length - 2]}`}</div>}
                </div>
            </div>
            }
        </div>
    )
}