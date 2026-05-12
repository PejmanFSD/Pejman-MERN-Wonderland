import { useState, useEffect } from "react";
import White from "./images/White.jpg";
import Blue from "./images/Blue.jpg";
import Red from "./images/Red.jpg";
import Green from "./images/Green.jpg";
import Yellow from "./images/Yellow.jpg";
import ReviewSection from "../../Components/ReviewSection";
import Cell from "./Cell";
import { getRandArr } from "../utils.js";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";

export default function Reversi({ updateTotalPoint, currentUser }) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [userColor, setUserColor] = useState(null);
  const [pejmanColor, setPejmanColor] = useState(null);
  const [isIdenticalColor, setIsIdenticalColor] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [cells, setCells] = useState(
    new Array(49)
      .fill(null)
      .map((el, idx) => ({ id: idx, src: White, isSelected: false })),
  );
  const [freeCellsIds, setFreeCellsIds] = useState(
    Array.from({ length: 49 }, (_, i) => i),
  );
  const [selectedCellsNum, setSelectedCellsNum] = useState(0);
  const [leftNeighborsId, setLeftNeighborsId] = useState([]);
  const [rightNeighborsId, setRightNeighborsId] = useState([]);
  const [upNeighborsId, setUpNeighborsId] = useState([]);
  const [downNeighborsId, setDownNeighborsId] = useState([]);
  const [upLeftNeighborsId, setUpLeftNeighborsId] = useState([]);
  const [upRightNeighborsId, setUpRightNeighborsId] = useState([]);
  const [downLeftNeighborsId, setDownLeftNeighborsId] = useState([]);
  const [downRightNeighborsId, setDownRightNeighborsId] = useState([]);
  const [pejmanChoice, setPejmanChoice] = useState(null);
  const [selectionErrorMessage, setSelectionErrorMessage] = useState("");
  const [chooseArrowMessage, setChooseArrowMessage] = useState(false);
  const [allowPejmanMessage, setAllowPejmanMessage] = useState(false);
  const [allowPejmanChooseDirection, setAllowPejmanChooseDirection] =
    useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userPoint, setUserPoint] = useState(0);
  const [pejmanPoint, setPejmanPoint] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

  const navigate = useNavigate();
  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setIsUserTurn(true);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
    setIsUserTurn(false);
  };
  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor(Red);
    } else if (e.target.value === "Green") {
      setUserColor(Green);
    } else if (e.target.value === "Blue") {
      setUserColor(Blue);
    } else if (e.target.value === "Yellow") {
      setUserColor(Yellow);
    }
  };
  const handlePejmanColor = (e) => {
    if (e.target.value === "Red") {
      setPejmanColor(Red);
    } else if (e.target.value === "Green") {
      setPejmanColor(Green);
    } else if (e.target.value === "Blue") {
      setPejmanColor(Blue);
    } else if (e.target.value === "Yellow") {
      setPejmanColor(Yellow);
    }
  };
  const handleStart = () => {
    if (userColor === pejmanColor) {
      setIsIdenticalColor(true);
    } else {
      setIsGameStarted(true);
    }
    if (easyMode) {
      setIsUserTurn(true);
    } else {
      setIsUserTurn(false);
    }
  };
  const handlePlayAgain = () => {
    if (easyMode) {
      setIsUserTurn(true);
    } else {
      setIsUserTurn(false);
    }
    setCells(
      new Array(49)
        .fill(null)
        .map((el, idx) => ({ id: idx, src: White, isSelected: false })),
    );
    setFreeCellsIds(Array.from({ length: 49 }, (_, i) => i));
    setSelectedCellsNum(0);
    setLeftNeighborsId([]);
    setRightNeighborsId([]);
    setUpNeighborsId([]);
    setDownNeighborsId([]);
    setUpLeftNeighborsId([]);
    setUpRightNeighborsId([]);
    setDownLeftNeighborsId([]);
    setDownRightNeighborsId([]);
    setPejmanChoice(null);
    setSelectionErrorMessage("");
    setChooseArrowMessage(false);
    setAllowPejmanMessage(false);
    setAllowPejmanChooseDirection(false);
    setIsGameOver(false);
    setUserPoint(0);
    setPejmanPoint(0);
    setFinalMessage("");
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
    setIsUserTurn(false);
    setEasyMode(false);
    setNormalMode(false);
    setUserColor("");
    setPejmanColor("");
    setIsIdenticalColor(false);
    setIsTogglingReset(false);
    handlePlayAgain();
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    handlePlayAgain();
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  const handleOk = () => {
    setUserColor(null);
    setPejmanColor(null);
    setIsIdenticalColor(false);
  };
  const handleSelectionErrorMessage = () => {
    setSelectionErrorMessage("");
  };
  const resetNeighbors = () => {
    setLeftNeighborsId([]);
    setRightNeighborsId([]);
    setUpNeighborsId([]);
    setDownNeighborsId([]);
    setUpLeftNeighborsId([]);
    setUpRightNeighborsId([]);
    setDownLeftNeighborsId([]);
    setDownRightNeighborsId([]);
  };
  const handleAllowPejman = () => {
    setIsUserTurn(false);
    setAllowPejmanMessage(false);
    setChooseArrowMessage(false);
    handlePejmanChoice();
  };
  const isAtLeastOneNeighborSelected = (cellId) => {
    if (
      [
        8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 29, 30, 31,
        32, 33, 36, 37, 38, 39, 40,
      ].includes(cellId)
    ) {
      if (
        !cells.find((c) => c.id === cellId - 1).isSelected &&
        !cells.find((c) => c.id === cellId + 1).isSelected &&
        !cells.find((c) => c.id === cellId - 7).isSelected &&
        !cells.find((c) => c.id === cellId + 7).isSelected &&
        !cells.find((c) => c.id === cellId - 8).isSelected &&
        !cells.find((c) => c.id === cellId + 8).isSelected &&
        !cells.find((c) => c.id === cellId - 6).isSelected &&
        !cells.find((c) => c.id === cellId + 6).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    } else if ([1, 2, 3, 4, 5].includes(cellId)) {
      if (
        !cells.find((c) => c.id === cellId - 1).isSelected &&
        !cells.find((c) => c.id === cellId + 1).isSelected &&
        !cells.find((c) => c.id === cellId + 7).isSelected &&
        !cells.find((c) => c.id === cellId + 8).isSelected &&
        !cells.find((c) => c.id === cellId + 6).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    } else if ([43, 44, 45, 46, 47].includes(cellId)) {
      if (
        !cells.find((c) => c.id === cellId - 1).isSelected &&
        !cells.find((c) => c.id === cellId + 1).isSelected &&
        !cells.find((c) => c.id === cellId - 7).isSelected &&
        !cells.find((c) => c.id === cellId - 8).isSelected &&
        !cells.find((c) => c.id === cellId - 6).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    } else if ([7, 14, 21, 28, 35].includes(cellId)) {
      if (
        !cells.find((c) => c.id === cellId - 7).isSelected &&
        !cells.find((c) => c.id === cellId + 7).isSelected &&
        !cells.find((c) => c.id === cellId + 1).isSelected &&
        !cells.find((c) => c.id === cellId + 8).isSelected &&
        !cells.find((c) => c.id === cellId - 6).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    } else if ([13, 20, 27, 34, 41].includes(cellId)) {
      if (
        !cells.find((c) => c.id === cellId - 7).isSelected &&
        !cells.find((c) => c.id === cellId + 7).isSelected &&
        !cells.find((c) => c.id === cellId - 1).isSelected &&
        !cells.find((c) => c.id === cellId - 8).isSelected &&
        !cells.find((c) => c.id === cellId + 6).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    } else if (cellId === 0) {
      if (
        !cells.find((c) => c.id === 1).isSelected &&
        !cells.find((c) => c.id === 7).isSelected &&
        !cells.find((c) => c.id === 8).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    } else if (cellId === 6) {
      if (
        !cells.find((c) => c.id === 5).isSelected &&
        !cells.find((c) => c.id === 12).isSelected &&
        !cells.find((c) => c.id === 13).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    } else if (cellId === 42) {
      if (
        !cells.find((c) => c.id === 35).isSelected &&
        !cells.find((c) => c.id === 36).isSelected &&
        !cells.find((c) => c.id === 43).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    } else if (cellId === 48) {
      if (
        !cells.find((c) => c.id === 40).isSelected &&
        !cells.find((c) => c.id === 41).isSelected &&
        !cells.find((c) => c.id === 47).isSelected
      ) {
        return false;
      } else {
        return true;
      }
    }
  };
  const creatingNeighbors = (id, rivalSideColor) => {
    let leftNeighbors = [];
    let rightNeighbors = [];
    let upNeighbors = [];
    let downNeighbors = [];
    let upLeftNeighbors = [];
    let upRightNeighbors = [];
    let downLeftNeighbors = [];
    let downRightNeighbors = [];
    for (const c of cells) {
      // Creating left neighbors:
      if (
        c.id >= Math.floor(id / 7) * 7 &&
        c.id < id &&
        c.src === rivalSideColor
      ) {
        leftNeighbors.push(c.id);
      }
      // Creating right neighbors:
      if (
        c.id <= Math.floor(id / 7) * 7 + 6 &&
        c.id > id &&
        c.src === rivalSideColor
      ) {
        rightNeighbors.push(c.id);
      }
      // Creating up neighbors:
      if (c.id < id && (id - c.id) % 7 === 0 && c.src === rivalSideColor) {
        upNeighbors.push(c.id);
      }
      // Creating down neighbors:
      if (c.id > id && (c.id - id) % 7 === 0 && c.src === rivalSideColor) {
        downNeighbors.push(c.id);
      }
      // Creating up-left neighbors:
      if (
        c.id < id &&
        (id - c.id) % 8 === 0 &&
        c.id % 7 < id % 7 &&
        c.src === rivalSideColor
      ) {
        upLeftNeighbors.push(c.id);
      }
      // Creating up-right neighbors:
      if (
        c.id < id &&
        (id - c.id) % 6 === 0 &&
        c.id % 7 > id % 7 &&
        c.src === rivalSideColor
      ) {
        upRightNeighbors.push(c.id);
      }
      // Creating down-left neighbors:
      if (
        c.id > id &&
        (c.id - id) % 6 === 0 &&
        c.id % 7 < id % 7 &&
        c.src === rivalSideColor
      ) {
        downLeftNeighbors.push(c.id);
      }
      // Creating down-right neighbors:
      if (
        c.id > id &&
        (c.id - id) % 8 === 0 &&
        c.id % 7 > id % 7 &&
        c.src === rivalSideColor
      ) {
        downRightNeighbors.push(c.id);
      }
    }
    // Creating left neighbors:
    setLeftNeighborsId(leftNeighbors);
    // Creating right neighbors:
    setRightNeighborsId(rightNeighbors);
    // Creating up neighbors:
    setUpNeighborsId(upNeighbors);
    // Creating down neighbors:
    setDownNeighborsId(downNeighbors);
    // Creating up-left neighbors:
    setUpLeftNeighborsId(upLeftNeighbors);
    // Creating up-right neighbors:
    setUpRightNeighborsId(upRightNeighbors);
    // Creating down-left neighbors:
    setDownLeftNeighborsId(downLeftNeighbors);
    // Creating down-right neighbors:
    setDownRightNeighborsId(downRightNeighbors);
  };
  const handleWinUpLeftCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        upLeftNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    if (freeCellsIds.length !== 0) {
      setAllowPejmanMessage(true);
    } else {
      setIsGameOver(true);
    }
    setIsUserTurn(false);
    resetNeighbors();
  };
  const handleWinUpCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        upNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    if (freeCellsIds.length !== 0) {
      setAllowPejmanMessage(true);
    } else {
      setIsGameOver(true);
    }
    setIsUserTurn(false);
    resetNeighbors();
  };
  const handleWinUpRightCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        upRightNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    if (freeCellsIds.length !== 0) {
      setAllowPejmanMessage(true);
    } else {
      setIsGameOver(true);
    }
    setIsUserTurn(false);
    resetNeighbors();
  };
  const handleWinLeftCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        leftNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    if (freeCellsIds.length !== 0) {
      setAllowPejmanMessage(true);
    } else {
      setIsGameOver(true);
    }
    setIsUserTurn(false);
    resetNeighbors();
  };
  const handleWinRightCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        rightNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    if (freeCellsIds.length !== 0) {
      setAllowPejmanMessage(true);
    } else {
      setIsGameOver(true);
    }
    setIsUserTurn(false);
    resetNeighbors();
  };
  const handleWinDownLeftCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        downLeftNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    if (freeCellsIds.length !== 0) {
      setAllowPejmanMessage(true);
    } else {
      setIsGameOver(true);
    }
    setIsUserTurn(false);
    resetNeighbors();
  };
  const handleWinDownCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        downNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    if (freeCellsIds.length !== 0) {
      setAllowPejmanMessage(true);
    } else {
      setIsGameOver(true);
    }
    setIsUserTurn(false);
    resetNeighbors();
  };
  const handleWinDownRightCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        downRightNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    if (freeCellsIds.length !== 0) {
      setAllowPejmanMessage(true);
    } else {
      setIsGameOver(true);
    }
    setIsUserTurn(false);
    resetNeighbors();
  };
  const choosingTheBestCell = (id, desiredPoint) => {
    let leftNeighbors = [];
    let rightNeighbors = [];
    let upNeighbors = [];
    let downNeighbors = [];
    let upLeftNeighbors = [];
    let upRightNeighbors = [];
    let downLeftNeighbors = [];
    let downRightNeighbors = [];
    let leftNeighborsNot5 = [];
    let rightNeighborsNot5 = [];
    let upNeighborsNot5 = [];
    let downNeighborsNot5 = [];
    let upLeftNeighborsNot5 = [];
    let upRightNeighborsNot5 = [];
    let downLeftNeighborsNot5 = [];
    let downRightNeighborsNot5 = [];
    let upLeftExistingNeighborsNot4 = [];
    let upLeftFilledNeighborsNot4 = [];
    let upRightExistingNeighborsNot4 = [];
    let upRightFilledNeighborsNot4 = [];
    let downLeftExistingNeighborsNot4 = [];
    let downLeftFilledNeighborsNot4 = [];
    let downRightExistingNeighborsNot4 = [];
    let downRightFilledNeighborsNot4 = [];
    for (const c of cells) {
      // Creating left neighbors:
      if (c.id >= Math.floor(id / 7) * 7 && c.id < id && c.src === userColor) {
        leftNeighbors.push(c.id);
      }
      if (
        ((c.id >= Math.floor(id / 7) * 7 && c.id < id) ||
          (c.id <= Math.floor(id / 7) * 7 + 6 && c.id > id)) &&
        c.src !== White
      ) {
        leftNeighborsNot5.push(c.id);
      }
      // Creating right neighbors:
      if (
        c.id <= Math.floor(id / 7) * 7 + 6 &&
        c.id > id &&
        c.src === userColor
      ) {
        rightNeighbors.push(c.id);
      }
      if (
        ((c.id <= Math.floor(id / 7) * 7 + 6 && c.id > id) ||
          (c.id >= Math.floor(id / 7) * 7 && c.id < id)) &&
        c.src !== White
      ) {
        rightNeighborsNot5.push(c.id);
      }
      // Creating up neighbors:
      if (c.id < id && (id - c.id) % 7 === 0 && c.src === userColor) {
        upNeighbors.push(c.id);
      }
      if (
        ((c.id < id && (id - c.id) % 7 === 0) ||
          (c.id > id && (c.id - id) % 7 === 0)) &&
        c.src !== White
      ) {
        upNeighborsNot5.push(c.id);
      }
      // Creating down neighbors:
      if (c.id > id && (c.id - id) % 7 === 0 && c.src === userColor) {
        downNeighbors.push(c.id);
      }
      if (
        ((c.id > id && (c.id - id) % 7 === 0) ||
          (c.id < id && (id - c.id) % 7 === 0)) &&
        c.src !== White
      ) {
        downNeighborsNot5.push(c.id);
      }
      // Creating up-left neighbors:
      if (
        c.id < id &&
        (id - c.id) % 8 === 0 &&
        c.id % 7 < id % 7 &&
        c.src === userColor
      ) {
        upLeftNeighbors.push(c.id);
      }
      if (
        ((c.id < id && (id - c.id) % 8 === 0 && c.id % 7 < id % 7) ||
          (c.id > id && (c.id - id) % 8 === 0 && c.id % 7 > id % 7)) &&
        c.src !== White
      ) {
        upLeftNeighborsNot5.push(c.id);
        upLeftFilledNeighborsNot4.push(c.id);
      }
      if (
        (c.id < id && (id - c.id) % 8 === 0 && c.id % 7 < id % 7) ||
        (c.id > id && (c.id - id) % 8 === 0 && c.id % 7 > id % 7)
      ) {
        upLeftExistingNeighborsNot4.push(c.id);
      }
      // Creating up-right neighbors:
      if (
        c.id < id &&
        (id - c.id) % 6 === 0 &&
        c.id % 7 > id % 7 &&
        c.src === userColor
      ) {
        upRightNeighbors.push(c.id);
      }
      if (
        ((c.id < id && (id - c.id) % 6 === 0 && c.id % 7 > id % 7) ||
          (c.id > id && (c.id - id) % 6 === 0 && c.id % 7 < id % 7)) &&
        c.src !== White
      ) {
        upRightNeighborsNot5.push(c.id);
        upRightFilledNeighborsNot4.push(c.id);
      }
      if (
        (c.id < id && (id - c.id) % 6 === 0 && c.id % 7 > id % 7) ||
        (c.id > id && (c.id - id) % 6 === 0 && c.id % 7 < id % 7)
      ) {
        upRightExistingNeighborsNot4.push(c.id);
      }
      // Creating down-left neighbors:
      if (
        c.id > id &&
        (c.id - id) % 6 === 0 &&
        c.id % 7 < id % 7 &&
        c.src === userColor
      ) {
        downLeftNeighbors.push(c.id);
      }
      if (
        ((c.id > id && (c.id - id) % 6 === 0 && c.id % 7 < id % 7) ||
          (c.id < id && (id - c.id) % 6 === 0 && c.id % 7 > id % 7)) &&
        c.src !== White
      ) {
        downLeftNeighborsNot5.push(c.id);
        downLeftFilledNeighborsNot4.push(c.id);
      }
      if (
        (c.id > id && (c.id - id) % 6 === 0 && c.id % 7 < id % 7) ||
        (c.id < id && (id - c.id) % 6 === 0 && c.id % 7 > id % 7)
      ) {
        downLeftExistingNeighborsNot4.push(c.id);
      }
      // Creating down-right neighbors:
      if (
        c.id > id &&
        (c.id - id) % 8 === 0 &&
        c.id % 7 > id % 7 &&
        c.src === userColor
      ) {
        downRightNeighbors.push(c.id);
      }
      if (
        ((c.id > id && (c.id - id) % 8 === 0 && c.id % 7 > id % 7) ||
          (c.id < id && (id - c.id) % 8 === 0 && c.id % 7 < id % 7)) &&
        c.src !== White
      ) {
        downRightNeighborsNot5.push(c.id);
        downRightFilledNeighborsNot4.push(c.id);
      }
      if (
        (c.id > id && (c.id - id) % 8 === 0 && c.id % 7 > id % 7) ||
        (c.id < id && (id - c.id) % 8 === 0 && c.id % 7 < id % 7)
      ) {
        downRightExistingNeighborsNot4.push(c.id);
      }
    }
    if (
      leftNeighbors.length === desiredPoint &&
      leftNeighborsNot5.length !== 5
    ) {
      return leftNeighbors;
    } else if (
      rightNeighbors.length === desiredPoint &&
      rightNeighborsNot5.length !== 5
    ) {
      return rightNeighbors;
    } else if (
      upNeighbors.length === desiredPoint &&
      upNeighborsNot5.length !== 5
    ) {
      return upNeighbors;
    } else if (
      downNeighbors.length === desiredPoint &&
      downNeighborsNot5.length !== 5
    ) {
      return downNeighbors;
    } else if (
      upLeftNeighbors.length === desiredPoint &&
      upLeftNeighborsNot5.length !== 5 &&
      upLeftExistingNeighborsNot4.length === 5 &&
      upLeftFilledNeighborsNot4.length !== 4
    ) {
      return upLeftNeighbors;
    } else if (
      upRightNeighbors.length === desiredPoint &&
      upRightNeighborsNot5.length !== 5 &&
      upRightExistingNeighborsNot4.length === 5 &&
      upRightFilledNeighborsNot4.length !== 4
    ) {
      return upRightNeighbors;
    } else if (
      downLeftNeighbors.length === desiredPoint &&
      downLeftNeighborsNot5.length !== 5 &&
      downLeftExistingNeighborsNot4.length === 5 &&
      downLeftFilledNeighborsNot4.length !== 4
    ) {
      return downLeftNeighbors;
    } else if (
      downRightNeighbors.length === desiredPoint &&
      downRightNeighborsNot5.length !== 5 &&
      downRightExistingNeighborsNot4.length === 5 &&
      downRightFilledNeighborsNot4.length !== 4
    ) {
      return downRightNeighbors;
    } else {
      return [];
    }
  };
  const handlePejmanChoice = () => {
    if (freeCellsIds.length === 49) {
      setPejmanChoice(24);
      return;
    }
    for (const cell of cells) {
      if (
        isAtLeastOneNeighborSelected(cell.id) &&
        cell.src === White &&
        choosingTheBestCell(cell.id, 6).length > 0
      ) {
        setPejmanChoice(cell.id);
        return;
      }
    }
    for (const cell of cells) {
      if (
        isAtLeastOneNeighborSelected(cell.id) &&
        cell.src === White &&
        choosingTheBestCell(cell.id, 5).length > 0
      ) {
        setPejmanChoice(cell.id);
        return;
      }
    }
    for (const cell of cells) {
      if (
        isAtLeastOneNeighborSelected(cell.id) &&
        cell.src === White &&
        choosingTheBestCell(cell.id, 4).length > 0
      ) {
        setPejmanChoice(cell.id);
        return;
      }
    }
    for (const cell of cells) {
      if (
        isAtLeastOneNeighborSelected(cell.id) &&
        cell.src === White &&
        choosingTheBestCell(cell.id, 3).length > 0
      ) {
        setPejmanChoice(cell.id);
        return;
      }
    }
    for (const cell of cells) {
      if (
        isAtLeastOneNeighborSelected(cell.id) &&
        cell.src === White &&
        choosingTheBestCell(cell.id, 2).length > 0
      ) {
        setPejmanChoice(cell.id);
        return;
      }
    }
    for (const cell of cells) {
      if (
        isAtLeastOneNeighborSelected(cell.id) &&
        cell.src === White &&
        choosingTheBestCell(cell.id, 1).length > 0
      ) {
        setPejmanChoice(cell.id);
        return;
      }
    }
    setPejmanChoice(getRandArr(freeCellsIds));
  };
  const handlePejmanDirectionChoice = () => {
    if (freeCellsIds.length === 48) {
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    }
    if (leftNeighborsId.length === 6) {
      setCells((currCells) =>
        currCells.map((c) =>
          leftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (rightNeighborsId.length === 6) {
      setCells((currCells) =>
        currCells.map((c) =>
          rightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upNeighborsId.length === 6) {
      setCells((currCells) =>
        currCells.map((c) =>
          upNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downNeighborsId.length === 6) {
      setCells((currCells) =>
        currCells.map((c) =>
          downNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upLeftNeighborsId.length === 6) {
      setCells((currCells) =>
        currCells.map((c) =>
          upLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upRightNeighborsId.length === 6) {
      setCells((currCells) =>
        currCells.map((c) =>
          upRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downLeftNeighborsId.length === 6) {
      setCells((currCells) =>
        currCells.map((c) =>
          downLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downRightNeighborsId.length === 6) {
      setCells((currCells) =>
        currCells.map((c) =>
          downRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (leftNeighborsId.length === 5) {
      setCells((currCells) =>
        currCells.map((c) =>
          leftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (rightNeighborsId.length === 5) {
      setCells((currCells) =>
        currCells.map((c) =>
          rightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upNeighborsId.length === 5) {
      setCells((currCells) =>
        currCells.map((c) =>
          upNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downNeighborsId.length === 5) {
      setCells((currCells) =>
        currCells.map((c) =>
          downNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upLeftNeighborsId.length === 5) {
      setCells((currCells) =>
        currCells.map((c) =>
          upLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upRightNeighborsId.length === 5) {
      setCells((currCells) =>
        currCells.map((c) =>
          upRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downLeftNeighborsId.length === 5) {
      setCells((currCells) =>
        currCells.map((c) =>
          downLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downRightNeighborsId.length === 5) {
      setCells((currCells) =>
        currCells.map((c) =>
          downRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (leftNeighborsId.length === 4) {
      setCells((currCells) =>
        currCells.map((c) =>
          leftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (rightNeighborsId.length === 4) {
      setCells((currCells) =>
        currCells.map((c) =>
          rightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upNeighborsId.length === 4) {
      setCells((currCells) =>
        currCells.map((c) =>
          upNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downNeighborsId.length === 4) {
      setCells((currCells) =>
        currCells.map((c) =>
          downNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upLeftNeighborsId.length === 4) {
      setCells((currCells) =>
        currCells.map((c) =>
          upLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upRightNeighborsId.length === 4) {
      setCells((currCells) =>
        currCells.map((c) =>
          upRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downLeftNeighborsId.length === 4) {
      setCells((currCells) =>
        currCells.map((c) =>
          downLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downRightNeighborsId.length === 4) {
      setCells((currCells) =>
        currCells.map((c) =>
          downRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (leftNeighborsId.length === 3) {
      setCells((currCells) =>
        currCells.map((c) =>
          leftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (rightNeighborsId.length === 3) {
      setCells((currCells) =>
        currCells.map((c) =>
          rightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upNeighborsId.length === 3) {
      setCells((currCells) =>
        currCells.map((c) =>
          upNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downNeighborsId.length === 3) {
      setCells((currCells) =>
        currCells.map((c) =>
          downNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upLeftNeighborsId.length === 3) {
      setCells((currCells) =>
        currCells.map((c) =>
          upLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upRightNeighborsId.length === 3) {
      setCells((currCells) =>
        currCells.map((c) =>
          upRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downLeftNeighborsId.length === 3) {
      setCells((currCells) =>
        currCells.map((c) =>
          downLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downRightNeighborsId.length === 3) {
      setCells((currCells) =>
        currCells.map((c) =>
          downRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (leftNeighborsId.length === 2) {
      setCells((currCells) =>
        currCells.map((c) =>
          leftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (rightNeighborsId.length === 2) {
      setCells((currCells) =>
        currCells.map((c) =>
          rightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upNeighborsId.length === 2) {
      setCells((currCells) =>
        currCells.map((c) =>
          upNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downNeighborsId.length === 2) {
      setCells((currCells) =>
        currCells.map((c) =>
          downNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upLeftNeighborsId.length === 2) {
      setCells((currCells) =>
        currCells.map((c) =>
          upLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upRightNeighborsId.length === 2) {
      setCells((currCells) =>
        currCells.map((c) =>
          upRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downLeftNeighborsId.length === 2) {
      setCells((currCells) =>
        currCells.map((c) =>
          downLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downRightNeighborsId.length === 2) {
      setCells((currCells) =>
        currCells.map((c) =>
          downRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (leftNeighborsId.length === 1) {
      setCells((currCells) =>
        currCells.map((c) =>
          leftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (rightNeighborsId.length === 1) {
      setCells((currCells) =>
        currCells.map((c) =>
          rightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upNeighborsId.length === 1) {
      setCells((currCells) =>
        currCells.map((c) =>
          upNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downNeighborsId.length === 1) {
      setCells((currCells) =>
        currCells.map((c) =>
          downNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upLeftNeighborsId.length === 1) {
      setCells((currCells) =>
        currCells.map((c) =>
          upLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (upRightNeighborsId.length === 1) {
      setCells((currCells) =>
        currCells.map((c) =>
          upRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downLeftNeighborsId.length === 1) {
      setCells((currCells) =>
        currCells.map((c) =>
          downLeftNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    } else if (downRightNeighborsId.length === 1) {
      setCells((currCells) =>
        currCells.map((c) =>
          downRightNeighborsId.includes(c.id)
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setAllowPejmanChooseDirection(false);
      setIsUserTurn(true);
      return;
    }
  };
  const handleGameResult = () => {
    setIsGameOver(true);
    let up = 0;
    let pp = 0;
    for (const cell of cells) {
      if (cell.src === userColor) {
        up++;
      } else if (cell.src === pejmanColor) {
        pp++;
      }
    }
    if (up > pp) {
      if (normalMode) {
        setFinalMessage("You Win!");
      } else {
        setFinalMessage("You Win, but you don't get any stars!");
      }
    } else {
      setFinalMessage("Pejman Wins!");
    }
    setUserPoint(up);
    setPejmanPoint(pp);
  };
  useEffect(() => {
    if (pejmanChoice !== null) {
      setCells((currCells) =>
        currCells.map((c) =>
          c.id === pejmanChoice
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setSelectedCellsNum((currSelectedCellsNum) => currSelectedCellsNum + 1);
      setFreeCellsIds((currFreeCellsIds) =>
        currFreeCellsIds.filter((c) => c !== pejmanChoice),
      );
      creatingNeighbors(pejmanChoice, userColor);
      setAllowPejmanChooseDirection(true);
    }
  }, [pejmanChoice]);
  useEffect(() => {
    if (freeCellsIds.length === 0 && normalMode) {
      setIsGameOver(true);
    }
  }, [freeCellsIds]);
  return (
    <div>
      <h2>Reversi</h2>
      {easyMode && !normalMode && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage ? (
        <ModeExplaination message="Easy Mode: You start the game, you won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <ModeExplaination message="Normal Mode: Pejman starts the game, you will get one star if you win." />
        )
      )}
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={handleEasyMode}>Easy Mode</button>
          <button onClick={handleNormalMode}>Normal Mode</button>
        </div>
      )}
      {!isGameStarted &&
        !isIdenticalColor &&
        (easyMode || normalMode) &&
        (
          <div>
            <div>
              <label htmlFor="userColor">Select a Color for yourself</label>
              <br></br>
              <select
                onChange={handleUserColor}
                name="userColor"
                id="userColor"
              >
                <option value={userColor} disabled selected>
                  🔽🔽🔽
                </option>
                {["Red", "Green", "Blue", "Yellow"].map((c) => (
                  <option>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pejmanColor">Select a Color for Pejman</label>
              <br></br>
              <select
                onChange={handlePejmanColor}
                name="pejmanColor"
                id="pejmanColor"
              >
                <option value={pejmanColor} disabled selected>
                  🔽🔽🔽
                </option>
                {["Red", "Green", "Blue", "Yellow"].map((c) => (
                  <option>{c}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      {!isGameStarted &&
        (easyMode || normalMode) &&
        userColor &&
        pejmanColor &&
        !isTogglingLevel &&
        !isIdenticalColor && (
          <button onClick={handleStart}>Start the Game</button>
        )}
      {isIdenticalColor && !isTogglingReset && !isTogglingLevel && (
        <div>
          <div>You can't choose an identical color for both players</div>
          <button onClick={handleOk}>Ok</button>
        </div>
      )}
      {isGameStarted &&
        selectionErrorMessage !== "" &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <div>
            <div>{selectionErrorMessage}</div>
            <button onClick={handleSelectionErrorMessage}>Ok</button>
          </div>
        )}
      {isGameStarted &&
        !isTogglingReset &&
        finalMessage === "" &&
        !isTogglingHomePage &&
        !isTogglingLevel &&
        (easyMode || normalMode) && !isIdenticalColor && (
          <div>
            <button onClick={toggleReset}>Reset the Game</button>
          </div>
        )}
      {isTogglingReset && finalMessage === "" && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to reset the game?"
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        </div>
      )}
      {isGameStarted &&
        (easyMode || normalMode) &&
        !isTogglingReset &&
        !isTogglingHomePage &&
        !isTogglingLevel &&
        finalMessage === "" &&
        !isIdenticalColor && (
          <div>
            <button
              style={{
                display: "inline",
              }}
              onClick={() => toggleLevel()}
            >{`Switch to ${easyMode ? "Normal Mode" : "Easy Mode"}`}</button>
          </div>
        )}
      {isTogglingLevel && finalMessage === "" && (
        <div>
          <ConfirmationBox
            question={`Are you sure you want to switch to ${
              easyMode ? "Normal Mode" : "Easy Mode"
            }?`}
            toggleYes={toggleLevelYes}
            toggleCancel={toggleLevelCancel}
            easyMode={easyMode}
          />
        </div>
      )}
      {isGameStarted && !isTogglingHomePage &&
                          !isTogglingReset &&
                          !isTogglingLevel &&
                          finalMessage === "" && !isIdenticalColor && (
                            <div>
                              <button onClick={() => toggleHomePage()}>
                                Back to the home page
                              </button>
                            </div>
                          )}
                        {isTogglingHomePage && finalMessage === "" && (
                          <div>
                            <ConfirmationBox
                              question="Are you sure you want to go back to Home Page?"
                              toggleYes={toggleHomePageYes}
                              toggleCancel={toggleHomePageCancel}
                            />
                          </div>
                        )}
      <br />
      {isGameStarted &&
        !isTogglingReset &&
        !isTogglingLevel &&
        !isTogglingHomePage &&
        cells.map((el, idx) =>
          (idx + 1) % 7 !== 0 ? (
            <div style={{ display: "inline" }}>
              <Cell
                id={el.id}
                src={el.src}
                isSelected={el.isSelected}
                style={{ display: "inline" }}
                userColor={userColor}
                cells={cells}
                setCells={setCells}
                pejmanColor={pejmanColor}
                selectedCellsNum={selectedCellsNum}
                setSelectedCellsNum={setSelectedCellsNum}
                selectionErrorMessage={selectionErrorMessage}
                setSelectionErrorMessage={setSelectionErrorMessage}
                isUserTurn={isUserTurn}
                freeCellsIds={freeCellsIds}
                setFreeCellsIds={setFreeCellsIds}
                allowPejmanMessage={allowPejmanMessage}
                creatingNeighbors={creatingNeighbors}
                chooseArrowMessage={chooseArrowMessage}
                setChooseArrowMessage={setChooseArrowMessage}
                isAtLeastOneNeighborSelected={isAtLeastOneNeighborSelected}
                leftNeighborsId={leftNeighborsId}
                rightNeighborsId={rightNeighborsId}
                upNeighborsId={upNeighborsId}
                downNeighborsId={downNeighborsId}
                upLeftNeighborsId={upLeftNeighborsId}
                upRightNeighborsId={upRightNeighborsId}
                downLeftNeighborsId={downLeftNeighborsId}
                downRightNeighborsId={downRightNeighborsId}
                pejmanChoice={pejmanChoice}
                setPejmanChoice={setPejmanChoice}
                easyMode={easyMode}
                isGameOver={isGameOver}
              />
            </div>
          ) : (
            <div style={{ display: "inline" }}>
              <Cell
                id={el.id}
                src={el.src}
                isSelected={el.isSelected}
                style={{ display: "inline" }}
                userColor={userColor}
                cells={cells}
                setCells={setCells}
                pejmanColor={pejmanColor}
                selectedCellsNum={selectedCellsNum}
                setSelectedCellsNum={setSelectedCellsNum}
                selectionErrorMessage={selectionErrorMessage}
                setSelectionErrorMessage={setSelectionErrorMessage}
                isUserTurn={isUserTurn}
                freeCellsIds={freeCellsIds}
                setFreeCellsIds={setFreeCellsIds}
                allowPejmanMessage={allowPejmanMessage}
                creatingNeighbors={creatingNeighbors}
                chooseArrowMessage={chooseArrowMessage}
                setChooseArrowMessage={setChooseArrowMessage}
                isAtLeastOneNeighborSelected={isAtLeastOneNeighborSelected}
                leftNeighborsId={leftNeighborsId}
                rightNeighborsId={rightNeighborsId}
                upNeighborsId={upNeighborsId}
                downNeighborsId={downNeighborsId}
                upLeftNeighborsId={upLeftNeighborsId}
                upRightNeighborsId={upRightNeighborsId}
                downLeftNeighborsId={downLeftNeighborsId}
                downRightNeighborsId={downRightNeighborsId}
                pejmanChoice={pejmanChoice}
                setPejmanChoice={setPejmanChoice}
                easyMode={easyMode}
                isGameOver={isGameOver}
              />
              <br />
            </div>
          ),
        )}
      <br />
      {chooseArrowMessage &&
        isUserTurn &&
        freeCellsIds.length < 48 &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <div>
            <div>Choose the path you wan to conquer</div>
            <div>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "4px",
                }}
                onClick={() => handleWinUpLeftCells(userColor)}
                disabled={upLeftNeighborsId.length === 0}
              >
                &#8598;
              </button>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleWinUpCells(userColor)}
                disabled={upNeighborsId.length === 0}
              >
                &#8593;
              </button>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "4px",
                }}
                onClick={() => handleWinUpRightCells(userColor)}
                disabled={upRightNeighborsId.length === 0}
              >
                &#8599;
              </button>
            </div>
            <div>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleWinLeftCells(userColor)}
                disabled={leftNeighborsId.length === 0}
              >
                &#8592;
              </button>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "9px",
                }}
                disabled
              ></button>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleWinRightCells(userColor)}
                disabled={rightNeighborsId.length === 0}
              >
                &#8594;
              </button>
            </div>
            <div>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "4px",
                }}
                onClick={() => handleWinDownLeftCells(userColor)}
                disabled={downLeftNeighborsId.length === 0}
              >
                &#8601;
              </button>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleWinDownCells(userColor)}
                disabled={downNeighborsId.length === 0}
              >
                &#8595;
              </button>
              <button
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "3px",
                  display: "inline",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "4px",
                }}
                onClick={() => handleWinDownRightCells(userColor)}
                disabled={downRightNeighborsId.length === 0}
              >
                &#8600;
              </button>
            </div>
          </div>
        )}
      {(allowPejmanMessage || freeCellsIds.length === 48) &&
        !pejmanChoice &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <div>
            Allow Pejman to make his move
            <button onClick={handleAllowPejman}>Ok</button>
          </div>
        )}
      {freeCellsIds.length === 49 &&
        normalMode &&
        userColor &&
        pejmanColor &&
        isGameStarted &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <div>
            Allow Pejman to start the game
            <button onClick={handleAllowPejman}>Ok</button>
          </div>
        )}
      {allowPejmanChooseDirection &&
        freeCellsIds.length !== 48 &&
        freeCellsIds.length > 0 &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <div>
            <div>{`Pejman is choosing square number ${pejmanChoice + 1}`}</div>
            <button onClick={handlePejmanDirectionChoice}>Ok</button>
          </div>
        )}
      {allowPejmanChooseDirection &&
        freeCellsIds.length === 48 &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <div>
            <div>{`As the first move, Pejman chose square number ${pejmanChoice + 1}`}</div>
            <button onClick={handlePejmanDirectionChoice}>Ok</button>
          </div>
        )}
      {isGameOver &&
        finalMessage === "" &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <div>
            <div>All the squares are taken, let's see who is the winner</div>
            <button onClick={handleGameResult}>Ok</button>
          </div>
        )}
      {(pejmanPoint > 0 || userPoint > 0) &&
        !isTogglingReset &&
        !isTogglingLevel && !isTogglingHomePage && (
          <div>
            <div>{`You conquered ${userPoint} squares`}</div>
            <div>{`Pejman conquered ${pejmanPoint} squares`}</div>
          </div>
        )}
      {finalMessage &&
        (finalMessage === "You Win!" ||
          finalMessage === "You Win, but you don't get any stars!") && !isTogglingHomePage && (
          <div>
            <h3>You Win!</h3>
            <div>Play Again?</div>
            <button onClick={handlePlayAgain}>Ok</button>
          </div>
        )}
      {finalMessage && finalMessage === "Pejman Wins!" && !isTogglingHomePage && (
        <div>
          <h3>Pejman Wins!</h3>
          <div>Try Again?</div>
          <button onClick={handlePlayAgain}>Ok</button>
        </div>
      )}
      {/* {isGameStarted && !isTogglingReset && !isTogglingHomePage && <ReviewSection game="Reversi" currentUser={currentUser} />} */}
    </div>
  );
}
