import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../hooks/useProduct";
import ProductImageGallery from "../components/product/ProductImageGallery";
import VariantSelector from "../components/product/VariantSelector";
import ProductDescription from "../components/product/ProductDescription";

export default function Product() {
  const { productId } = useParams();

  if (!productId) {
    return (
      <div className="pt-10 text-center text-gray-500">Product not found.</div>
    );
  }

  // Remounts the view whenever the route param changes, so loading/selection
  // state resets naturally instead of being reset by hand inside an effect.
  return <ProductView key={productId} productId={productId} />;
}

function ProductView({ productId }: { productId: string }) {
  const navigate = useNavigate();
  const { currency, addToCart } = useShopContext();
  const { isAuthenticated } = useAuth();

  const { status, product, variants, image, setImage } = useProduct(productId);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  if (status === "loading") {
    return <div className="pt-10 text-center text-gray-500">Loading…</div>;
  }

  if (status === "not-found" || !product) {
    return (
      <div className="pt-10 text-center text-gray-500">Product not found.</div>
    );
  }

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
    if (!selectedVariant || selectedVariant.stockStatus === "OUT_OF_STOCK") return;
    addToCart(product._id, selectedVariant.size);
    setJustAdded(true);
  };

  return (
      <div className="border-t-2 pt-4">
       {/* Back Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-3 mb-3 cursor-pointer flex items-center gap-2 border rounded-full w-fit bg-gray-100 hover:bg-gray-200 transition-all duration-300"
        >
          <span aria-hidden>←</span>
          <span className="font-medium hidden sm:block">Go Back</span>

        </button>


      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <ProductImageGallery
          images={product.image}
          activeImage={image}
          onSelect={setImage}
          alt={product.name}
        />

        {/* Product Info */}
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
            onSelect={setSelectedVariantId}
            currency={currency}
          />

          {!isAuthenticated && (
            <p className="text-xs text-gray-500 mb-2">
              <span
                onClick={() => navigate("/login")}
                className="underline cursor-pointer"
              >
                Log in
              </span>{" "}
              to buy this product.
            </p>
          )}

          <button
            onClick={handleBuy}
            disabled={!canBuy}
            className="px-8 uppercase py-3 text-sm font-medium text-white bg-black active:bg-black/70 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isAuthenticated ? "Buy" : "Log In to Buy"}
          </button>

          {justAdded && (
            <p className="text-sm text-green-600 mt-3">Added to your cart.</p>
          )}

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash On Delivery Available.</p>
            <p>Easy return and exchange policy within 7 days of purchase.</p>
          </div>
        </div>
      </div>

      <ProductDescription description={product.description} />
    </div>
  );
}
