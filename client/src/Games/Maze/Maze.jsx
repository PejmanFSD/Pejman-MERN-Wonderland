import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function Maze() {
  const sceneRef = useRef(null);
//   const [cellsNum, setCellsNum] = useState(6);
//   const [cells, setCells] = useState([]);
//   const [verticalWalls, setVerticalWalls] = useState([]);
//   const [horizontalWalls, setHorizontalWalls] = useState([]);
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
        Bodies.rectangle(width / 2, 0, width, width / 80, {isStatic: true, label: 'border', render: {fillStyle: 'blue'}}),
        Bodies.rectangle(width / 2, height, width, width / 80, {isStatic: true, label: 'border', render: {fillStyle: 'blue'}}),
        Bodies.rectangle(0, height / 2, width / 80, height, {isStatic: true, label: 'border', render: {fillStyle: 'blue'}}),
        Bodies.rectangle(width, height / 2, width / 80, height, {isStatic: true, label: 'border', render: {fillStyle: 'blue'}})
    ];
    const cellsHorizontal = 20;
    const cellsVertical = 12;
    const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));
    const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));
    const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));

    const shuffle = (arr) => {
        let counter = arr.length;
        while (counter > 0) {
            // Choose a random index from the array:
            const index = Math.floor(Math.random() * counter);
            counter --;
            // Swapping the randomly selected element with the
            // last un-swapped element on the right:
            const temp = arr[counter];
            arr[counter] = arr [index];
            arr[index] = temp;
        }
    };
    // The function that generates the maze:
    const stepThroughCells = (row, column) => {
        // If the cell has been already visited, jump out of this function:
        if (grid[row][column]) { // if (grid[row][column] === true)
            return;
        }
        // Otherwise mark this cell as being visited:
        grid[row][column] = true;
        // Assembling the neighbors of the cell:
        const neighbors = [
            [row - 1, column, 'up'], // above neighbor
            [row, column + 1, 'right'], // right neighbor
            [row + 1, column, 'down'], // below neighbor
            [row, column - 1, 'left'] // left neighbor
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
            if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
                continue; // "continue" means don't leave this loop, but skip the rest of
                // the loop for the current variable
            }
            // If the neighbor cell has been already visited,
            // continue to the next neighbor cell
            if (grid[nextRow][nextColumn]) { // if (grid[nextRow][nextColumn] === true) {
                continue;
            }
            // Remove a wall from either horizontals or verticals
            if (direction === 'left') {
                verticals[row][column - 1] = true; // Removing the wall on the left side of the cell
            } else if (direction === 'right') {
                verticals[row][column] = true; // Removing the wall on the right side of the cell
            } else if (direction === 'up') {
                horizontals[row - 1][column] = true; // Removing the wall above the cell
            } else if (direction === 'down') {
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
    }
    stepThroughCells(0, 0);
    // Drawing the maze:
    const unitLengthX = (width - (height / 80)) / cellsHorizontal;
    const unitLengthY = (height - (height / 80)) / cellsVertical;
    // Iterating through the "horizontals" array:
    horizontals.forEach((row, rowIndex) => { // This array contains some arrays which
        // are the row walls, so we call each a "row"
        row.forEach((open, columnIndex) => { // Each row wall (row) has some boolean variables, we call
            // each open because we want to check if it's an open segment of wall or not
            if (open) { // if (open === true) {
                // if "open" is true, leave the "CURRENT" forEach loop
                return;
            } // Otherwise create a wall
            const wall = Bodies.rectangle(
                height / 80 + columnIndex * unitLengthX + unitLengthX / 2, // "X" of the center of the wall
                height / 80 + rowIndex * unitLengthY + unitLengthY, // "Y" of the center of the wall
                unitLengthX + unitLengthY / 20,
                unitLengthY / 20,
                { isStatic: true, label: 'wall', render: { fillStyle: 'gray' } }
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
                { isStatic: true, label: 'wall', render: { fillStyle: 'gray' } }
            );
            World.add(world, wall);
        });
    });
    // Rendering the shapes on screen:
    World.add(world, [walls[0], walls[1], walls[2], walls[3]]);
    // Cleaning up:
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);

      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} style ={{position: "relative", top: "50px"}}/>;
}