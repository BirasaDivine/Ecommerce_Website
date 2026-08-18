import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import RequireRole from './components/RequireRole';
import Collection from './pages/collection';
import Home from './pages/home';
import Login from './pages/login';
import Product from './pages/product';
import Cart from './pages/cart';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';

function App() {
  return (
    <>
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/admin/products"
          element={
            <RequireRole allow={["ADMIN"]}>
              <AdminProducts />
            </RequireRole>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <RequireRole allow={["ADMIN"]}>
              <AdminProductForm />
            </RequireRole>
          }
        />
        <Route
          path="/admin/products/:productId/edit"
          element={
            <RequireRole allow={["ADMIN"]}>
              <AdminProductForm />
            </RequireRole>
          }
        />
      </Routes>
    </>
  );
}

export default App;
