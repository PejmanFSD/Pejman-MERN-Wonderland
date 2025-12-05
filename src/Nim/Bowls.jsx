import { useState } from "react";
import Bowl from "./Bowl";

export default function Bowls() {
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
    console.log("name: ", name);
    console.log("value: ", value);
    setBowls((currBowls) => {
      currBowls[name] = Number(value);
      return { ...currBowls };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("The bowls are filled");
  };
  return (
    <div>
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
      <Bowl ballsNum={bowls.bowl1} />
      <Bowl ballsNum={bowls.bowl2} />
      <Bowl ballsNum={bowls.bowl3} />
      <Bowl ballsNum={bowls.bowl4} />
      <Bowl ballsNum={bowls.bowl5} />
    </div>
  );
}
