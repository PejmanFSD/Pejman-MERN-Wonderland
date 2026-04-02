export default function UserCell({value, owner, isSelected, color, selectedNums, nums, user1Nums, user2Nums, user3Nums, setUser1Nums, setUser2Nums, setUser3Nums}) {
    const handleClickCell = () => {
        if (nums === user1Nums) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((n) =>
                n.num === value ? {...n, isSelected: true} : n
            ));
        } else if (nums === user2Nums) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((n) =>
                n.num === value ? {...n, isSelected: true} : n
            ));
        } else if (nums === user3Nums) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((n) =>
                n.num === value ? {...n, isSelected: true} : n
            ));
        }
    }
    return (
        <div
            onClick={handleClickCell}
            disabled={selectedNums.includes(value)}
            style={{
                pointerEvents: (!selectedNums.includes(value) || owner === "Pejman") && "none",
                backgroundColor:
                    (selectedNums.includes(value) && isSelected) ? color :
                    (selectedNums.includes(value) && !isSelected) ? "yellow" :
                    "white",
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