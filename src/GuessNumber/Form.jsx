import { useState } from "react";

export default function Form({
  inputs,
  setInputs,
  setChancesNum,
  userGuess,
  userGuessStatus,
  updateUserGuess,
  updateUserGuessStatus,
  num,
  convertArrayToString,
  isWin,
  setIsWin,
}) {
  const [isFirstDigitZero, setIsFirstDigitZero] = useState(false);
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    const { name, value } = e.target;
    if (name === "input1" && value === "0") {
      setIsFirstDigitZero(true);
    }
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
    console.log("inputs: ", inputs);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userGuess
        .slice(userGuessStatus.length - 4, userGuessStatus.length4)
        .toString()
        .replaceAll(",", "") === convertArrayToString(num)
    ) {
      setIsWin(true);
    }
    setChancesNum((currChanceNum) => currChanceNum - 1);
    for (let i = 0; i < 4; i++) {
      updateUserGuess(Object.values(inputs)[i]);
    }
    for (let i = 0; i < 4; i++) {
      updateUserGuessStatus(i);
    }
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
  };
  const handleOk = () => {
    setInputs((currInputs) => ({
      ...currInputs,
      input1: "",
    }));
    setIsFirstDigitZero(false);
  };
  return (
    <div>
      {!isWin && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="input1"></label>
          <input
            disabled={isFirstDigitZero}
            type="text"
            placeholder="First Digit"
            name="input1"
            id="input1"
            value={inputs.input1}
            onChange={handleChange}
          />
          <label htmlFor="input2"></label>
          <input
            disabled={isFirstDigitZero}
            type="text"
            placeholder={!isFirstDigitZero && "Second Digit"}
            name="input2"
            id="input2"
            value={inputs.input2}
            onChange={handleChange}
          />
          <label htmlFor="input3"></label>
          <input
            disabled={isFirstDigitZero}
            type="text"
            placeholder={!isFirstDigitZero && "Third Digit"}
            name="input3"
            id="input3"
            value={inputs.input3}
            onChange={handleChange}
          />
          <label htmlFor="input4"></label>
          <input
            disabled={isFirstDigitZero}
            type="text"
            placeholder={!isFirstDigitZero && "Fourth Digit"}
            name="input4"
            id="input4"
            value={inputs.input4}
            onChange={handleChange}
          />
          <button disabled={isFirstDigitZero}>Done</button>
        </form>
      )}
      {isFirstDigitZero && (
        <div>
          <p>The first digit can't be 0!</p>
          <button onClick={handleOk}>OK</button>
        </div>
      )}
    </div>
  );
}
