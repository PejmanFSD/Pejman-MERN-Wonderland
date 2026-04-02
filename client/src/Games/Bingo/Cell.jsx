export default function Cell({value, color, selectedNums}) {
    const handleClickCell = () => {
        console.log(`Clicked on ${value}`);
    }
    return (
        <div
            onClick={handleClickCell}
            disabled={selectedNums.includes(value)}
            style={{
                pointerEvents: !selectedNums.includes(value) && "none",
                backgroundColor: selectedNums.includes(value) ? "yellow" : "white",
                width: "25px",
                height: "25px",
                fontSize: "11px",
                border: "1px solid black",
                color: color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1px"
            }}
        >
            {value}
        </div>
    )
}