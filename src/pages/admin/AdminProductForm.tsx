import { useParams } from "react-router-dom";
import { useAdminProductForm } from "../../hooks/useAdminProductForm";
import ProductFormFields from "../../components/admin/ProductFormFields";
import VariantFieldsEditor from "../../components/admin/VariantFieldsEditor";

export default function AdminProductForm() {
  const { productId } = useParams();
  const {
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
    cancel,
  } = useAdminProductForm(productId);

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
        <ProductFormFields form={form} onChange={updateField} />

        <VariantFieldsEditor
          variants={form.variants}
          onUpdateVariant={updateVariant}
          onAddVariant={addVariant}
          onRemoveVariant={removeVariant}
        />

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
            onClick={cancel}
            className="border border-gray-400 px-8 py-3 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
