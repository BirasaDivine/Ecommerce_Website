import Title from "./Title";
import ProductItem from "./ProductItem";
import { useShopContext } from "../context/ShopContext";

export default function OurCollection(){
    const { products, getPrice } = useShopContext();

    const prices: Record<string, number | null> = products.reduce((acc, product) => {
        acc[product._id] = getPrice(product._id);
        return acc;
    }, {} as Record<string, number | null>);

    return(
        <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Here are some of our latest collections.
        </p>
      </div>
      <ProductItem products={products} prices={prices} />
    </div>
    )
}