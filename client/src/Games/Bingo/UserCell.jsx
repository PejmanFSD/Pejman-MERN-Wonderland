export default function UserCell({
    value,
    owner,
    isSelected,
    isClicked,
    isWinnerCell,
    color,
    selectedNums,
    nums,
    user1Nums,
    user2Nums,
    user3Nums,
    setUser1Nums,
    setUser2Nums,
    setUser3Nums,
    setYouMissedMessage,
    finalMessage
}) {
    // the function when the cell is clicked
    const handleClickCell = () => {
        setYouMissedMessage(false);
        // Changing the values of "isSelected" and "isClicked" of the cell if it's in the first board:
        if (nums === user1Nums) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((n) =>
                n.num === value ? {...n, isSelected: true, isClicked: true} : n
            ));
        }
        // Changing the values of "isSelected" and "isClicked" of the cell if it's in the second board:
        else if (nums === user2Nums) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((n) =>
                n.num === value ? {...n, isSelected: true, isClicked: true} : n
            ));
        }
        // Changing the values of "isSelected" and "isClicked" of the cell if it's in the third board:
        else if (nums === user3Nums) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((n) =>
                n.num === value ? {...n, isSelected: true, isClicked: true} : n
            ));
        }
    }
    return (
        <div
            onClick={handleClickCell}
            style={{
                cursor: "pointer", // Changing the shape of the mouse when it's been hovered on the cell
                // Disabling the cell in 3 conditions:
                pointerEvents: (!selectedNums.includes(value) || owner === "Pejman" || (isSelected && !isClicked)) && "none",
                // The color of the cell:
                backgroundColor:
                    // The user's color if it's been selected and clicked:
                    (selectedNums.includes(value) && isSelected === true && isClicked === true) ? color :
                    // "lightgray" if it's been selected but not clicked after clicking on the "New Number" button:
                    (selectedNums.includes(value) && isSelected === true && isClicked === false) ? "lightgray" :
                    // "yellow" if it's been selected but not clicked before clicking on the "New Number" button:
                    (selectedNums.includes(value) && isSelected === false && isClicked === false) ? "yellow" :
                    // "white" if it's been neither selected nor clicked
                    "white",
                width: "30px",
                height: "30px",
                fontSize: "11px",
                // The border of the cell changes if user wins the game
                border: isWinnerCell ? "5px solid black" : "1px solid black",
                boxSizing: "border-box",
                // The font color of the cell:
                // "gray" if it's been selected but not clicked after clicking on the "New Number" button:
                color: (selectedNums.includes(value) && isSelected === true && isClicked === false) ? "gray" :
                // "white" if it's been selected and clicked:
                    (selectedNums.includes(value) && isSelected === true && isClicked === true) ? "white" :
                // The user's color in any other condition:
                color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1px",
                // The opacity of the cell changes if the game finishes
                opacity: (finalMessage !== "" && isWinnerCell) || finalMessage === "" ? "1" : "0.3"
            }}
        >
            {value}
        </div>
    )
}