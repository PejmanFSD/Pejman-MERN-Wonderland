export default function UserCell({
    value,
    owner,
    isSelected,
    isClicked,
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

}) {
    const handleClickCell = () => {
        setYouMissedMessage(false);
        if (nums === user1Nums) {
            setUser1Nums((currUser1Nums) => currUser1Nums.map((n) =>
                n.num === value ? {...n, isSelected: true, isClicked: true} : n
            ));
        } else if (nums === user2Nums) {
            setUser2Nums((currUser2Nums) => currUser2Nums.map((n) =>
                n.num === value ? {...n, isSelected: true, isClicked: true} : n
            ));
        } else if (nums === user3Nums) {
            setUser3Nums((currUser3Nums) => currUser3Nums.map((n) =>
                n.num === value ? {...n, isSelected: true, isClicked: true} : n
            ));
        }
    }
    return (
        <div
            onClick={handleClickCell}
            style={{
                pointerEvents: (!selectedNums.includes(value) || owner === "Pejman" || (isSelected && !isClicked)) && "none",
                backgroundColor:
                    (selectedNums.includes(value) && isSelected === true && isClicked === true) ? color :
                    (selectedNums.includes(value) && isSelected === true && isClicked === false) ? "lightgray" :
                    (selectedNums.includes(value) && isSelected === false && isClicked === false) ? "yellow" :
                    "white",
                width: "25px",
                height: "25px",
                fontSize: "11px",
                border: "1px solid black",
                color: (selectedNums.includes(value) && isSelected === true && isClicked === false) ? "gray" : color,
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