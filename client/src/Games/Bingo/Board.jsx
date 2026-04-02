import Cell from "./Cell";

export default function Board({ nums, color, selectedNums, user1Nums, user2Nums, user3Nums, setUser1Nums, setUser2Nums, setUser3Nums }) {
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
            <Cell
                value={nums[idx].num}
                owner={nums[idx].owner}
                isClicked={nums[idx].isClicked}
                color={color}
                selectedNums={selectedNums}
                nums={nums}
                user1Nums={user1Nums}
                user2Nums={user2Nums}
                user3Nums={user3Nums}
                setUser1Nums={setUser1Nums}
                setUser2Nums={setUser2Nums}
                setUser3Nums={setUser3Nums}
            />
          ))}
        </div>
      }
    </div>
  );
}
