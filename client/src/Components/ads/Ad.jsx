import { Link, useLocation } from "react-router-dom";

export default function Ad({
  adKey,
  adCompany,
  adText,
  adImages,
  adAuthor,
  currentUser,
  isLoggingOut
}) {
  const location = useLocation();
  const gameUrls = [
    "/rock-scissors-paper", "/guess-number", "/capitals", "/cryptogram", "/crazy-100",
    "/memory-cards", "/nim", "/happy-flower", "/xo", "/maze", "/kuku-kube",
    "/triple-emoji-match", "/pidoku", "/counter", "/puzzle", "/bingo",
    "/tug-of-war", "/bird-hunter", "/reversi", "/snake"
  ];
  return (
    <div>
      {currentUser && currentUser.role === "Admin" && !isLoggingOut && !gameUrls.includes(location.pathname) &&
        <Link to={`/ads/${adKey}`}>
        <div>{adCompany} - {adText}</div>
      </Link>
      }
      {adImages && adImages.map((i) => (
        <img src={i.url} height="70px" />
      ))}
      {currentUser && currentUser.role === "Admin" && !isLoggingOut && !gameUrls.includes(location.pathname) &&
        <div>Created by: {adAuthor?.username}</div>
      }
    </div>
  );
}
