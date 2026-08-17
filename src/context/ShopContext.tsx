import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_PRODUCTS } from "../mocks/products";
import { MOCK_VARIANTS } from "../mocks/variants";
import type { Product } from "../types/product";

export type CartItems = Record<string, Record<string, number>>;

interface ShopContextValue {
  products: Product[];
  currency: string;
  deliveryFee: number;
  search: string;
  setSearch: (value: string) => void;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  cartItems: CartItems;
  addToCart: (itemId: string, size: string) => void;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartCount: () => number;
  getTotalAmount: () => number;
  getPrice: (productId: string) => number | null;
  getSizes: (productId: string) => string[];
  getVariantPrice: (productId: string, size: string) => number;
  navigate: ReturnType<typeof useNavigate>;
}

function getActiveVariants(productId: string) {
  return MOCK_VARIANTS.filter((v) => v.productId === productId && v.active);
}

function getPrice(productId: string): number | null {
  const activePrices = getActiveVariants(productId).map((v) => v.price);
  return activePrices.length ? Math.min(...activePrices) : null;
}

function getSizes(productId: string): string[] {
  return [...new Set(getActiveVariants(productId).map((v) => v.size))];
}

function getVariantPrice(productId: string, size: string): number {
  const variant = MOCK_VARIANTS.find(
    (v) => v.productId === productId && v.size === size && v.active
  );
  return variant?.price ?? 0;
}

export const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function useShopContext(): ShopContextValue {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
}

export default function ShopContextProvider({ children }: { children: ReactNode }) {
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const navigate = useNavigate();

  const addToCart = (itemId: string, size: string) => {
    if (!size) return;

    setCartItems((prev) => {
      const cartData: CartItems = structuredClone(prev);
      cartData[itemId] = cartData[itemId] ?? {};
      cartData[itemId][size] = (cartData[itemId][size] ?? 0) + 1;
      return cartData;
    });
  };

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const cartData: CartItems = structuredClone(prev);
      cartData[itemId][size] = quantity;
      return cartData;
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) totalCount += quantity;
      }
    }
    return totalCount;
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) totalAmount += quantity * getVariantPrice(itemId, size);
      }
    }
    return totalAmount;
  };

  const value: ShopContextValue = {
    products: MOCK_PRODUCTS,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getTotalAmount,
    getPrice,
    getSizes,
    getVariantPrice,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
