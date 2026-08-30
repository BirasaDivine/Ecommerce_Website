import { useShopContext } from "../context/ShopContext";

export function useAdminProductsList() {
  const { products, getPrice, getSizes } = useShopContext();

  const rows = products.map((product) => ({
    product,
    price: getPrice(product._id),
    sizes: getSizes(product._id),
  }));

  return { rows };
}
