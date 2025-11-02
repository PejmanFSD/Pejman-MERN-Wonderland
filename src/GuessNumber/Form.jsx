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
  const [isOneDigit, setIsOneDigit] = useState(true);
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    const { name, value } = e.target;
    if (value > 9) {
      setIsOneDigit(false);
    }
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
  const handleIsFirstDigitZero = () => {
    setInputs((currInputs) => ({
      ...currInputs,
      input1: "",
    }));
    setIsFirstDigitZero(false);
  };
  const handleIsOneDigit = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (value > 9) {
            return [key, ""];
          }
          return [key, value];
        })
      );

      return updatedInputs;
    });
    setIsOneDigit(true);
  };
  return (
    <div>
      {!isWin && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="input1"></label>
          <input
            disabled={isFirstDigitZero || !isOneDigit}
            type="text"
            placeholder={isOneDigit && "First Digit"}
            name="input1"
            id="input1"
            value={inputs.input1}
            onChange={handleChange}
          />
          <label htmlFor="input2"></label>
          <input
            disabled={isFirstDigitZero || !isOneDigit}
            type="text"
            placeholder={!isFirstDigitZero && isOneDigit && "Second Digit"}
            name="input2"
            id="input2"
            value={inputs.input2}
            onChange={handleChange}
          />
          <label htmlFor="input3"></label>
          <input
            disabled={isFirstDigitZero || !isOneDigit}
            type="text"
            placeholder={!isFirstDigitZero && isOneDigit && "Third Digit"}
            name="input3"
            id="input3"
            value={inputs.input3}
            onChange={handleChange}
          />
          <label htmlFor="input4"></label>
          <input
            disabled={isFirstDigitZero || !isOneDigit}
            type="text"
            placeholder={!isFirstDigitZero && isOneDigit && "Fourth Digit"}
            name="input4"
            id="input4"
            value={inputs.input4}
            onChange={handleChange}
          />
          <button disabled={isFirstDigitZero || !isOneDigit}>Done</button>
        </form>
      )}
      {isFirstDigitZero && (
        <div>
          <p>The first digit can't be 0!</p>
          <button onClick={handleIsFirstDigitZero}>OK</button>
        </div>
      )}
      {!isOneDigit && (
        <div>
          <p>None of the digits can be greater than 9</p>
          <button onClick={handleIsOneDigit}>OK</button>
        </div>
      )}
    </div>
  );
}
