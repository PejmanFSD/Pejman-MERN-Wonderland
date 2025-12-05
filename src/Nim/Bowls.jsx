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
    bowl1: "",
    bowl2: "",
    bowl3: "",
    bowl4: "",
    bowl5: "",
    bowl6: "",
    bowl7: "",
    bowl8: "",
    bowl9: "",
    bowl10: "",
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
      <Bowl ballsNum={bowls.bowl1} />
      <Bowl ballsNum={bowls.bowl2} />
      <Bowl ballsNum={bowls.bowl3} />
      <Bowl ballsNum={bowls.bowl4} />
      <Bowl ballsNum={bowls.bowl5} />
      <br></br>
      {isFillingTheBowlsByUserFinished &&
        !isFillingTheBowlsByPejmanFinished && (
          <button onClick={startFillingPejmanBowls}>
            See how Pejman has filled his bowls
          </button>
        )}
      <br></br>
      <Bowl ballsNum={bowls.bowl6} />
      <Bowl ballsNum={bowls.bowl7} />
      <Bowl ballsNum={bowls.bowl8} />
      <Bowl ballsNum={bowls.bowl9} />
      <Bowl ballsNum={bowls.bowl10} />
    </div>
  );
}
