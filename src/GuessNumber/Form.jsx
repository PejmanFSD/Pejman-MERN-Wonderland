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
  allUserGuesses,
}) {
  const [isFirstDigitZero, setIsFirstDigitZero] = useState(false);
  const [isOneDigit, setIsOneDigit] = useState(true);
  const [isDigitNegative, setIsDigitNegative] = useState(false);
  const [isDigitDecimal, setIsDigitDecimal] = useState(false);
  const [isDigitRepetitive, setIsDigitRepetitive] = useState(false);
  const [isInt, setIsInt] = useState(true);
  const [isAlreadyGuessed, setIsAlreadyGuessed] = useState(false);
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    const { name, value } = e.target;
    if (value === "-") {
      setIsDigitNegative(true);
    } else if (value.toString().includes(".")) {
      setIsDigitDecimal(true);
    } else if (value > 9 || value.length > 1) {
      setIsOneDigit(false);
    } else if (name === "input1" && value === "0") {
      setIsFirstDigitZero(true);
    } else if (value.charCodeAt(0) > 57 || value.charCodeAt(0) < 48) {
      setIsInt(false);
    } else if (evaluateRepetitive(name, value)) {
      setIsDigitRepetitive(true);
    }
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      allUserGuesses.includes(
        Object.values(inputs).toString().replaceAll(",", "")
      )
    ) {
      setIsAlreadyGuessed(true);
      return;
    } else {
      if (
        userGuess
          .slice(userGuessStatus.length - 4, userGuessStatus.length)
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
    }
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
          if (value > 9 || value.length > 1) {
            return [key, ""];
          }
          return [key, value];
        })
      );
      return updatedInputs;
    });
    setIsOneDigit(true);
  };
  const handleIsDigitNegative = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (value === "-") {
            return [key, ""];
          }
          return [key, value];
        })
      );
      return updatedInputs;
    });
    setIsDigitNegative(false);
  };
  const handleIsDigitDecimal = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (value.toString().includes(".")) {
            return [key, ""];
          }
          return [key, value];
        })
      );
      return updatedInputs;
    });
    setIsDigitDecimal(false);
  };
  const evaluateRepetitive = (name, value) => {
    if (value === inputs.input1 && name !== inputs.input1) {
      return true;
    } else if (value === inputs.input2 && name !== inputs.input2) {
      return true;
    } else if (value === inputs.input3 && name !== inputs.input3) {
      return true;
    } else if (value === inputs.input4 && name !== inputs.input4) {
      return true;
    } else {
      return false;
    }
  };
  const handleIsDigitRepetitive = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (!evaluateRepetitive(value)) {
            return [key, ""];
          }
          return [key, value];
        })
      );
      return updatedInputs;
    });
    setIsDigitRepetitive(false);
  };
  const handleIsInt = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (
            (value.charCodeAt(0) > 57 || value.charCodeAt(0) < 48) &&
            value !== "-"
          ) {
            return [key, ""];
          }
          return [key, value];
        })
      );
      return updatedInputs;
    });
    setIsInt(true);
  };
  const handleIsAlreadyGuessed = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (!evaluateRepetitive(value)) {
            return [key, ""];
          }
          return [key, value];
        })
      );
      return updatedInputs;
    });
    setIsAlreadyGuessed(false);
  };
  return (
    <div>
      {!isWin && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="input1"></label>
          <input
            disabled={
              isFirstDigitZero ||
              !isOneDigit ||
              isDigitNegative ||
              isDigitDecimal ||
              isDigitRepetitive ||
              !isInt ||
              isAlreadyGuessed
            }
            type="text"
            placeholder={
              isOneDigit &&
              !isDigitNegative &&
              !isDigitDecimal &&
              !isDigitRepetitive &&
              isInt &&
              !isAlreadyGuessed &&
              "First Digit"
            }
            name="input1"
            id="input1"
            value={inputs.input1}
            onChange={handleChange}
          />
          <label htmlFor="input2"></label>
          <input
            disabled={
              isFirstDigitZero ||
              !isOneDigit ||
              isDigitNegative ||
              isDigitDecimal ||
              isDigitRepetitive ||
              !isInt ||
              isAlreadyGuessed
            }
            type="text"
            placeholder={
              !isFirstDigitZero &&
              isOneDigit &&
              !isDigitNegative &&
              !isDigitDecimal &&
              !isDigitRepetitive &&
              isInt &&
              !isAlreadyGuessed &&
              "Second Digit"
            }
            name="input2"
            id="input2"
            value={inputs.input2}
            onChange={handleChange}
          />
          <label htmlFor="input3"></label>
          <input
            disabled={
              isFirstDigitZero ||
              !isOneDigit ||
              isDigitNegative ||
              isDigitDecimal ||
              isDigitRepetitive ||
              !isInt ||
              isAlreadyGuessed
            }
            type="text"
            placeholder={
              !isFirstDigitZero &&
              isOneDigit &&
              !isDigitNegative &&
              !isDigitDecimal &&
              !isDigitRepetitive &&
              isInt &&
              !isAlreadyGuessed &&
              "Third Digit"
            }
            name="input3"
            id="input3"
            value={inputs.input3}
            onChange={handleChange}
          />
          <label htmlFor="input4"></label>
          <input
            disabled={
              isFirstDigitZero ||
              !isOneDigit ||
              isDigitNegative ||
              isDigitDecimal ||
              isDigitRepetitive ||
              !isInt ||
              isAlreadyGuessed
            }
            type="text"
            placeholder={
              !isFirstDigitZero &&
              isOneDigit &&
              !isDigitNegative &&
              !isDigitDecimal &&
              !isDigitRepetitive &&
              isInt &&
              !isAlreadyGuessed &&
              "Fourth Digit"
            }
            name="input4"
            id="input4"
            value={inputs.input4}
            onChange={handleChange}
          />
          <button
            disabled={
              isFirstDigitZero ||
              !isOneDigit ||
              isDigitNegative ||
              isDigitDecimal ||
              isDigitRepetitive ||
              !isInt ||
              isAlreadyGuessed
            }
          >
            Done
          </button>
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
          <p>None of the digits can be greater than 9!</p>
          <button onClick={handleIsOneDigit}>OK</button>
        </div>
      )}
      {isDigitNegative && (
        <div>
          <p>None of the digits can be negative!</p>
          <button onClick={handleIsDigitNegative}>OK</button>
        </div>
      )}
      {isDigitDecimal && (
        <div>
          <p>None of the digits can be decimal!</p>
          <button onClick={handleIsDigitDecimal}>OK</button>
        </div>
      )}
      {isDigitRepetitive && (
        <div>
          <p>The digits can't be repetitive!</p>
          <button onClick={handleIsDigitRepetitive}>OK</button>
        </div>
      )}
      {!isInt && (
        <div>
          <p>You can enter only a number!</p>
          <button onClick={handleIsInt}>OK</button>
        </div>
      )}
      {isAlreadyGuessed && (
        <div>
          <p>You've already tried this number!</p>
          <button onClick={handleIsAlreadyGuessed}>OK</button>
        </div>
      )}
    </div>
  );
}
