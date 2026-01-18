import { animals, colors, cars, jobs, books, countries, cities } from "./words";
import { getRandArr } from "../utils";
const titles = ["Animal", "Color", "Car", "Job", "Book", "Country", "City"];

export default function Form({
  title,
  setTitle,
  setWord,
  setIsGameStarted,
  setSeconds,
  handleStartTimer,
}) {
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === titles[0]) {
      const animal = getRandArr(animals);
      setWord(animal.slice(0, 1).toUpperCase().concat(animal.slice(1)));
    } else if (title === titles[1]) {
      const color = getRandArr(colors);
      setWord(color.slice(0, 1).toUpperCase().concat(color.slice(1)));
    } else if (title === titles[2]) {
      const car = getRandArr(cars);
      setWord(car.slice(0, 1).toUpperCase().concat(car.slice(1)));
    } else if (title === titles[3]) {
      const job = getRandArr(jobs);
      setWord(job.slice(0, 1).toUpperCase().concat(job.slice(1)));
    } else if (title === titles[4]) {
      const book = getRandArr(books);
      setWord(book.slice(0, 1).toUpperCase().concat(book.slice(1)));
    } else if (title === titles[5]) {
      const country = getRandArr(countries);
      setWord(country.slice(0, 1).toUpperCase().concat(country.slice(1)));
    } else if (title === titles[6]) {
      const city = getRandArr(cities);
      setWord(city.slice(0, 1).toUpperCase().concat(city.slice(1)));
    }
    setIsGameStarted(true);
    setSeconds(60);
    handleStartTimer();
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
      <div>{title && <button>Done</button>}</div>
    </form>
  );
}
