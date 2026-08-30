import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useShopContext } from "../context/ShopContext";
import type { Product } from "../types/product";
import type { Variant } from "../types/variant";

export function useProductPurchase(product: Product | null, variants: Variant[]) {
  const navigate = useNavigate();
  const { addToCart } = useShopContext();
  const { isAuthenticated } = useAuth();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = variants.find((v) => v._id === selectedVariantId) ?? null;
  const activePrices = variants.map((v) => v.price);
  const displayPrice = selectedVariant
    ? selectedVariant.price
    : activePrices.length
    ? Math.min(...activePrices)
    : null;

  const canBuy = isAuthenticated && !!selectedVariant && selectedVariant.stockStatus !== "OUT_OF_STOCK";

  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!product || !selectedVariant || selectedVariant.stockStatus === "OUT_OF_STOCK") return;
    addToCart(product._id, selectedVariant.size);
    setJustAdded(true);
  };

  const goToLogin = () => navigate("/login");

  return {
    selectedVariantId,
    setSelectedVariantId,
    displayPrice,
    canBuy,
    justAdded,
    isAuthenticated,
    handleBuy,
    goToLogin,
  };
}
