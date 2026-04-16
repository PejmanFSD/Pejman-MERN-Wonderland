import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function Maze() {
  const sceneRef = useRef(null);

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
    ]
    // const box = Bodies.rectangle(width / 2, height / 2, 50, 50);
    // const ground = Bodies.rectangle(width / 2, height / 1.5, width / 1.5, height / 10, {
    //   isStatic: true, // The shape can't move
    // });
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