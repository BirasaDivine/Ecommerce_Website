import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <NavBar />
      <SearchBar />
      <Outlet />
    </>
  );
}

export default App;
