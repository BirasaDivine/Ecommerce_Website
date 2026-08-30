import { useCollectionFilters } from "../hooks/useCollectionFilters";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import FilterSidebar from "../components/collection/FilterSidebar";
import ProductSort from "../components/collection/ProductSort";

export default function Collection() {
  const {
    maxPrice,
    setMaxPrice,
    selectedCategories,
    toggleCategory,
    selectedSubCategories,
    toggleSubCategory,
    visibleProducts,
    prices,
  } = useCollectionFilters();

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">
      <FilterSidebar
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        selectedSubCategories={selectedSubCategories}
        onToggleSubCategory={toggleSubCategory}
      />

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <ProductSort />
        </div>

        <ProductItem products={visibleProducts} prices={prices} />
      </div>
    </div>
  );
}
