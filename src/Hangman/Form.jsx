const titles = ['Animal', 'Color', 'Car', 'Job', 'Book', 'Country', 'City'];

export default function Form({setTitle}) {
    const handleChange = (e) => {
        setTitle(e.target.value);
    };
    return (
        <form>
            <label htmlFor="titles">Select one of the titles</label>
            <select
                onChange={handleChange}
            >
                <option disabled selected>⬇️</option>
                {titles.map((t) => (
                    <option>{t}</option>
                ))}
            </select>
        </form>
    );
}
