export default function Form({
  inputs,
  seconds,
  questionCountries,
  questionCapitals,
  handleChange,
  handleSubmit,
  isInputEmpty,
  isWin,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "7px", marginBottom: "7px" }}
    >
      {questionCountries.map((el, i) => (
        <div key={i}>
          <label htmlFor={`input${i + 1}`}></label>
          <select
            onChange={handleChange}
            name={`input${i + 1}`}
            id={`input${i + 1}`}
            disabled={isInputEmpty}
            style={{
              borderRadius: "8px",
              width: "480px",
              height: "30px",
              textAlign: "center",
              marginTop: "7px",
              marginBottom: "7px",
            }}
          >
            <option value={Object.values(inputs)[i]} disabled selected>
              {`Select the Capital of ${questionCountries[i]}`}
            </option>
            {questionCapitals.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>
      ))}
      {isWin === "" && seconds > 0 && !isInputEmpty && (
        <button className="btn1" style={{ marginTop: "12px" }}>
          Done
        </button>
      )}
    </form>
  );
}
