import { CATEGORIES, SUB_CATEGORIES } from "../../mocks/categories";
import type { Category, SubCategory } from "../../mocks/categories";
import type { ProductFormState } from "../../hooks/useAdminProductForm";

interface ProductFormFieldsProps {
  form: ProductFormState;
  onChange: <K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) => void;
}

export default function ProductFormFields({ form, onChange }: ProductFormFieldsProps) {
  return (
    <>
      <label className="flex flex-col gap-1">
        Name
        <input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="border border-gray-300 px-3 py-2"
          required
        />
      </label>

      <label className="flex flex-col gap-1">
        Description
        <textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="border border-gray-300 px-3 py-2"
          rows={3}
        />
      </label>

      <div className="flex gap-4">
        <label className="flex flex-col gap-1 flex-1">
          Category
          <select
            value={form.category}
            onChange={(e) => onChange("category", e.target.value as Category)}
            className="border border-gray-300 px-3 py-2"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 flex-1">
          Sub-category
          <select
            value={form.subCategory}
            onChange={(e) => onChange("subCategory", e.target.value as SubCategory)}
            className="border border-gray-300 px-3 py-2"
          >
            {SUB_CATEGORIES.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1">
        Image URLs (comma-separated)
        <input
          value={form.imageText}
          onChange={(e) => onChange("imageText", e.target.value)}
          className="border border-gray-300 px-3 py-2"
          placeholder="https://..., https://..."
          required
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.bestseller}
          onChange={(e) => onChange("bestseller", e.target.checked)}
        />
        Bestseller
      </label>
    </>
  );
}
