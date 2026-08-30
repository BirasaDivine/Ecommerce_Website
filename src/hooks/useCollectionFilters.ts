import { useState } from "react";
import { useShopContext } from "../context/ShopContext";
import type { Category, SubCategory } from "../mocks/categories";

export function useCollectionFilters() {
  const { products, getPrice, search, showSearch } = useShopContext();
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<SubCategory[]>([]);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleSubCategory = (sub: SubCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const searchedProducts =
    showSearch && search
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      : products;

  const categoryFilteredProducts =
    selectedCategories.length === 0
      ? searchedProducts
      : searchedProducts.filter((product) => selectedCategories.includes(product.category));

  const subCategoryFilteredProducts =
    selectedSubCategories.length === 0
      ? categoryFilteredProducts
      : categoryFilteredProducts.filter((product) =>
          selectedSubCategories.includes(product.subCategory)
        );

  const maxPriceValue = maxPrice === "" ? null : Number(maxPrice);
  const visibleProducts =
    maxPriceValue !== null && !Number.isNaN(maxPriceValue)
      ? subCategoryFilteredProducts.filter((product) => {
          const price = getPrice(product._id);
          return price !== null && price <= maxPriceValue;
        })
      : subCategoryFilteredProducts;

  const prices: Record<string, number | null> = visibleProducts.reduce((acc, product) => {
    acc[product._id] = getPrice(product._id);
    return acc;
  }, {} as Record<string, number | null>);

  return {
    maxPrice,
    setMaxPrice,
    selectedCategories,
    toggleCategory,
    selectedSubCategories,
    toggleSubCategory,
    visibleProducts,
    prices,
  };
}
