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
    <form onSubmit={handleSubmit}>
      {questionCountries.map((el, i) => (
        <div>
          <label htmlFor={`input${i + 1}`}></label>
          <select
            onChange={handleChange}
            name={`input${i + 1}`}
            id={`input${i + 1}`}
            disabled={isInputEmpty}
          >
            <option value={Object.values(inputs)[i]} disabled selected>
              {`Select the Capital of ${questionCountries[i]}`}
            </option>
            {questionCapitals.map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </div>
      ))}
      {isWin === "" && seconds > 0 && !isInputEmpty && <button>Done</button>}
    </form>
  );
}
