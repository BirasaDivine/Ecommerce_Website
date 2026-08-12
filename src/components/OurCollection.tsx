import Title from "./Title";
import ProductItem from "./ProductItem";
import { MOCK_PRODUCTS } from "../mocks/products";
import { MOCK_VARIANTS } from "../mocks/variants";

const prices: Record<string, number | null> = MOCK_PRODUCTS.reduce((acc, product) => {
    const activePrices = MOCK_VARIANTS
        .filter((variant) => variant.productId === product._id && variant.active)
        .map((variant) => variant.price);
    acc[product._id] = activePrices.length ? Math.min(...activePrices) : null;
    return acc;
}, {} as Record<string, number | null>);

export default function OurCollection(){

    return(
        <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Here are some of our latest collections.
        </p>
      </div>
      <ProductItem products={MOCK_PRODUCTS} prices={prices} />
    </div>
    )
}