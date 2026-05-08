import White from "./images/White.jpg";

export default function Cell({
  id,
  src,
  isSelected,
  userColor,
  cells,
  setCells,
  pejmanColor,
  selectedCellsNum,
  setSelectedCellsNum,
  selectionErrorMessage,
  setSelectionErrorMessage,
  isUserTurn,
  setIsUserTurn,
  freeCellsIds,
  setFreeCellsIds,
  allowPejmanMessage,
  setAllowPejmanMessage,
  creatingNeighbors,
  chooseArrowMessage,
  setChooseArrowMessage,
  isAtLeastOneNeighborSelected,
  leftNeighborsId,
  rightNeighborsId,
  upNeighborsId,
  downNeighborsId,
  upLeftNeighborsId,
  upRightNeighborsId,
  downLeftNeighborsId,
  downRightNeighborsId,
  pejmanChoice,
  setPejmanChoice,
}) {
  const handleClickCell = () => {
    setPejmanChoice(null);
    if (
      selectedCellsNum === 0 &&
      ![16, 17, 18, 23, 24, 25, 30, 31, 32].includes(id)
    ) {
      setSelectionErrorMessage(
        "For the start of the game, you should select one of the 9 central squares!",
      );
      return;
    } else if (selectedCellsNum > 0 && !isAtLeastOneNeighborSelected(id)) {
      setSelectionErrorMessage(
        "You should select a square that has at least one selected neighbor!",
      );
      return;
    }
    setCells((currCells) =>
      currCells.map((c) =>
        c.id === id ? { ...c, src: userColor, isSelected: true } : c,
      ),
    );
    creatingNeighbors(id, pejmanColor);
    setSelectedCellsNum((currSelectedCellsNum) => currSelectedCellsNum + 1);
    setFreeCellsIds((currFreeCellsIds) =>
      currFreeCellsIds.filter((c) => c !== id),
    );
    setChooseArrowMessage(true);
  };
  return (
    <img
      src={src}
      onClick={handleClickCell}
      width={selectionErrorMessage === "" ? "40px" : "25px"}
      border={
        selectionErrorMessage ===
          "For the start of the game, you should select one of the 9 central squares!" &&
        [16, 17, 18, 23, 24, 25, 30, 31, 32].includes(id)
          ? "3px solid black"
          : leftNeighborsId.includes(id) ||
              rightNeighborsId.includes(id) ||
              upNeighborsId.includes(id) ||
              downNeighborsId.includes(id) ||
              upLeftNeighborsId.includes(id) ||
              upRightNeighborsId.includes(id) ||
              downLeftNeighborsId.includes(id) ||
              downRightNeighborsId.includes(id)
            ? "3px solid black"
            : id === pejmanChoice
              ? "3px solid gray"
              : "1px solid black"
      }
      style={{
        margin: "2px",
        boxSizing: "border-box",
        pointerEvents:
          selectionErrorMessage === "" &&
          isUserTurn &&
          src === White &&
          !allowPejmanMessage
            ? ""
            : "none",
      }}
    />
  );
}
