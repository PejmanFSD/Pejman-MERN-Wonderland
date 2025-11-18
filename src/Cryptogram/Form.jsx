export default function Form({
  updateTotalPoint,
  isGameStarted,
  setIsGameStarted,
  isWin,
  setIsWin,
  adviceArray,
  resultObj,
  setResultMessageStatus,
  inputs,
  setInputs,
  isCharRepetitive,
  setIsCharRepetitive,
  isInputEmpty,
  setIsInputEmpty,
  isOneChar,
  setIsOneChar,
  isAlreadyExist,
  setIsAlreadyExist,
}) {
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    const { name, value } = e.target;
    if (evaluateRepetitive(name, value)) {
      setIsCharRepetitive(true);
    }
    if (value.length > 1) {
      setIsOneChar(false);
    }
    if (Object.keys(resultObj).slice(4).includes(value)) {
      setIsAlreadyExist(true);
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
    let misMatch = 0;
    for (let i = 0; i < 4; i++) {
      if (Object.values(inputs)[i] === Object.keys(resultObj)[i]) {
        setResultMessageStatus((currResultMessageStatus) => [
          ...currResultMessageStatus,
          true,
        ]);
      } else {
        setResultMessageStatus((currResultMessageStatus) => [
          ...currResultMessageStatus,
          false,
        ]);
        misMatch += 1;
      }
    }
    if (misMatch === 0) {
      setIsWin(true);
      updateTotalPoint(1);
    }
    if (misMatch !== 0) {
      setIsWin(false);
    }
    setIsGameStarted(false);
  };
  const evaluateRepetitive = (name, value) => {
    if (value === inputs.input1 && name !== "input1") {
      return true;
    } else if (value === inputs.input2 && name !== "input2") {
      return true;
    } else if (value === inputs.input3 && name !== "input3") {
      return true;
    } else if (value === inputs.input4 && name !== "input4") {
      return true;
    } else {
      return false;
    }
  };
  const handleIsCharRepetitive = () => {
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
    setIsCharRepetitive(false);
  };
  const handleIsInputEmpty = () => {
    setIsInputEmpty(false);
  };
  const handleIsOneChar = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (value.length > 1) {
            return [key, ""];
          }
          return [key, value];
        })
      );
      return updatedInputs;
    });
    setIsOneChar(true);
  };
  const handleIsAlreadyExistYes = () => {
    setIsAlreadyExist(false);
  };
  const handleIsAlreadyExistCancel = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (Object.keys(resultObj).slice(4).includes(value)) {
            return [key, ""];
          }
          return [key, value];
        })
      );
      return updatedInputs;
    });
    setIsAlreadyExist(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {adviceArray.map((a) =>
          Object.keys(resultObj).slice(0, 4).includes(a.toLowerCase()) ? (
            Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
            0 ? (
              <div style={{ display: "inline" }}>
                <label htmlFor="input1"></label>
                <input
                  type="text"
                  placeholder={!isCharRepetitive && "1"}
                  name="input1"
                  id="input1"
                  value={inputs.input1}
                  onChange={handleChange}
                  style={{ width: "15px", height: "30px" }}
                  disabled={
                    !isGameStarted ||
                    isCharRepetitive ||
                    isInputEmpty ||
                    !isOneChar
                  }
                />
              </div>
            ) : Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
              1 ? (
              <div style={{ display: "inline" }}>
                <label htmlFor="input2"></label>
                <input
                  type="text"
                  placeholder={!isCharRepetitive && "2"}
                  name="input2"
                  id="input2"
                  value={inputs.input2}
                  onChange={handleChange}
                  style={{ width: "15px", height: "30px" }}
                  disabled={
                    !isGameStarted ||
                    isCharRepetitive ||
                    isInputEmpty ||
                    !isOneChar
                  }
                />
              </div>
            ) : Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
              2 ? (
              <div style={{ display: "inline" }}>
                <label htmlFor="input3"></label>
                <input
                  type="text"
                  placeholder={!isCharRepetitive && "3"}
                  name="input3"
                  id="input3"
                  value={inputs.input3}
                  onChange={handleChange}
                  style={{ width: "15px", height: "30px" }}
                  disabled={
                    !isGameStarted ||
                    isCharRepetitive ||
                    isInputEmpty ||
                    !isOneChar
                  }
                />
              </div>
            ) : (
              Object.keys(resultObj).slice(0, 4).indexOf(a.toLowerCase()) ===
                3 && (
                <div style={{ display: "inline" }}>
                  <label htmlFor="input4"></label>
                  <input
                    type="text"
                    placeholder={!isCharRepetitive && "4"}
                    name="input4"
                    id="input4"
                    value={inputs.input4}
                    onChange={handleChange}
                    style={{ width: "15px", height: "30px" }}
                    disabled={
                      !isGameStarted ||
                      isCharRepetitive ||
                      isInputEmpty ||
                      !isOneChar
                    }
                  />
                </div>
              )
            )
          ) : (
            <h2 style={{ display: "inline" }}>{a}</h2>
          )
        )}
        {isGameStarted &&
          isWin === "" &&
          !isCharRepetitive &&
          !isInputEmpty &&
          isOneChar &&
          !isAlreadyExist && (
            <div>
              <button>Done</button>
            </div>
          )}
      </form>
      {isCharRepetitive && (
        <div>
          <p>The values can't be repetitive!</p>
          <button onClick={handleIsCharRepetitive}>OK</button>
        </div>
      )}
      {isInputEmpty && (
        <div>
          <p>You shouldn't leave any box empty!</p>
          <button onClick={handleIsInputEmpty}>OK</button>
        </div>
      )}
      {!isOneChar && (
        <div>
          <p>Each box should have only one character!</p>
          <button onClick={handleIsOneChar}>OK</button>
        </div>
      )}
      {isAlreadyExist && (
        <div>
          <p>The visible letters are not the ones that you should guess!</p>
          <p>
            Are you sure you want to guess the letter that is already visible?
          </p>
          <button onClick={handleIsAlreadyExistYes}>Yes</button>
          <button onClick={handleIsAlreadyExistCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}
