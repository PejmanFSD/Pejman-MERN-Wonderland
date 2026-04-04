export default function PejmanCell({value, owner, isSelected, finalMessage, isWinnerCell}) {
    return (
        <div
            disabled
            style={{
                pointerEvents: "none",
                backgroundColor:
                    isSelected ? "gray" :
                    "white",
                width: "30px",
                height: "30px",
                fontSize: "11px",
                border: isWinnerCell ? "5px solid black" : "1px solid black",
                boxSizing: "border-box",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1px",
                opacity: (finalMessage !== "" && isWinnerCell) || finalMessage === "" ? "1" : "0.3"
            }}
        >
            {value}
        </div>
    )
}