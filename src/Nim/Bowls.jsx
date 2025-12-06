import { useState } from "react";
import Bowl from "./Bowl";
import { getRandNum } from "../utils";

export default function Bowls({
  isFillingTheBowlsByUserFinished,
  setIsFillingTheBowlsByUserFinished,
  isFillingTheBowlsByPejmanFinished,
  setIsFillingTheBowlsByPejmanFinished,
}) {
  const [bowls, setBowls] = useState({
    bowl1: 0,
    bowl2: 0,
    bowl3: 0,
    bowl4: 0,
    bowl5: 0,
    bowl6: 0,
    bowl7: 0,
    bowl8: 0,
    bowl9: 0,
    bowl10: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBowls((currBowls) => {
      currBowls[name] = Number(value);
      return { ...currBowls };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFillingTheBowlsByUserFinished(true);
  };
  const startFillingPejmanBowls = () => {
    setBowls((currBowls) => {
      currBowls["bowl6"] = getRandNum(7);
      currBowls["bowl7"] = getRandNum(7);
      currBowls["bowl8"] = getRandNum(7);
      currBowls["bowl9"] = getRandNum(7);
      currBowls["bowl10"] = getRandNum(7);
      return { ...currBowls };
    });
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
                  <option value={Object.values(bowls)[idx]} disabled selected>
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
      <Bowl title="Bowl 01" ballsNum={bowls.bowl1} />
      <Bowl title="Bowl 02" ballsNum={bowls.bowl2} />
      <Bowl title="Bowl 03" ballsNum={bowls.bowl3} />
      <Bowl title="Bowl 04" ballsNum={bowls.bowl4} />
      <Bowl title="Bowl 05" ballsNum={bowls.bowl5} />
      <br></br>
      {isFillingTheBowlsByUserFinished &&
        !isFillingTheBowlsByPejmanFinished && (
          <button onClick={startFillingPejmanBowls}>
            See how Pejman fills his bowls
          </button>
        )}
      <br></br>
      {isFillingTheBowlsByPejmanFinished && (
        <Bowl title="Bowl 06" ballsNum={bowls.bowl6} />
      )}
      {isFillingTheBowlsByPejmanFinished && (
        <Bowl title="Bowl 07" ballsNum={bowls.bowl7} />
      )}
      {isFillingTheBowlsByPejmanFinished && (
        <Bowl title="Bowl 08" ballsNum={bowls.bowl8} />
      )}
      {isFillingTheBowlsByPejmanFinished && (
        <Bowl title="Bowl 09" ballsNum={bowls.bowl9} />
      )}
      {isFillingTheBowlsByPejmanFinished && (
        <Bowl title="Bowl 10" ballsNum={bowls.bowl10} />
      )}
    </div>
  );
}
