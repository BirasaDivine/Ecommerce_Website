import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Collection from './pages/collection';
import Home from './pages/home';
import Login from './pages/login';
import Product from './pages/product';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;