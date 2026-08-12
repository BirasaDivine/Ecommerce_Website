import { products as assetProducts } from "../assets/frontend_assets/assets";
import type { Variant } from "../types/variant";

export const MOCK_VARIANTS: Variant[] = assetProducts.flatMap((product) =>
    product.sizes.map((size, index) => ({
        _id: `${product._id}-v${index + 1}`,
        productId: product._id,
        size,
        price: product.price,
        stockStatus: "IN_STOCK",
        active: true,
    }))
);
