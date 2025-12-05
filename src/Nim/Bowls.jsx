import Bowl from "./Bowl";

export default function Bowls() {
  return (
    <div>
      <Bowl ballsNum={4} />
      <Bowl ballsNum={0} />
      <Bowl ballsNum={3} />
      <Bowl ballsNum={1} />
      <Bowl ballsNum={7} />
    </div>
  );
}
