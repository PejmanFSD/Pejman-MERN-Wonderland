export default function PejmanCell({value, owner, isSelected, finalMessage, isWinnerCell}) {
    return (
        <div
            disabled // Pejman's cells are always disabled for the user to click
            style={{
                pointerEvents: "none", // Pejman's cells are always disabled for the user to click
                // The backgroundColor is gray if the cell has been selected or white if it's not selected
                backgroundColor:
                    isSelected ? "gray" :
                    "white",
                width: "30px",
                height: "30px",
                fontSize: "11px",
                // The border of the cell changes if Pejman wins the game
                border: isWinnerCell ? "5px solid black" : "1px solid black",
                boxSizing: "border-box",
                color: "black",
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