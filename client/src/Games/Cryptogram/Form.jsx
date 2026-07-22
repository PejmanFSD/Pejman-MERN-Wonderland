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
  acceptedAsRepetition,
  setAcceptedAsRepetition,
  isLoading,
  setIsLoading,
  isTogglingReset,
  isTogglingHomePage,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (evaluateRepetitive(name, value)) {
      setIsCharRepetitive(true);
    }
    if (value.length > 1) {
      setIsOneChar(false);
    }
    if (
      Object.keys(resultObj)
        .slice(4, Object.values(resultObj).indexOf(0))
        .includes(value.toLowerCase())
    ) {
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
      if (Object.values(inputs)[i].toLowerCase() === Object.keys(resultObj)[i].toLowerCase()) {
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
      updateTotalPoint(2);
    }
    if (misMatch !== 0) {
      setIsWin(false);
    }
    setIsGameStarted(false);
  };
  const evaluateRepetitive = (name, value) => {
    if (value && value.toLowerCase() === inputs.input1.toLowerCase() && name !== "input1") {
      return true;
    } else if (value && value.toLowerCase() === inputs.input2.toLowerCase() && name !== "input2") {
      return true;
    } else if (value && value.toLowerCase() === inputs.input3.toLowerCase() && name !== "input3") {
      return true;
    } else if (value && value.toLowerCase() === inputs.input4.toLowerCase() && name !== "input4") {
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
        }),
      );
      return updatedInputs;
    });
    setIsCharRepetitive(false);
    if (isAlreadyExist) {
      setIsAlreadyExist(false);
    }
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
        }),
      );
      return updatedInputs;
    });
    setIsOneChar(true);
  };
  const handleIsAlreadyExistYes = () => {
    for (let i = 0; i < 4; i++) {
      if (
        (Object.keys(resultObj)
          .slice(4, Object.values(resultObj).indexOf(0))
          .includes(Object.values(inputs)[i].toLowerCase())
          ||
          Object.keys(resultObj)
          .slice(4, Object.values(resultObj).indexOf(0))
          .includes(Object.values(inputs)[i].toUpperCase())
          
      )
          &&
        !acceptedAsRepetition.includes(Object.values(inputs)[i])
      ) {
        setAcceptedAsRepetition((currAcceptedAsRepetition) => [
          ...currAcceptedAsRepetition,
          Object.values(inputs)[i].toLowerCase(),
          Object.values(inputs)[i].toUpperCase()
        ]);
      }
    }
    setIsAlreadyExist(false);
  };
  const handleIsAlreadyExistCancel = () => {
    setInputs((currInputs) => {
      const updatedInputs = Object.fromEntries(
        Object.entries(currInputs).map(([key, value]) => {
          if (
            Object.keys(resultObj).slice(4).includes(value.toLowerCase()) &&
            !acceptedAsRepetition.includes(value.toLowerCase())
          ) {
            return [key, ""];
          }
          return [key, value];
        }),
      );
      return updatedInputs;
    });
    setIsAlreadyExist(false);
  };
  return (
    <div>
      {!isTogglingReset && !isTogglingHomePage && isWin === false && (
        <div>Your answer:</div>
      )}
      {isLoading ? (
        <h3 style={{ color: "gray" }}>Loading ...</h3>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 d-flex justify-content-center">
              <form onSubmit={handleSubmit} style={{ marginTop: "15px" }}>
                {adviceArray.map((a) =>
                  Object.keys(resultObj)
                    .slice(0, 4)
                    .includes(a.toLowerCase()) ? (
                    Object.keys(resultObj)
                      .slice(0, 4)
                      .indexOf(a.toLowerCase()) === 0 ? (
                      <div style={{ display: "inline" }}>
                        <label htmlFor="input1"></label>
                        <input
                          type="text"
                          placeholder={!isCharRepetitive && "1"}
                          name="input1"
                          id="input1"
                          value={inputs.input1}
                          onChange={handleChange}
                          disabled={
                            !isGameStarted ||
                            isCharRepetitive ||
                            isInputEmpty ||
                            !isOneChar ||
                            isAlreadyExist
                          }
                          style={{
                            borderRadius: "5px",
                            borderColor: "black",
                            textAlign: "center",
                            width: "25px",
                            height: "25px",
                            margin: "2px",
                            position: "relative",
                            top: "-6px",
                            backgroundColor: "var(--background)"
                          }}
                        />
                      </div>
                    ) : Object.keys(resultObj)
                        .slice(0, 4)
                        .indexOf(a.toLowerCase()) === 1 ? (
                      <div style={{ display: "inline" }}>
                        <label htmlFor="input2"></label>
                        <input
                          type="text"
                          placeholder={!isCharRepetitive && "2"}
                          name="input2"
                          id="input2"
                          value={inputs.input2}
                          onChange={handleChange}
                          disabled={
                            !isGameStarted ||
                            isCharRepetitive ||
                            isInputEmpty ||
                            !isOneChar ||
                            isAlreadyExist
                          }
                          style={{
                            borderRadius: "5px",
                            borderColor: "black",
                            textAlign: "center",
                            width: "25px",
                            height: "25px",
                            margin: "2px",
                            position: "relative",
                            top: "-6px",
                            backgroundColor: "var(--background)"
                          }}
                        />
                      </div>
                    ) : Object.keys(resultObj)
                        .slice(0, 4)
                        .indexOf(a.toLowerCase()) === 2 ? (
                      <div style={{ display: "inline" }}>
                        <label htmlFor="input3"></label>
                        <input
                          type="text"
                          placeholder={!isCharRepetitive && "3"}
                          name="input3"
                          id="input3"
                          value={inputs.input3}
                          onChange={handleChange}
                          disabled={
                            !isGameStarted ||
                            isCharRepetitive ||
                            isInputEmpty ||
                            !isOneChar ||
                            isAlreadyExist
                          }
                          style={{
                            borderRadius: "5px",
                            borderColor: "black",
                            textAlign: "center",
                            width: "25px",
                            height: "25px",
                            margin: "2px",
                            position: "relative",
                            top: "-6px",
                            backgroundColor: "var(--background)"
                          }}
                        />
                      </div>
                    ) : (
                      Object.keys(resultObj)
                        .slice(0, 4)
                        .indexOf(a.toLowerCase()) === 3 && (
                        <div style={{ display: "inline" }}>
                          <label htmlFor="input4"></label>
                          <input
                            type="text"
                            placeholder={!isCharRepetitive && "4"}
                            name="input4"
                            id="input4"
                            value={inputs.input4}
                            onChange={handleChange}
                            disabled={
                              !isGameStarted ||
                              isCharRepetitive ||
                              isInputEmpty ||
                              !isOneChar ||
                              isAlreadyExist
                            }
                            style={{
                              borderRadius: "5px",
                              borderColor: "black",
                              textAlign: "center",
                              width: "25px",
                              height: "25px",
                              margin: "2px",
                              position: "relative",
                              top: "-6px",
                              backgroundColor: "var(--background)"
                            }}
                          />
                        </div>
                      )
                    )
                  ) : (
                    <h2 style={{ display: "inline", margin: "2px" }}>{a}</h2>
                  ),
                )}
                {isGameStarted &&
                  isWin === "" &&
                  !isCharRepetitive &&
                  !isInputEmpty &&
                  isOneChar &&
                  !isAlreadyExist && (
                    <div>
                      <button className="btn1 my-3">Done</button>
                    </div>
                  )}
              </form>
            </div>
          </div>
        </div>
      )}
      {isCharRepetitive && (
        <div>
          <div>
            <strong>The values can't be repetitive!</strong>
          </div>
          <button className="btn2 my-2" onClick={handleIsCharRepetitive}>
            OK
          </button>
        </div>
      )}
      {isInputEmpty && (
        <div>
          <div>
            <strong>You shouldn't leave any box empty!</strong>
          </div>
          <button className="btn2 my-2" onClick={handleIsInputEmpty}>
            OK
          </button>
        </div>
      )}
      {!isOneChar && (
        <div>
          <div>
            <strong>Each box should have only one character!</strong>
          </div>
          <button className="btn2 my-2" onClick={handleIsOneChar}>
            OK
          </button>
        </div>
      )}
      {isAlreadyExist && !isCharRepetitive && (
        <div style={{ margin: "10px" }}>
          <div>
            <strong>
              The visible letters are not the ones that you should guess!
            </strong>
          </div>
          <div>
            <strong>
              Are you sure you want to guess the letter that is already visible?
            </strong>
          </div>
          <button
            className="btn2 my-2"
            onClick={handleIsAlreadyExistYes}
            style={{ marginTop: "10px", marginLeft: "4px", marginRight: "4px" }}
          >
            Yes
          </button>
          <button
            className="btn2 my-2"
            onClick={handleIsAlreadyExistCancel}
            style={{
              width: "80px",
              marginTop: "10px",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
