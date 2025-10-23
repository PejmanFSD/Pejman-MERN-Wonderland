import {useState} from 'react';
import Rock from './Rok.png';
import Scissors from './Scissors.png';
import Paper from './Paper.png';
import { getRand } from "../utils";

export default function RokScissorsPaper({updateTotalPoint, totalPoint}) {
    const [userChoice, setUserChoice] = useState("");
    const [pejmanChoice, setPejmanChoice] = useState("");
    const PejmanChoice = () => {
        const randomNum = getRand(3);
        if (randomNum === 1) return 'Rock';
        if (randomNum === 2) return 'Scissors';
        if (randomNum === 3) return 'Paper';
    }
    const handleUserChoice = (input) => {
        setUserChoice(input);
        setPejmanChoice(PejmanChoice());
    }
    return (
        <div>
            <img src={Rock} width='150px' alt='Rock' onClick={() => handleUserChoice('Rock')} />
            <img src={Scissors} width='150px' alt='Scissors' onClick={() => handleUserChoice('Scissors')} />
            <img src={Paper} width='150px' alt='Paper' onClick={() => handleUserChoice('Paper')} />
            {userChoice} - {pejmanChoice}
        </div>
    )
}