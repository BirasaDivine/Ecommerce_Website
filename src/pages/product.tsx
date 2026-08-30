import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useProductPurchase } from "../hooks/useProductPurchase";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductPurchasePanel from "../components/product/ProductPurchasePanel";
import ProductDescription from "../components/product/ProductDescription";
import GoBackButton from "../components/product/GoBackButton";

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
  const { status, product, variants, image, setImage } = useProduct(productId);
  const purchase = useProductPurchase(product, variants);

  if (status === "loading") {
    return <div className="pt-10 text-center text-gray-500">Loading…</div>;
  }

  if (status === "not-found" || !product) {
    return (
      <div className="pt-10 text-center text-gray-500">Product not found.</div>
    );
  }

  return (
    <div className="border-t-2 pt-4">
      <GoBackButton />

      <div className="flex gap-12 flex-col sm:flex-row">
        <ProductImageGallery
          images={product.image}
          activeImage={image}
          onSelect={setImage}
          alt={product.name}
        />

        <ProductPurchasePanel
          product={product}
          variants={variants}
          selectedVariantId={purchase.selectedVariantId}
          onSelectVariant={purchase.setSelectedVariantId}
          displayPrice={purchase.displayPrice}
          canBuy={purchase.canBuy}
          justAdded={purchase.justAdded}
          isAuthenticated={purchase.isAuthenticated}
          onBuy={purchase.handleBuy}
          onGoToLogin={purchase.goToLogin}
        />
      </div>

      <ProductDescription description={product.description} />
    </div>
  );
}
