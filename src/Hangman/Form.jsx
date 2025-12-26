import { faker } from "@faker-js/faker";
const titles = ['Animal', 'Color', 'Car', 'Job', 'Book', 'Country', 'City'];

export default function Form({ title, setTitle, setWord, setIsGameStarted }) {
    const handleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === titles[0]) {
            setWord(faker.animal.type());
        }
        else if (title === titles[1]) {
            setWord(faker.color.human());
        }
        else if (title === titles[2]) {
            setWord(faker.vehicle.vehicle());
        }
        else if (title === titles[3]) {
            setWord(faker.person.jobTitle());
        }
        else if (title === titles[4]) {
            setWord(faker.book.title());
        }
        else if (title === titles[5]) {
            setWord(faker.location.country());
        }
        else if (title === titles[6]) {
            setWord(faker.location.city());
        }
        setIsGameStarted(true);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="titles">Select one of the titles</label>
            <select
                onChange={handleChange}
            >
                <option disabled selected>⬇️</option>
                {titles.map((t) => (
                    <option>{t}</option>
                ))}
            </select>
            <button>Done</button>
        </form>
    );
}
