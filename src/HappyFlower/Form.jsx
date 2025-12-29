import { animals, colors, cars, jobs, books, countries, cities } from "./words";
import { getRandArr } from "../utils";
const titles = ["Animal", "Color", "Car", "Job", "Book", "Country", "City"];

export default function Form({
  title,
  setTitle,
  word,
  setWord,
  setWordWithNoSpace,
  setIsGameStarted,
}) {
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === titles[0]) {
      setWord(getRandArr(animals));
    } else if (title === titles[1]) {
      setWord(getRandArr(colors));
    } else if (title === titles[2]) {
      setWord(getRandArr(cars));
    } else if (title === titles[3]) {
      setWord(getRandArr(jobs));
    } else if (title === titles[4]) {
      setWord(getRandArr(books));
    } else if (title === titles[5]) {
      setWord(getRandArr(countries));
    } else if (title === titles[6]) {
      setWord(getRandArr(cities));
    }
    setIsGameStarted(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titles">Select one of the titles</label>
      <select onChange={handleChange}>
        <option disabled selected>
          ⬇️
        </option>
        {titles.map((t) => (
          <option>{t}</option>
        ))}
      </select>
      {title && <button>Done</button>}
    </form>
  );
}
