export default function Cell({value, userColor}) {
    return (
        <div style={{width: "25px", height: "25px", border: "1px solid black", color: userColor}}>{value}</div>
    )
}