import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductItemProps {
  products: Product[];
  prices: Record<string, number | null>;
}

export default function ProductItem({ products, prices }: ProductItemProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {products.map((product) => (
        <Link
          to={`/product/${product._id}`}
          key={product._id}
          className="bg-white rounded overflow-hidden text-gray-800 cursor-pointer hover:shadow-md"
        >
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full object-cover hover:scale-105 transition duration-300 ease-in-out"
          />
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm font-medium">
              {prices[product._id] !== null && prices[product._id] !== undefined
                ? `From $${prices[product._id]}`
                : "Unavailable"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}