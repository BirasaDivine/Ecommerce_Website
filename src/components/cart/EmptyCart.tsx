import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="text-center py-8 text-3xl flex flex-col items-center justify-center h-[50vh]">
      <p className="w-3/4 m-auto flex items-center gap-2 justify-center text-xs sm:text-sm md:text-base text-gray-600">
        Your cart is empty.
      </p>
      <Link
        to="/collection"
        className="text-xs sm:text-sm md:text-base text-white bg-black py-2 px-8 rounded -mt-4"
      >
        Shop Now
      </Link>
    </div>
  );
}
