import { useState } from "react";
import Bowl from "./Bowl";
import { getRandNum, getRandArr } from "../utils";

export default function Bowls({
  isFillingTheBowlsByUserFinished,
  setIsFillingTheBowlsByUserFinished,
  isFillingTheBowlsByPejmanFinished,
  setIsFillingTheBowlsByPejmanFinished,
  isGameStarted,
  easyMode,
  isUserTurn,
  toggleUserTurn,
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
  const [unEmptyBowlsIndexes, setUnEmptyBowlsIndexes] = useState([]);
  const [selectedBowl, setSelectedBowl] = useState(0);
  const [pickNum, setPickNum] = useState(0);
  const [pejmanBowl, setPejmanBowl] = useState(0);

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
  const handleChangeSelectedBowl = (e) => {
    setPickNum(e.target.value);
  };
  const handleSubmitSelectedBowl = (e) => {
    e.preventDefault();
    setBowls((currBowls) =>
      currBowls.map((bowl) =>
        bowl.bowlId === selectedBowl && bowl.ballsNum === 1
          ? { ...bowl, ballsNum: bowl.ballsNum - 1 }
          : bowl.bowlId === selectedBowl && bowl.ballsNum > 1
          ? { ...bowl, ballsNum: bowl.ballsNum - pickNum }
          : bowl
      )
    );
    toggleUserTurn();
  };
  const allowPejman = () => {
    toggleUserTurn();
    if (easyMode) {
      let copyUnEmptyBowlsIndexes = [...unEmptyBowlsIndexes];
      for (const bowl of bowls) {
        if (bowl.ballsNum > 0) {
          copyUnEmptyBowlsIndexes.push(bowls.indexOf(bowl));
        }
      }
      setUnEmptyBowlsIndexes(copyUnEmptyBowlsIndexes);
      setPejmanBowl(getRandArr(copyUnEmptyBowlsIndexes));
    }
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
          <button
            disabled={
              bowls[0].ballsNum === 0 ||
              bowls[1].ballsNum === 0 ||
              bowls[2].ballsNum === 0 ||
              bowls[3].ballsNum === 0 ||
              bowls[4].ballsNum === 0
            }
          >
            Done
          </button>
        </form>
      )}
      <div>
        {bowls.map(
          (bowl, idx) =>
            idx < 5 && (
              <Bowl
                bowlId={bowl.bowlId}
                bowlName={bowl.bowlName}
                ballsNum={bowl.ballsNum}
                isBowlSelected={bowl.isBowlSelected}
                isGameStarted={isGameStarted}
                setBowls={setBowls}
                selectedBowl={selectedBowl}
                setSelectedBowl={setSelectedBowl}
                isUserTurn={isUserTurn}
              />
            )
        )}
      </div>
      <div>
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
                setBowls={setBowls}
                selectedBowl={selectedBowl}
                setSelectedBowl={setSelectedBowl}
                isUserTurn={isUserTurn}
              />
            )
        )}
      </div>
      <br></br>
      {isFillingTheBowlsByUserFinished &&
        !isFillingTheBowlsByPejmanFinished && (
          <button onClick={startFillingPejmanBowls}>
            Allow Pejman fills his bowls
          </button>
        )}
      {selectedBowl !== 0 && isUserTurn && (
        <form onSubmit={handleSubmitSelectedBowl}>
          <label htmlFor={selectedBowl.toString()}></label>
          {bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum !== 1 &&
            bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum > 0 &&
            `You chose bowl ${selectedBowl}, How many balls do you want to pick from it?`}
          {bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum === 1 &&
            `You chose bowl ${selectedBowl}, which has only one ball in it!`}
          {bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum !== 1 &&
            bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum > 0 && (
              <select
                onChange={handleChangeSelectedBowl}
                name={selectedBowl.toString()}
                id={selectedBowl.toString()}
              >
                <option
                  value={
                    bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum
                  }
                  disabled
                  selected
                >
                  ⬇️
                </option>
                {bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum !==
                  1 &&
                  Array.from(
                    {
                      length: bowls.find((bowl) => bowl.bowlId === selectedBowl)
                        .ballsNum,
                    },
                    (_, i) => i + 1
                  ).map((o) => <option>{o}</option>)}
              </select>
            )}
          <br></br>
          {bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum > 0 &&
            isUserTurn && (
              <button>
                {bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum >
                  1 && "Done"}
                {bowls.find((bowl) => bowl.bowlId === selectedBowl).ballsNum ===
                  1 &&
                  `Pick the last single remaining ball of bowl ${selectedBowl}`}
              </button>
            )}
        </form>
      )}
      {!selectedBowl && isGameStarted && isUserTurn && (
        <div>Choose one of the un-empty bowls and pick ball(s) from it</div>
      )}
      {isGameStarted && !isUserTurn && (
        <div>
          Allow Pejman to choose one of the un-empty bowls and pick ball(s) from
          it
          <button onClick={allowPejman}>Ok</button>
        </div>
      )}
      <div>PickNum: {pickNum}</div>
      <div>
        UnEmptyBowlsIndexes:{" "}
        {unEmptyBowlsIndexes.map((b) => (
          <div>{b}</div>
        ))}
      </div>
      <div>PejmanBowl: {pejmanBowl}</div>
    </div>
  );
}
