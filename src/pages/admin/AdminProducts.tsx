import { Link } from "react-router-dom";
import { useAdminProductsList } from "../../hooks/useAdminProductsList";
import AdminProductsTable from "../../components/admin/AdminProductsTable";

export default function AdminProducts() {
  const { rows } = useAdminProductsList();

  return (
    <div className="pt-10 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Manage Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-black text-white px-6 py-2 text-sm font-medium"
        >
          + New Product
        </Link>
      </div>

      <AdminProductsTable rows={rows} />
    </div>
  );
}
