import { useState } from "react";
import Bowl from "./Bowl";
import { getRandNum } from "../utils";

export default function Bowls({
  isFillingTheBowlsByUserFinished,
  setIsFillingTheBowlsByUserFinished,
  isFillingTheBowlsByPejmanFinished,
  setIsFillingTheBowlsByPejmanFinished,
  isGameStarted,
}) {
  const [bowls, setBowls] = useState([
    { bowlId: 1, bowlName: "bowl1", ballsNum: 0, isBowlSelected: false },
    { bowlId: 2, bowlName: "bowl2", ballsNum: 0, isBowlSelected: false },
    { bowlId: 3, bowlName: "bowl3", ballsNum: 0, isBowlSelected: false },
    { bowlId: 4, bowlName: "bowl4", ballsNum: 0, isBowlSelected: false },
    { bowlId: 5, bowlName: "bowl5", ballsNum: 0, isBowlSelected: false },
    { bowlId: 6, bowlName: "bowl6", ballsNum: 0, isBowlSelected: false },
    { bowlId: 7, bowlName: "bowl7", ballsNum: 0, isBowlSelected: false },
    { bowlId: 8, bowlName: "bowl8", ballsNum: 0, isBowlSelected: false },
    { bowlId: 9, bowlName: "bowl9", ballsNum: 0, isBowlSelected: false },
    { bowlId: 10, bowlName: "bowl10", ballsNum: 0, isBowlSelected: false },
  ]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBowls((currBowls) =>
      currBowls.map((bowl) =>
        bowl.bowlName === name ? { ...bowl, ballsNum: Number(value) } : bowl
      )
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFillingTheBowlsByUserFinished(true);
  };
  const startFillingPejmanBowls = () => {
    setBowls((currBowls) =>
      currBowls.map((bowl, idx) =>
        idx > 4 ? { ...bowl, ballsNum: getRandNum(7) } : bowl
      )
    );
    setIsFillingTheBowlsByPejmanFinished(true);
  };
  return (
    <div>
      {!isFillingTheBowlsByUserFinished && (
        <form onSubmit={handleSubmit}>
          {Array(5)
            .fill(null)
            .map((bowl, idx) => (
              <div>
                <label htmlFor={`bowl${idx + 1}`}></label>
                {`Select the number of balls for bowl ${idx + 1}`}
                <select
                  onChange={handleChange}
                  name={`bowl${idx + 1}`}
                  id={`bowl${idx + 1}`}
                >
                  <option value={bowls[idx].ballsNum} disabled selected>
                    {`bowl ${idx + 1}`}
                  </option>
                  {Array.from({ length: 7 }, (_, i) => i + 1).map((o) => (
                    <option>{o}</option>
                  ))}
                </select>
              </div>
            ))}
          <button>Done</button>
        </form>
      )}
      {bowls.map(
        (bowl, idx) =>
          idx < 5 && (
            <Bowl
              bowlId={bowl.bowlId}
              bowlName={bowl.bowlName}
              ballsNum={bowl.ballsNum}
              isBowlSelected={bowl.isBowlSelected}
              isGameStarted={isGameStarted}
            />
          )
      )}
      {bowls.map(
        (bowl, idx) =>
          idx >= 5 &&
          isFillingTheBowlsByPejmanFinished && (
            <Bowl
              bowlId={bowl.bowlId}
              bowlName={bowl.bowlName}
              ballsNum={bowl.ballsNum}
              isBowlSelected={bowl.isBowlSelected}
              isGameStarted={isGameStarted}
            />
          )
      )}
      <br></br>
      {isFillingTheBowlsByUserFinished &&
        !isFillingTheBowlsByPejmanFinished && (
          <button onClick={startFillingPejmanBowls}>
            See how Pejman fills his bowls
          </button>
        )}
    </div>
  );
}
