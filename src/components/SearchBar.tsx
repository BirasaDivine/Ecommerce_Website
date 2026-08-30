import { useLocation } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

export default function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useShopContext();
  const location = useLocation();

  if (!showSearch || !location.pathname.includes("collection")) {
    return null;
  }

  return (
    <div className="border-t border-b bg-gray-50 text-center py-4">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={assets.search_icon} className="w-4" alt="Search" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer"
        alt="Close"
      />
    </div>
  );
}
