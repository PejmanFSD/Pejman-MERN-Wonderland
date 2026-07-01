import { useState, useEffect } from "react";
import ConfirmationBox from "../ConfirmationBox";
import Form from "./Form";
import Result from "./Result";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutCryptogram from "./AboutCryptogram";

export default function Cryptogram({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [adviceArray, setAdviceArray] = useState([]);
  const [resultObj, setResultObj] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  });
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [resultMessageStatus, setResultMessageStatus] = useState([]);
  const [isWin, setIsWin] = useState("");
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [isCharRepetitive, setIsCharRepetitive] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isOneChar, setIsOneChar] = useState(true);
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [acceptedAsRepetition, setAcceptedAsRepetition] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  async function getAdvice() {
    setIsLoading(true);
    setIsGameStarted(true);
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    convertStringIntoArray(data.slip.advice);
    setIsLoading(false);
  }
  const convertStringIntoArray = (str) => {
    for (let i = 0; i < str.length; i++) {
      setAdviceArray((currAdviceArray) => [...currAdviceArray, str[i]]);
    }
  };
  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      return;
    }
    const { name, value } = e.target;
    setInputs((currInputs) => {
      currInputs[name] = value;
      return { ...currInputs };
    });
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
    setAdviceArray([]);
    setResultObj({
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
      h: 0,
      i: 0,
      j: 0,
      k: 0,
      l: 0,
      m: 0,
      n: 0,
      o: 0,
      p: 0,
      q: 0,
      r: 0,
      s: 0,
      t: 0,
      u: 0,
      v: 0,
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    });
    setInputs({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
    setResultMessageStatus([]);
    setIsWin("");
    setIsTogglingReset(false);
    setShowReviews(true);
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  useEffect(
    function () {
      function generateResult() {
        const copy = adviceArray.slice().map((item) => item.toLowerCase());
        setResultObj((currResultObj) => {
          const updated = { ...currResultObj };
          copy.forEach((item) => {
            if (item in updated) {
              updated[item] += 1;
            }
          });
          return updated;
        });
        setResultObj((currResultObj) => {
          return Object.fromEntries(
            Object.entries(currResultObj).sort(([, v1], [, v2]) => v2 - v1),
          );
        });
      }
      generateResult();
    },
    [adviceArray],
  );
  useEffect(() => {
    document.title = "Cryptogram";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutCryptogram setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Cryptogram
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 align-self-center">
                {!isTogglingHomePage && !isTogglingReset && (
                  <button
                    className="btn3 my-1"
                    style={{ width: "200px" }}
                    onClick={handleAboutPage}
                  >
                    About Cryptogram
                  </button>
                )}
              </div>
              <div className="col-lg-4 align-self-center">
                {!isTogglingReset && !isTogglingHomePage && (
                  <button
                    className="btn3 my-1"
                    style={{ width: "200px" }}
                    onClick={() => toggleReset()}
                    disabled={
                      isLoading ||
                      !isGameStarted ||
                      isWin !== "" ||
                      isCharRepetitive ||
                      isInputEmpty ||
                      !isOneChar ||
                      isAlreadyExist
                    }
                  >
                    Reset the Game
                  </button>
                )}
              </div>
              <div className="col-lg-4 align-self-center">
                {!isTogglingReset && !isTogglingHomePage && (
                  <button
                    className="btn3 my-1"
                    style={{ width: "200px" }}
                    onClick={() => toggleHomePage()}
                    disabled={
                      isLoading ||
                      isCharRepetitive ||
                      isInputEmpty ||
                      !isOneChar ||
                      isAlreadyExist
                    }
                  >
                    Back to home page
                  </button>
                )}
              </div>
            </div>
          </div>
          {!isGameStarted && isWin === "" && !isTogglingHomePage && (
            <button className="btn1 my-3" onClick={getAdvice}>
              Start
            </button>
          )}
          {isTogglingReset && (
            <ConfirmationBox
              question={
                isGameStarted
                  ? "Are you sure you want to reset the game?"
                  : isWin === true
                    ? "Play again?"
                    : "Try again?"
              }
              toggleYes={toggleResetYes}
              toggleCancel={toggleResetCancel}
            />
          )}
          {isTogglingHomePage && (
            <ConfirmationBox
              question="Are you sure you want to go back to Home Page?"
              toggleYes={toggleHomePageYes}
              toggleCancel={toggleHomePageCancel}
            />
          )}
          <Result
            adviceArray={adviceArray}
            inputs={inputs}
            resultObj={resultObj}
            resultMessageStatus={resultMessageStatus}
            isWin={isWin}
            isTogglingReset={isTogglingReset}
            isTogglingHomePage={isTogglingHomePage}
            acceptedAsRepetition={acceptedAsRepetition}
          />
          {!isTogglingReset && !isTogglingHomePage && (
            <Form
              handleChange={handleChange}
              isGameStarted={isGameStarted}
              setIsGameStarted={setIsGameStarted}
              isWin={isWin}
              setIsWin={setIsWin}
              adviceArray={adviceArray}
              resultObj={resultObj}
              setResultMessageStatus={setResultMessageStatus}
              inputs={inputs}
              setInputs={setInputs}
              isCharRepetitive={isCharRepetitive}
              setIsCharRepetitive={setIsCharRepetitive}
              isInputEmpty={isInputEmpty}
              setIsInputEmpty={setIsInputEmpty}
              updateTotalPoint={updateTotalPoint}
              isOneChar={isOneChar}
              setIsOneChar={setIsOneChar}
              isAlreadyExist={isAlreadyExist}
              setIsAlreadyExist={setIsAlreadyExist}
              acceptedAsRepetition={acceptedAsRepetition}
              setAcceptedAsRepetition={setAcceptedAsRepetition}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isTogglingReset={isTogglingReset}
              isTogglingHomePage={isTogglingHomePage}
            />
          )}
          {!isGameStarted &&
            !isTogglingReset &&
            isWin === true &&
            !isTogglingHomePage && (
              <button className="btn1 my-2" onClick={toggleResetYes}>
                Play Again
              </button>
            )}
          {!isGameStarted &&
            !isTogglingReset &&
            isWin === false &&
            !isTogglingHomePage && (
              <button className="btn1 my-2" onClick={toggleResetYes}>
                Try Again
              </button>
            )}
          {/* <div>
            {Object.values(inputs).map((value, index) => (
              <div style={{ color: "gray" }} key={index}>{`input${
                index + 1
              }: ${value}`}</div>
            ))}
          </div>
          <div>
            {Object.entries(resultObj).map(([key, value]) => (
              <div style={{ color: "gray" }} key={key}>
                {key}: {value}
              </div>
            ))}
          </div> */}
          {!isTogglingReset && !isTogglingHomePage && isGameStarted && (
            <button className="btn1" onClick={handleReviewSection}>
              {showReviews
                ? "Hide the Reviews Section"
                : "Show the Reviews Section"}
            </button>
          )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            isGameStarted &&
            showReviews && (
              <ReviewSection game="Cryptogram" currentUser={currentUser} />
            )}
        </div>
      )}
    </div>
  );
}
