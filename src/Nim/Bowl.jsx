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
  bowlName,
  ballsNum,
  isBowlSelected,
  isGameStarted,
  setBowls,
  selectedBowl,
  setSelectedBowl,
}) {
  const toggleBowl = (id) => {
    setBowls((currentBowls) =>
      currentBowls.map((bowl) =>
        bowl.bowlId === id
          ? { ...bowl, isBowlSelected: !bowl.isBowlSelected }
          : bowl
      )
    );
    setSelectedBowl(!isBowlSelected ? id : 0);
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
      Bowl {bowlId} - selectedBowl: {selectedBowl}
      <img
        style={{
          width: "100px",
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
      {isGameStarted && (
        <input
          type="checkbox"
          value={isBowlSelected}
          onChange={() => toggleBowl(bowlId)}
          disabled={selectedBowl !== bowlId && selectedBowl !== 0}
        />
      )}
    </div>
  );
}
