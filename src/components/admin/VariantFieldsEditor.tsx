import { STOCK_STATUSES } from "../../mocks/categories";
import type { StockStatus } from "../../mocks/categories";
import type { VariantDraft } from "../../services/productService";
import { STOCK_STATUS_LABELS } from "../../utils/stockStatus";

interface VariantFieldsEditorProps {
  variants: VariantDraft[];
  onUpdateVariant: (index: number, patch: Partial<VariantDraft>) => void;
  onAddVariant: () => void;
  onRemoveVariant: (index: number) => void;
}

export default function VariantFieldsEditor({
  variants,
  onUpdateVariant,
  onAddVariant,
  onRemoveVariant,
}: VariantFieldsEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-medium">Variants</p>
        <button
          type="button"
          onClick={onAddVariant}
          className="text-xs border border-gray-400 px-3 py-1 hover:bg-gray-100"
        >
          + Add Variant
        </button>
      </div>

      {variants.map((variant, index) => (
        <div
          key={variant._id ?? index}
          className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-end border border-gray-200 p-3"
        >
          <label className="flex flex-col gap-1 text-xs">
            Size
            <input
              value={variant.size}
              onChange={(e) => onUpdateVariant(index, { size: e.target.value })}
              className="border border-gray-300 px-2 py-1"
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-xs">
            Price
            <input
              type="number"
              min={0}
              value={variant.price}
              onChange={(e) => onUpdateVariant(index, { price: Number(e.target.value) })}
              className="border border-gray-300 px-2 py-1"
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-xs">
            Stock Status
            <select
              value={variant.stockStatus}
              onChange={(e) =>
                onUpdateVariant(index, { stockStatus: e.target.value as StockStatus })
              }
              className="border border-gray-300 px-2 py-1"
            >
              {STOCK_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STOCK_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={variant.active}
              onChange={(e) => onUpdateVariant(index, { active: e.target.checked })}
            />
            Active
          </label>

          <button
            type="button"
            onClick={() => onRemoveVariant(index)}
            disabled={variants.length === 1}
            className="text-xs text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
