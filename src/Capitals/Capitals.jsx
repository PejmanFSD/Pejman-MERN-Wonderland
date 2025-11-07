import countries from "./countries";

export default function Capitals() {
  return (
    <ul>
      {countries.map((c, index) => (
        <li key={index}>
          {c.country} — {c.capital}
        </li>
      ))}
    </ul>
  );
}
