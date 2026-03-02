import { Link } from "react-router-dom";

export default function Ad({
  adKey,
  adCompany,
  adText,
  adImages,
  adAuthor
}) {
  return (
    <div>
      <Link to={`/ads/${adKey}`}>
        <div>{adCompany} - {adText}</div>
      </Link>
      {adImages && adImages.map((i) => (
        <img src={i.url} height="70px" />
      ))}
      <div>Created by: {adAuthor?.username}</div>
    </div>
  );
}
