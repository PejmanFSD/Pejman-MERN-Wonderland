import { Link } from "react-router-dom";

export default function Ad({
  adKey,
  adCompany,
  adText,
  adImages,
  adAuthor,
  currentUser,
  isLoggingOut
}) {
  return (
    <div>
      {currentUser && currentUser.role === "Admin" && !isLoggingOut &&
        <Link to={`/ads/${adKey}`}>
        <div>{adCompany} - {adText}</div>
      </Link>
      }
      {adImages && adImages.map((i) => (
        <img src={i.url} height="70px" />
      ))}
      {currentUser && currentUser.role === "Admin" && !isLoggingOut &&
        <div>Created by: {adAuthor?.username}</div>
      }
    </div>
  );
}
