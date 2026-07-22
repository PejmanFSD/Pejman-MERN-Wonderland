import { useState, useEffect, useRef } from "react";
import Matter from "matter-js";
import Clock from "../HappyFlower/Images/Clock.jpg";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";
import AboutMaze from "./AboutMaze";

export default function Maze({ updateTotalPoint, currentUser }) {
  const sceneRef = useRef(null);
  const hasWonRef = useRef(false);
  const isTimeUpRef = useRef(false);
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [cellsHorizontal, setCellsHorizontal] = useState(5);
  const [cellsVertical, setCellsVertical] = useState(3);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [seconds, setSeconds] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [gameKey, setGameKey] = useState(0); // For reseting the game
  // The "isTimeUp" useState variable + isTimeUpRef useRef variable are for
  // disabling the ball when the time is over:
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
  const handleEasyMode = () => {
    setCellsHorizontal(10);
    setCellsVertical(6);
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setCellsHorizontal(35);
    setCellsVertical(21);
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStart = () => {
    setIsGameStarted(true);
    handleResetTimer();
    if (normalMode) {
      handleStartTimer();
    }
  };
  const handleStartTimer = () => setIsTimerRunning(true);
  const handleStopTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setSeconds(180);
    setIsTimerRunning(false);
  };
  const handlePlayAgain = () => {
    if (easyMode) {
      setCellsHorizontal(10);
      setCellsVertical(6);
    } else if (normalMode) {
      setCellsHorizontal(35);
      setCellsVertical(21);
      setSeconds(180);
      setIsTimerRunning(true);
    }
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
    setIsTimeUp(false);
    setHasWon(false);
    setGameKey((currGameKey) => currGameKey + 1);
    setFinalMessage("");
    setShowReviews(true);
  };
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    handlePlayAgain();
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
  const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
      setCellsHorizontal(35);
      setCellsVertical(21);
      setSeconds(180);
      setIsTimerRunning(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
      setCellsHorizontal(10);
      setCellsVertical(6);
      setIsTimerRunning(false);
    }
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
    setIsTimeUp(false);
    setHasWon(false);
    setGameKey((currGameKey) => currGameKey + 1);
    setFinalMessage("");
    setShowReviews(true);
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
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
  useEffect(() => {
    isTimeUpRef.current = isTimeUp;
  }, [isTimeUp]);
  // For freezing the ball when it reaches the goal:
  useEffect(() => {
    hasWonRef.current = hasWon;
  }, [hasWon]);
  useEffect(() => {
    let interval;
    if (isTimerRunning && normalMode) {
      interval = setInterval(() => {
        setSeconds((prev) => prev > 1 && prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);
  useEffect(() => {
    if (seconds < 1) {
      setIsTimeUp(true);
      setHasWon(false);
      setFinalMessage("Time's Up!");
    }
  }, [seconds]);
  useEffect(() => {
    // Aliases; de-structuring the "Matter" object:
    const World = Matter.World; // The object that containes all the shapes
    const Engine = Matter.Engine; // The object that creates the connection to the "World"
    const Render = Matter.Render; // The object that shows the shapes on UI
    const Runner = Matter.Runner; // The object that runs the project
    const Bodies = Matter.Bodies; // The shapes that we create
    // Creating the engine:
    const engine = Engine.create();
    const { world } = engine;

    const width = window.innerWidth / 1.5;
    const height = window.innerHeight / 1.5;
    // Creating the "renderer":
    const render = Render.create({
      element: sceneRef.current, // The canvas
      engine: engine,
      options: {
        width, // width: width
        height, // height: height
        wireframes: false, // For better visuals
      },
    });
    // Executing the "renderer":
    Render.run(render);
    // Creating the "runner":
    const runner = Runner.create();
    Runner.run(runner, engine);
    // Creating the 4 major walls around the canvas:
    const walls = [
      Bodies.rectangle(width / 2, 0, width, width / 80, {
        isStatic: true,
        label: "border",
        render: { fillStyle: "blue" },
      }),
      Bodies.rectangle(width / 2, height, width, width / 80, {
        isStatic: true,
        label: "border",
        render: { fillStyle: "blue" },
      }),
      Bodies.rectangle(0, height / 2, width / 80, height, {
        isStatic: true,
        label: "border",
        render: { fillStyle: "blue" },
      }),
      Bodies.rectangle(width, height / 2, width / 80, height, {
        isStatic: true,
        label: "border",
        render: { fillStyle: "blue" },
      }),
    ];
    const grid = Array(cellsVertical)
      .fill(null)
      .map(() => Array(cellsHorizontal).fill(false));
    const verticals = Array(cellsVertical)
      .fill(null)
      .map(() => Array(cellsHorizontal - 1).fill(false));
    const horizontals = Array(cellsVertical - 1)
      .fill(null)
      .map(() => Array(cellsHorizontal).fill(false));

    const shuffle = (arr) => {
      let counter = arr.length;
      while (counter > 0) {
        // Choose a random index from the array:
        const index = Math.floor(Math.random() * counter);
        counter--;
        // Swapping the randomly selected element with the
        // last un-swapped element on the right:
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
      }
    };
    // The function that generates the maze:
    const stepThroughCells = (row, column) => {
      // If the cell has been already visited, jump out of this function:
      if (grid[row][column]) {
        // if (grid[row][column] === true)
        return;
      }
      // Otherwise mark this cell as being visited:
      grid[row][column] = true;
      // Assembling the neighbors of the cell:
      const neighbors = [
        [row - 1, column, "up"], // above neighbor
        [row, column + 1, "right"], // right neighbor
        [row + 1, column, "down"], // below neighbor
        [row, column - 1, "left"], // left neighbor
      ];
      shuffle(neighbors); // Shuffling the neighbors
      // For each neighbor cell ...
      // Choose the acceptable neighbor, remove the wall and step into the next cell
      for (let neighbor of neighbors) {
        // "nextRow", "nextColumn" and "direction" are the row, the column and the
        // direction of the potential cell that we might visit in the following step:
        const [nextRow, nextColumn, direction] = neighbor; // De-structuring the neighbor
        // If that neighbor is out of bounds
        // continue to the next neighbor cell
        if (
          nextRow < 0 ||
          nextRow >= cellsVertical ||
          nextColumn < 0 ||
          nextColumn >= cellsHorizontal
        ) {
          continue; // "continue" means don't leave this loop, but skip the rest of
          // the loop for the current variable
        }
        // If the neighbor cell has been already visited,
        // continue to the next neighbor cell
        if (grid[nextRow][nextColumn]) {
          // if (grid[nextRow][nextColumn] === true) {
          continue;
        }
        // Remove a wall from either horizontals or verticals
        if (direction === "left") {
          verticals[row][column - 1] = true; // Removing the wall on the left side of the cell
        } else if (direction === "right") {
          verticals[row][column] = true; // Removing the wall on the right side of the cell
        } else if (direction === "up") {
          horizontals[row - 1][column] = true; // Removing the wall above the cell
        } else if (direction === "down") {
          horizontals[row][column] = true; // Removing the wall below the cell
        }
        // Visit the next cell
        // Since the "current cell" has changed, we should update the inputs of the
        // "stepThroughCell" function, now the "current cell" is the cell that had
        // been predicted to be the following potential cell (after passing the tests)
        stepThroughCells(nextRow, nextColumn); // RECURSION :)
        // We put this "stepThroughCell" function inside the "for" loop for two reasons:
        // 1- The "nextRow" and "nextColumn" variables are defined inside this
        // "for" loop and outside of it they're both "undefined"
        // 2- For the last cell, when all the four neighbors are rejected, the "for"
        // loop is over and when the last element of the "neighbors" array hits one of
        // the two "continue"s, we won't hit the "stepThroughCell" function, and that's
        // exactly what we want, because all the cells are done.
      }
    };
    stepThroughCells(0, 0);
    // Drawing the maze:
    const unitLengthX = (width - width / 80) / cellsHorizontal;
    const unitLengthY = (height - width / 80) / cellsVertical;
    // Iterating through the "horizontals" array:
    horizontals.forEach((row, rowIndex) => {
      // This array contains some arrays which
      // are the row walls, so we call each a "row"
      row.forEach((open, columnIndex) => {
        // Each row wall (row) has some boolean variables, we call
        // each open because we want to check if it's an open segment of wall or not
        if (open) {
          // if (open === true) {
          // if "open" is true, leave the "CURRENT" forEach loop
          return;
        } // Otherwise create a wall
        const wall = Bodies.rectangle(
          height / 80 + columnIndex * unitLengthX + unitLengthX / 2, // "X" of the center of the wall
          height / 80 + rowIndex * unitLengthY + unitLengthY, // "Y" of the center of the wall
          unitLengthX + unitLengthY / 20,
          unitLengthY / 20,
          { isStatic: true, label: "wall", render: { fillStyle: "gray" } },
        );
        World.add(world, wall);
      });
    });
    // Iterating through the "verticals" array:
    verticals.forEach((row, rowIndex) => {
      row.forEach((open, columnIndex) => {
        if (open) {
          return;
        }
        const wall = Bodies.rectangle(
          height / 80 + columnIndex * unitLengthX + unitLengthX,
          height / 80 + rowIndex * unitLengthY + unitLengthY / 2,
          unitLengthY / 20,
          unitLengthY + unitLengthY / 20,
          { isStatic: true, label: "wall", render: { fillStyle: "gray" } },
        );
        World.add(world, wall);
      });
    });
    // Rendering the shapes on screen:
    World.add(world, [walls[0], walls[1], walls[2], walls[3]]);
    const minLineWidth = Math.min(unitLengthX, unitLengthY);
    const goal = Bodies.rectangle(
      width - width / 160 - unitLengthX / 2 + unitLengthX / 40,
      height - width / 160 - unitLengthY / 2 + unitLengthY / 40,
      0.6 * minLineWidth,
      0.6 * minLineWidth,
      {
        label: "goal",
        isStatic: true,
        render: { fillStyle: "yellow" },
      },
    );
    World.add(world, goal);
    // Creating the ball:
    const ballRadius = Math.min(unitLengthX, unitLengthY);
    const ball = Bodies.circle(
      unitLengthX / 2 + width / 160,
      unitLengthY / 2 + width / 160,
      0.15 * ballRadius,
      {
        label: "ball",
        isStatic: true,
        render: { fillStyle: "magenta" },
      },
    );
    World.add(world, ball);
    // Moving the ball:
    const Query = Matter.Query;
    const Body = Matter.Body;
    const handleKeyDown = (event) => {
      // If the ball touches the goal, Stop responding to keydown events:
      if (hasWonRef.current || isTimeUpRef.current) return; // Always up to date with "hasWonRef"
      const step = 10; // 10 pixels by each keydown
      let { x, y } = ball.position; // The ball's position
      let nextPosition = { x, y }; // The ball's updated position after each keydown
      // Moving the ball:
      if (isGameStarted && event.key === "ArrowUp") {
        event.preventDefault();
        nextPosition.y -= step;
      } else if (isGameStarted && event.key === "ArrowDown") {
        event.preventDefault();
        nextPosition.y += step;
      } else if (event.key === "ArrowLeft") {
        nextPosition.x -= step;
      } else if (event.key === "ArrowRight") {
        nextPosition.x += step;
      }
      // create fake ball at next position:
      const tempBall = Bodies.circle(
        nextPosition.x,
        nextPosition.y,
        ball.circleRadius,
      );
      // Checking goal collision AFTER movement:
      const goalCollision = Query.collides(
        tempBall,
        world.bodies.filter((b) => b.label === "goal"),
      );
      if (!hasWonRef.current && goalCollision.length > 0) {
        setHasWon(true);
        if (easyMode) {
          handleStopTimer();
          setFinalMessage("You Win, but you don't get any stars!");
        } else if (normalMode) {
          handleStopTimer();
          setFinalMessage("You Win!");
          updateTotalPoint(10);
        }
        // decreasing the opacity of the elements if we win:
        world.bodies.forEach((body) => {
          if (body.label === "ball" || body.label === "goal") {
            body.render.opacity = 0.3;
          }
          if (body.label === "wall") {
            body.render.opacity = 0;
          }
        });
      }
      // Checking if we place the ball at the next position, would it hit any walls or borders or not:
      const collisions = Query.collides(
        // Faking the next position of the ball:
        Bodies.circle(nextPosition.x, nextPosition.y, ball.circleRadius),
        // Filtering the walls and borders, the ball shouldn't pass the walls or the blue borders:
        world.bodies.filter((b) => b.label === "wall" || b.label === "border"),
      );
      // "collisions" is an array, only if collisions is [], then movement is allowed:
      if (collisions.length === 0) {
        Matter.Body.setPosition(ball, nextPosition);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Cleaning up:
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);

      render.canvas.remove();
      render.textures = {};
    };
  }, [isGameStarted, gameKey]);
  useEffect(() => {
    document.title = "Maze";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutMaze setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Maze
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isTogglingReset && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={handleAboutPage}
                      disabled={isGameStarted}
                    >
                      About Maze
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleLevel()}
                      disabled={
                        finalMessage !== "" || (!easyMode && !normalMode)
                      }
                    >
                      {`${easyMode ? "Switch to Normal Mode" : normalMode ? "Switch to Easy Mode" : "Switch level"}`}
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={toggleReset}
                      disabled={
                        finalMessage !== "" ||
                        (!easyMode && !normalMode) ||
                        !isGameStarted
                      }
                    >
                      Reset the Game
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingReset &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleHomePage()}
                      disabled={finalMessage !== ""}
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>
          {isTogglingLevel && finalMessage === "" && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question={`Are you sure you want to switch to ${
                      easyMode ? "Normal Mode" : "Easy Mode"
                    }?`}
                    toggleYes={toggleLevelYes}
                    toggleCancel={toggleLevelCancel}
                    easyMode={easyMode}
                  />
                </div>
              </div>
            </div>
          )}
          {isTogglingReset && finalMessage === "" && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question="Are you sure you want to reset the game?"
                    toggleYes={toggleResetYes}
                    toggleCancel={toggleResetCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {isTogglingHomePage && finalMessage === "" && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question="Are you sure you want to go back to Home Page?"
                    toggleYes={toggleHomePageYes}
                    toggleCancel={toggleHomePageCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {!isGameStarted &&
            !easyMode &&
            !normalMode &&
            !isTogglingHomePage && (
              <div
                className="four-buttons-container"
                style={{ marginTop: "15px" }}
              >
                <button className="btn1" onClick={handleEasyMode}>
                  Easy Mode
                </button>
                <button className="btn1" onClick={handleNormalMode}>
                  Normal Mode
                </button>
              </div>
            )}
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingLevel &&
            !isTogglingHomePage && (
              <button
                className="btn1 my-1"
                onClick={handleStart}
                style={{ marginTop: "15px" }}
              >
                Start the Game
              </button>
            )}
          {finalMessage && !isTogglingHomePage && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <h2 className="fasterOne" style={{ fontSize: "40px" }}>
                    {finalMessage}
                  </h2>
                </div>
              </div>
            </div>
          )}
          {finalMessage === "Time's Up!" && !isTogglingHomePage && (
            <img src={Clock} width="50px" alt="" />
          )}
          {hasWon && !isTogglingHomePage && (
            <div>
              <div>Play Again?</div>
              <button
                className="btn2"
                onClick={handlePlayAgain}
                style={{ marginTop: "10px" }}
              >
                Ok
              </button>
            </div>
          )}
          {seconds < 1 && !isTogglingHomePage && (
            <div>
              <div>Try Again?</div>
              <button
                className="btn2"
                onClick={handlePlayAgain}
                style={{ marginTop: "10px" }}
              >
                Ok
              </button>
            </div>
          )}
          {isGameStarted && normalMode && (
            <h3
              className="my-2"
              style={seconds > 9 ? { color: "green" } : { color: "red" }}
            >
              {seconds}
            </h3>
          )}
          {isGameStarted && (
            <div ref={sceneRef} style={{ position: "relative", top: "15px" }} />
          )}
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button
                className="btn1 my-3"
                onClick={handleReviewSection}
                style={{ position: "relative", top: "25px" }}
              >
                {showReviews
                  ? "Hide the Reviews Section"
                  : "Show the Reviews Section"}
              </button>
            )}
          {!isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            isGameStarted &&
            showReviews && (
              <ReviewSection game="Maze" currentUser={currentUser} />
            )}
          <div style={{ marginTop: "50px" }}></div>
        </div>
      )}
    </div>
  );
}
