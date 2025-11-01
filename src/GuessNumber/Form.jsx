export default function Form({
  inputs,
  setInputs,
  setChancesNum,
  updateUserGuess,
  updateUserGuessStatus,
}) {
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    const { name, value } = e.target;
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
    console.log("inputs: ", inputs);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setChancesNum((currChanceNum) => currChanceNum - 1);
    for (let i = 0; i < 4; i++) {
      updateUserGuess(Object.values(inputs)[i]);
    }
    for (let i = 0; i < 4; i++) {
      updateUserGuessStatus(i);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="input1"></label>
      <input
        type="text"
        placeholder="First Digit"
        name="input1"
        id="input1"
        value={inputs.input1}
        onChange={handleChange}
      />
      <label htmlFor="input2"></label>
      <input
        type="text"
        placeholder="Second Digit"
        name="input2"
        id="input2"
        onChange={handleChange}
      />
      <label htmlFor="input3"></label>
      <input
        type="text"
        placeholder="Third Digit"
        name="input3"
        id="input3"
        onChange={handleChange}
      />
      <label htmlFor="input4"></label>
      <input
        type="text"
        placeholder="Fourth Digit"
        name="input4"
        id="input4"
        onChange={handleChange}
      />
      <button>Done</button>
    </form>
  );
}
