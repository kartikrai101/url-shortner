import './App.css';
import Home from './Home';
import GetURL from './utils/GetURL';
import ShortenURL from './utils/ShortenURL';
import {Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/get" element={<GetURL />}></Route>
        <Route path="/shortify" element={<ShortenURL />}></Route>
      </Routes>
    </div>
  );
}

export default App;
