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
  isTogglingLevel,
  isTogglingReset,
  isTogglingHomePage,
  isFirstDigitZero,
  setIsFirstDigitZero,
  isOneDigit,
  setIsOneDigit,
  isDigitNegative,
  setIsDigitNegative,
  isDigitDecimal,
  setIsDigitDecimal,
  isDigitRepetitive,
  setIsDigitRepetitive,
  isInt,
  setIsInt,
  isAlreadyGuessed,
  setIsAlreadyGuessed,
  isInputEmpty,
  setIsInputEmpty,
  easyMode,
  normalMode,
  updateTotalPoint,
}) {
  const handleChange = (e) => {
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
    } else if (evaluateRepetitive(name, value) && value !== "") {
      setIsDigitRepetitive(true);
    }
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < 4; i++) {
      if (Object.values(inputs)[i] === "") {
        setIsInputEmpty(true);
        return;
      }
    }
    if (
      allUserGuesses.includes(
        Object.values(inputs).toString().replaceAll(",", ""),
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
        if (easyMode) {
          updateTotalPoint(1);
        } else if (normalMode) {
          updateTotalPoint(5);
        }
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
        }),
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
        }),
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
        }),
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
        }),
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
        }),
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
        }),
      );
      return updatedInputs;
    });
    setIsAlreadyGuessed(false);
  };
  const handleIsInputEmpty = () => {
    setIsInputEmpty(false);
  };
  return (
    <div className="mt-3">
      {!isWin &&
        !isTogglingLevel &&
        !isTogglingReset &&
        !isTogglingHomePage && (
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
                isAlreadyGuessed ||
                isInputEmpty
              }
              type="text"
              placeholder={
                isOneDigit &&
                !isDigitNegative &&
                !isDigitDecimal &&
                !isDigitRepetitive &&
                isInt &&
                !isAlreadyGuessed &&
                !isInputEmpty &&
                "Digit 1"
              }
              name="input1"
              id="input1"
              value={inputs.input1}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "60px",
                borderColor: "black",
                textAlign: "center",
                margin: "5px",
                backgroundColor: "var(--background)"
              }}
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
                isAlreadyGuessed ||
                isInputEmpty
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
                !isInputEmpty &&
                "Digit 2"
              }
              name="input2"
              id="input2"
              value={inputs.input2}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "60px",
                borderColor: "black",
                textAlign: "center",
                margin: "5px",
                backgroundColor: "var(--background)"
              }}
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
                isAlreadyGuessed ||
                isInputEmpty
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
                !isInputEmpty &&
                "Digit 3"
              }
              name="input3"
              id="input3"
              value={inputs.input3}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "60px",
                borderColor: "black",
                textAlign: "center",
                margin: "5px",
                backgroundColor: "var(--background)"
              }}
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
                isAlreadyGuessed ||
                isInputEmpty
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
                !isInputEmpty &&
                "Digit 4"
              }
              name="input4"
              id="input4"
              value={inputs.input4}
              onChange={handleChange}
              style={{
                borderRadius: "8px",
                width: "60px",
                borderColor: "black",
                textAlign: "center",
                margin: "5px",
                backgroundColor: "var(--background)"
              }}
            />
            <br />
            <button
              className="btn1 my-2"
              disabled={
                isFirstDigitZero ||
                !isOneDigit ||
                isDigitNegative ||
                isDigitDecimal ||
                isDigitRepetitive ||
                !isInt ||
                isAlreadyGuessed ||
                isInputEmpty
              }
            >
              Done
            </button>
          </form>
        )}
      {isFirstDigitZero && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 d-flex justify-content-center">
                The first digit can't be 0!
              </div>
            </div>
          </div>
          <button className="btn2 my-2" onClick={handleIsFirstDigitZero}>
            OK
          </button>
        </div>
      )}
      {!isOneDigit && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 d-flex justify-content-center">
                None of the digits can be greater than 9!
              </div>
            </div>
          </div>
          <button className="btn2 my-2" onClick={handleIsOneDigit}>
            OK
          </button>
        </div>
      )}
      {isDigitNegative && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 d-flex justify-content-center">
                None of the digits can be negative!
              </div>
            </div>
          </div>
          <button className="btn2 my-2" onClick={handleIsDigitNegative}>
            OK
          </button>
        </div>
      )}
      {isDigitDecimal && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 d-flex justify-content-center">
                None of the digits can be decimal!
              </div>
            </div>
          </div>
          <button className="btn2 my-2" onClick={handleIsDigitDecimal}>
            OK
          </button>
        </div>
      )}
      {isDigitRepetitive && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 d-flex justify-content-center">
                The digits can't be repetitive!
              </div>
            </div>
          </div>
          <button className="btn2 my-2" onClick={handleIsDigitRepetitive}>
            OK
          </button>
        </div>
      )}
      {!isInt && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 d-flex justify-content-center">
                You should enter only a number!
              </div>
            </div>
          </div>
          <button className="btn2 my-2" onClick={handleIsInt}>
            OK
          </button>
        </div>
      )}
      {isAlreadyGuessed && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 d-flex justify-content-center">
                You've already tried this number!
              </div>
            </div>
          </div>
          <button className="btn2 my-2" onClick={handleIsAlreadyGuessed}>
            OK
          </button>
        </div>
      )}
      {isInputEmpty && (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 d-flex justify-content-center">
                You shouldn't leave any box empty!
              </div>
            </div>
          </div>
          <button className="btn2 my-2" onClick={handleIsInputEmpty}>
            OK
          </button>
        </div>
      )}
    </div>
  );
}
