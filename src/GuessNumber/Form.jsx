export default function Form({ inputs, setInputs }) {
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
    console.log("Submitted!");
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
