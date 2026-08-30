import { useShopContext } from "../../context/ShopContext";
import VariantSelector from "./VariantSelector";
import type { Product } from "../../types/product";
import type { Variant } from "../../types/variant";

interface ProductPurchasePanelProps {
  product: Product;
  variants: Variant[];
  selectedVariantId: string | null;
  onSelectVariant: (id: string) => void;
  displayPrice: number | null;
  canBuy: boolean;
  justAdded: boolean;
  isAuthenticated: boolean;
  onBuy: () => void;
  onGoToLogin: () => void;
}

export default function ProductPurchasePanel({
  product,
  variants,
  selectedVariantId,
  onSelectVariant,
  displayPrice,
  canBuy,
  justAdded,
  isAuthenticated,
  onBuy,
  onGoToLogin,
}: ProductPurchasePanelProps) {
  const { currency } = useShopContext();

  return (
    <div className="flex-1">
      <h1 className="font-medium text-2xl mt-2">{product.name}</h1>

      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
        <span>Category:</span>
        <span className="font-medium text-gray-700">
          {product.category} / {product.subCategory}
        </span>
      </div>

      <p className="mt-5 text-3xl font-medium">
        {displayPrice !== null ? `${currency}${displayPrice}` : "Unavailable"}
      </p>

      <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

      <VariantSelector
        variants={variants}
        selectedVariantId={selectedVariantId}
        onSelect={onSelectVariant}
        currency={currency}
      />

      {!isAuthenticated && (
        <p className="text-xs text-gray-500 mb-2">
          <span onClick={onGoToLogin} className="underline cursor-pointer">
            Log in
          </span>{" "}
          to buy this product.
        </p>
      )}

      <button
        onClick={onBuy}
        disabled={!canBuy}
        className="px-8 uppercase py-3 text-sm font-medium text-white bg-black active:bg-black/70 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isAuthenticated ? "Buy" : "Log In to Buy"}
      </button>

      {justAdded && <p className="text-sm text-green-600 mt-3">Added to your cart.</p>}

      <hr className="mt-8 sm:w-4/5" />
      <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
        <p>100% Original Product.</p>
        <p>Cash On Delivery Available.</p>
        <p>Easy return and exchange policy within 7 days of purchase.</p>
      </div>
    </div>
  );
}
