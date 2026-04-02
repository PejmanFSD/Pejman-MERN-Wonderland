export default function PejmanCell({value, owner, isSelected}) {
    return (
        <div
            disabled
            style={{
                pointerEvents: "none",
                backgroundColor:
                    isSelected ? "gray" :
                    "white",
                width: "25px",
                height: "25px",
                fontSize: "11px",
                border: "1px solid black",
                color: "black",
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