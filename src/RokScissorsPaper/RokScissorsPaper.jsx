import {useState} from 'react';
import Rock from './Rok.png';
import Scissors from './Scissors.png';
import Paper from './Paper.png';

export default function RokScissorsPaper({updateTotalPoint, totalPoint}) {
    const [userChoice, setUserChoice] = useState("");
    const handleUserChoice = (input) => {
        setUserChoice(input);
    }
    return (
        <div>
            <img src={Rock} width='150px' alt='Rock' onClick={() => handleUserChoice('Rock')} />
            <img src={Scissors} width='150px' alt='Scissors' onClick={() => handleUserChoice('Scissors')} />
            <img src={Paper} width='150px' alt='Paper' onClick={() => handleUserChoice('Paper')} />
            {userChoice}
        </div>
    )
}