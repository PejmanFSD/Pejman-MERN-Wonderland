import { useState, useEffect } from "react";
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
  const [selectedUserBowl, setSelectedUserBowl] = useState(0);
  const [userPickNum, setUserPickNum] = useState(0);
  const [selectedPejmanBowl, setSelectedPejmanBowl] = useState(-1);
  const [pejmanPickNum, setPejmanPickNum] = useState(0);
  const [allTurns, setAllTurns] = useState([]);
  const [allBallsNum, setAllBallsNum] = useState(0);

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
    setBowls((currBowls) => {
      const copyBowls = [...currBowls];
      for (let i = 5; i < 10; i++) {
        copyBowls[i] = {
          ...copyBowls[i],
          ballsNum: getRandNum(7),
        };
      }
      return copyBowls;
    });
    setIsFillingTheBowlsByPejmanFinished(true);
  };
  const handleChangeSelectedUserBowl = (e) => {
    setUserPickNum(e.target.value);
  };
  const handleUserMove = (e) => {
    e.preventDefault();
    setUnEmptyBowlsIndexes([]);
    setSelectedPejmanBowl(-1);
    setPejmanPickNum(0);
    setBowls((currBowls) =>
      currBowls.map((bowl) =>
        bowl.bowlId === selectedUserBowl
          ? { ...bowl, ballsNum: bowl.ballsNum - userPickNum }
          : bowl
      )
    );
    setAllTurns((currAllTurns) => [
      ...currAllTurns,
      { side: "User", num: userPickNum },
    ]);
    setSelectedUserBowl(0);
    setUserPickNum(0);
    toggleUserTurn();
  };
  const handlePejmanMove = () => {
    if (easyMode) {
      let copyUnEmptyBowlsIndexes = [...unEmptyBowlsIndexes];
      for (const bowl of bowls) {
        if (bowl.ballsNum > 0) {
          copyUnEmptyBowlsIndexes.push(bowls.indexOf(bowl));
        }
      }
      setUnEmptyBowlsIndexes(copyUnEmptyBowlsIndexes);
      setSelectedPejmanBowl(getRandArr(copyUnEmptyBowlsIndexes));
    }
    toggleUserTurn();
  };
  useEffect(() => {
    if (selectedPejmanBowl !== -1) {
      const currPejmanPickNum = getRandNum(
        bowls.find((b) => b.bowlId === selectedPejmanBowl + 1).ballsNum
      );
      setPejmanPickNum(currPejmanPickNum);
      setBowls((currBowls) =>
        currBowls.map((bowl) =>
          bowl.bowlId === selectedPejmanBowl + 1
            ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
            : bowl
        )
      );
      setAllTurns((currAllTurns) => [
        ...currAllTurns,
        { side: "Pejman", num: currPejmanPickNum },
      ]);
    }
  }, [selectedPejmanBowl]);

  useEffect(() => {
    setAllBallsNum(0);
    for (let i = 0; i < 10; i++) {
      setAllBallsNum((currAllBallsNum) => currAllBallsNum + bowls[i].ballsNum);
    }
  }, [bowls]);
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
                selectedUserBowl={selectedUserBowl}
                setSelectedUserBowl={setSelectedUserBowl}
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
                selectedUserBowl={selectedUserBowl}
                setSelectedUserBowl={setSelectedUserBowl}
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
      {selectedUserBowl !== 0 && isUserTurn && (
        <form onSubmit={handleUserMove}>
          <label htmlFor={selectedUserBowl.toString()}></label>
          {`You chose bowl ${selectedUserBowl}, How many balls do you want to pick from it?`}
          <select
            onChange={handleChangeSelectedUserBowl}
            name={selectedUserBowl.toString()}
            id={selectedUserBowl.toString()}
          >
            <option
              value={
                bowls.find((bowl) => bowl.bowlId === selectedUserBowl).ballsNum
              }
              disabled
              selected
            >
              ⬇️
            </option>
            {Array.from(
              {
                length: bowls.find((bowl) => bowl.bowlId === selectedUserBowl)
                  .ballsNum,
              },
              (_, i) => i + 1
            ).map((o) => (
              <option value={o > 1 ? o : 1}>{o}</option>
            ))}
          </select>
          <br></br>
          {isUserTurn && userPickNum > 0 && <button>Done</button>}
        </form>
      )}
      {!selectedUserBowl && isGameStarted && isUserTurn && (
        <div>Choose one of the un-empty bowls and pick ball(s) from it</div>
      )}
      {isGameStarted && !isUserTurn && (
        <div>
          Allow Pejman to choose one of the un-empty bowls
          <button onClick={handlePejmanMove}>Ok</button>
        </div>
      )}
      <div>User PickNum: {userPickNum}</div>
      <div>
        UnEmptyBowlsIndexes:{" "}
        {unEmptyBowlsIndexes.map((b) => (
          <div>{b}</div>
        ))}
      </div>
      <div>PejmanBowl: {selectedPejmanBowl}</div>
      <div>PejmanPickNum: {pejmanPickNum}</div>
      <div>{isUserTurn ? "User's turn" : "Pejman's turn"}</div>
      <div>
        {allTurns.map((b) => (
          <div>
            {b.side} - {b.num}
          </div>
        ))}
      </div>
      <div>All Balls Num: {allBallsNum}</div>
    </div>
  );
}
