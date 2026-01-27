export default function Square({easyMode}) {
    return (
        <button
        style={{
            display: "inline",
            border: "1px solid black",
            margin: "5px",
            width: easyMode ? "80px" : "40px",
            height: easyMode ? "80px" : "40px",
            position: "relative",
            top: "20px",
            backgroundColor: "rgba(0, 0, 255, 1)"
            }}
        >
        </button>
    )
}