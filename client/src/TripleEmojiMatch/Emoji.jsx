export default function Emoji({imgSrc}) {
    return (
        <div>
            <img
                src={imgSrc}
                style={{width: "30px", border: "1px solid black", marginLeft: "4px"}}
            />
        </div>
    )
}