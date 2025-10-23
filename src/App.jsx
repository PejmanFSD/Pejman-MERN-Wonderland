import './App.css';
import {useState} from 'react';
import RokScissorsPaper from './RokScissorsPaper/RokScissorsPaper';

function App() {
  const [totalPoint, setTotalPoint] = useState(0);
  const updateTotalPoint = (score) => {
    setTotalPoint(currTotalPoint => 
      currTotalPoint + score
    )
  }
  return (
    <div className="App">
      Pejman MERN Wonderland
      <RokScissorsPaper updateTotalPoint={updateTotalPoint} totalPoint={totalPoint} />
    </div>
  );
}

export default App;
