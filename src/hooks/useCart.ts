import { useShopContext } from "../context/ShopContext";
import type { Product } from "../types/product";

export interface CartLine {
  _id: string;
  size: string;
  quantity: number;
  product: Product;
  price: number;
}

export function useCart() {
  const { products, cartItems, updateQuantity, getVariantPrice } = useShopContext();

  const cartLines: CartLine[] = [];
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];
      if (quantity <= 0) continue;

      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      cartLines.push({
        _id: itemId,
        size,
        quantity,
        product,
        price: getVariantPrice(itemId, size),
      });
    }
  }

  const setQuantity = (item: CartLine, quantity: number) => {
    updateQuantity(item._id, item.size, Math.max(quantity, 0));
  };

  const removeLine = (item: CartLine) => {
    const confirmed = window.confirm(
      `Remove ${item.quantity} × ${item.product.name} (${item.size}) from your cart?`
    );
    if (confirmed) {
      updateQuantity(item._id, item.size, 0);
    }
  };

  return { cartLines, setQuantity, removeLine };
}
