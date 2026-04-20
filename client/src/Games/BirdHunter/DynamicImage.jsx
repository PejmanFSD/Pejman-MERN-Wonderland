export default function DynamicImage({index, src}) {
    return (
        <img key={index} src={src} alt={`img-${index}`} width="50px" style={{position: "relative", top: "15px", margin: "2px"}} />
    )
}