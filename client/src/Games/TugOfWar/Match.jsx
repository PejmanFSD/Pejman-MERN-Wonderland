export default function Match({matchImages, userColor}) {
    return(
        <div>
            {userColor === "Blue" && <input type="checkbox" />}
            {matchImages.map((m, idx) =>
                <img
                    src={matchImages[idx]}
                    height="80px"
                    style={{
                        position: "relative",
                        top: "15px"
                    }}
                />
            )}
            {userColor === "Red" && <input type="checkbox" />}
        </div>
    )
}