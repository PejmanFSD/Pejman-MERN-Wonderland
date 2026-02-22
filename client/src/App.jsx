import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Navbar from'./Components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
