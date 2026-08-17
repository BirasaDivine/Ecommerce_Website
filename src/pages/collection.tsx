import { assets } from "../assets/frontend_assets/assets";
import { CATEGORIES, SUB_CATEGORIES } from "../mocks/categories";
import { MOCK_PRODUCTS } from "../mocks/products";
import { MOCK_VARIANTS } from "../mocks/variants";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const prices: Record<string, number | null> = MOCK_PRODUCTS.reduce((acc, product) => {
  const activePrices = MOCK_VARIANTS
    .filter((variant) => variant.productId === product._id && variant.active)
    .map((variant) => variant.price);
  acc[product._id] = activePrices.length ? Math.min(...activePrices) : null;
  return acc;
}, {} as Record<string, number | null>);

export default function Collection() {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">
      {/* Filter Options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTER OPTIONS
          <img src={assets.dropdown_icon} className="h-3 sm:hidden" alt="Toggle filters" />
        </p>

        {/* Category Filter */}
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {CATEGORIES.map((cat) => (
              <p key={cat} className="flex gap-2">
                <input className="w-3" type="checkbox" value={cat} /> {cat}
              </p>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className="border border-gray-300 pl-5 py-3 my-5">
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {SUB_CATEGORIES.map((sub) => (
              <p key={sub} className="flex gap-2">
                <input className="w-3" type="checkbox" value={sub} /> {sub}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          {/* Product Sort */}
          <select className="py-2 px-2 border-2 text-sm border-gray-300 active:border-2 active:border-gray-300 outline-none">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <ProductItem products={MOCK_PRODUCTS} prices={prices} />
      </div>
    </div>
  );
}
