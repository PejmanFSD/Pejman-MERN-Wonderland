import {useState, useEffect} from "react";
import UserBoard from "./UserBoard";
import PejmanBoard from "./PejmanBoard";
import ConfirmationBox from "../ConfirmationBox";

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

export default function Bingo({setShowGameTitles, setShowBingo, updateTotalPoint, isAGameStarted, setIsAGameStarted}) {
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
    const [missedNumOnBoard1, setMissedNumOnBoard1] = useState(null);
    const [missedNumOnBoard2, setMissedNumOnBoard2] = useState(null);
    const [missedNumOnBoard3, setMissedNumOnBoard3] = useState(null);
    const [finalMessage, setFinalMessage] = useState("");
    const [isTogglingReset, setIsTogglingReset] = useState(false);
    const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor("red");
    } else if (e.target.value === "Green") {
      setUserColor("green");
    } else if (e.target.value === "Blue") {
      setUserColor("blue");
    }
    setIsGameStarted(false);
    setFinalMessage("");
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
            {num: shuffledArr[0], isSelected: false, isClicked: false, owner: player, isWinnerCell: false},
            {num: shuffledArr[1], isSelected: false, isClicked: false, owner: player, isWinnerCell: false},
            {num: shuffledArr[2], isSelected: false, isClicked: false, owner: player, isWinnerCell: false},
            {num: shuffledArr[3], isSelected: false, isClicked: false, owner: player, isWinnerCell: false},
            {num: shuffledArr[4], isSelected: false, isClicked: false, owner: player, isWinnerCell: false}
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
        setMissedNumOnBoard1(null);
        setMissedNumOnBoard2(null);
        setMissedNumOnBoard3(null);
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
    const handlePlayAgain = () => {
        setFinalMessage("");
        setIsGameStarted(false);
        setUserColor("");
        setAllNums(allNumsArray);
        setSelectedNums([]);
        setNumCounter(1);
        setUserTens1([]);
        setUserTens2([]);
        setUserTens3([]);
        setPejmanTens1([]);
        setPejmanTens2([]);
        setPejmanTens3([]);
        setUser1Nums([]);
        setUser2Nums([]);
        setUser3Nums([]);
        setPejman1Nums([]);
        setPejman2Nums([]);
        setPejman3Nums([]);
        setYouMissedMessage(false);
        setMissedNumOnBoard1(null);
        setMissedNumOnBoard2(null);
        setMissedNumOnBoard3(null);
        setIsTogglingReset(false);
        setIsTogglingHomePage(false);
    };
    const toggleReset = () => {
        setIsTogglingReset(true);
    };
    const toggleResetYes = () => {
        handlePlayAgain();
    };
    const toggleResetCancel = () => {
        setIsTogglingReset(false);
    };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    setIsGameStarted(false);
    setShowBingo(false);
    setShowGameTitles(true);
    setIsAGameStarted(false);
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
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
                setMissedNumOnBoard1(un1.num);
            }
        }
        for (const un2 of user2Nums) {
            if (un2.isSelected && !un2.isClicked && selectedNums.indexOf(un2.num) === selectedNums.length - 2) {
                setYouMissedMessage(true);
                setMissedNumOnBoard2(un2.num);
            }
        }
        for (const un3 of user3Nums) {
            if (un3.isSelected && !un3.isClicked && selectedNums.indexOf(un3.num) === selectedNums.length - 2) {
                setYouMissedMessage(true);
                setMissedNumOnBoard3(un3.num);
            }
        }
    }, [user1Nums, user2Nums, user3Nums]);
    useEffect(() => {
        if (user1Nums.length > 0 && user1Nums[0].isClicked && user1Nums[1].isClicked && user1Nums[2].isClicked && user1Nums[3].isClicked && user1Nums[4].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [0, 1, 2, 3, 4].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[5].isClicked && user1Nums[6].isClicked && user1Nums[7].isClicked && user1Nums[8].isClicked && user1Nums[9].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [5, 6, 7, 8, 9].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[10].isClicked && user1Nums[11].isClicked && user1Nums[12].isClicked && user1Nums[13].isClicked && user1Nums[14].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [10, 11, 12, 13, 14].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[15].isClicked && user1Nums[16].isClicked && user1Nums[17].isClicked && user1Nums[18].isClicked && user1Nums[19].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [15, 16, 17, 18, 19].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[20].isClicked && user1Nums[21].isClicked && user1Nums[22].isClicked && user1Nums[23].isClicked && user1Nums[24].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [20, 21, 22, 23, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[0].isClicked && user1Nums[5].isClicked && user1Nums[10].isClicked && user1Nums[15].isClicked && user1Nums[20].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [0, 5, 10, 15, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[1].isClicked && user1Nums[6].isClicked && user1Nums[11].isClicked && user1Nums[16].isClicked && user1Nums[21].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [1, 6, 11, 16, 21].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[2].isClicked && user1Nums[7].isClicked && user1Nums[12].isClicked && user1Nums[17].isClicked && user1Nums[22].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [2, 7, 12, 17, 22].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[3].isClicked && user1Nums[8].isClicked && user1Nums[13].isClicked && user1Nums[18].isClicked && user1Nums[23].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [3, 8, 13, 18, 23].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[4].isClicked && user1Nums[9].isClicked && user1Nums[14].isClicked && user1Nums[19].isClicked && user1Nums[24].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [4, 9, 14, 19, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[0].isClicked && user1Nums[6].isClicked && user1Nums[12].isClicked && user1Nums[18].isClicked && user1Nums[24].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [0, 6, 12, 18, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user1Nums.length > 0 && user1Nums[4].isClicked && user1Nums[8].isClicked && user1Nums[12].isClicked && user1Nums[16].isClicked && user1Nums[20].isClicked) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((un1, i) => [4, 8, 12, 16, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
    }, [user1Nums]);
    useEffect(() => {
        if (user2Nums.length > 0 && user2Nums[0].isClicked && user2Nums[1].isClicked && user2Nums[2].isClicked && user2Nums[3].isClicked && user2Nums[4].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [0, 1, 2, 3, 4].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[5].isClicked && user2Nums[6].isClicked && user2Nums[7].isClicked && user2Nums[8].isClicked && user2Nums[9].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [5, 6, 7, 8, 9].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[10].isClicked && user2Nums[11].isClicked && user2Nums[12].isClicked && user2Nums[13].isClicked && user2Nums[14].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [10, 11, 12, 13, 14].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[15].isClicked && user2Nums[16].isClicked && user2Nums[17].isClicked && user2Nums[18].isClicked && user2Nums[19].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [15, 16, 17, 18, 19].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[20].isClicked && user2Nums[21].isClicked && user2Nums[22].isClicked && user2Nums[23].isClicked && user2Nums[24].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [20, 21, 22, 23, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[0].isClicked && user2Nums[5].isClicked && user2Nums[10].isClicked && user2Nums[15].isClicked && user2Nums[20].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [0, 5, 10, 15, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[1].isClicked && user2Nums[6].isClicked && user2Nums[11].isClicked && user2Nums[16].isClicked && user2Nums[21].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [1, 6, 11, 16, 21].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[2].isClicked && user2Nums[7].isClicked && user2Nums[12].isClicked && user2Nums[17].isClicked && user2Nums[22].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [2, 7, 12, 17, 22].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[3].isClicked && user2Nums[8].isClicked && user2Nums[13].isClicked && user2Nums[18].isClicked && user2Nums[23].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [3, 8, 13, 18, 23].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[4].isClicked && user2Nums[9].isClicked && user2Nums[14].isClicked && user2Nums[19].isClicked && user2Nums[24].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [4, 9, 14, 19, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[0].isClicked && user2Nums[6].isClicked && user2Nums[12].isClicked && user2Nums[18].isClicked && user2Nums[24].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [0, 6, 12, 18, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user2Nums.length > 0 && user2Nums[4].isClicked && user2Nums[8].isClicked && user2Nums[12].isClicked && user2Nums[16].isClicked && user2Nums[20].isClicked) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((un1, i) => [4, 8, 12, 16, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
    }, [user2Nums]);
    useEffect(() => {
        if (user3Nums.length > 0 && user3Nums[0].isClicked && user3Nums[1].isClicked && user3Nums[2].isClicked && user3Nums[3].isClicked && user3Nums[4].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [0, 1, 2, 3, 4].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[5].isClicked && user3Nums[6].isClicked && user3Nums[7].isClicked && user3Nums[8].isClicked && user3Nums[9].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [5, 6, 7, 8, 9].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[10].isClicked && user3Nums[11].isClicked && user3Nums[12].isClicked && user3Nums[13].isClicked && user3Nums[14].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [10, 11, 12, 13, 14].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[15].isClicked && user3Nums[16].isClicked && user3Nums[17].isClicked && user3Nums[18].isClicked && user3Nums[19].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [15, 16, 17, 18, 19].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[20].isClicked && user3Nums[21].isClicked && user3Nums[22].isClicked && user3Nums[23].isClicked && user3Nums[24].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [20, 21, 22, 23, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[0].isClicked && user3Nums[5].isClicked && user3Nums[10].isClicked && user3Nums[15].isClicked && user3Nums[20].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [0, 5, 10, 15, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[1].isClicked && user3Nums[6].isClicked && user3Nums[11].isClicked && user3Nums[16].isClicked && user3Nums[21].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [1, 6, 11, 16, 21].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[2].isClicked && user3Nums[7].isClicked && user3Nums[12].isClicked && user3Nums[17].isClicked && user3Nums[22].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [2, 7, 12, 17, 22].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[3].isClicked && user3Nums[8].isClicked && user3Nums[13].isClicked && user3Nums[18].isClicked && user3Nums[23].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [3, 8, 13, 18, 23].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[4].isClicked && user3Nums[9].isClicked && user3Nums[14].isClicked && user3Nums[19].isClicked && user3Nums[24].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [4, 9, 14, 19, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[0].isClicked && user3Nums[6].isClicked && user3Nums[12].isClicked && user3Nums[18].isClicked && user3Nums[24].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [0, 6, 12, 18, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
        if (user3Nums.length > 0 && user3Nums[4].isClicked && user3Nums[8].isClicked && user3Nums[12].isClicked && user3Nums[16].isClicked && user3Nums[20].isClicked) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((un1, i) => [4, 8, 12, 16, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("You Win!");
        }
    }, [user3Nums]);
    useEffect(() => {
        if (pejman1Nums.length > 0 && pejman1Nums[0].isSelected && pejman1Nums[1].isSelected && pejman1Nums[2].isSelected && pejman1Nums[3].isSelected && pejman1Nums[4].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [0, 1, 2, 3, 4].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[5].isSelected && pejman1Nums[6].isSelected && pejman1Nums[7].isSelected && pejman1Nums[8].isSelected && pejman1Nums[9].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [5, 6, 7, 8, 9].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[10].isSelected && pejman1Nums[11].isSelected && pejman1Nums[12].isSelected && pejman1Nums[13].isSelected && pejman1Nums[14].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [10, 11, 12, 13, 14].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[15].isSelected && pejman1Nums[16].isSelected && pejman1Nums[17].isSelected && pejman1Nums[18].isSelected && pejman1Nums[19].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [15, 16, 17, 18, 19].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[20].isSelected && pejman1Nums[21].isSelected && pejman1Nums[22].isSelected && pejman1Nums[23].isSelected && pejman1Nums[24].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [20, 21, 22, 23, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[0].isSelected && pejman1Nums[5].isSelected && pejman1Nums[10].isSelected && pejman1Nums[15].isSelected && pejman1Nums[20].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [0, 5, 10, 15, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[1].isSelected && pejman1Nums[6].isSelected && pejman1Nums[11].isSelected && pejman1Nums[16].isSelected && pejman1Nums[21].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [1, 6, 11, 16, 21].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[2].isSelected && pejman1Nums[7].isSelected && pejman1Nums[12].isSelected && pejman1Nums[17].isSelected && pejman1Nums[22].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [2, 7, 12, 17, 22].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[3].isSelected && pejman1Nums[8].isSelected && pejman1Nums[13].isSelected && pejman1Nums[18].isSelected && pejman1Nums[23].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [3, 8, 13, 18, 23].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[4].isSelected && pejman1Nums[9].isSelected && pejman1Nums[14].isSelected && pejman1Nums[19].isSelected && pejman1Nums[24].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [4, 9, 14, 19, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[0].isSelected && pejman1Nums[6].isSelected && pejman1Nums[12].isSelected && pejman1Nums[18].isSelected && pejman1Nums[24].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [0, 6, 12, 18, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman1Nums.length > 0 && pejman1Nums[4].isSelected && pejman1Nums[8].isSelected && pejman1Nums[12].isSelected && pejman1Nums[16].isSelected && pejman1Nums[20].isSelected) {
            setPejman1Nums((currPejman1Nums) => currPejman1Nums.map((un1, i) => [4, 8, 12, 16, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
    }, [pejman1Nums]);
    useEffect(() => {
        if (pejman2Nums.length > 0 && pejman2Nums[0].isSelected && pejman2Nums[1].isSelected && pejman2Nums[2].isSelected && pejman2Nums[3].isSelected && pejman2Nums[4].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [0, 1, 2, 3, 4].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[5].isSelected && pejman2Nums[6].isSelected && pejman2Nums[7].isSelected && pejman2Nums[8].isSelected && pejman2Nums[9].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [5, 6, 7, 8, 9].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[10].isSelected && pejman2Nums[11].isSelected && pejman2Nums[12].isSelected && pejman2Nums[13].isSelected && pejman2Nums[14].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [10, 11, 12, 13, 14].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[15].isSelected && pejman2Nums[16].isSelected && pejman2Nums[17].isSelected && pejman2Nums[18].isSelected && pejman2Nums[19].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [15, 16, 17, 18, 19].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[20].isSelected && pejman2Nums[21].isSelected && pejman2Nums[22].isSelected && pejman2Nums[23].isSelected && pejman2Nums[24].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [20, 21, 22, 23, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[0].isSelected && pejman2Nums[5].isSelected && pejman2Nums[10].isSelected && pejman2Nums[15].isSelected && pejman2Nums[20].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [0, 5, 10, 15, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[1].isSelected && pejman2Nums[6].isSelected && pejman2Nums[11].isSelected && pejman2Nums[16].isSelected && pejman2Nums[21].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [1, 6, 11, 16, 21].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[2].isSelected && pejman2Nums[7].isSelected && pejman2Nums[12].isSelected && pejman2Nums[17].isSelected && pejman2Nums[22].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [2, 7, 12, 17, 22].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[3].isSelected && pejman2Nums[8].isSelected && pejman2Nums[13].isSelected && pejman2Nums[18].isSelected && pejman2Nums[23].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [3, 8, 13, 18, 23].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[4].isSelected && pejman2Nums[9].isSelected && pejman2Nums[14].isSelected && pejman2Nums[19].isSelected && pejman2Nums[24].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [4, 9, 14, 19, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[0].isSelected && pejman2Nums[6].isSelected && pejman2Nums[12].isSelected && pejman2Nums[18].isSelected && pejman2Nums[24].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [0, 6, 12, 18, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman2Nums.length > 0 && pejman2Nums[4].isSelected && pejman2Nums[8].isSelected && pejman2Nums[12].isSelected && pejman2Nums[16].isSelected && pejman2Nums[20].isSelected) {
            setPejman2Nums((currPejman2Nums) => currPejman2Nums.map((un1, i) => [4, 8, 12, 16, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
    }, [pejman2Nums]);
    useEffect(() => {
        if (pejman3Nums.length > 0 && pejman3Nums[0].isSelected && pejman3Nums[1].isSelected && pejman3Nums[2].isSelected && pejman3Nums[3].isSelected && pejman3Nums[4].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [0, 1, 2, 3, 4].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[5].isSelected && pejman3Nums[6].isSelected && pejman3Nums[7].isSelected && pejman3Nums[8].isSelected && pejman3Nums[9].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [5, 6, 7, 8, 9].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[10].isSelected && pejman3Nums[11].isSelected && pejman3Nums[12].isSelected && pejman3Nums[13].isSelected && pejman3Nums[14].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [10, 11, 12, 13, 14].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[15].isSelected && pejman3Nums[16].isSelected && pejman3Nums[17].isSelected && pejman3Nums[18].isSelected && pejman3Nums[19].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [15, 16, 17, 18, 19].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[20].isSelected && pejman3Nums[21].isSelected && pejman3Nums[22].isSelected && pejman3Nums[23].isSelected && pejman3Nums[24].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [20, 21, 22, 23, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[0].isSelected && pejman3Nums[5].isSelected && pejman3Nums[10].isSelected && pejman3Nums[15].isSelected && pejman3Nums[20].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [0, 5, 10, 15, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[1].isSelected && pejman3Nums[6].isSelected && pejman3Nums[11].isSelected && pejman3Nums[16].isSelected && pejman3Nums[21].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [1, 6, 11, 16, 21].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[2].isSelected && pejman3Nums[7].isSelected && pejman3Nums[12].isSelected && pejman3Nums[17].isSelected && pejman3Nums[22].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [2, 7, 12, 17, 22].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[3].isSelected && pejman3Nums[8].isSelected && pejman3Nums[13].isSelected && pejman3Nums[18].isSelected && pejman3Nums[23].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [3, 8, 13, 18, 23].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[4].isSelected && pejman3Nums[9].isSelected && pejman3Nums[14].isSelected && pejman3Nums[19].isSelected && pejman3Nums[24].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [4, 9, 14, 19, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[0].isSelected && pejman3Nums[6].isSelected && pejman3Nums[12].isSelected && pejman3Nums[18].isSelected && pejman3Nums[24].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [0, 6, 12, 18, 24].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
        if (pejman3Nums.length > 0 && pejman3Nums[4].isSelected && pejman3Nums[8].isSelected && pejman3Nums[12].isSelected && pejman3Nums[16].isSelected && pejman3Nums[20].isSelected) {
            setPejman3Nums((currPejman3Nums) => currPejman3Nums.map((un1, i) => [4, 8, 12, 16, 20].includes(i) ? {...un1, isWinnerCell: true} : un1));
            setFinalMessage("Pejman Wins!");
        }
    }, [pejman3Nums]);
    useEffect(() => {
        if (finalMessage === "You Win!") {
            updateTotalPoint(1);
        }
    }, [finalMessage]);
    return (
        <div>
            <h2>Bingo</h2>
            {isGameStarted &&
            !isTogglingReset &&
            finalMessage === "" &&
            userColor !== "" &&
            !isTogglingHomePage &&
            (
                <div>
                    <button onClick={toggleReset}>Reset the Game</button>
                </div>
            )}
            {isTogglingReset && (
            <div>
                <ConfirmationBox
                question="Are you sure you want to reset the game?"
                toggleYes={toggleResetYes}
                toggleCancel={toggleResetCancel}
                />
            </div>
            )}
            {!isTogglingHomePage &&
            !isTogglingReset && (
                <div>
                <button onClick={() => toggleHomePage()}>
                    Back to the home page
                </button>
                </div>
            )}
            {isTogglingHomePage && (
            <div>
                <ConfirmationBox
                question="Are you sure you want to go back to Home Page?"
                toggleYes={toggleHomePageYes}
                toggleCancel={toggleHomePageCancel}
                />
            </div>
            )}
            {finalMessage !== "" && isGameStarted && !isTogglingHomePage && <h2>{finalMessage}</h2>}
            {finalMessage === "You Win!" && isGameStarted && !isTogglingHomePage &&
                <div>
                    <div>Play again</div><button onClick={handlePlayAgain} style={{position: "relative", top: "5px"}}>Ok</button>
                </div>
            }
            {finalMessage === "Pejman Wins!" && isGameStarted && !isTogglingHomePage &&
                <div>
                    <div>Try again</div><button onClick={handlePlayAgain} style={{position: "relative", top: "5px"}}>Ok</button>
                </div>
            }
            
            {!isGameStarted && userColor === "" && !isTogglingHomePage && (
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
            {!isGameStarted && userColor !== "" && !isTogglingHomePage &&
                <button onClick={handleStart}>Start</button>
            }
            {isGameStarted && !isTogglingReset && !isTogglingHomePage &&
                <div>
                    {selectedNums.length > 0 && 
                    <div
                        style={{
                            position: "relative",
                            top: "10px",
                            backgroundColor: "orange",
                            width: "50px",
                            border: "1px solid black",
                            paddingLeft: "38px",
                            paddingRight: "38px",
                            paddingTop: "2px",
                            paddingBottom: "2px",
                            marginTop: "5px",
                            marginBottom: "5px",
                            margin: "0 auto",
                            opacity: finalMessage === "" ? 1 : 0.3
                        }}
                    >
                        {selectedNums[selectedNums.length - 1]}
                    </div>
                    }
                    {finalMessage === "" && <button onClick={pickRandomNumber} style={{position: "relative", top: "10px"}}>{`Choose number ${numCounter}`}</button>}
                </div>
            }
            {isGameStarted && !isTogglingReset && !isTogglingHomePage && (
                <div
                style={{
                    position: "relative",
                    top: "10px",
                    display: "grid",
                    gridTemplateColumns: "repeat(15, auto)",
                    justifyContent: "center",
                }}
                >
                    {selectedNums.map((n) =>
                        <div
                            style={{
                                fontSize: finalMessage === "" ? "15px" : "10px",
                                backgroundColor: "orange",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                                margin: "3px",
                                border: "1px solid black",
                                opacity: finalMessage === "" ? 1 : 0.3
                            }}
                        >
                            {n}
                        </div>
                    )}
                </div>
            )}
            {isGameStarted && !isTogglingReset && !isTogglingHomePage &&
            <div style={{position: "relative", top: "5px"}}>
                <div style={{position: "relative", top: "5px"}}>Pejman's boards:</div>
                <div style={{display: "flex", justifyContent: "center", gap: "20px", position: "relative", top: "5px"}}>
                    {isGameStarted && <PejmanBoard nums={pejman1Nums} selectedNums={selectedNums} finalMessage={finalMessage} />}
                    {isGameStarted && <PejmanBoard nums={pejman2Nums} selectedNums={selectedNums} finalMessage={finalMessage} />}
                    {isGameStarted && <PejmanBoard nums={pejman3Nums} selectedNums={selectedNums} finalMessage={finalMessage} />}
                </div>
            </div>}
            {youMissedMessage === true && missedNumOnBoard1 && finalMessage === "" && !isTogglingReset && !isTogglingHomePage &&
            <div style={{color: "red", position: "relative", top: "15px"}}>{`You missed ${selectedNums[selectedNums.length - 2]} on your first board!`} &#128533;</div>}
            {youMissedMessage === true && missedNumOnBoard2 && finalMessage === "" && !isTogglingReset && !isTogglingHomePage &&
            <div style={{color: "red",position: "relative", top: "15px"}}>{`You missed ${selectedNums[selectedNums.length - 2]} on your second board!`} &#128533;</div>}
            {youMissedMessage === true && missedNumOnBoard3 && finalMessage === "" && !isTogglingReset && !isTogglingHomePage &&
            <div style={{color: "red",position: "relative", top: "15px"}}>{`You missed ${selectedNums[selectedNums.length - 2]} on your third board!`} &#128533;</div>}
            {isGameStarted && !isTogglingReset && !isTogglingHomePage &&
            <div style={{position: "relative", top: "15px"}}>
                <div style={{position: "relative", top: "5px"}}>Your boards:</div>
                <div style={{display: "flex", justifyContent: "center", gap: "20px", position: "relative", top: "5px"}}>
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
                            finalMessage={finalMessage}
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
                            finalMessage={finalMessage}
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
                            finalMessage={finalMessage}
                        />
                    }
                </div>
            </div>
            }
        </div>
    )
}