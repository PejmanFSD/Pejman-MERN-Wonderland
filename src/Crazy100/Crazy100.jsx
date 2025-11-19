import { useState } from "react";

export default function Crazy100() {
  const [nums, setNums] = useState([
    { number: "", row: "", col: "" },
    { number: "", row: "", col: "" },
    { number: "", row: "", col: "" },
    { number: "", row: "", col: "" },
  ]);
  const [allNums, setAllNums] = useState(
    Array.from({ length: 33 }, (_, i) => i + 1)
  );
  const [rows, setRows] = useState(Array.from({ length: 16 }, (_, i) => i));
  const [cols, setCols] = useState(Array.from({ length: 16 }, (_, i) => i));
  const generateNums = () => {
    let copyAllNums = [...allNums];
    let copyRows = [...rows];
    let copyCols = [...cols];
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
      const newRow = copyRows[Math.floor(Math.random() * copyRows.length)];
      const newCol = copyCols[Math.floor(Math.random() * copyCols.length)];
      pickedNums.push({ number: newNum, row: newRow, col: newCol });
      copyAllNums = copyAllNums.filter((n) => n !== newNum);
      copyRows = copyRows.filter((r) => r !== newRow);
      copyCols = copyCols.filter((c) => c !== newCol);
    }
    for (let i = 0; i < 4; i++) {
      setNums((currNums) => {
        const copyNums = [...currNums];
        copyNums[i] = {
          ...copyNums[i],
          number: pickedNums[i].number,
          row: pickedNums[i].row,
          col: pickedNums[i].col,
        };
        return copyNums;
      });
    }
    setAllNums(copyAllNums);
    setRows(copyRows);
    setCols(copyCols);
  };
  return (
    <div>
      <div>
        Number1: {nums[0].number} - Row1: {nums[0].row} - Col1: {nums[0].col}
      </div>
      <div>
        Number2: {nums[1].number} - Row2: {nums[1].row} - Col2: {nums[1].col}
      </div>
      <div>
        Number3: {nums[2].number} - Row3: {nums[2].row} - Col3: {nums[2].col}
      </div>
      <div>
        Number4: {nums[3].number} - Row4: {nums[3].row} - Col4: {nums[3].col}
      </div>
      <div>
        All Numbers:{" "}
        {allNums.map((an) => (
          <div style={{ display: "inline" }}>{an}-</div>
        ))}
      </div>
      <div>
        Rows:{" "}
        {rows.map((r) => (
          <div style={{ display: "inline" }}>{r}-</div>
        ))}
      </div>
      <div>
        Cols:{" "}
        {cols.map((c) => (
          <div style={{ display: "inline" }}>{c}-</div>
        ))}
      </div>
      <button onClick={() => generateNums()}>Generate Numbers</button>
    </div>
  );
}
