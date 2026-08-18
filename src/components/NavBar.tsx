import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

export default function NavBar(){
    const navigate = useNavigate();
    const { showSearch, setShowSearch, getCartCount } = useShopContext();
    const { isAuthenticated, role, logout } = useAuth();
    const links =[
        { to: "/", label: "Home" },
        { to: "/collection", label: "Collection" },
        ...(role === "ADMIN" ? [{ to: "/admin/products", label: "Admin" }] : []),
    ]

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return(
        <header className="border-b bg-white">
  <div className="flex items-center justify-between py-5 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] font-medium">
    <Link to="/" className="md:text-4xl text-2xl font-bold leading-relaxed prata-regular">
      VINBA
    </Link>

    <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
      {links.map(({ to, label }, index) => (
        <NavLink key={index} to={to} className="flex flex-col items-center gap-1">
          <p>{label}</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden" />
        </NavLink>
      ))}
    </ul>

    <div className="flex items-center gap-6">
      <img
        src={assets.search_icon}
        className="w-6 h-6 cursor-pointer"
        alt="Search"
        onClick={() => setShowSearch(!showSearch)}
      />

      <div className="group relative">
        <Link to="/login">
          <img src={assets.profile_icon} className="w-6 h-6 cursor-pointer" alt="Menu" />
        </Link>
        <div className="absolute top-6 right-0 bg-white hidden group-hover:block">
          <ul className="flex flex-col w-36 bg-slate-100 rounded overflow-hidden">
            {isAuthenticated ? (
              <li
                onClick={handleLogout}
                className="px-9 py-2 hover:bg-gray-200 cursor-pointer hover:text-black transition-all duration-300"
              >
                Logout
              </li>
            ) : (
              <li className="px-9 py-2 hover:bg-gray-200 cursor-pointer hover:text-black transition-all duration-300">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <Link to="/cart" className="relative">
        <img src={assets.cart_icon} className="w-6 min-w-5 h-6 cursor-pointer" alt="Cart" />
        <p className="absolute right-[-5px] bottom-[-5px] w-4 h-4 flex items-center justify-center leading-none bg-black text-white rounded-full text-[8px]">
          {getCartCount()}
        </p>
      </Link>

      <img src={assets.menu_icon} className="w-6 h-6 cursor-pointer sm:hidden" alt="Menu" />
    </div>
  </div>
</header>
    )
}