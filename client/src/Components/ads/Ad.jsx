export default function Ad({
  adKey,
  adCompany,
  adText,
  adImages
}) {
  return (
    <div>
      <div key={adKey}>
        <div></div>
        {adCompany}: {adText}
      </div>
      {adImages && adImages.map((i) => (
        <img src={i.url} height="70px" />
      ))}
    </div>
  );
}
