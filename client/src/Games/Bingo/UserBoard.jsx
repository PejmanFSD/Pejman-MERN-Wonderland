import UserCell from "./UserCell";

export default function UserBoard({
  nums,
  color,
  selectedNums,
  user1Nums,
  user2Nums,
  user3Nums,
  setUser1Nums,
  setUser2Nums,
  setUser3Nums,
  setYouMissedMessage,
  finalMessage
}) {
  return (
    <div>
      {
        <div
          style={{
            position: "relative",
            top: "5px",
            display: "grid",
            gridTemplateColumns: "repeat(5, auto)",
            justifyContent: "center",
          }}
        >
          {new Array(25).fill(null).map((cell, idx) => (
            <UserCell
                value={nums[idx].num}
                owner={nums[idx].owner}
                isSelected={nums[idx].isSelected}
                isClicked={nums[idx].isClicked}
                isWinnerCell={nums[idx].isWinnerCell}
                color={color}
                selectedNums={selectedNums}
                nums={nums}
                user1Nums={user1Nums}
                user2Nums={user2Nums}
                user3Nums={user3Nums}
                setUser1Nums={setUser1Nums}
                setUser2Nums={setUser2Nums}
                setUser3Nums={setUser3Nums}
                setYouMissedMessage={setYouMissedMessage}
                finalMessage={finalMessage}
            />
          ))}
        </div>
      }
    </div>
  );
}
