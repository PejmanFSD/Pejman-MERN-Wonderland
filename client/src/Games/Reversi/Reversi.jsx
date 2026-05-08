import { useState, useEffect } from "react";
import White from "./images/White.jpg";
import Blue from "./images/Blue.jpg";
import Red from "./images/Red.jpg";
import Green from "./images/Green.jpg";
import Yellow from "./images/Yellow.jpg";
import ReviewSection from "../../Components/ReviewSection";
import Cell from "./Cell";
import { getRandArr } from "../utils.js";

export default function Reversi({ updateTotalPoint, currentUser }) {
  const [isGameStarted, setIsGameStarted] = useState(false);
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
  const [leftCellsPoint, setLeftCellsPoint] = useState(0);
  const [rightNeighborsId, setRightNeighborsId] = useState([]);
  const [rightCellsPoint, setRightCellsPoint] = useState(0);
  const [upNeighborsId, setUpNeighborsId] = useState([]);
  const [upCellsPoint, setUpCellsPoint] = useState(0);
  const [downNeighborsId, setDownNeighborsId] = useState([]);
  const [downCellsPoint, setDownCellsPoint] = useState(0);
  const [upLeftNeighborsId, setUpLeftNeighborsId] = useState([]);
  const [upLeftCellsPoint, setUpLeftCellsPoint] = useState(0);
  const [upRightNeighborsId, setUpRightNeighborsId] = useState([]);
  const [upRightCellsPoint, setUpRightCellsPoint] = useState(0);
  const [downLeftNeighborsId, setDownLeftNeighborsId] = useState([]);
  const [downLeftCellsPoint, setDownLeftCellsPoint] = useState(0);
  const [downRightNeighborsId, setDownRightNeighborsId] = useState([]);
  const [downRightCellsPoint, setDownRightCellsPoint] = useState(0);
  const [pejmanChoice, setPejmanChoice] = useState(null);
  const [selectionErrorMessage, setSelectionErrorMessage] = useState("");
  const [chooseArrowMessage, setChooseArrowMessage] = useState(false);
  const [allowPejmanMessage, setAllowPejmanMessage] = useState(false);
  const [allowPejmanChooseDirection, setAllowPejmanChooseDirection] = useState(false);

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
    setIsUserTurn(true);
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
    setLeftCellsPoint(0);
    setRightNeighborsId([]);
    setRightCellsPoint(0);
    setUpNeighborsId([]);
    setUpCellsPoint(0);
    setDownNeighborsId([]);
    setDownCellsPoint(0);
    setUpLeftNeighborsId([]);
    setUpLeftCellsPoint(0);
    setUpRightNeighborsId([]);
    setUpRightCellsPoint(0);
    setDownLeftNeighborsId([]);
    setDownLeftCellsPoint(0);
    setDownRightNeighborsId([]);
    setDownRightCellsPoint(0);
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
      if (c.id >= Math.floor(id / 7) * 7 && c.id < id && c.src === rivalSideColor) {
        leftNeighbors.push(c.id);
      }
      // Creating right neighbors:
      if (c.id <= Math.floor(id / 7) * 7 + 6 && c.id > id && c.src === rivalSideColor) {
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
    setLeftCellsPoint(leftNeighbors.length);
    // Creating right neighbors:
    setRightNeighborsId(rightNeighbors);
    setRightCellsPoint(rightNeighbors.length);
    // Creating up neighbors:
    setUpNeighborsId(upNeighbors);
    setUpCellsPoint(upNeighbors.length);
    // Creating down neighbors:
    setDownNeighborsId(downNeighbors);
    setDownCellsPoint(downNeighbors.length);
    // Creating up-left neighbors:
    setUpLeftNeighborsId(upLeftNeighbors);
    setUpLeftCellsPoint(upLeftNeighbors.length);
    // Creating up-right neighbors:
    setUpRightNeighborsId(upRightNeighbors);
    setUpRightCellsPoint(upRightNeighbors.length);
    // Creating down-left neighbors:
    setDownLeftNeighborsId(downLeftNeighbors);
    setDownLeftCellsPoint(downLeftNeighbors.length);
    // Creating down-right neighbors:
    setDownRightNeighborsId(downRightNeighbors);
    setDownRightCellsPoint(downRightNeighbors.length);
  };
  const handleWinUpLeftCells = (color) => {
    setCells((currCells) =>
      currCells.map((c) =>
        upLeftNeighborsId.includes(c.id)
          ? { ...c, src: color, isSelected: true }
          : c,
      ),
    );
    setAllowPejmanMessage(true);
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
    setAllowPejmanMessage(true);
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
    setAllowPejmanMessage(true);
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
    setAllowPejmanMessage(true);
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
    setAllowPejmanMessage(true);
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
    setAllowPejmanMessage(true);
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
    setAllowPejmanMessage(true);
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
    setAllowPejmanMessage(true);
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
    for (const c of cells) {
      // Creating left neighbors:
      if (c.id >= Math.floor(id / 7) * 7 && c.id < id && c.src === userColor) {
        leftNeighbors.push(c.id);
      }
      // Creating right neighbors:
      if (c.id <= Math.floor(id / 7) * 7 + 6 && c.id > id && c.src === userColor) {
        rightNeighbors.push(c.id);
      }
      // Creating up neighbors:
      if (c.id < id && (id - c.id) % 7 === 0 && c.src === userColor) {
        upNeighbors.push(c.id);
      }
      // Creating down neighbors:
      if (c.id > id && (c.id - id) % 7 === 0 && c.src === userColor) {
        downNeighbors.push(c.id);
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
      // Creating up-right neighbors:
      if (
        c.id < id &&
        (id - c.id) % 6 === 0 &&
        c.id % 7 > id % 7 &&
        c.src === userColor
      ) {
        upRightNeighbors.push(c.id);
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
      // Creating down-right neighbors:
      if (
        c.id > id &&
        (c.id - id) % 8 === 0 &&
        c.id % 7 > id % 7 &&
        c.src === userColor
      ) {
        downRightNeighbors.push(c.id);
      }
    }
    if (leftNeighbors.length === desiredPoint) {return leftNeighbors}
    else if (rightNeighbors.length === desiredPoint) {return rightNeighbors}
    else if (upNeighbors.length === desiredPoint) {return upNeighbors}
    else if (downNeighbors.length === desiredPoint) {return downNeighbors}
    else if (upLeftNeighbors.length === desiredPoint) {return upLeftNeighbors}
    else if (upRightNeighbors.length === desiredPoint) {return upRightNeighbors}
    else if (downLeftNeighbors.length === desiredPoint) {return downLeftNeighbors}
    else if (downRightNeighbors.length === desiredPoint) {return downRightNeighbors}
    else {return []}
  }
  const handlePejmanChoice = () => {
    for (const cell of cells) {
        if (isAtLeastOneNeighborSelected(cell.id) && cell.src === White && choosingTheBestCell(cell.id, 6).length > 0) {
            setPejmanChoice(cell.id);
            return;
        }
    }
    for (const cell of cells) {
        if (isAtLeastOneNeighborSelected(cell.id) && cell.src === White && choosingTheBestCell(cell.id, 5).length > 0) {
            setPejmanChoice(cell.id);
            return;
        }
    }
    for (const cell of cells) {
        if (isAtLeastOneNeighborSelected(cell.id) && cell.src === White && choosingTheBestCell(cell.id, 4).length > 0) {
            setPejmanChoice(cell.id);
            return;
        }
    }
    for (const cell of cells) {
        if (isAtLeastOneNeighborSelected(cell.id) && cell.src === White && choosingTheBestCell(cell.id, 3).length > 0) {
            setPejmanChoice(cell.id);
            return;
        }
    }
    for (const cell of cells) {
        if (isAtLeastOneNeighborSelected(cell.id) && cell.src === White && choosingTheBestCell(cell.id, 2).length > 0) {
            setPejmanChoice(cell.id);
            return;
        }
    }
    for (const cell of cells) {
        if (isAtLeastOneNeighborSelected(cell.id) && cell.src === White && choosingTheBestCell(cell.id, 1).length > 0) {
            setPejmanChoice(cell.id);
            return;
        }
    }
    setPejmanChoice(getRandArr(freeCellsIds));
  }
  const handlePejmanDirectionChoice = () => {
    if (leftNeighborsId.length === 6) {
        setCells((currCells) => currCells.map((c) => leftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (rightNeighborsId.length === 6) {
        setCells((currCells) => currCells.map((c) => rightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upNeighborsId.length === 6) {
        setCells((currCells) => currCells.map((c) => upNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downNeighborsId.length === 6) {
        setCells((currCells) => currCells.map((c) => downNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upLeftNeighborsId.length === 6) {
        setCells((currCells) => currCells.map((c) => upLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upRightNeighborsId.length === 6) {
        setCells((currCells) => currCells.map((c) => upRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downLeftNeighborsId.length === 6) {
        setCells((currCells) => currCells.map((c) => downLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downRightNeighborsId.length === 6) {
        setCells((currCells) => currCells.map((c) => downRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (leftNeighborsId.length === 5) {
        setCells((currCells) => currCells.map((c) => leftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (rightNeighborsId.length === 5) {
        setCells((currCells) => currCells.map((c) => rightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upNeighborsId.length === 5) {
        setCells((currCells) => currCells.map((c) => upNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downNeighborsId.length === 5) {
        setCells((currCells) => currCells.map((c) => downNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upLeftNeighborsId.length === 5) {
        setCells((currCells) => currCells.map((c) => upLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upRightNeighborsId.length === 5) {
        setCells((currCells) => currCells.map((c) => upRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downLeftNeighborsId.length === 5) {
        setCells((currCells) => currCells.map((c) => downLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downRightNeighborsId.length === 5) {
        setCells((currCells) => currCells.map((c) => downRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (leftNeighborsId.length === 4) {
        setCells((currCells) => currCells.map((c) => leftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (rightNeighborsId.length === 4) {
        setCells((currCells) => currCells.map((c) => rightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upNeighborsId.length === 4) {
        setCells((currCells) => currCells.map((c) => upNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downNeighborsId.length === 4) {
        setCells((currCells) => currCells.map((c) => downNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upLeftNeighborsId.length === 4) {
        setCells((currCells) => currCells.map((c) => upLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upRightNeighborsId.length === 4) {
        setCells((currCells) => currCells.map((c) => upRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downLeftNeighborsId.length === 4) {
        setCells((currCells) => currCells.map((c) => downLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downRightNeighborsId.length === 4) {
        setCells((currCells) => currCells.map((c) => downRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (leftNeighborsId.length === 3) {
        setCells((currCells) => currCells.map((c) => leftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (rightNeighborsId.length === 3) {
        setCells((currCells) => currCells.map((c) => rightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upNeighborsId.length === 3) {
        setCells((currCells) => currCells.map((c) => upNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downNeighborsId.length === 3) {
        setCells((currCells) => currCells.map((c) => downNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upLeftNeighborsId.length === 3) {
        setCells((currCells) => currCells.map((c) => upLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upRightNeighborsId.length === 3) {
        setCells((currCells) => currCells.map((c) => upRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downLeftNeighborsId.length === 3) {
        setCells((currCells) => currCells.map((c) => downLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downRightNeighborsId.length === 3) {
        setCells((currCells) => currCells.map((c) => downRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (leftNeighborsId.length === 2) {
        setCells((currCells) => currCells.map((c) => leftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (rightNeighborsId.length === 2) {
        setCells((currCells) => currCells.map((c) => rightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upNeighborsId.length === 2) {
        setCells((currCells) => currCells.map((c) => upNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downNeighborsId.length === 2) {
        setCells((currCells) => currCells.map((c) => downNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upLeftNeighborsId.length === 2) {
        setCells((currCells) => currCells.map((c) => upLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upRightNeighborsId.length === 2) {
        setCells((currCells) => currCells.map((c) => upRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downLeftNeighborsId.length === 2) {
        setCells((currCells) => currCells.map((c) => downLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downRightNeighborsId.length === 2) {
        setCells((currCells) => currCells.map((c) => downRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (leftNeighborsId.length === 1) {
        setCells((currCells) => currCells.map((c) => leftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (rightNeighborsId.length === 1) {
        setCells((currCells) => currCells.map((c) => rightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upNeighborsId.length === 1) {
        setCells((currCells) => currCells.map((c) => upNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downNeighborsId.length === 1) {
        setCells((currCells) => currCells.map((c) => downNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upLeftNeighborsId.length === 1) {
        setCells((currCells) => currCells.map((c) => upLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (upRightNeighborsId.length === 1) {
        setCells((currCells) => currCells.map((c) => upRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downLeftNeighborsId.length === 1) {
        setCells((currCells) => currCells.map((c) => downLeftNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    } else if (downRightNeighborsId.length === 1) {
        setCells((currCells) => currCells.map((c) => downRightNeighborsId.includes(c.id) ? { ...c, src: pejmanColor, isSelected: true } : c)); setAllowPejmanChooseDirection(false); setIsUserTurn(true); return;
    }
  }
  useEffect(() => {
    if (pejmanChoice !== null) {
        setCells((currCells) =>
        currCells.map((c) =>
          c.id === pejmanChoice
            ? { ...c, src: pejmanColor, isSelected: true }
            : c,
        ),
      );
      setFreeCellsIds((currFreeCellsIds) =>
        currFreeCellsIds.filter((c) => c !== pejmanChoice),
      );
      creatingNeighbors(pejmanChoice, userColor);
      setAllowPejmanChooseDirection(true);
    }
  }, [pejmanChoice]);
  return (
    <div>
      <h2>Reversi</h2>
      <div>Pejman Choice: {pejmanChoice}</div>
      <h3>{freeCellsIds.length}</h3>
      <div>
        Left neighbors:
        {leftNeighborsId.map((n) => (
          <div style={{ display: "inline", color: "red" }}> {n} - </div>
        ))}
      </div>
      <div>
        Right neighbors:
        {rightNeighborsId.map((n) => (
          <div style={{ display: "inline", color: "red" }}> {n} - </div>
        ))}
      </div>
      <div>
        Up neighbors:
        {upNeighborsId.map((n) => (
          <div style={{ display: "inline", color: "red" }}> {n} - </div>
        ))}
      </div>
      <div>
        Down neighbors:
        {downNeighborsId.map((n) => (
          <div style={{ display: "inline", color: "red" }}> {n} - </div>
        ))}
      </div>
      <div>
        Up-Left neighbors:
        {upLeftNeighborsId.map((n) => (
          <div style={{ display: "inline", color: "red" }}> {n} - </div>
        ))}
      </div>
      <div>
        Up-Right neighbors:
        {upRightNeighborsId.map((n) => (
          <div style={{ display: "inline", color: "red" }}> {n} - </div>
        ))}
      </div>
      <div>
        Down-Left neighbors:
        {downLeftNeighborsId.map((n) => (
          <div style={{ display: "inline", color: "red" }}> {n} - </div>
        ))}
      </div>
      <div>
        Down-Right neighbors:
        {downRightNeighborsId.map((n) => (
          <div style={{ display: "inline", color: "red" }}> {n} - </div>
        ))}
      </div>
      {!isGameStarted && !isIdenticalColor && (
        <div>
          <div>
            <label htmlFor="userColor">Select a Color for yourself</label>
            <br></br>
            <select onChange={handleUserColor} name="userColor" id="userColor">
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
      {!isGameStarted && userColor && pejmanColor && (
        <button onClick={handleStart}>Start the Game</button>
      )}
      {isIdenticalColor && (
        <div>
          <div>You can't choose an identical color for both players</div>
          <button onClick={handleOk}>Ok</button>
        </div>
      )}
      {isGameStarted && selectionErrorMessage !== "" && (
        <div>
          <div>{selectionErrorMessage}</div>
          <button onClick={handleSelectionErrorMessage}>Ok</button>
        </div>
      )}
      {freeCellsIds.map((c) => (
        <div style={{ display: "inline" }}>{c} - </div>
      ))}
      <br />
      {isGameStarted &&
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
                setIsUserTurn={setIsUserTurn}
                freeCellsIds={freeCellsIds}
                setFreeCellsIds={setFreeCellsIds}
                allowPejmanMessage={allowPejmanMessage}
                setAllowPejmanMessage={setAllowPejmanMessage}
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
                setIsUserTurn={setIsUserTurn}
                freeCellsIds={freeCellsIds}
                setFreeCellsIds={setFreeCellsIds}
                allowPejmanMessage={allowPejmanMessage}
                setAllowPejmanMessage={setAllowPejmanMessage}
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
              />
              <br />
            </div>
          ),
        )}
      <br />
      {chooseArrowMessage && isUserTurn && freeCellsIds.length < 48 && (
        <div>
          <div>Choose the path you wan to get</div>
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
      {(allowPejmanMessage || freeCellsIds.length === 48) && !pejmanChoice && (
        <div>
          Allow Pejman to make his move
          <button onClick={handleAllowPejman}>Ok</button>
        </div>
      )}
      {allowPejmanChooseDirection && 
        <div>
            <div>{`Pejman is choosing square number ${pejmanChoice + 1}`}</div>
            <button onClick={handlePejmanDirectionChoice}>Ok</button>
        </div>
      }
      {/* {isGameStarted && !isTogglingReset && !isTogglingHomePage && <ReviewSection game="Reversi" currentUser={currentUser} />} */}
    </div>
  );
}
