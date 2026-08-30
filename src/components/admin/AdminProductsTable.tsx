import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

interface AdminProductRow {
  product: Product;
  price: number | null;
  sizes: string[];
}

interface AdminProductsTableProps {
  rows: AdminProductRow[];
}

export default function AdminProductsTable({ rows }: AdminProductsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-gray-500">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Category</th>
            <th className="py-2 pr-4">Sizes</th>
            <th className="py-2 pr-4">From</th>
            <th className="py-2 pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ product, price, sizes }) => (
            <tr key={product._id} className="border-b border-gray-100">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover"
                  />
                  {product.name}
                </div>
              </td>
              <td className="py-3 pr-4 text-gray-600">
                {product.category} / {product.subCategory}
              </td>
              <td className="py-3 pr-4 text-gray-600">
                {sizes.length > 0 ? sizes.join(", ") : "—"}
              </td>
              <td className="py-3 pr-4 text-gray-600">
                {price !== null ? `$${price}` : "Unavailable"}
              </td>
              <td className="py-3 pr-4 text-right">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && (
        <p className="text-center text-gray-400 py-10">No products yet.</p>
      )}
    </div>
  );
}
