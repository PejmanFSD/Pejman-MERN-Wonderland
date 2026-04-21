import { useState } from "react";
import HuntingGround from "./HuntingGround";
import {getRandArr} from "../utils";

export default function BirdHunter() {
    const [grounds, setGrounds] = useState([1,2,3,4,5,6,7,8])
    const [chosenGround, setChosenGround] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [delayMilliSec, setDelayMilliSec] = useState(1000);
    const handleChooseGround = () => {
        const c = getRandArr(grounds);
        setChosenGround(c);
        setGrounds(currGrounds => currGrounds.filter(g => g !== c));
    }
    return (
        <div>
            {grounds.map((g) => <div style={{display: "inline"}}>{g}-</div>)}
            <div>chosenGround: {chosenGround}</div>
            <HuntingGround groundNum={1} chosenGround={chosenGround} isRunning={isRunning} setIsRunning={setIsRunning} delayMilliSec={delayMilliSec} handleChooseGround={handleChooseGround} />
            <HuntingGround groundNum={2} chosenGround={chosenGround} isRunning={isRunning} setIsRunning={setIsRunning} delayMilliSec={delayMilliSec} handleChooseGround={handleChooseGround} />
            <HuntingGround groundNum={3} chosenGround={chosenGround} isRunning={isRunning} setIsRunning={setIsRunning} delayMilliSec={delayMilliSec} handleChooseGround={handleChooseGround} />
            <HuntingGround groundNum={4} chosenGround={chosenGround} isRunning={isRunning} setIsRunning={setIsRunning} delayMilliSec={delayMilliSec} handleChooseGround={handleChooseGround} />
            <HuntingGround groundNum={5} chosenGround={chosenGround} isRunning={isRunning} setIsRunning={setIsRunning} delayMilliSec={delayMilliSec} handleChooseGround={handleChooseGround} />
            <HuntingGround groundNum={6} chosenGround={chosenGround} isRunning={isRunning} setIsRunning={setIsRunning} delayMilliSec={delayMilliSec} handleChooseGround={handleChooseGround} />
            <HuntingGround groundNum={7} chosenGround={chosenGround} isRunning={isRunning} setIsRunning={setIsRunning} delayMilliSec={delayMilliSec} handleChooseGround={handleChooseGround} />
            <HuntingGround groundNum={8} chosenGround={chosenGround} isRunning={isRunning} setIsRunning={setIsRunning} delayMilliSec={delayMilliSec} handleChooseGround={handleChooseGround} />
            <button style={{position: "relative", top: "10px"}} onClick={handleChooseGround} disabled={isRunning}>
                Start
            </button>
        </div>
    )
}