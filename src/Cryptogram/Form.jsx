export default function Form({
  handleSubmit,
  handleChange,
  isGameStarted,
  isWin,
  adviceArray,
  resultObj,
  inputs,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {adviceArray.map((a) =>
        Object.keys(resultObj).slice(0, 4).includes(a.toLowerCase()) ? (
          Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) === 0 ? (
            <div style={{ display: "inline" }}>
              <label htmlFor="input1"></label>
              <input
                type="text"
                placeholder="1"
                name="input1"
                id="input1"
                value={inputs.input1}
                onChange={handleChange}
                style={{ width: "15px", height: "30px" }}
                disabled={!isGameStarted}
              />
            </div>
          ) : Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
            1 ? (
            <div style={{ display: "inline" }}>
              <label htmlFor="input2"></label>
              <input
                type="text"
                placeholder="2"
                name="input2"
                id="input2"
                value={inputs.input2}
                onChange={handleChange}
                style={{ width: "15px", height: "30px" }}
                disabled={!isGameStarted}
              />
            </div>
          ) : Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
            2 ? (
            <div style={{ display: "inline" }}>
              <label htmlFor="input3"></label>
              <input
                type="text"
                placeholder="3"
                name="input3"
                id="input3"
                value={inputs.input3}
                onChange={handleChange}
                style={{ width: "15px", height: "30px" }}
                disabled={!isGameStarted}
              />
            </div>
          ) : (
            Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
              3 && (
              <div style={{ display: "inline" }}>
                <label htmlFor="input4"></label>
                <input
                  type="text"
                  placeholder="4"
                  name="input4"
                  id="input4"
                  value={inputs.input4}
                  onChange={handleChange}
                  style={{ width: "15px", height: "30px" }}
                  disabled={!isGameStarted}
                />
              </div>
            )
          )
        ) : (
          <h2 style={{ display: "inline" }}>{a}</h2>
        )
      )}
      {isGameStarted && isWin === "" && (
        <div>
          <button>Done</button>
        </div>
      )}
    </form>
  );
}
