export default function Cell({value, color}) {
    return (
        <div
            style={{
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