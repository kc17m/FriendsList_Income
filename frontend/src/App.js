import "./style/main.css"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FriendList from './components/FriendList';
import FriendDetail from './components/FriendDetail';

function App() {
  return (
    <div className="App">
      <h1>My Friend Book</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FriendList />} />
          <Route path='/friend/:friendId' element={<FriendDetail />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
