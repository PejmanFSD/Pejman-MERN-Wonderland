export default function Ad({
  adKey,
  adCompany,
  adText,
  // adImages
}) {
  return (
    <div>
      <div key={adKey}>
        {adCompany}: {adText}
      </div>
      {/* {adImages.map((i) => (
        <img src={i.url} height="70px" />
      ))} */}
    </div>
  );
}
