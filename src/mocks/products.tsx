import { products as assetProducts } from "../assets/frontend_assets/assets";
import type { Product } from "../types/product";

export const MOCK_PRODUCTS: Product[] = assetProducts.map(
    ({ _id, name, description, image, category, subCategory, date, bestseller }) => ({
        _id,
        name,
        description,
        image,
        category,
        subCategory,
        date,
        bestseller,
    })
);
