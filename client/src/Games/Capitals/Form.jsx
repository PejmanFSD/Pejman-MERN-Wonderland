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
    // The form with 7 dropdowns, each for one of the randomly selected countries
    <form
      onSubmit={handleSubmit} // The "onSubmit" function has been already created in the main component
      style={{ marginTop: "7px", marginBottom: "7px" }}
    >
    {/* Looping through the 7 randomly chosen countries and for each, creating a dropdown */}
      {questionCountries.map((el, i) => (
        <div key={i}>
          <label htmlFor={`input${i + 1}`}></label>
          <select
            onChange={handleChange} // The "onChange" function has been already created in the main
            // component, this function assignes the value of the selected dropdowan to one of the user's answers
            name={`input${i + 1}`}
            id={`input${i + 1}`}
            disabled={isInputEmpty} // If the user submits the form by leaving at least one of the dropdowns
            // unselected, all the 7 dropdowns become unselected
            className="product-capitals-form my-2"
            style={{
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor: "var(--background)"
            }}
          >
            {/* The first option of each dropdown is unselected, just asking the user the capital of
            which country should be selected */}
            <option value={Object.values(inputs)[i]} disabled selected>
              {`Select the Capital of ${questionCountries[i]}`}
            </option>
            {/* Looping through the capitals of the 7 randomly chosen countries and
            assigning a row for each of them */}
            {questionCapitals.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>
      ))}
      {/* The button for submitting the form */}
      {isWin === "" && seconds > 0 && !isInputEmpty && (
        <button className="btn1" style={{ marginTop: "12px" }}>
          Done
        </button>
      )}
    </form>
  );
}
