import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Collection from './pages/collection';
import Home from './pages/home';
import Login from './pages/login';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;