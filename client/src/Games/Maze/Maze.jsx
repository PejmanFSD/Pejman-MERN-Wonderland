import { useState, useEffect, useRef } from "react";
import Matter from "matter-js";
import Clock from "../HappyFlower/Images/Clock.jpg";

export default function Maze() {
  const sceneRef = useRef(null);
  const hasWonRef = useRef(false);
  const isTimeUpRef = useRef(false);
  const [cellsHorizontal, setCellsHorizontal] = useState(5);
  const [cellsVertical, setCellsVertical] = useState(3);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const [gameKey, setGameKey] = useState(0); // For reseting the game
  // The "isTimeUp" useState variable + isTimeUpRef useRef variable are for
  // disabling the ball when the time is over:
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleEasyMode = () => {
    setCellsHorizontal(10); // 20
    setCellsVertical(6); // 12
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setCellsHorizontal(10); // 40
    setCellsVertical(6); // 24
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
    setSeconds(30);
    setIsTimerRunning(false);
  };
  const handlePlayAgain = () => {
    if (easyMode) {
      setCellsHorizontal(10); // 20
      setCellsVertical(6); // 12
    } else if (normalMode) {
      setCellsHorizontal(10); // 40
      setCellsVertical(6); // 24
      setSeconds(30);
      setIsTimerRunning(true);
    }
    setIsTimeUp(false);
    setHasWon(false);
    setGameKey((currGameKey) => currGameKey + 1);
    setFinalMessage("");
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
    if (isTimerRunning) {
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

    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
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
      0.3 * ballRadius,
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
      if (event.key === "ArrowUp") {
        nextPosition.y -= step;
      } else if (event.key === "ArrowDown") {
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
          // updateTotalPoint(1);
        }
        // decreasing the opacity of the elements if we win:
        world.bodies.forEach((body) => {
          if (
            body.label === "wall" ||
            body.label === "ball" ||
            body.label === "goal"
          ) {
            body.render.opacity = 0.3;
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

  return (
    <div>
      {!isGameStarted && !easyMode && !normalMode && (
        <div style={{ position: "relative", top: "5px" }}>
          <button onClick={handleEasyMode}>Easy Mode</button>
          <button onClick={handleNormalMode}>Normal Mode</button>
        </div>
      )}
      {!isGameStarted && (easyMode || normalMode) && (
        <button onClick={handleStart} style={{ position: "relative", top: "5px" }}>Start the Game</button>
      )}
      {finalMessage && <h2>{finalMessage}</h2>}
      {finalMessage === "Time's Up!" &&
        <img src={Clock} width="50px" />
      }
      {hasWon && (
        <div>
          <div>Play Again?</div>
          <button onClick={handlePlayAgain}>Ok</button>
        </div>
      )}
      {seconds < 1 && (
        <div>
          <div>Try Again?</div>
          <button onClick={handlePlayAgain}>Ok</button>
        </div>
      )}
      {isGameStarted && normalMode && (
        <h3 style={seconds > 9 ? { color: "green" } : { color: "red" }}>
          {seconds}
        </h3>
      )}
      {isGameStarted &&
      (
        <div ref={sceneRef} style={{ position: "relative", top: "5px" }} />
      )}
    </div>
  );
}
