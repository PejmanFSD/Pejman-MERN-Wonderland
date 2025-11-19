import { useState } from "react";

export default function Crazy100() {
  const [nums, setNums] = useState([
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
    { number: "", blockNum: "" },
  ]);
  const [allNums, setAllNums] = useState(
    Array.from({ length: 33 }, (_, i) => i + 1)
  );
  const [blockNums, setBlockNums] = useState(
    Array.from({ length: 16 }, (_, i) => i)
  );
  const generateNums = () => {
    let copyAllNums = [...allNums];
    let copyblockNums = [...blockNums];
    let pickedNums = [];
    for (let i = 0; i < 4; i++) {
      let newNum;
      if (i !== 3) {
        newNum = copyAllNums[Math.floor(Math.random() * copyAllNums.length)];
      }
      if (i === 3) {
        newNum =
          100 -
          pickedNums[0].number -
          pickedNums[1].number -
          pickedNums[2].number;
      }
      const newBlockNums =
        copyblockNums[Math.floor(Math.random() * copyblockNums.length)];
      pickedNums.push({ number: newNum, blockNum: newBlockNums });
      copyAllNums = copyAllNums.filter((n) => n !== newNum);
      copyblockNums = copyblockNums.filter((r) => r !== newBlockNums);
    }
    for (let i = 0; i < 4; i++) {
      setNums((currNums) => {
        const copyNums = [...currNums];
        copyNums[i] = {
          ...copyNums[i],
          number: pickedNums[i].number,
          blockNum: pickedNums[i].blockNum,
        };
        return copyNums;
      });
    }
    setAllNums(copyAllNums);
    setBlockNums(copyblockNums);
  };
  return (
    <div>
      <div>
        Number1: {nums[0].number} - BlockNum1: {nums[0].blockNum}
      </div>
      <div>
        Number2: {nums[1].number} - BlockNum2: {nums[1].blockNum}
      </div>
      <div>
        Number3: {nums[2].number} - BlockNum3: {nums[2].blockNum}
      </div>
      <div>
        Number4: {nums[3].number} - BlockNum4: {nums[3].blockNum}
      </div>
      <div>
        All Numbers:{" "}
        {allNums.map((n) => (
          <div style={{ display: "inline" }}>{n}-</div>
        ))}
      </div>
      <div>
        BlockNums:{" "}
        {blockNums.map((b) => (
          <div style={{ display: "inline" }}>{b}-</div>
        ))}
      </div>
      <button onClick={() => generateNums()}>Generate Numbers</button>
    </div>
  );
}
