import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import RequireRole from './components/RequireRole';
import Collection from './pages/collection';
import Home from './pages/home';
import Login from './pages/login';
import Product from './pages/product';
import Cart from './pages/cart';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'collection', element: <Collection /> },
      { path: 'login', element: <Login /> },
      { path: 'product/:productId', element: <Product /> },
      { path: 'cart', element: <Cart /> },
      {
        path: 'admin/products',
        element: (
          <RequireRole allow={['ADMIN']}>
            <AdminProducts />
          </RequireRole>
        ),
      },
      {
        path: 'admin/products/new',
        element: (
          <RequireRole allow={['ADMIN']}>
            <AdminProductForm />
          </RequireRole>
        ),
      },
      {
        path: 'admin/products/:productId/edit',
        element: (
          <RequireRole allow={['ADMIN']}>
            <AdminProductForm />
          </RequireRole>
        ),
      },
    ],
  },
]);

export default router;
