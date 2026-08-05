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
          {/* Rendering 25 cells (5 x 5) of <UserCell /> components */}
          {new Array(25).fill(null).map((cell, idx) => (
            // idxth cell
            <UserCell
                value={nums[idx].num} // The value of the idxth element of the "nums" array
                owner={nums[idx].owner} // The owner of the cell (User)
                isSelected={nums[idx].isSelected} // The selection status of the cell
                isClicked={nums[idx].isClicked} // The clicked status of the cell
                isWinnerCell={nums[idx].isWinnerCell} // The winning status of the cell
                color={color} // The color of the cell (based on its status)
                selectedNums={selectedNums}
                nums={nums}
                user1Nums={user1Nums} // The numbers of the user's first board
                user2Nums={user2Nums} // The numbers of the user's second board
                user3Nums={user3Nums} // The numbers of the user's third board
                setUser1Nums={setUser1Nums}
                setUser2Nums={setUser2Nums}
                setUser3Nums={setUser3Nums}
                setYouMissedMessage={setYouMissedMessage}
                finalMessage={finalMessage}
                key={idx}
            />
          ))}
        </div>
      }
    </div>
  );
}
