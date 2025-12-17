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
  normalMode,
  standard,
  misere,
  isUserTurn,
  toggleUserTurn,
  updateTotalPoint
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
  const [pejmanNormalModeCondition, setPejmanNormalModeCondition] = useState(0);
  const [allTurns, setAllTurns] = useState([]);
  const [allBallsNum, setAllBallsNum] = useState(0);
  const [isWin, setIsWin] = useState("");

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
      { side: "User", bowlNum: selectedUserBowl, ballsNum: userPickNum },
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
    } else if (normalMode) {
      setPejmanNormalModeCondition(0);
      let minFourBalls = 0;
      let minThreeBalls = 0;
      let minTwoBalls = 0;
      let oneBall = 0;
      for (const bowl of bowls) {
        if (bowl.ballsNum === 1) {
          oneBall += 1;
        }
        if (bowl.ballsNum >= 2 || bowl.ballsNum >= 3 || bowl.ballsNum >= 4) {
          minTwoBalls += 1;
        }
        if (bowl.ballsNum >= 3 || bowl.ballsNum >= 4) {
          minThreeBalls += 1;
        }
        if (bowl.ballsNum >= 4) {
          minFourBalls += 1;
        }
      }
      // console.log("minFourBalls: ", minFourBalls);
      // console.log("minThreeBalls: ", minThreeBalls);
      // console.log("minTwoBalls: ", minTwoBalls);
      // console.log("oneBall: ", oneBall);
      const potentialBowls = [];
      if (minFourBalls >= 2) { // Condition 1
        setPejmanNormalModeCondition(1);
        console.log("Condition 1");
        for (const bowl of bowls) {
          if (bowl.ballsNum >= 4) {
            potentialBowls.push(bowl);
          }
        }
        const sortedpotentialBowls = [...potentialBowls].sort(
          (a, b) => a.ballsNum - b.ballsNum
        );
        console.log("C1-potentialBowls: ", potentialBowls);
        console.log("C1-sortedpotentialBowls: ", sortedpotentialBowls);
        setSelectedPejmanBowl(
          bowls.indexOf(bowls.find(currBowl => currBowl.bowlId === sortedpotentialBowls[0].bowlId))
        )
      } else if (minFourBalls === 1 && minThreeBalls >= 2) { // Condition 2
        setPejmanNormalModeCondition(2);
        console.log("Condition 2");
        for (const bowl of bowls) {
          if (bowl.ballsNum >= 3) {
            potentialBowls.push(bowl);
          }
        }
        const sortedpotentialBowls = [...potentialBowls].sort(
          (a, b) => a.ballsNum - b.ballsNum
        );
        console.log("C2-potentialBowls: ", potentialBowls);
        console.log("C2-sortedpotentialBowls: ", sortedpotentialBowls);
        setSelectedPejmanBowl(
          bowls.indexOf(bowls.find(currBowl => currBowl.bowlId === sortedpotentialBowls[0].bowlId))
        )
      } else if (
        (minFourBalls === 1 && minThreeBalls === 2) ||
        (minFourBalls === 0 && minThreeBalls >= 2) ||
        (minFourBalls === 0 && minThreeBalls === 1) ||
        (minFourBalls === 0 && minThreeBalls === 1 && minTwoBalls === 1 && oneBall > 2)
      ) { // Condition 3
        setPejmanNormalModeCondition(3);
        console.log("Condition 3");
        for (const bowl of bowls) {
          if (bowl.ballsNum >= 3) {
            potentialBowls.push(bowl);
          }
        }
        const sortedpotentialBowls = [...potentialBowls].sort(
          (a, b) => a.ballsNum - b.ballsNum
        );
        console.log("C3-potentialBowls: ", potentialBowls);
        console.log("C3-sortedpotentialBowls: ", sortedpotentialBowls);
        setSelectedPejmanBowl(
          bowls.indexOf(bowls.find(currBowl => currBowl.bowlId === sortedpotentialBowls[0].bowlId))
        )
      } else if (
        (minFourBalls === 1 && minThreeBalls === 1 && minTwoBalls > 2) ||
        (minFourBalls === 0 && minThreeBalls === 1 && minTwoBalls === 2 && oneBall <= 2) ||
        (minFourBalls === 0 && minThreeBalls === 0 && minTwoBalls >= 2 && oneBall <= 2)
      ) { // Condition 4
        setPejmanNormalModeCondition(4);
        console.log("Condition 4");
        for (const bowl of bowls) {
          if (bowl.ballsNum >= 2) {
            potentialBowls.push(bowl);
          }
        }
        const sortedpotentialBowls = [...potentialBowls].sort(
          (a, b) => a.ballsNum - b.ballsNum
        );
        console.log("C4-potentialBowls: ", potentialBowls);
        console.log("C4-sortedpotentialBowls: ", sortedpotentialBowls);
        setSelectedPejmanBowl(
          bowls.indexOf(bowls.find(currBowl => currBowl.bowlId === sortedpotentialBowls[0].bowlId))
        )
      } else if (minFourBalls === 1 && minThreeBalls === 1 && minTwoBalls === 2) { // Condition 5
        setPejmanNormalModeCondition(5);
        console.log("Condition 5");
        for (const bowl of bowls) {
          if (bowl.ballsNum >= 4) {
            potentialBowls.push(bowl);
          }
        }
        console.log("C5-potentialBowls: ", potentialBowls);
        setSelectedPejmanBowl(
          bowls.indexOf(bowls.find(currBowl => currBowl.bowlId === potentialBowls[0].bowlId))
        )
      } else if (
        (minFourBalls === 1 && minThreeBalls === 1 && minTwoBalls === 1 && oneBall % 2 === 1 && standard) ||
        (minFourBalls === 1 && minThreeBalls === 1 && minTwoBalls === 1 && oneBall % 2 === 0 && misere)
      ) { // Condition 6
        setPejmanNormalModeCondition(6);
        console.log("Condition 6");
        for (const bowl of bowls) {
          if (bowl.ballsNum >= 4) {
            potentialBowls.push(bowl);
          }
        }
        console.log("C6-potentialBowls: ", potentialBowls);
        setSelectedPejmanBowl(
          bowls.indexOf(bowls.find(currBowl => currBowl.bowlId === potentialBowls[0].bowlId))
        )
      } else if (
        (minFourBalls === 1 && minThreeBalls === 1 && minTwoBalls === 1 && oneBall % 2 === 1 && misere) ||
        (minFourBalls === 1 && minThreeBalls === 1 && minTwoBalls === 1 && oneBall % 2 === 0 && standard)
      ) { // Condition 7
        setPejmanNormalModeCondition(7);
        console.log("Condition 7");
        for (const bowl of bowls) {
          if (bowl.ballsNum >= 4) {
            potentialBowls.push(bowl);
          }
        }
        console.log("C7-potentialBowls: ", potentialBowls);
        setSelectedPejmanBowl(
          bowls.indexOf(bowls.find(currBowl => currBowl.bowlId === potentialBowls[0].bowlId))
        )
      } else if (
        (minFourBalls === 0 && minThreeBalls === 1 && minTwoBalls > 2 && oneBall > 0) ||
        (minFourBalls === 0 && minThreeBalls === 1 && minTwoBalls === 2 && oneBall > 2) ||
        (minFourBalls === 0 && minThreeBalls === 0 && minTwoBalls >= 2 && oneBall > 2) ||
        (minFourBalls === 0 && minThreeBalls === 0 && minTwoBalls === 0)
      ) { // Condition 8
        setPejmanNormalModeCondition(8);
        console.log("Condition 8");
        for (const bowl of bowls) {
          if (bowl.ballsNum === 1) {
            potentialBowls.push(bowl);
          }
        }
        console.log("C8-potentialBowls: ", potentialBowls);
        setSelectedPejmanBowl(
          bowls.indexOf(bowls.find(currBowl => currBowl.bowlId === potentialBowls[0].bowlId))
        )
      } else if (
        (minFourBalls === 0 && minThreeBalls === 1 && minTwoBalls === 1 && (oneBall === 2 || oneBall === 0) && standard) ||
        (minFourBalls === 0 && minThreeBalls === 1 && minTwoBalls === 1 && oneBall === 1 && misere)
      ) { // Condition 9
        setPejmanNormalModeCondition(9);
        console.log("Condition 9");
      } else if (
        (minFourBalls === 0 && minThreeBalls === 1 && minTwoBalls === 1 && (oneBall === 2 || oneBall === 0) && misere) ||
        (minFourBalls === 0 && minThreeBalls === 1 && minTwoBalls === 1 && oneBall === 1 && standard)
      ) { // Condition 10
        setPejmanNormalModeCondition(10);
        console.log("Condition 10");
      } else if (
        (minFourBalls === 0 && minThreeBalls === 0 && minTwoBalls === 1 && standard && oneBall % 2 === 0) ||
        (minFourBalls === 0 && minThreeBalls === 0 && minTwoBalls === 1 && misere && oneBall % 2 === 1)
      ) { // Condition 11
        setPejmanNormalModeCondition(11);
        console.log("Condition 11");
      } else if (
        (minFourBalls === 0 && minThreeBalls === 0 && minTwoBalls === 1 && misere && oneBall % 2 === 0) ||
        (minFourBalls === 0 && minThreeBalls === 0 && minTwoBalls === 1 && standard && oneBall % 2 === 1)
      ) { // Condition 12
        setPejmanNormalModeCondition(12);
        console.log("Condition 12");
      }
    }
    toggleUserTurn();
  };
  useEffect(() => {
    if (selectedPejmanBowl !== -1) {
      let currPejmanPickNum;
      if (easyMode) {
        currPejmanPickNum = getRandNum(
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
      } else if (normalMode) {
        if (pejmanNormalModeCondition === 1) { // Condition 1
          currPejmanPickNum = bowls[selectedPejmanBowl].ballsNum - 3;
          setPejmanPickNum(currPejmanPickNum);
          setBowls((currBowls) =>
            currBowls.map((bowl) =>
              bowl.bowlId === selectedPejmanBowl + 1
                ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
                : bowl
            )
          );
        } else if (pejmanNormalModeCondition === 2) { // Condition 2
          currPejmanPickNum = bowls[selectedPejmanBowl].ballsNum - 2;
          setPejmanPickNum(currPejmanPickNum);
          setBowls((currBowls) =>
            currBowls.map((bowl) =>
              bowl.bowlId === selectedPejmanBowl + 1
                ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
                : bowl
            )
          );
        } else if (pejmanNormalModeCondition === 3) { // Condition 3
          currPejmanPickNum = 1;
          setPejmanPickNum(currPejmanPickNum);
          setBowls((currBowls) =>
            currBowls.map((bowl) =>
              bowl.bowlId === selectedPejmanBowl + 1
                ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
                : bowl
            )
          );
        } else if (pejmanNormalModeCondition === 4) { // Condition 4
          currPejmanPickNum = bowls[selectedPejmanBowl].ballsNum - 1;
          setPejmanPickNum(currPejmanPickNum);
          setBowls((currBowls) =>
            currBowls.map((bowl) =>
              bowl.bowlId === selectedPejmanBowl + 1
                ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
                : bowl
            )
          );
        } else if (pejmanNormalModeCondition === 5) { // Condition 5
          currPejmanPickNum = 1;
          setPejmanPickNum(currPejmanPickNum);
          setBowls((currBowls) =>
            currBowls.map((bowl) =>
              bowl.bowlId === selectedPejmanBowl + 1
                ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
                : bowl
            )
          );
        } else if (pejmanNormalModeCondition === 6) { // Condition 6
          currPejmanPickNum = bowls[selectedPejmanBowl].ballsNum - 1;
          setPejmanPickNum(currPejmanPickNum);
          setBowls((currBowls) =>
            currBowls.map((bowl) =>
              bowl.bowlId === selectedPejmanBowl + 1
                ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
                : bowl
            )
          );
        } else if (pejmanNormalModeCondition === 7) { // Condition 7
          currPejmanPickNum = bowls[selectedPejmanBowl].ballsNum;
          setPejmanPickNum(currPejmanPickNum);
          setBowls((currBowls) =>
            currBowls.map((bowl) =>
              bowl.bowlId === selectedPejmanBowl + 1
                ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
                : bowl
            )
          );
        } else if (pejmanNormalModeCondition === 8) { // Condition 8
          currPejmanPickNum = bowls[selectedPejmanBowl].ballsNum;
          setPejmanPickNum(currPejmanPickNum);
          setBowls((currBowls) =>
            currBowls.map((bowl) =>
              bowl.bowlId === selectedPejmanBowl + 1
                ? { ...bowl, ballsNum: bowl.ballsNum - currPejmanPickNum }
                : bowl
            )
          );
        } else if (pejmanNormalModeCondition === 9) { // Condition 9

        } else if (pejmanNormalModeCondition === 10) { // Condition 10

        } else if (pejmanNormalModeCondition === 11) { // Condition 11

        } else if (pejmanNormalModeCondition === 12) { // Condition 12

        }
      }
      setAllTurns((currAllTurns) => [
        ...currAllTurns,
        { side: "Pejman", bowlNum: selectedPejmanBowl, ballsNum: currPejmanPickNum },
      ]);
    }
  }, [selectedPejmanBowl]);
  useEffect(() => {
    setAllBallsNum(0);
    for (let i = 0; i < 10; i++) {
      setAllBallsNum((currAllBallsNum) => currAllBallsNum + bowls[i].ballsNum);
    }
  }, [bowls]);
  useEffect(() => {
    if (allBallsNum === 0 && allTurns.length > 0) {
      if (easyMode) {
        if (standard) {
          if (allTurns[allTurns.length - 1].side === "User") {
            setIsWin(true);
            updateTotalPoint(1);
          } else {
            setIsWin(false);
          }
        } else if (misere) {
          if (allTurns[allTurns.length - 1].side === "User") {
            setIsWin(false);
          } else {
            setIsWin(true);
            updateTotalPoint(1);
          }
        }
      } else if (normalMode) {
        if (standard) {
          if (allTurns[allTurns.length - 1].side === "User") {
            setIsWin(true);
            updateTotalPoint(2);
          } else {
            setIsWin(false);
          }
        } else if (misere) {
          if (allTurns[allTurns.length - 1].side === "User") {
            setIsWin(false);
          } else {
            setIsWin(true);
            updateTotalPoint(2);
          }
        }
      }
    }
  }, [allBallsNum]);
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
      {isWin === true && <h2>You Win!</h2>}
      {isWin === false && <h2>You Loose!</h2>}
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
      {isGameStarted && !isUserTurn && isWin === "" && (
        <div>
          <div>Allow Pejman to choose one of the un-empty bowls</div>
          <button onClick={handlePejmanMove}>Ok</button>
        </div>
      )}
      <div style={{ color: "gray" }}>User Bowl: {selectedUserBowl}</div>
      <div style={{ color: "gray" }}>User PickNum: {userPickNum}</div>
      <div style={{ color: "gray" }}>Pejman Bowl: {selectedPejmanBowl}</div>
      <div style={{ color: "gray" }}>Pejman PickNum: {pejmanPickNum}</div>
      <div style={{ color: "gray" }}>{isUserTurn ? "User's turn" : "Pejman's turn"}</div>
      <div style={{ color: "gray" }}>All Balls Num: {allBallsNum}</div>
      <div>
        {allTurns.map((b) => (
          <div>
            {`Move ${allTurns.indexOf(b) + 1}: `}
            {b.side === "User" ? "You" : "Pejman"}
            {` took ${b.ballsNum} ball${b.ballsNum > 1 ? 's' : ''} from bowl ${b.side === "User" ? b.bowlNum : b.bowlNum + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
}
