import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, SUB_CATEGORIES } from "../mocks/categories";
import type { Category, SubCategory } from "../mocks/categories";
import { getProductById, getVariants, createProduct, updateProduct } from "../services/productService";
import type { VariantDraft } from "../services/productService";
import { useShopContext } from "../context/ShopContext";

export interface ProductFormState {
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

const initialState: ProductFormState = {
  name: "",
  description: "",
  category: CATEGORIES[0],
  subCategory: SUB_CATEGORIES[0],
  imageText: "",
  bestseller: false,
  variants: [emptyVariant()],
};

export function useAdminProductForm(productId: string | undefined) {
  const isEditing = Boolean(productId);
  const navigate = useNavigate();
  const { refreshProducts } = useShopContext();

  const [form, setForm] = useState<ProductFormState>(initialState);
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

  const updateField = <K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return {
    isEditing,
    form,
    loading,
    notFound,
    error,
    saving,
    updateField,
    updateVariant,
    addVariant,
    removeVariant,
    handleSubmit,
    cancel: () => navigate("/admin/products"),
  };
}
