import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getVariants } from "../services/productService";
import { useShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { STOCK_STATUS_CLASSES, STOCK_STATUS_LABELS } from "../utils/stockStatus";
import type { Product } from "../types/product";
import type { Variant } from "../types/variant";

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

  const [status, setStatus] = useState<"loading" | "ready" | "not-found">("loading");
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [image, setImage] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    let ignore = false;

    Promise.all([getProductById(productId), getVariants(productId)]).then(
      ([productResult, variantResult]) => {
        if (ignore) return;
        if (!productResult) {
          setStatus("not-found");
          return;
        }
        setProduct(productResult);
        setImage(productResult.image[0] ?? "");
        setVariants(variantResult.filter((v) => v.active));
        setStatus("ready");
      }
    );

    return () => {
      ignore = true;
    };
  }, [productId]);

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
      <p
        onClick={() => window.history.back()}
        className="px-4 py-3 mb-3 cursor-pointer flex items-center gap-2 border rounded-full w-fit bg-gray-100 hover:bg-gray-200 transition-all duration-300"
      >
        <span aria-hidden>←</span>
        <span className="font-medium hidden sm:block">Go Back</span>
      </p>

      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((img, index) => (
              <img
                src={img}
                alt={product.name}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-contain cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={image} alt={product.name} className="w-full h-auto" />
          </div>
        </div>

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
                    onClick={() => setSelectedVariantId(v._id)}
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

      {/* Description */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
        </div>
        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
