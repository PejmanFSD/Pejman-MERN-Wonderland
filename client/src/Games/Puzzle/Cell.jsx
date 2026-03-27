import E00 from "./images/E00.jpg";

export default function Cell({
    imageSrc,
    setIsActiveUpButton,
    setIsActiveLeftButton,
    setIsActiveDownButton,
    setIsActiveRightButton,
    imageGroup,
    setImageGroup,
    isAnImageClicked,
    setIsAnImageClicked
}) {
    const handleClickCell = () => {
        setIsAnImageClicked(true);
        setImageGroup((currImageGroup) => currImageGroup.map(i =>
            i.image === imageSrc ? {...i, isClicked: true} : i
        ))
        const idx = imageGroup.find(i => i.image === imageSrc).currentLocation;
        if ([6, 7, 8, 11, 12, 13, 16, 17, 18, 21, 22, 23].includes(idx)) {
            if (imageGroup.find(i => i.currentLocation === idx - 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx - 5 ? {...i, isSwapUpTarget: true} : i
                ))
                setIsActiveUpButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx - 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx - 1 ? {...i, isSwapLeftTarget: true} : i
                ))
                setIsActiveLeftButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx + 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx + 5 ? {...i, isSwapDownTarget: true} : i
                ))
                setIsActiveDownButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx + 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx + 1 ? {...i, isSwapRightTarget: true} : i
                ))
                setIsActiveRightButton(true);
            }
        }
        else if ([1, 2, 3].includes(idx)) {
            if (imageGroup.find(i => i.currentLocation === idx - 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx - 1 ? {...i, isSwapLeftTarget: true} : i
                ))
                setIsActiveLeftButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx + 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx + 5 ? {...i, isSwapDownTarget: true} : i
                ))
                setIsActiveDownButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx + 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx + 1 ? {...i, isSwapRightTarget: true} : i
                ))
                setIsActiveRightButton(true);
            }
        }
        else if ([26, 27, 28].includes(idx)) {
            if (imageGroup.find(i => i.currentLocation === idx - 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx - 5 ? {...i, isSwapUpTarget: true} : i
                ))
                setIsActiveUpButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx - 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx - 1 ? {...i, isSwapLeftTarget: true} : i
                ))
                setIsActiveLeftButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx + 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx + 1 ? {...i, isSwapRightTarget: true} : i
                ))
                setIsActiveRightButton(true);
            }
        }
        else if ([5, 10, 15, 20].includes(idx)) {
            if (imageGroup.find(i => i.currentLocation === idx - 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx - 5 ? {...i, isSwapUpTarget: true} : i
                ))
                setIsActiveUpButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx + 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx + 5 ? {...i, isSwapDownTarget: true} : i
                ))
                setIsActiveDownButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx + 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx + 1 ? {...i, isSwapRightTarget: true} : i
                ))
                setIsActiveRightButton(true);
            }
        }
        else if ([9, 14, 19, 24].includes(idx)) {
            if (imageGroup.find(i => i.currentLocation === idx - 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx - 5 ? {...i, isSwapUpTarget: true} : i
                ))
                setIsActiveUpButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx - 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx - 1 ? {...i, isSwapLeftTarget: true} : i
                ))
                setIsActiveLeftButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === idx + 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === idx + 5 ? {...i, isSwapDownTarget: true} : i
                ))
                setIsActiveDownButton(true);
            }
        }
        else if (idx === 0) {
            if (imageGroup.find(i => i.currentLocation === 5).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === 5 ? {...i, isSwapDownTarget: true} : i
                ))
                setIsActiveDownButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === 1).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === 1 ? {...i, isSwapRightTarget: true} : i
                ))
                setIsActiveRightButton(true);
            }
        }
        else if (idx === 4) {
            if (imageGroup.find(i => i.currentLocation === 3).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === 3 ? {...i, isSwapLeftTarget: true} : i
                ))
                setIsActiveLeftButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === 9).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === 9 ? {...i, isSwapDownTarget: true} : i
                ))
                setIsActiveDownButton(true);
            }
        }
        else if (idx === 25) {
            if (imageGroup.find(i => i.currentLocation === 20).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === 20 ? {...i, isSwapUpTarget: true} : i
                ))
                setIsActiveUpButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === 26).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === 26 ? {...i, isSwapRightTarget: true} : i
                ))
                setIsActiveRightButton(true);
            }
        }
        else if (idx === 29) {
            if (imageGroup.find(i => i.currentLocation === 28).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === 28 ? {...i, isSwapLeftTarget: true} : i
                ))
                setIsActiveLeftButton(true);
            }
            if (imageGroup.find(i => i.currentLocation === 24).image === E00) {
                setImageGroup((currImageGroup) => currImageGroup.map(i =>
                    i.currentLocation === 24 ? {...i, isSwapUpTarget: true} : i
                ))
                setIsActiveUpButton(true);
            }
        }
    }
  return (
    <img
        onClick={handleClickCell}
        style={{
            width: "50px",
            border: imageGroup.find(i => i.image === imageSrc).isClicked ? "5px solid black" : "1px solid black",
            boxSizing: "border-box",
            pointerEvents: imageSrc === E00 || isAnImageClicked ? "none" : ""
        }}
        src={imageSrc}
    />
  );
}
