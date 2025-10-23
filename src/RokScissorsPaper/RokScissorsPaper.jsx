import Rock from './Rok.png';
import Scissors from './Scissors.png';
import Paper from './Paper.png';

export default function RokScissorsPaper({updateTotalPoint, totalPoint}) {
    return (
        <div>
            <img src={Rock} width='150px' alt='Rock' />
            <img src={Scissors} width='150px' alt='Scissors' />
            <img src={Paper} width='150px' alt='Paper' />
        </div>
    )
}