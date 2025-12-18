import Bowl0 from "./Images/Bowl-0.jpg";
import Bowl1 from "./Images/Bowl-1.jpg";
import Bowl2 from "./Images/Bowl-2.jpg";
import Bowl3 from "./Images/Bowl-3.jpg";
import Bowl4 from "./Images/Bowl-4.jpg";
import Bowl5 from "./Images/Bowl-5.jpg";
import Bowl6 from "./Images/Bowl-6.jpg";
import Bowl7 from "./Images/Bowl-7.jpg";

export default function Bowl({
  bowlId,
  ballsNum,
  isBowlSelected,
  isGameStarted,
  setBowls,
  selectedUserBowl,
  setSelectedUserBowl,
  isUserTurn,
  isTogglingReset,
  isWin
}) {
  const toggleBowl = (id) => {
    if (selectedUserBowl !== 0) {
      setSelectedUserBowl(0);
      return;
    } else {
      setBowls((currentBowls) =>
        currentBowls.map((bowl) =>
          bowl.bowlId === id
            ? { ...bowl, isBowlSelected: !bowl.isBowlSelected }
            : bowl
        )
      );
      setSelectedUserBowl(id);
    }
  };
  return (
    <div
      style={{
        display: "flex inline",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px",
      }}
    >
      Bowl {bowlId}
      <img
        style={{
          width: isWin === "" ? "100px" : "50px",
          border: "2px solid black",
          opacity: (selectedUserBowl && selectedUserBowl !== bowlId) || isTogglingReset || isWin !== "" ? 0.3 : 1
        }}
        src={
          ballsNum === 0
            ? Bowl0
            : ballsNum === 1
              ? Bowl1
              : ballsNum === 2
                ? Bowl2
                : ballsNum === 3
                  ? Bowl3
                  : ballsNum === 4
                    ? Bowl4
                    : ballsNum === 5
                      ? Bowl5
                      : ballsNum === 6
                        ? Bowl6
                        : ballsNum === 7 && Bowl7
        }
        alt=""
      />
      <p>
        {ballsNum === 0
          ? "Empty"
          : ballsNum === 1
            ? "1 ball"
            : ballsNum > 1 && `${ballsNum} balls`}
      </p>
      {isGameStarted && isUserTurn && (
        <input
          type="checkbox"
          value={isBowlSelected}
          onChange={() => toggleBowl(bowlId)}
          disabled={
            (selectedUserBowl !== bowlId && selectedUserBowl !== 0) ||
            ballsNum === 0
          }
        />
      )}
    </div>
  );
}
