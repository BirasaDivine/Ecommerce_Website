import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, SUB_CATEGORIES, STOCK_STATUSES } from "../../mocks/categories";
import type { Category, SubCategory, StockStatus } from "../../mocks/categories";
import { getProductById, getVariants, createProduct, updateProduct } from "../../services/productService";
import type { VariantDraft } from "../../services/productService";
import { useShopContext } from "../../context/ShopContext";
import { STOCK_STATUS_LABELS } from "../../utils/stockStatus";

interface FormState {
  name: string;
  description: string;
  category: Category;
  subCategory: SubCategory;
  imageText: string;
  bestseller: boolean;
  variants: VariantDraft[];
}

function emptyVariant(): VariantDraft {
  return { size: "", price: 0, stockStatus: "IN_STOCK", active: true };
}

const initialState: FormState = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  subCategory: SUB_CATEGORIES[0],
  imageText: "",
  bestseller: false,
  variants: [emptyVariant()],
};

export default function AdminProductForm() {
  const { productId } = useParams();
  const isEditing = Boolean(productId);
  const navigate = useNavigate();
  const { refreshProducts } = useShopContext();

  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(isEditing);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!productId) return;
    let ignore = false;

    Promise.all([getProductById(productId), getVariants(productId)]).then(
      ([product, variants]) => {
        if (ignore) return;
        if (!product) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setForm({
          name: product.name,
          description: product.description,
          category: product.category,
          subCategory: product.subCategory,
          imageText: product.image.join(", "),
          bestseller: product.bestseller,
          variants: variants.length
            ? variants.map((v) => ({
                _id: v._id,
                size: v.size,
                price: v.price,
                stockStatus: v.stockStatus,
                active: v.active,
              }))
            : [emptyVariant()],
        });
        setLoading(false);
      }
    );

    return () => {
      ignore = true;
    };
  }, [productId]);

  const updateVariant = (index: number, patch: Partial<VariantDraft>) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    }));
  };

  const addVariant = () => {
    setForm((prev) => ({ ...prev, variants: [...prev.variants, emptyVariant()] }));
  };

  const removeVariant = (index: number) => {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const image = form.imageText
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    if (!form.name.trim() || image.length === 0 || form.variants.length === 0) {
      setError("Name, at least one image URL, and at least one variant are required.");
      return;
    }

    setSaving(true);
    try {
      const input = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        subCategory: form.subCategory,
        image,
        bestseller: form.bestseller,
        variants: form.variants,
      };

      if (isEditing && productId) {
        await updateProduct(productId, input);
      } else {
        await createProduct(input);
      }

      await refreshProducts();
      navigate("/admin/products");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="pt-10 text-center text-gray-500">Loading…</div>;
  }

  if (notFound) {
    return <div className="pt-10 text-center text-gray-500">Product not found.</div>;
  }

  return (
    <div className="pt-10 max-w-3xl mx-auto pb-20">
      <h1 className="text-2xl font-medium mb-6">
        {isEditing ? "Edit Product" : "New Product"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-sm text-gray-800">
        <label className="flex flex-col gap-1">
          Name
          <input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="border border-gray-300 px-3 py-2"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          Description
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="border border-gray-300 px-3 py-2"
            rows={3}
          />
        </label>

        <div className="flex gap-4">
          <label className="flex flex-col gap-1 flex-1">
            Category
            <select
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value as Category }))
              }
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
              onChange={(e) =>
                setForm((prev) => ({ ...prev, subCategory: e.target.value as SubCategory }))
              }
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
            onChange={(e) => setForm((prev) => ({ ...prev, imageText: e.target.value }))}
            className="border border-gray-300 px-3 py-2"
            placeholder="https://..., https://..."
            required
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.bestseller}
            onChange={(e) => setForm((prev) => ({ ...prev, bestseller: e.target.checked }))}
          />
          Bestseller
        </label>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="font-medium">Variants</p>
            <button
              type="button"
              onClick={addVariant}
              className="text-xs border border-gray-400 px-3 py-1 hover:bg-gray-100"
            >
              + Add Variant
            </button>
          </div>

          {form.variants.map((variant, index) => (
            <div
              key={variant._id ?? index}
              className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-end border border-gray-200 p-3"
            >
              <label className="flex flex-col gap-1 text-xs">
                Size
                <input
                  value={variant.size}
                  onChange={(e) => updateVariant(index, { size: e.target.value })}
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
                  onChange={(e) => updateVariant(index, { price: Number(e.target.value) })}
                  className="border border-gray-300 px-2 py-1"
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-xs">
                Stock Status
                <select
                  value={variant.stockStatus}
                  onChange={(e) =>
                    updateVariant(index, { stockStatus: e.target.value as StockStatus })
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
                  onChange={(e) => updateVariant(index, { active: e.target.checked })}
                />
                Active
              </label>

              <button
                type="button"
                onClick={() => removeVariant(index)}
                disabled={form.variants.length === 1}
                className="text-xs text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white px-8 py-3 text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="border border-gray-400 px-8 py-3 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
