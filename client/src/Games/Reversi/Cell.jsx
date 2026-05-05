import White from "./images/White.jpg";

export default function Cell({
  id,
  src,
  isSelected,
  userColor,
  cells,
  setCells,
  selectedCellsNum,
  setSelectedCellsNum,
  selectionErrorMessage,
  setSelectionErrorMessage,
  isUserTurn,
  setIsUserTurn,
  setFreeCellsIds,
  allowPejmanMessage,
  setAllowPejmanMessage,
  creatingNeighbors
}) {
    const isAtLeastOneNeighborSelected = (cellId) => {
        if ([8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 29, 30, 31, 32, 33, 36, 37, 38, 39, 40].includes(cellId)) {
            if (
                !cells.find(c => c.id === cellId - 1).isSelected &&
                !cells.find(c => c.id === cellId + 1).isSelected &&
                !cells.find(c => c.id === cellId - 7).isSelected &&
                !cells.find(c => c.id === cellId + 7).isSelected &&
                !cells.find(c => c.id === cellId - 8).isSelected &&
                !cells.find(c => c.id === cellId + 8).isSelected &&
                !cells.find(c => c.id === cellId - 6).isSelected &&
                !cells.find(c => c.id === cellId + 6).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
        else if ([1, 2, 3, 4, 5].includes(cellId)) {
            if (
                !cells.find(c => c.id === cellId - 1).isSelected &&
                !cells.find(c => c.id === cellId + 1).isSelected &&
                !cells.find(c => c.id === cellId + 7).isSelected &&
                !cells.find(c => c.id === cellId + 8).isSelected &&
                !cells.find(c => c.id === cellId + 6).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
        else if ([43, 44, 45, 46, 47].includes(cellId)) {
            if (
                !cells.find(c => c.id === cellId - 1).isSelected &&
                !cells.find(c => c.id === cellId + 1).isSelected &&
                !cells.find(c => c.id === cellId - 7).isSelected &&
                !cells.find(c => c.id === cellId - 8).isSelected &&
                !cells.find(c => c.id === cellId - 6).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
        else if ([7, 14, 21, 28, 35].includes(cellId)) {
            if (
                !cells.find(c => c.id === cellId - 7).isSelected &&
                !cells.find(c => c.id === cellId + 7).isSelected &&
                !cells.find(c => c.id === cellId + 1).isSelected &&
                !cells.find(c => c.id === cellId + 8).isSelected &&
                !cells.find(c => c.id === cellId - 6).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
        else if ([13, 20, 27, 34, 41].includes(cellId)) {
            if (
                !cells.find(c => c.id === cellId - 7).isSelected &&
                !cells.find(c => c.id === cellId + 7).isSelected &&
                !cells.find(c => c.id === cellId - 1).isSelected &&
                !cells.find(c => c.id === cellId - 8).isSelected &&
                !cells.find(c => c.id === cellId + 6).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
        else if (cellId === 0) {
            if (
                !cells.find(c => c.id === 1).isSelected &&
                !cells.find(c => c.id === 7).isSelected &&
                !cells.find(c => c.id === 8).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
        else if (cellId === 6) {
            if (
                !cells.find(c => c.id === 5).isSelected &&
                !cells.find(c => c.id === 12).isSelected &&
                !cells.find(c => c.id === 13).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
        else if (cellId === 42) {
            if (
                !cells.find(c => c.id === 35).isSelected &&
                !cells.find(c => c.id === 36).isSelected &&
                !cells.find(c => c.id === 43).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
        else if (cellId === 48) {
            if (
                !cells.find(c => c.id === 40).isSelected &&
                !cells.find(c => c.id === 41).isSelected &&
                !cells.find(c => c.id === 47).isSelected
            ) {
                return false;
            } else {
                return true;
            }
        }
    }
  const handleClickCell = () => {
    if (selectedCellsNum === 0 && ![16, 17, 18, 23, 24, 25, 30, 31, 32].includes(id)) {
        setSelectionErrorMessage("For the start of the game, you should select one of the 9 central squares!");
        return;
    }
    else if (selectedCellsNum > 0 && !isAtLeastOneNeighborSelected(id)) {
        setSelectionErrorMessage("You should select a square that has at least one selected neighbor!");
        return;
    }
    setCells((currCells) =>
      currCells.map((c) =>
        c.id === id ? { ...c, src: userColor, isSelected: true } : c,
      ),
    );
    creatingNeighbors(id);
    setSelectedCellsNum(currSelectedCellsNum => currSelectedCellsNum + 1);
    setFreeCellsIds(currFreeCellsIds => currFreeCellsIds.filter(c => c !== id));
    setAllowPejmanMessage(true);
  };
  return (
    <img
      src={src}
      onClick={handleClickCell}
      width={selectionErrorMessage === "" ? "40px" : "25px"}
      border=
      {selectionErrorMessage === "For the start of the game, you should select one of the 9 central squares!"
        && [16, 17, 18, 23, 24, 25, 30, 31, 32].includes(id) ?
        "3px solid black" : "1px solid black"
      }
      style={{
        margin: "2px",
        boxSizing: "border-box",
        pointerEvents: selectionErrorMessage === "" && isUserTurn && src === White && !allowPejmanMessage ? "" : "none"
      }}
    />
  );
}
