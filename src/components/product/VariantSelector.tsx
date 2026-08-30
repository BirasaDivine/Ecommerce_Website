import { STOCK_STATUS_CLASSES, STOCK_STATUS_LABELS } from "../../utils/stockStatus";
import type { Variant } from "../../types/variant";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariantId: string | null;
  onSelect: (variantId: string) => void;
  currency: string;
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
  currency,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-3 my-8">
      <p className="text-sm">Available Variants</p>
      {variants.length === 0 && (
        <p className="text-sm text-gray-400">No variants available.</p>
      )}
      <div className="flex flex-col gap-2 md:w-4/5">
        {variants.map((v) => {
          const outOfStock = v.stockStatus === "OUT_OF_STOCK";
          const selected = selectedVariantId === v._id;
          return (
            <button
              key={v._id}
              type="button"
              disabled={outOfStock}
              onClick={() => onSelect(v._id)}
              className={`flex items-center justify-between gap-4 border rounded-md px-4 py-2 text-sm text-left transition-colors ${
                selected ? "border-orange-500" : "border-gray-300"
              } ${outOfStock ? "opacity-50 cursor-not-allowed" : "hover:border-gray-500"}`}
            >
              <span className="font-medium">{v.size}</span>
              <span>
                {currency}
                {v.price}
              </span>
              <span
                className={`text-xs border rounded-full px-2 py-0.5 ${STOCK_STATUS_CLASSES[v.stockStatus]}`}
              >
                {STOCK_STATUS_LABELS[v.stockStatus]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
